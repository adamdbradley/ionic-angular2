System.register(["angular2/src/facade/lang", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/src/reflection/reflection", "angular2/change_detection", "../../annotations/annotations", "../directive_metadata", "../view", "../element_injector", "../element_binder", "./compile_step", "./compile_element", "./compile_control"], function($__export) {
  "use strict";
  var int,
      isPresent,
      isBlank,
      Type,
      BaseException,
      StringWrapper,
      RegExpWrapper,
      isString,
      stringify,
      Element,
      DOM,
      ListWrapper,
      List,
      MapWrapper,
      StringMapWrapper,
      reflector,
      Parser,
      ProtoChangeDetector,
      Component,
      Directive,
      DirectiveMetadata,
      ProtoView,
      ElementPropertyMemento,
      DirectivePropertyMemento,
      ProtoElementInjector,
      ElementBinder,
      CompileStep,
      CompileElement,
      CompileControl,
      DOT_REGEXP,
      ARIA_PREFIX,
      ariaSettersCache,
      CLASS_PREFIX,
      classSettersCache,
      STYLE_PREFIX,
      styleSettersCache,
      ROLE_ATTR,
      ElementBinderBuilder;
  function ariaSetterFactory(attrName) {
    var setterFn = StringMapWrapper.get(ariaSettersCache, attrName);
    if (isBlank(setterFn)) {
      setterFn = function(element, value) {
        if (isPresent(value)) {
          DOM.setAttribute(element, attrName, stringify(value));
        } else {
          DOM.removeAttribute(element, attrName);
        }
      };
      StringMapWrapper.set(ariaSettersCache, attrName, setterFn);
    }
    return setterFn;
  }
  function classSetterFactory(className) {
    var setterFn = StringMapWrapper.get(classSettersCache, className);
    if (isBlank(setterFn)) {
      setterFn = function(element, value) {
        if (value) {
          DOM.addClass(element, className);
        } else {
          DOM.removeClass(element, className);
        }
      };
      StringMapWrapper.set(classSettersCache, className, setterFn);
    }
    return setterFn;
  }
  function styleSetterFactory(styleName, stylesuffix) {
    var cacheKey = styleName + stylesuffix;
    var setterFn = StringMapWrapper.get(styleSettersCache, cacheKey);
    if (isBlank(setterFn)) {
      setterFn = function(element, value) {
        var valAsStr;
        if (isPresent(value)) {
          valAsStr = stringify(value);
          DOM.setStyle(element, styleName, valAsStr + stylesuffix);
        } else {
          DOM.removeStyle(element, styleName);
        }
      };
      StringMapWrapper.set(classSettersCache, cacheKey, setterFn);
    }
    return setterFn;
  }
  function roleSetter(element, value) {
    if (isString(value)) {
      DOM.setAttribute(element, ROLE_ATTR, value);
    } else {
      DOM.removeAttribute(element, ROLE_ATTR);
      if (isPresent(value)) {
        throw new BaseException("Invalid role attribute, only string values are allowed, got '" + stringify(value) + "'");
      }
    }
  }
  return {
    setters: [function($__m) {
      int = $__m.int;
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      Type = $__m.Type;
      BaseException = $__m.BaseException;
      StringWrapper = $__m.StringWrapper;
      RegExpWrapper = $__m.RegExpWrapper;
      isString = $__m.isString;
      stringify = $__m.stringify;
    }, function($__m) {
      Element = $__m.Element;
      DOM = $__m.DOM;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      List = $__m.List;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      Parser = $__m.Parser;
      ProtoChangeDetector = $__m.ProtoChangeDetector;
    }, function($__m) {
      Component = $__m.Component;
      Directive = $__m.Directive;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      ProtoView = $__m.ProtoView;
      ElementPropertyMemento = $__m.ElementPropertyMemento;
      DirectivePropertyMemento = $__m.DirectivePropertyMemento;
    }, function($__m) {
      ProtoElementInjector = $__m.ProtoElementInjector;
    }, function($__m) {
      ElementBinder = $__m.ElementBinder;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }],
    execute: function() {
      DOT_REGEXP = RegExpWrapper.create('\\.');
      ARIA_PREFIX = 'aria-';
      ariaSettersCache = StringMapWrapper.create();
      Object.defineProperty(ariaSetterFactory, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      CLASS_PREFIX = 'class.';
      classSettersCache = StringMapWrapper.create();
      Object.defineProperty(classSetterFactory, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      STYLE_PREFIX = 'style.';
      styleSettersCache = StringMapWrapper.create();
      Object.defineProperty(styleSetterFactory, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      ROLE_ATTR = 'role';
      Object.defineProperty(roleSetter, "parameters", {get: function() {
          return [[Element], []];
        }});
      ElementBinderBuilder = $__export("ElementBinderBuilder", (function($__super) {
        var ElementBinderBuilder = function ElementBinderBuilder(parser, compilationUnit) {
          $traceurRuntime.superConstructor(ElementBinderBuilder).call(this);
          this._parser = parser;
          this._compilationUnit = compilationUnit;
        };
        return ($traceurRuntime.createClass)(ElementBinderBuilder, {
          process: function(parent, current, control) {
            var elementBinder = null;
            if (current.hasBindings) {
              var protoView = current.inheritedProtoView;
              var protoInjectorWasBuilt = isBlank(parent) ? true : current.inheritedProtoElementInjector !== parent.inheritedProtoElementInjector;
              var currentProtoElementInjector = protoInjectorWasBuilt ? current.inheritedProtoElementInjector : null;
              elementBinder = protoView.bindElement(currentProtoElementInjector, current.componentDirective, current.viewportDirective);
              if (isPresent(current.textNodeBindings)) {
                this._bindTextNodes(protoView, current);
              }
              if (isPresent(current.propertyBindings)) {
                this._bindElementProperties(protoView, current);
              }
              if (isPresent(current.eventBindings)) {
                this._bindEvents(protoView, current);
              }
              this._bindDirectiveProperties(current.getAllDirectives(), current);
            } else if (isPresent(parent)) {
              elementBinder = parent.inheritedElementBinder;
            }
            current.inheritedElementBinder = elementBinder;
          },
          _bindTextNodes: function(protoView, compileElement) {
            MapWrapper.forEach(compileElement.textNodeBindings, (function(expression, indexInParent) {
              protoView.bindTextNode(indexInParent, expression);
            }));
          },
          _bindElementProperties: function(protoView, compileElement) {
            MapWrapper.forEach(compileElement.propertyBindings, (function(expression, property) {
              var setterFn,
                  styleParts,
                  styleSuffix;
              if (StringWrapper.startsWith(property, ARIA_PREFIX)) {
                setterFn = ariaSetterFactory(property);
              } else if (StringWrapper.equals(property, ROLE_ATTR)) {
                setterFn = roleSetter;
              } else if (StringWrapper.startsWith(property, CLASS_PREFIX)) {
                setterFn = classSetterFactory(StringWrapper.substring(property, CLASS_PREFIX.length));
              } else if (StringWrapper.startsWith(property, STYLE_PREFIX)) {
                styleParts = StringWrapper.split(property, DOT_REGEXP);
                styleSuffix = styleParts.length > 2 ? ListWrapper.get(styleParts, 2) : '';
                setterFn = styleSetterFactory(ListWrapper.get(styleParts, 1), styleSuffix);
              } else if (DOM.hasProperty(compileElement.element, property)) {
                setterFn = reflector.setter(property);
              }
              if (isPresent(setterFn)) {
                protoView.bindElementProperty(expression.ast, property, setterFn);
              }
            }));
          },
          _bindEvents: function(protoView, compileElement) {
            MapWrapper.forEach(compileElement.eventBindings, (function(expression, eventName) {
              protoView.bindEvent(eventName, expression);
            }));
          },
          _bindDirectiveProperties: function(directives, compileElement) {
            var protoView = compileElement.inheritedProtoView;
            for (var directiveIndex = 0; directiveIndex < directives.length; directiveIndex++) {
              var directive = ListWrapper.get(directives, directiveIndex);
              var annotation = directive.annotation;
              if (isBlank(annotation.bind))
                continue;
              var _this = this;
              StringMapWrapper.forEach(annotation.bind, function(dirProp, elProp) {
                var expression = isPresent(compileElement.propertyBindings) ? MapWrapper.get(compileElement.propertyBindings, elProp) : null;
                if (isBlank(expression)) {
                  var attributeValue = MapWrapper.get(compileElement.attrs(), elProp);
                  if (isPresent(attributeValue)) {
                    expression = _this._parser.wrapLiteralPrimitive(attributeValue, _this._compilationUnit);
                  } else {
                    throw new BaseException("No element binding found for property '" + elProp + "' which is required by directive '" + stringify(directive.type) + "'");
                  }
                }
                var len = dirProp.length;
                var dirBindingName = dirProp;
                var isContentWatch = dirProp[len - 2] === '[' && dirProp[len - 1] === ']';
                if (isContentWatch)
                  dirBindingName = dirProp.substring(0, len - 2);
                protoView.bindDirectiveProperty(directiveIndex, expression, dirBindingName, reflector.setter(dirBindingName), isContentWatch);
              });
            }
          }
        }, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(ElementBinderBuilder, "parameters", {get: function() {
          return [[Parser], [assert.type.any]];
        }});
      Object.defineProperty(ElementBinderBuilder.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      Object.defineProperty(ElementBinderBuilder.prototype._bindDirectiveProperties, "parameters", {get: function() {
          return [[assert.genericType(List, DirectiveMetadata)], [CompileElement]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/pipeline/element_binder_builder.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/pipeline/element_binder_builder.js.map