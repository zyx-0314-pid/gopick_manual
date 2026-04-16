(function (global) {
    'use strict';

    var _data = null;
    var DATA_VERSION = '20260416-meters';

    function init() {
        return fetch('shared/data/gopick-data.json?v=' + DATA_VERSION, { cache: 'no-store' })
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
