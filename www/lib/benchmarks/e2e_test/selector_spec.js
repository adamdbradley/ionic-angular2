System.register([], function($__export) {
  "use strict";
  var testUtil;
  return {
    setters: [],
    execute: function() {
      testUtil = require('angular2/e2e_test/test_util');
      describe('ng2 selector benchmark', function() {
        var URL = 'benchmarks/src/compiler/selector_benchmark.html';
        afterEach(testUtil.verifyNoBrowserErrors);
        it('should not throw errors', function() {
          browser.get(URL);
          testUtil.clickAll(['#parse', '#addSelectable', '#match']);
        });
      });
    }
  };
});

//# sourceMappingURL=benchmarks/e2e_test/selector_spec.map

//# sourceMappingURL=../../benchmarks/e2e_test/selector_spec.js.map