System.register(["./src/change_detection/parser/ast", "./src/change_detection/parser/lexer", "./src/change_detection/parser/parser", "./src/change_detection/parser/context_with_variable_bindings", "./src/change_detection/exceptions", "./src/change_detection/interfaces", "./src/change_detection/proto_change_detector", "./src/change_detection/dynamic_change_detector", "./src/change_detection/pipes/pipe_registry", "./src/change_detection/pipes/pipe", "./src/change_detection/pipes/array_changes", "./src/change_detection/pipes/null_pipe"], function($__export) {
  "use strict";
  var ProtoChangeDetector,
      DynamicProtoChangeDetector,
      JitProtoChangeDetector,
      PipeRegistry,
      ArrayChanges,
      NullPipe,
      ChangeDetection,
      defaultPipes,
      _registry,
      DynamicChangeDetection,
      JitChangeDetection,
      dynamicChangeDetection,
      jitChangeDetection;
  var $__exportNames = {
    ChangeDetection: true,
    defaultPipes: true,
    DynamicChangeDetection: true,
    JitChangeDetection: true,
    dynamicChangeDetection: true,
    jitChangeDetection: true,
    undefined: true
  };
  var $__exportNames = {
    ChangeDetection: true,
    defaultPipes: true,
    DynamicChangeDetection: true,
    JitChangeDetection: true,
    dynamicChangeDetection: true,
    jitChangeDetection: true,
    undefined: true
  };
  return {
    setters: [function($__m) {
      $__export("AST", $__m.AST);
    }, function($__m) {
      $__export("Lexer", $__m.Lexer);
    }, function($__m) {
      $__export("Parser", $__m.Parser);
    }, function($__m) {
      $__export("ContextWithVariableBindings", $__m.ContextWithVariableBindings);
    }, function($__m) {
      $__export("ExpressionChangedAfterItHasBeenChecked", $__m.ExpressionChangedAfterItHasBeenChecked);
      $__export("ChangeDetectionError", $__m.ChangeDetectionError);
    }, function($__m) {
      $__export("ChangeRecord", $__m.ChangeRecord);
      $__export("ChangeDispatcher", $__m.ChangeDispatcher);
      $__export("ChangeDetector", $__m.ChangeDetector);
      $__export("CHECK_ONCE", $__m.CHECK_ONCE);
      $__export("CHECK_ALWAYS", $__m.CHECK_ALWAYS);
      $__export("DETACHED", $__m.DETACHED);
      $__export("CHECKED", $__m.CHECKED);
    }, function($__m) {
      ProtoChangeDetector = $__m.ProtoChangeDetector;
      DynamicProtoChangeDetector = $__m.DynamicProtoChangeDetector;
      JitProtoChangeDetector = $__m.JitProtoChangeDetector;
      $__export("ProtoChangeDetector", $__m.ProtoChangeDetector);
      $__export("DynamicProtoChangeDetector", $__m.DynamicProtoChangeDetector);
      $__export("JitProtoChangeDetector", $__m.JitProtoChangeDetector);
    }, function($__m) {
      $__export("DynamicChangeDetector", $__m.DynamicChangeDetector);
    }, function($__m) {
      PipeRegistry = $__m.PipeRegistry;
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      ArrayChanges = $__m.ArrayChanges;
    }, function($__m) {
      NullPipe = $__m.NullPipe;
    }],
    execute: function() {
      ChangeDetection = $__export("ChangeDetection", (function() {
        var ChangeDetection = function ChangeDetection() {};
        return ($traceurRuntime.createClass)(ChangeDetection, {createProtoChangeDetector: function(name) {
            return null;
          }}, {});
      }()));
      Object.defineProperty(ChangeDetection.prototype.createProtoChangeDetector, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      defaultPipes = $__export("defaultPipes", {"[]": [{
          "supports": ArrayChanges.supportsObj,
          "pipe": (function() {
            return new ArrayChanges();
          })
        }, {
          "supports": NullPipe.supportsObj,
          "pipe": (function() {
            return new NullPipe();
          })
        }]});
      _registry = new PipeRegistry(defaultPipes);
      DynamicChangeDetection = $__export("DynamicChangeDetection", (function($__super) {
        var DynamicChangeDetection = function DynamicChangeDetection() {
          $traceurRuntime.superConstructor(DynamicChangeDetection).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(DynamicChangeDetection, {createProtoChangeDetector: function(name) {
            return new DynamicProtoChangeDetector(_registry);
          }}, {}, $__super);
      }(ChangeDetection)));
      Object.defineProperty(DynamicChangeDetection.prototype.createProtoChangeDetector, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      JitChangeDetection = $__export("JitChangeDetection", (function($__super) {
        var JitChangeDetection = function JitChangeDetection() {
          $traceurRuntime.superConstructor(JitChangeDetection).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(JitChangeDetection, {createProtoChangeDetector: function(name) {
            return new JitProtoChangeDetector(_registry);
          }}, {}, $__super);
      }(ChangeDetection)));
      Object.defineProperty(JitChangeDetection.prototype.createProtoChangeDetector, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      dynamicChangeDetection = $__export("dynamicChangeDetection", new DynamicChangeDetection());
      jitChangeDetection = $__export("jitChangeDetection", new JitChangeDetection());
    }
  };
});

//# sourceMappingURL=change_detection.map

//# sourceMappingURL=change_detection.js.map