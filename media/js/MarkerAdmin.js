if (jQuery != undefined) {
    var django = {
        'jQuery':jQuery,
    }
}
(function($) {
    ADRS_PC = "";

    $(document).ready(function() {
        $searchInput = $('<input>', {'type': 'search', 'placeholder': 'Search …', 'id': 'address', 'width': '300px'});
        $map = $('<div>', {'id': 'map', 'height': '300px'});
        $submit = $('<button>', {'type': 'button', 'text': 'Search', 'id': 'search'});
        $searchRow = $('.field-longitude');

        $searchRow.append($searchInput, $submit, $map);

        map = new GMaps({
            div: '#map',
            lat: 51.48425033829694,
            lng: -0.10845702578126781,
            zoom: 12,
        });

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

        $submit.click(getlatLng);

        $searchInput.bind('keydown', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                getlatLng();
            }
        });
        $('#id_address').bind('keydown', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                updateTotal()
            }
        });
        $('#id_postcode').bind('keydown', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                updateTotal()
            }
        });

        var updateTotal = function () {
            var input1 = $('#id_address').val();
            var input2 = $('#id_postcode').val();
            $searchInput.val(input1 + ' ' + input2);
        };

    });
})(django.jQuery);