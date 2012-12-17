var map;
var GLOBAL_DATA;

$(document).ready(function(){
    //Set up the map with initial location and zoom level
    map = new GMaps({
        el: '#map',
        lat: 51.527145976089415,
        lng: -0.08147038015136054,
        zoomControl : true,
        zoomControlOpt: {
            style : 'SMALL',
            position: 'TOP_LEFT'
        },
        panControl : false,
        streetViewControl : true,
        mapTypeControl: false,
        overviewMapControl: false,
        click: function(e) {
            console.log('click');
        }
    });

    //Add markers with JSON
    $.getJSON('media/js/markers.json', function(data){
        GLOBAL_DATA = data;
        loadMarkers();
    });
    
    function loadMarkers(e) {
        map.removeMarkers();
        $.each(GLOBAL_DATA.markers, function(i, marker){
            if (passesFilter(marker)) {
                map.addMarker({
                    lat: marker.latitude,
                    lng: marker.longitude,
                    animation: google.maps.Animation.DROP,
                    infoWindow: {
                        content: '<h2>' + marker.name + '</h2><p>' + marker.address + '</p>'
                    }
                });
            }
        });
    }

    function passesFilter(marker){
        var price_check = $('#'+marker.price);
        var marker_byob = marker.byob;

        if (!$('#isByob').is(':checked') && marker_byob) {
            return false;
        }

        if (!$('#isNotByob').is(':checked') && !marker_byob) {
            return false;
        }

        if (!price_check.prop('checked')) {
            return false;
        }
        return true;
    }

    $('#filter_form').submit(function() {
        loadMarkers();
        return false;
    });

    //Add a control, with geolocation event attached
    map.addControl({
        position: 'top_right',
        content: 'Find me!',
        style: {
            margin: '5px',
            padding: '1px 6px',
            border: 'solid 1px #717B87',
            background: '#fff'
        },
        events: {
            click: function(){
                GMaps.geolocate({
                    success: function(position){
                        var me_icon = '/media/img/marker_sprite.png';

                        map.setCenter(position.coords.latitude, position.coords.longitude);
                        //Add a marker at that pos
                        map.addMarker({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            icon: me_icon
                        });
                    },
                    error: function(error){
                         alert('Geolocation failed: ' + error.message);
                    },
                    not_supported: function(){
                      alert("Your browser does not support geolocation");
                    }
                });
            }
        }
    });

});