System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "./parser/context_with_variable_bindings", "./abstract_change_detector", "./change_detection_util", "./array_changes", "./keyvalue_changes", "./proto_change_detector", "./interfaces", "./exceptions"], function($__export) {
  "use strict";
  var isPresent,
      isBlank,
      BaseException,
      FunctionWrapper,
      List,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      ContextWithVariableBindings,
      AbstractChangeDetector,
      ChangeDetectionUtil,
      SimpleChange,
      uninitialized,
      ArrayChanges,
      KeyValueChanges,
      ProtoRecord,
      RECORD_TYPE_SELF,
      RECORD_TYPE_PROPERTY,
      RECORD_TYPE_INVOKE_METHOD,
      RECORD_TYPE_CONST,
      RECORD_TYPE_INVOKE_CLOSURE,
      RECORD_TYPE_PRIMITIVE_OP,
      RECORD_TYPE_KEYED_ACCESS,
      RECORD_TYPE_INVOKE_FORMATTER,
      RECORD_TYPE_STRUCTURAL_CHECK,
      RECORD_TYPE_INTERPOLATE,
      ProtoChangeDetector,
      ChangeDetector,
      ChangeDispatcher,
      ExpressionChangedAfterItHasBeenChecked,
      ChangeDetectionError,
      DynamicChangeDetector,
      _singleElementList;
  function isSame(a, b) {
    if (a === b)
      return true;
    if (a instanceof String && b instanceof String && a == b)
      return true;
    if ((a !== a) && (b !== b))
      return true;
    return false;
  }
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      FunctionWrapper = $__m.FunctionWrapper;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      ContextWithVariableBindings = $__m.ContextWithVariableBindings;
    }, function($__m) {
      AbstractChangeDetector = $__m.AbstractChangeDetector;
    }, function($__m) {
      ChangeDetectionUtil = $__m.ChangeDetectionUtil;
      SimpleChange = $__m.SimpleChange;
      uninitialized = $__m.uninitialized;
    }, function($__m) {
      ArrayChanges = $__m.ArrayChanges;
    }, function($__m) {
      KeyValueChanges = $__m.KeyValueChanges;
    }, function($__m) {
      ProtoRecord = $__m.ProtoRecord;
      RECORD_TYPE_SELF = $__m.RECORD_TYPE_SELF;
      RECORD_TYPE_PROPERTY = $__m.RECORD_TYPE_PROPERTY;
      RECORD_TYPE_INVOKE_METHOD = $__m.RECORD_TYPE_INVOKE_METHOD;
      RECORD_TYPE_CONST = $__m.RECORD_TYPE_CONST;
      RECORD_TYPE_INVOKE_CLOSURE = $__m.RECORD_TYPE_INVOKE_CLOSURE;
      RECORD_TYPE_PRIMITIVE_OP = $__m.RECORD_TYPE_PRIMITIVE_OP;
      RECORD_TYPE_KEYED_ACCESS = $__m.RECORD_TYPE_KEYED_ACCESS;
      RECORD_TYPE_INVOKE_FORMATTER = $__m.RECORD_TYPE_INVOKE_FORMATTER;
      RECORD_TYPE_STRUCTURAL_CHECK = $__m.RECORD_TYPE_STRUCTURAL_CHECK;
      RECORD_TYPE_INTERPOLATE = $__m.RECORD_TYPE_INTERPOLATE;
      ProtoChangeDetector = $__m.ProtoChangeDetector;
    }, function($__m) {
      ChangeDetector = $__m.ChangeDetector;
      ChangeDispatcher = $__m.ChangeDispatcher;
    }, function($__m) {
      ExpressionChangedAfterItHasBeenChecked = $__m.ExpressionChangedAfterItHasBeenChecked;
      ChangeDetectionError = $__m.ChangeDetectionError;
    }],
    execute: function() {
      DynamicChangeDetector = $__export("DynamicChangeDetector", (function($__super) {
        var DynamicChangeDetector = function DynamicChangeDetector(dispatcher, formatters, protoRecords) {
          $traceurRuntime.superConstructor(DynamicChangeDetector).call(this);
          this.dispatcher = dispatcher;
          this.formatters = formatters;
          this.values = ListWrapper.createFixedSize(protoRecords.length + 1);
          this.changes = ListWrapper.createFixedSize(protoRecords.length + 1);
          this.protos = protoRecords;
        };
        return ($traceurRuntime.createClass)(DynamicChangeDetector, {
          setContext: function(context) {
            ListWrapper.fill(this.values, uninitialized);
            this.values[0] = context;
          },
          detectChangesInRecords: function(throwOnChange) {
            var protos = this.protos;
            var updatedRecords = null;
            for (var i = 0; i < protos.length; ++i) {
              var proto = protos[i];
              var change = this._check(proto);
              if (isPresent(change)) {
                var record = ChangeDetectionUtil.changeRecord(proto.bindingMemento, change);
                updatedRecords = ChangeDetectionUtil.addRecord(updatedRecords, record);
              }
              if (proto.lastInDirective && isPresent(updatedRecords)) {
                if (throwOnChange)
                  ChangeDetectionUtil.throwOnChange(proto, updatedRecords[0]);
                this.dispatcher.onRecordChange(proto.directiveMemento, updatedRecords);
                updatedRecords = null;
              }
            }
          },
          _check: function(proto) {
            try {
              if (proto.mode == RECORD_TYPE_STRUCTURAL_CHECK) {
                return this._structuralCheck(proto);
              } else {
                return this._referenceCheck(proto);
              }
            } catch (e) {
              throw new ChangeDetectionError(proto, e);
            }
          },
          _referenceCheck: function(proto) {
            if (this._pureFuncAndArgsDidNotChange(proto)) {
              this._setChanged(proto, false);
              return null;
            }
            var prevValue = this._readSelf(proto);
            var currValue = this._calculateCurrValue(proto);
            if (!isSame(prevValue, currValue)) {
              this._writeSelf(proto, currValue);
              this._setChanged(proto, true);
              if (proto.lastInBinding) {
                return ChangeDetectionUtil.simpleChange(prevValue, currValue);
              } else {
                return null;
              }
            } else {
              this._setChanged(proto, false);
              return null;
            }
          },
          _calculateCurrValue: function(proto) {
            switch (proto.mode) {
              case RECORD_TYPE_SELF:
                return this._readContext(proto);
              case RECORD_TYPE_CONST:
                return proto.funcOrValue;
              case RECORD_TYPE_PROPERTY:
                var context = this._readContext(proto);
                var c = ChangeDetectionUtil.findContext(proto.name, context);
                if (c instanceof ContextWithVariableBindings) {
                  return c.get(proto.name);
                } else {
                  var propertyGetter = proto.funcOrValue;
                  return propertyGetter(c);
                }
                break;
              case RECORD_TYPE_INVOKE_METHOD:
                var methodInvoker = proto.funcOrValue;
                return methodInvoker(this._readContext(proto), this._readArgs(proto));
              case RECORD_TYPE_KEYED_ACCESS:
                var arg = this._readArgs(proto)[0];
                return this._readContext(proto)[arg];
              case RECORD_TYPE_INVOKE_CLOSURE:
                return FunctionWrapper.apply(this._readContext(proto), this._readArgs(proto));
              case RECORD_TYPE_INTERPOLATE:
              case RECORD_TYPE_PRIMITIVE_OP:
                return FunctionWrapper.apply(proto.funcOrValue, this._readArgs(proto));
              case RECORD_TYPE_INVOKE_FORMATTER:
                var formatter = MapWrapper.get(this.formatters, proto.funcOrValue);
                return FunctionWrapper.apply(formatter, this._readArgs(proto));
              default:
                throw new BaseException(("Unknown operation " + proto.mode));
            }
          },
          _structuralCheck: function(proto) {
            var self = this._readSelf(proto);
            var context = this._readContext(proto);
            var change = ChangeDetectionUtil.structuralCheck(self, context);
            if (isPresent(change)) {
              this._writeSelf(proto, change.currentValue);
            }
            return change;
          },
          _readContext: function(proto) {
            return this.values[proto.contextIndex];
          },
          _readSelf: function(proto) {
            return this.values[proto.selfIndex];
          },
          _writeSelf: function(proto, value) {
            this.values[proto.selfIndex] = value;
          },
          _setChanged: function(proto, value) {
            this.changes[proto.selfIndex] = value;
          },
          _pureFuncAndArgsDidNotChange: function(proto) {
            return proto.isPureFunction() && !this._argsChanged(proto);
          },
          _argsChanged: function(proto) {
            var args = proto.args;
            for (var i = 0; i < args.length; ++i) {
              if (this.changes[args[i]]) {
                return true;
              }
            }
            return false;
          },
          _readArgs: function(proto) {
            var res = ListWrapper.createFixedSize(proto.args.length);
            var args = proto.args;
            for (var i = 0; i < args.length; ++i) {
              res[i] = this.values[args[i]];
            }
            return res;
          }
        }, {}, $__super);
      }(AbstractChangeDetector)));
      Object.defineProperty(DynamicChangeDetector, "parameters", {get: function() {
          return [[assert.type.any], [Map], [assert.genericType(List, ProtoRecord)]];
        }});
      Object.defineProperty(DynamicChangeDetector.prototype.setContext, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
      Object.defineProperty(DynamicChangeDetector.prototype.detectChangesInRecords, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
      Object.defineProperty(DynamicChangeDetector.prototype._check, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(DynamicChangeDetector.prototype._referenceCheck, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(DynamicChangeDetector.prototype._calculateCurrValue, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(DynamicChangeDetector.prototype._structuralCheck, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(DynamicChangeDetector.prototype._readContext, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(DynamicChangeDetector.prototype._readSelf, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(DynamicChangeDetector.prototype._writeSelf, "parameters", {get: function() {
          return [[ProtoRecord], []];
        }});
      Object.defineProperty(DynamicChangeDetector.prototype._setChanged, "parameters", {get: function() {
          return [[ProtoRecord], [assert.type.boolean]];
        }});
      Object.defineProperty(DynamicChangeDetector.prototype._pureFuncAndArgsDidNotChange, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(DynamicChangeDetector.prototype._argsChanged, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(DynamicChangeDetector.prototype._readArgs, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      _singleElementList = [null];
    }
  };
});

//# sourceMappingURL=angular2/src/change_detection/dynamic_change_detector.map

//# sourceMappingURL=../../../angular2/src/change_detection/dynamic_change_detector.js.map