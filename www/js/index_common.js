System.register("index_common.js", [], function($__export) {
  "use strict";
  var __moduleName = "index_common.js";
  return {
    setters: [],
    execute: function() {
      System.register(["angular2/angular2"], function($__export) {
        "use strict";
        var bootstrap,
            Component,
            Decorator,
            Template,
            NgElement,
            HelloCmp,
            RedDec,
            GreetingService;
        function main() {
          bootstrap(HelloCmp);
        }
        $__export("main", main);
        return {
          setters: [function($__m) {
            bootstrap = $__m.bootstrap;
            Component = $__m.Component;
            Decorator = $__m.Decorator;
            Template = $__m.Template;
            NgElement = $__m.NgElement;
          }],
          execute: function() {
            HelloCmp = (function() {
              var HelloCmp = function HelloCmp(service) {
                this.greeting = service.greeting;
              };
              return ($traceurRuntime.createClass)(HelloCmp, {changeGreeting: function() {
                  this.greeting = 'howdy';
                }}, {});
            }());
            Object.defineProperty(HelloCmp, "annotations", {get: function() {
                return [new Component({
                  selector: 'hello-app',
                  componentServices: [GreetingService]
                }), new Template({
                  inline: "<div class=\"greeting\">{{greeting}} <span red>world</span>!</div>\n           <button class=\"changeButton\" (click)=\"changeGreeting()\">change greeting</button>",
                  directives: [RedDec]
                })];
              }});
            Object.defineProperty(HelloCmp, "parameters", {get: function() {
                return [[GreetingService]];
              }});
            RedDec = (function() {
              var RedDec = function RedDec(el) {
                el.domElement.style.color = 'red';
              };
              return ($traceurRuntime.createClass)(RedDec, {}, {});
            }());
            Object.defineProperty(RedDec, "annotations", {get: function() {
                return [new Decorator({selector: '[red]'})];
              }});
            Object.defineProperty(RedDec, "parameters", {get: function() {
                return [[NgElement]];
              }});
            GreetingService = (function() {
              var GreetingService = function GreetingService() {
                this.greeting = 'hello';
              };
              return ($traceurRuntime.createClass)(GreetingService, {}, {});
            }());
          }
        };
      });
    }
  };
});

//# sourceMappingURL=index_common.map
