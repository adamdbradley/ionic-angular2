System.register([], function($__export) {
  "use strict";
  var benchpress;
  function clickAll(buttonSelectors) {
    buttonSelectors.forEach(function(selector) {
      $(selector).click();
    });
  }
  return {
    setters: [],
    execute: function() {
      benchpress = require('benchpress/index.js');
      module.exports = {
        verifyNoBrowserErrors: benchpress.verifyNoBrowserErrors,
        clickAll: clickAll
      };
    }
  };
});

//# sourceMappingURL=angular2/e2e_test/test_util.map

//# sourceMappingURL=../../angular2/e2e_test/test_util.js.map