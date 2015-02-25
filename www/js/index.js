System.register(["angular2/angular2"], function($__export) {
  "use strict";
  var bootstrap,
      Component,
      Decorator,
      Template,
      NgElement,
      IonicCmp,
      IonHeaderBarCmp;
  function main() {
    bootstrap(IonicCmp);
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
      IonicCmp = (function() {
        var IonicCmp = function IonicCmp() {};
        return ($traceurRuntime.createClass)(IonicCmp, {}, {});
      }());
      Object.defineProperty(IonicCmp, "annotations", {get: function() {
          return [new Component({selector: 'ionic-app'}), new Template({
            url: 'ionicApp.html',
            directives: [IonHeaderBarCmp]
          })];
        }});
      IonHeaderBarCmp = (function() {
        var IonHeaderBarCmp = function IonHeaderBarCmp() {
          console.log('ionHeaderBar');
        };
        return ($traceurRuntime.createClass)(IonHeaderBarCmp, {}, {});
      }());
      Object.defineProperty(IonHeaderBarCmp, "annotations", {get: function() {
          return [new Component({selector: 'ion-header-bar'}), new Template({url: 'ionHeaderBar.html'})];
        }});
    }
  };
});
