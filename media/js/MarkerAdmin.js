if (jQuery != undefined) {
    var django = {
        'jQuery':jQuery,
    }
}
(function($) {
    $(document).ready(function() {
        /*A lot of this was helpfully written here
        https://github.com/philippbosch/django-geoposition/blob/master/geoposition/static/geoposition/geoposition.js*/

        //Set up html elems
        $searchInput = $('<input>', {'type': 'search', 'placeholder': 'Search …', 'id': 'address'});
        $map = $('<div>', {'id': 'map', 'height': '300px'});
        $submit = $('<button>', {'type': 'button', 'text': 'Search', 'id': 'search'});
        $searchRow = $('.field-longitude');

        //Could create a new row in the admin, but this will do
        $searchRow.append($searchInput, $submit, $map);

        //New gmaps map
        map = new GMaps({
            div: '#map',
            lat: 51.48425033829694,
            lng: -0.10845702578126781,
            zoom: 12,
            click: function(e){
                map.addMarker({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                    title: 'New marker'
                });
                $('#id_latitude').val(e.latLng.lat());
                $('#id_longitude').val(e.latLng.lng());
            }
        });

        //The geocoding func
        function getlatLng(){
            GMaps.geocode({
                address: $searchInput.val().trim(),
                callback: function(results, status){
                    if(status=='OK'){
                        var latlng = results[0].geometry.location;
                        map.setCenter(latlng.lat(), latlng.lng());
                        map.setZoom(17);
                        map.addMarker({
                            lat: latlng.lat(),
                            lng: latlng.lng()
                        });
                        $('#id_latitude').val(latlng.lat())
                        $('#id_longitude').val(latlng.lng())
                    }
                }
            });
        }

        //Dont really need a submit btn, but what the hey
        $submit.click(getlatLng);

        //When you hit rtn on the seach field
        $searchInput.bind('keydown', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                getlatLng();
            }
        });

        //Adding the address in twice seemed silly, so this copies the vals
        //Kept the above for flexibility
        $('#id_address, #id_postcode').bind('keydown keyup change', function(e) {
            updateTotal()
            if (e.keyCode == 13) {
                e.preventDefault();
                getlatLng();
            }
        });

        //Get the vals of address and postcode, add them together
        var updateTotal = function () {
            var input1 = $('#id_address').val();
            var input2 = $('#id_postcode').val();
            $searchInput.val(input1 + ' ' + input2);
        };

    });
})(django.jQuery);