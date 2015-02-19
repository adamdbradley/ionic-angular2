System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/facade/dom", "./compile_element", "./compile_control", "./compile_step", "../directive_metadata"], function($__export) {
  "use strict";
  var isPresent,
      List,
      ListWrapper,
      Element,
      Node,
      DOM,
      CompileElement,
      CompileControl,
      CompileStep,
      DirectiveMetadata,
      CompilePipeline;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Element = $__m.Element;
      Node = $__m.Node;
      DOM = $__m.DOM;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }],
    execute: function() {
      CompilePipeline = $__export("CompilePipeline", (function() {
        var CompilePipeline = function CompilePipeline(steps) {
          this._control = new CompileControl(steps);
        };
        return ($traceurRuntime.createClass)(CompilePipeline, {
          process: function(rootElement) {
            var results = ListWrapper.create();
            this._process(results, null, new CompileElement(rootElement));
            return results;
          },
          _process: function(results, parent, current) {
            var additionalChildren = this._control.internalProcess(results, 0, parent, current);
            if (current.compileChildren) {
              var node = DOM.templateAwareRoot(current.element).firstChild;
              while (isPresent(node)) {
                var nextNode = DOM.nextSibling(node);
                if (node.nodeType === Node.ELEMENT_NODE) {
                  this._process(results, current, new CompileElement(node));
                }
                node = nextNode;
              }
            }
            if (isPresent(additionalChildren)) {
              for (var i = 0; i < additionalChildren.length; i++) {
                this._process(results, current, additionalChildren[i]);
              }
            }
          }
        }, {});
      }()));
      Object.defineProperty(CompilePipeline, "parameters", {get: function() {
          return [[assert.genericType(List, CompileStep)]];
        }});
      Object.defineProperty(CompilePipeline.prototype.process, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(CompilePipeline.prototype._process, "parameters", {get: function() {
          return [[], [CompileElement], [CompileElement]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/pipeline/compile_pipeline.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/pipeline/compile_pipeline.js.map