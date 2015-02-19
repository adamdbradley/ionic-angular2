System.register([], function($__export) {
  "use strict";
  var benchpress,
      webdriver;
  function runClickBenchmark(config) {
    var buttons = config.buttons.map(function(selector) {
      return $(selector);
    });
    config.work = function() {
      buttons.forEach(function(button) {
        button.click();
      });
    };
    runBenchmark(config);
  }
  function runBenchmark(config) {
    var globalParams = browser.params;
    getScaleFactor(globalParams.benchmark.scaling).then(function(scaleFactor) {
      var params = config.params.map(function(param) {
        return {
          name: param.name,
          value: applyScaleFactor(param.value, scaleFactor, param.scale)
        };
      });
      var benchmarkConfig = Object.create(globalParams.benchmark);
      benchmarkConfig.id = globalParams.lang + '.' + config.id;
      benchmarkConfig.params = params;
      benchmarkConfig.scaleFactor = scaleFactor;
      var url = encodeURI(config.url + '?' + params.map(function(param) {
        return param.name + '=' + param.value;
      }).join('&'));
      browser.get(url);
      benchpress.runBenchmark(benchmarkConfig, config.work);
    });
  }
  function getScaleFactor(possibleScalings) {
    return browser.executeScript('return navigator.userAgent').then(function(userAgent) {
      var scaleFactor = 1;
      possibleScalings.forEach(function(entry) {
        if (userAgent.match(entry.userAgent)) {
          scaleFactor = entry.value;
        }
      });
      return scaleFactor;
    });
  }
  function applyScaleFactor(value, scaleFactor, method) {
    if (method === 'log2') {
      return value + Math.log2(scaleFactor);
    } else if (method === 'sqrt') {
      return value * Math.sqrt(scaleFactor);
    } else if (method === 'linear') {
      return value * scaleFactor;
    } else {
      return value;
    }
  }
  return {
    setters: [],
    execute: function() {
      benchpress = require('benchpress/index.js');
      webdriver = require('protractor/node_modules/selenium-webdriver');
      module.exports = {
        runClickBenchmark: runClickBenchmark,
        runBenchmark: runBenchmark,
        verifyNoBrowserErrors: benchpress.verifyNoBrowserErrors
      };
    }
  };
});

//# sourceMappingURL=angular2/e2e_test/perf_util.map

//# sourceMappingURL=../../angular2/e2e_test/perf_util.js.map