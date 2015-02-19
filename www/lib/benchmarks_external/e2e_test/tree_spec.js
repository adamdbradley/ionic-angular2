System.register([], function($__export) {
  "use strict";
  var testUtil;
  return {
    setters: [],
    execute: function() {
      testUtil = require('angular2/e2e_test/test_util');
      describe('ng1.x tree benchmark', function() {
        var URL = 'benchmarks_external/src/tree/tree_benchmark.html';
        afterEach(testUtil.verifyNoBrowserErrors);
        it('should not throw errors', function() {
          browser.get(URL);
          testUtil.clickAll(['#createDom', '#destroyDom']);
        });
      });
    }
  };
});

//# sourceMappingURL=benchmarks_external/e2e_test/tree_spec.map

//# sourceMappingURL=../../benchmarks_external/e2e_test/tree_spec.js.map