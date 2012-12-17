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

    //Get the JSON data
    $.getJSON('media/js/markers.json', function(data){
        GLOBAL_DATA = data;

        //JSON badger don't care about doc ready, so we need to call loadMarkers specifically after the json has been got
        loadMarkers();
    });
    
    function loadMarkers() {
        //Remove all the markers first. 
        map.removeMarkers();

        //Iterate over the javascript object data
        $.each(GLOBAL_DATA.markers, function(i, marker){
            //Only add the markers that pass the below checks
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

    //Said checks
    function passesFilter(marker){
        //Set vars for things we are checking
        var price_checkbox = $('#'+marker.price);
        var marker_byob = marker.byob;

        //Check the states of checkboxes
        if (!price_checkbox.prop('checked')) {
            return false;
        }

        if (!$('#isByob').is(':checked') && marker_byob) {
            return false;
        }

        if (!$('#isNotByob').is(':checked') && !marker_byob) {
            return false;
        }
        return true;
    }

    //Submit ze form, will probably be fired on something else in future 
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