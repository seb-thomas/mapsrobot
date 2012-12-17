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
        e.preventDefault();
        map.removeMarkers();

       //var selected = $(this).attr('id');
        //console.log(selected);

        $.each(GLOBAL_DATA.markers, function(i, marker){
            if (passesFilter(marker)) {
                map.addMarker({
                    lat: marker.latitude,
                    lng: marker.longitude,
                    infoWindow: {
                        content: '<h2>' + marker.name + '</h2><p>' + marker.address + '</p>'
                    }
                });
            }
        });
    }

    function passesFilter(marker){
        var price_check = $('#'+marker.price);
        if (!price_check.prop('checked')) {
            return false;
        }


        return true;
    }

    $('#filter_form').submit(loadMarkers);

/*
    //Kind of filtering markers by only loading json objects with if
    function loadMarkers(e) {
        e.preventDefault();

        

        //var read_tncs = ($('#id_read_tncs:checked').val() !== undefined);
        //Remove all markers first. 
        map.removeMarkers();

    }
    $.getJSON('media/js/markers.json', function(data){
        GLOBAL_DATA = data;
    });
    function filterMarkers() {
        $.each(GLOBAL_DATA.markers, function(i, marker){
           if (marker.price === selected) {
                map.addMarker({
                    id: i,
                    tags: marker.tag,
                    lat: marker.latitude,
                    lng: marker.longitude,
                    infoWindow: {
                        content: '<h2>' + marker.name + '</h2><p>' + marker.address + '</p>'
                    }
                });
            }
        });
    }
*/

    //Add a control, with geolocation event attached
    map.addControl({
        position: 'top_right',
        content: 'Geolocate',
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
                        map.setCenter(position.coords.latitude, position.coords.longitude);
                        //Add a marker at that pos
                        map.addMarker({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
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