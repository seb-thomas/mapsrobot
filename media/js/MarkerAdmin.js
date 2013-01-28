if (jQuery != undefined) {
    var django = {
        'jQuery':jQuery,
    }
}
(function($) {

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
                address: $('#address').val().trim(),
                callback: function(results, status){
                    if(status=='OK'){
                        var latlng = results[0].geometry.location;
                        map.setCenter(latlng.lat(), latlng.lng());
                        map.setZoom(16);
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
    });
})(django.jQuery);