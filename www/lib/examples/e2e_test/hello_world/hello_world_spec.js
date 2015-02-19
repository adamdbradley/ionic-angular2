System.register([], function($__export) {
  "use strict";
  var benchpress;
  function getComponentText(selector, innerSelector) {
    return browser.executeScript('return document.querySelector("' + selector + '").shadowRoot.querySelector("' + innerSelector + '").textContent');
  }
  function clickComponentButton(selector, innerSelector) {
    return browser.executeScript('return document.querySelector("' + selector + '").shadowRoot.querySelector("' + innerSelector + '").click()');
  }
  return {
    setters: [],
    execute: function() {
      benchpress = require('benchpress/index.js');
      describe('hello world', function() {
        afterEach(benchpress.verifyNoBrowserErrors);
        describe('static reflection', function() {
          var URL = 'examples/src/hello_world/index_static.html';
          it('should greet', function() {
            browser.get(URL);
            expect(getComponentText('hello-app', '.greeting')).toBe('hello world!');
          });
          it('should change greeting', function() {
            browser.get(URL);
            clickComponentButton('hello-app', '.changeButton');
            expect(getComponentText('hello-app', '.greeting')).toBe('howdy world!');
          });
        });
        describe('dynamic reflection', function() {
          var URL = 'examples/src/hello_world/index.html';
          it('should greet', function() {
            browser.get(URL);
            expect(getComponentText('hello-app', '.greeting')).toBe('hello world!');
          });
          it('should change greeting', function() {
            browser.get(URL);
            clickComponentButton('hello-app', '.changeButton');
            expect(getComponentText('hello-app', '.greeting')).toBe('howdy world!');
          });
        });
      });
    }
  };
});

//# sourceMappingURL=examples/e2e_test/hello_world/hello_world_spec.map

//# sourceMappingURL=../../../examples/e2e_test/hello_world/hello_world_spec.js.map