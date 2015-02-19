System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "./parser/context_with_variable_bindings", "./abstract_change_detector", "./change_detection_util", "./proto_change_detector"], function($__export) {
  "use strict";
  var isPresent,
      isBlank,
      BaseException,
      Type,
      List,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      ContextWithVariableBindings,
      AbstractChangeDetector,
      ChangeDetectionUtil,
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
      ABSTRACT_CHANGE_DETECTOR,
      UTIL,
      DISPATCHER_ACCESSOR,
      FORMATTERS_ACCESSOR,
      PROTOS_ACCESSOR,
      CHANGE_LOCAL,
      CHANGES_LOCAL,
      TEMP_LOCAL,
      ChangeDetectorJITGenerator;
  function typeTemplate(type, cons, detectChanges, setContext) {
    return ("\n" + cons + "\n" + detectChanges + "\n" + setContext + ";\n\nreturn function(dispatcher, formatters) {\n  return new " + type + "(dispatcher, formatters, protos);\n}\n");
  }
  function constructorTemplate(type, fieldsDefinitions) {
    return ("\nvar " + type + " = function " + type + "(dispatcher, formatters, protos) {\n" + ABSTRACT_CHANGE_DETECTOR + ".call(this);\n" + DISPATCHER_ACCESSOR + " = dispatcher;\n" + FORMATTERS_ACCESSOR + " = formatters;\n" + PROTOS_ACCESSOR + " = protos;\n" + fieldsDefinitions + "\n}\n\n" + type + ".prototype = Object.create(" + ABSTRACT_CHANGE_DETECTOR + ".prototype);\n");
  }
  function setContextTemplate(type) {
    return ("\n" + type + ".prototype.setContext = function(context) {\n  this.context = context;\n}\n");
  }
  function detectChangesTemplate(type, body) {
    return ("\n" + type + ".prototype.detectChangesInRecords = function(throwOnChange) {\n  " + body + "\n}\n");
  }
  function bodyTemplate(localDefinitions, changeDefinitions, records) {
    return ("\n" + localDefinitions + "\n" + changeDefinitions + "\nvar " + TEMP_LOCAL + ";\nvar " + CHANGE_LOCAL + ";\nvar " + CHANGES_LOCAL + " = null;\n\ncontext = this.context;\n" + records + "\n");
  }
  function notifyTemplate(index) {
    return ("\nif (" + CHANGES_LOCAL + " && " + CHANGES_LOCAL + ".length > 0) {\n  if(throwOnChange) " + UTIL + ".throwOnChange(" + PROTOS_ACCESSOR + "[" + index + "], " + CHANGES_LOCAL + "[0]);\n  " + DISPATCHER_ACCESSOR + ".onRecordChange(" + PROTOS_ACCESSOR + "[" + index + "].directiveMemento, " + CHANGES_LOCAL + ");\n  " + CHANGES_LOCAL + " = null;\n}\n");
  }
  function structuralCheckTemplate(selfIndex, field, context, notify) {
    return ("\n" + CHANGE_LOCAL + " = " + UTIL + ".structuralCheck(" + field + ", " + context + ");\nif (" + CHANGE_LOCAL + ") {\n  " + CHANGES_LOCAL + " = " + UTIL + ".addRecord(" + CHANGES_LOCAL + ",\n    " + UTIL + ".changeRecord(" + PROTOS_ACCESSOR + "[" + selfIndex + "].bindingMemento, " + CHANGE_LOCAL + "));\n  " + field + " = " + CHANGE_LOCAL + ".currentValue;\n}\n" + notify + "\n");
  }
  function referenceCheckTemplate(assignment, newValue, oldValue, change, addRecord, notify) {
    return ("\n" + assignment + "\nif (" + newValue + " !== " + oldValue + " || (" + newValue + " !== " + newValue + ") && (" + oldValue + " !== " + oldValue + ")) {\n  " + change + " = true;\n  " + addRecord + "\n  " + oldValue + " = " + newValue + ";\n}\n" + notify + "\n");
  }
  function assignmentTemplate(field, value) {
    return (field + " = " + value + ";");
  }
  function propertyReadTemplate(name, context, newValue) {
    return ("\n" + TEMP_LOCAL + " = " + UTIL + ".findContext(\"" + name + "\", " + context + ");\nif (" + TEMP_LOCAL + " instanceof ContextWithVariableBindings) {\n  " + newValue + " = " + TEMP_LOCAL + ".get('" + name + "');\n} else {\n  " + newValue + " = " + TEMP_LOCAL + "." + name + ";\n}\n");
  }
  function localDefinitionsTemplate(names) {
    return names.map((function(n) {
      return ("var " + n + ";");
    })).join("\n");
  }
  function changeDefinitionsTemplate(names) {
    return names.map((function(n) {
      return ("var " + n + " = false;");
    })).join("\n");
  }
  function fieldDefinitionsTemplate(names) {
    return names.map((function(n) {
      return (n + " = " + UTIL + ".unitialized();");
    })).join("\n");
  }
  function ifChangedGuardTemplate(changeNames, body) {
    var cond = changeNames.join(" || ");
    return ("\nif (" + cond + ") {\n  " + body + "\n}\n");
  }
  function addSimpleChangeRecordTemplate(protoIndex, oldValue, newValue) {
    return (CHANGES_LOCAL + " = " + UTIL + ".addRecord(" + CHANGES_LOCAL + ",\n    " + UTIL + ".simpleChangeRecord(" + PROTOS_ACCESSOR + "[" + protoIndex + "].bindingMemento, " + oldValue + ", " + newValue + "));");
  }
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      Type = $__m.Type;
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
    }],
    execute: function() {
      ABSTRACT_CHANGE_DETECTOR = "AbstractChangeDetector";
      UTIL = "ChangeDetectionUtil";
      DISPATCHER_ACCESSOR = "this.dispatcher";
      FORMATTERS_ACCESSOR = "this.formatters";
      PROTOS_ACCESSOR = "this.protos";
      CHANGE_LOCAL = "change";
      CHANGES_LOCAL = "changes";
      TEMP_LOCAL = "temp";
      Object.defineProperty(typeTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(constructorTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(setContextTemplate, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(detectChangesTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(bodyTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(notifyTemplate, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(structuralCheckTemplate, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(assignmentTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(propertyReadTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(localDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(changeDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(fieldDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(ifChangedGuardTemplate, "parameters", {get: function() {
          return [[List], [assert.type.string]];
        }});
      Object.defineProperty(addSimpleChangeRecordTemplate, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string], [assert.type.string]];
        }});
      ChangeDetectorJITGenerator = $__export("ChangeDetectorJITGenerator", (function() {
        var ChangeDetectorJITGenerator = function ChangeDetectorJITGenerator(typeName, records) {
          this.typeName = typeName;
          this.records = records;
          this.localNames = this.getLocalNames(records);
          this.changeNames = this.getChangeNames(this.localNames);
          this.fieldNames = this.getFieldNames(this.localNames);
        };
        return ($traceurRuntime.createClass)(ChangeDetectorJITGenerator, {
          getLocalNames: function(records) {
            var index = 0;
            var names = records.map((function(r) {
              var sanitizedName = r.name.replace(new RegExp("\\W", "g"), '');
              return ("" + sanitizedName + index++);
            }));
            return ["context"].concat(names);
          },
          getChangeNames: function(localNames) {
            return localNames.map((function(n) {
              return ("change_" + n);
            }));
          },
          getFieldNames: function(localNames) {
            return localNames.map((function(n) {
              return ("this." + n);
            }));
          },
          generate: function() {
            var text = typeTemplate(this.typeName, this.genConstructor(), this.genDetectChanges(), this.genSetContext());
            return new Function('AbstractChangeDetector', 'ChangeDetectionUtil', 'ContextWithVariableBindings', 'protos', text)(AbstractChangeDetector, ChangeDetectionUtil, ContextWithVariableBindings, this.records);
          },
          genConstructor: function() {
            return constructorTemplate(this.typeName, fieldDefinitionsTemplate(this.fieldNames));
          },
          genSetContext: function() {
            return setContextTemplate(this.typeName);
          },
          genDetectChanges: function() {
            var body = this.genBody();
            return detectChangesTemplate(this.typeName, body);
          },
          genBody: function() {
            var $__0 = this;
            var rec = this.records.map((function(r) {
              return $__0.genRecord(r);
            })).join("\n");
            return bodyTemplate(this.genLocalDefinitions(), this.genChangeDefinitions(), rec);
          },
          genLocalDefinitions: function() {
            return localDefinitionsTemplate(this.localNames);
          },
          genChangeDefinitions: function() {
            return changeDefinitionsTemplate(this.changeNames);
          },
          genRecord: function(r) {
            if (r.mode == RECORD_TYPE_STRUCTURAL_CHECK) {
              return this.getStructuralCheck(r);
            } else {
              return this.genReferenceCheck(r);
            }
          },
          getStructuralCheck: function(r) {
            var field = this.fieldNames[r.selfIndex];
            var context = this.localNames[r.contextIndex];
            return structuralCheckTemplate(r.selfIndex - 1, field, context, this.genNotify(r));
          },
          genReferenceCheck: function(r) {
            var newValue = this.localNames[r.selfIndex];
            var oldValue = this.fieldNames[r.selfIndex];
            var change = this.changeNames[r.selfIndex];
            var assignment = this.genUpdateCurrentValue(r);
            var addRecord = addSimpleChangeRecordTemplate(r.selfIndex - 1, oldValue, newValue);
            var notify = this.genNotify(r);
            var check = referenceCheckTemplate(assignment, newValue, oldValue, change, r.lastInBinding ? addRecord : '', notify);
            ;
            if (r.isPureFunction()) {
              return this.ifChangedGuard(r, check);
            } else {
              return check;
            }
          },
          genUpdateCurrentValue: function(r) {
            var context = this.localNames[r.contextIndex];
            var newValue = this.localNames[r.selfIndex];
            var args = this.genArgs(r);
            switch (r.mode) {
              case RECORD_TYPE_SELF:
                return assignmentTemplate(newValue, context);
              case RECORD_TYPE_CONST:
                return (newValue + " = " + this.genLiteral(r.funcOrValue));
              case RECORD_TYPE_PROPERTY:
                if (r.contextIndex == 0) {
                  return propertyReadTemplate(r.name, context, newValue);
                } else {
                  return assignmentTemplate(newValue, (context + "." + r.name));
                }
              case RECORD_TYPE_INVOKE_METHOD:
                return assignmentTemplate(newValue, (context + "." + r.name + "(" + args + ")"));
              case RECORD_TYPE_INVOKE_CLOSURE:
                return assignmentTemplate(newValue, (context + "(" + args + ")"));
              case RECORD_TYPE_PRIMITIVE_OP:
                return assignmentTemplate(newValue, (UTIL + "." + r.name + "(" + args + ")"));
              case RECORD_TYPE_INTERPOLATE:
                return assignmentTemplate(newValue, this.genInterpolation(r));
              case RECORD_TYPE_INVOKE_FORMATTER:
                return assignmentTemplate(newValue, (FORMATTERS_ACCESSOR + ".get(\"" + r.name + "\")(" + args + ")"));
              case RECORD_TYPE_KEYED_ACCESS:
                var key = this.localNames[r.args[0]];
                return assignmentTemplate(newValue, (context + "[" + key + "]"));
              default:
                throw new BaseException(("Unknown operation " + r.mode));
            }
          },
          ifChangedGuard: function(r, body) {
            var $__0 = this;
            return ifChangedGuardTemplate(r.args.map((function(a) {
              return $__0.changeNames[a];
            })), body);
          },
          genInterpolation: function(r) {
            var res = "";
            for (var i = 0; i < r.args.length; ++i) {
              res += this.genLiteral(r.fixedArgs[i]);
              res += " + ";
              res += this.localNames[r.args[i]];
              res += " + ";
            }
            res += this.genLiteral(r.fixedArgs[r.args.length]);
            return res;
          },
          genLiteral: function(value) {
            return JSON.stringify(value);
          },
          genNotify: function(r) {
            return r.lastInDirective ? notifyTemplate(r.selfIndex - 1) : '';
          },
          genArgs: function(r) {
            var $__0 = this;
            return r.args.map((function(arg) {
              return $__0.localNames[arg];
            })).join(", ");
          }
        }, {});
      }()));
      Object.defineProperty(ChangeDetectorJITGenerator, "parameters", {get: function() {
          return [[assert.type.string], [assert.genericType(List, ProtoRecord)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getLocalNames, "parameters", {get: function() {
          return [[assert.genericType(List, ProtoRecord)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getChangeNames, "parameters", {get: function() {
          return [[assert.genericType(List, String)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getFieldNames, "parameters", {get: function() {
          return [[assert.genericType(List, String)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genRecord, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getStructuralCheck, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genReferenceCheck, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genUpdateCurrentValue, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.ifChangedGuard, "parameters", {get: function() {
          return [[ProtoRecord], [assert.type.string]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genInterpolation, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genArgs, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/change_detection/change_detection_jit_generator.map

//# sourceMappingURL=../../../angular2/src/change_detection/change_detection_jit_generator.js.map