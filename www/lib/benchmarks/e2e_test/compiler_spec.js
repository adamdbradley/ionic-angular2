System.register([], function($__export) {
  "use strict";
  var testUtil;
  return {
    setters: [],
    execute: function() {
      testUtil = require('angular2/e2e_test/test_util');
      describe('ng2 compiler benchmark', function() {
        var URL = 'benchmarks/src/compiler/compiler_benchmark.html';
        afterEach(testUtil.verifyNoBrowserErrors);
        it('should not throw errors', function() {
          browser.get(URL);
          testUtil.clickAll(['#compileWithBindings', '#compileNoBindings']);
        });
      });
    }
  };
});

//# sourceMappingURL=benchmarks/e2e_test/compiler_spec.map

//# sourceMappingURL=../../benchmarks/e2e_test/compiler_spec.js.map