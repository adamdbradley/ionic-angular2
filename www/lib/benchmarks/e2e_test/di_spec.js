System.register([], function($__export) {
  "use strict";
  var testUtil;
  return {
    setters: [],
    execute: function() {
      testUtil = require('angular2/e2e_test/test_util');
      describe('ng2 di benchmark', function() {
        var URL = 'benchmarks/src/di/di_benchmark.html';
        afterEach(testUtil.verifyNoBrowserErrors);
        it('should not throw errors', function() {
          browser.get(URL);
          testUtil.clickAll(['#getByToken', '#getByKey', '#getChild', '#instantiate']);
        });
      });
    }
  };
});

//# sourceMappingURL=benchmarks/e2e_test/di_spec.map

//# sourceMappingURL=../../benchmarks/e2e_test/di_spec.js.map