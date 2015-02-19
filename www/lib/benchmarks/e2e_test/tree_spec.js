System.register([], function($__export) {
  "use strict";
  var testUtil;
  return {
    setters: [],
    execute: function() {
      testUtil = require('angular2/e2e_test/test_util');
      describe('ng2 tree benchmark', function() {
        var URL = 'benchmarks/src/tree/tree_benchmark.html';
        afterEach(testUtil.verifyNoBrowserErrors);
        it('should not throw errors', function() {
          browser.get(URL);
          testUtil.clickAll(['#ng2CreateDom', '#ng2DestroyDom', '#baselineCreateDom', '#baselineDestroyDom']);
        });
      });
    }
  };
});

//# sourceMappingURL=benchmarks/e2e_test/tree_spec.map

//# sourceMappingURL=../../benchmarks/e2e_test/tree_spec.js.map