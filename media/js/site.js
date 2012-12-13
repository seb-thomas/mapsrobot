var map;
$(document).ready(function(){
    //Set up the map with initial location and zoom level
    map = new GMaps({
        el: '#map',
        lat: 51.500024295706694,
        lng: -0.11579284667970313,
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

    //Testing adding markers at diff locations
    map.addMarker({
        lat: 51.500024295706694,
        lng: -0.11579284667970313,
        title: 'Lima',
        details: {
            database_id: 42,
            author: 'HPNeo'
        },
        click: function(e){
            if(console.log)
            console.log(e);
            alert('You clicked in this marker');
        }
    });
    map.addMarker({
        lat: 51.500024295706694,
        lng: -0.117,
        title: 'Lio',
        details: {
            database_id: 43,
            author: 'HPNeo'
        },
        click: function(e){
            if(console.log)
            console.log(e);
            alert('You clicked in this marker');
        }
    });

    //Add another set of markers with JSON
    $.getJSON('media/js/markers.json', function(data){
        $.each(data.markers, function(i, marker){
           map.addMarker({
              'lat': (marker.latitude),
              'lng': (marker.longitude)
            });
        });
    });

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
                        map.addMarker({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            title: 'Lio'
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