var map;
var MARKERS;

//Define var for geolocation
var imHere = false;

$(document).ready(function(){
    //Set up the map with initial location and zoom level
    map = new GMaps({
        el: '#map',
        lat: 51.527145976089415,
        lng: -0.08147038015136054,
        zoom: 13,
        zoomControl : true,
        zoomControlOpt: {
            style : 'SMALL',
            position: 'TOP_LEFT'
        },
        panControl : false,
        streetViewControl : true,
        mapTypeControl: false,
        overviewMapControl: false,
    });

    //Get the JSON data
    $.getJSON('media/js/markers.json', function(data){
        //Iterate over the javascript object data
        MARKERS = $.map(data.markers, function(details, i){
            //Only add the markers that pass the below checks
            return map.addMarker({
                lat: details.latitude,
                lng: details.longitude,
                animation: google.maps.Animation.DROP,
                visible: false,
                details: details,
                infoWindow: {
                    content: '<h2>' + details.name + '</h2><p>' + details.address + '</p>'
                }
            });
        });
        //JSON badger don't care about doc ready, so we need to call loadMarkers specifically after the json has been got
        loadMarkers();
    });
    
    function loadMarkers() {
        //Iterate over the javascript object data
       $.each(MARKERS, function(i, marker){
            //Only add the markers that pass the below checks
            marker.setVisible(
                passesFilter(marker)
            );
            /*Equates to 
            showMarker = passesFilter(marker); (true/false)
            marker.setVisible(showMarker); (true/false)
            */
        });
    }

    //Said checks
    function passesFilter(marker){
        //Set vars for things we are checking
        var price_checkbox = $('#'+marker.details.price);
        var marker_byob = marker.details.byob;

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

                        //If there's anything in imHere, remove that marker
                        if (imHere) {
                            map.removeMarker(imHere);
                        }

                        //Add a marker at that pos
                        imHere = map.addMarker({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            icon: me_icon
                        });
                        //Move to location
                        map.setCenter(position.coords.latitude, position.coords.longitude);
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