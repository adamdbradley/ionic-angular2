System.register("index.js", [], function($__export) {
  "use strict";
  var __moduleName = "index.js";
  return {
    setters: [],
    execute: function() {
      System.register(["./index_common"], function($__export) {
        "use strict";
        var app;
        function main() {
          app.main();
        }
        $__export("main", main);
        return {
          setters: [function($__m) {
            app = $__m;
          }],
          execute: function() {}
        };
      });
    }
  };
});

//# sourceMappingURL=index.map
