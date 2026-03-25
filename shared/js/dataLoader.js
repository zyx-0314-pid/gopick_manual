(function (global) {
    'use strict';

    var _data = null;

    function init() {
        return fetch('shared/data/gopick-data.json')
            .then(function (res) {
                if (!res.ok) throw new Error('Data fetch failed: ' + res.status);
                return res.json();
            })
            .then(function (json) {
                _data = json;
                return _data;
            });
    }

    function getData() {
        return _data;
    }

    global.sharedDataLoader = {
        init: init,
        getData: getData
    };
})(window);
