if (jQuery != undefined) {
    var django = {
        'jQuery':jQuery,
    }
}
(function($) {

    $(document).ready(function() {
        $searchInput = $('<input>', {'type': 'search', 'placeholder': 'Search …', 'id': 'address'});
        $map = $('<div>', {'id': 'map', 'height': '300px'});
        $searchRow = $('.field-longitude');
        $searchInput.appendTo($searchRow);
        $map.appendTo($searchRow);
        map = new GMaps({
            div: '#map',
            lat: -12.043333,
            lng: -77.028333
        });
        $('#address').keyup(function (e) {
            e.preventDefault();
            GMaps.geocode({
                address: $('#address').val().trim(),
                callback: function(results, status){
                    if(status=='OK'){
                        var latlng = results[0].geometry.location;
                        map.setCenter(latlng.lat(), latlng.lng());
                        map.addMarker({
                            lat: latlng.lat(),
                            lng: latlng.lng()
                        });
                    }
                }
            });
        });
    });
})(django.jQuery);