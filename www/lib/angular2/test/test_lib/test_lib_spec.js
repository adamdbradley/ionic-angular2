System.register(["angular2/test_lib", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var describe,
      it,
      iit,
      ddescribe,
      expect,
      tick,
      async,
      SpyObject,
      beforeEach,
      proxy,
      MapWrapper,
      ListWrapper,
      PromiseWrapper,
      IMPLEMENTS,
      TestObj,
      SpyTestObj;
  function main() {
    describe('test_lib', (function() {
      describe('equality', (function() {
        it('should structurally compare objects', (function() {
          var expected = new TestObj(new TestObj({'one': [1, 2]}));
          var actual = new TestObj(new TestObj({'one': [1, 2]}));
          var falseActual = new TestObj(new TestObj({'one': [1, 3]}));
          expect(actual).toEqual(expected);
          expect(falseActual).not.toEqual(expected);
        }));
        it('should work for arrays of string maps', (function() {
          expect([{'a': 'b'}]).toEqual([{'a': 'b'}]);
        }));
        it('should work for arrays of real maps', (function() {
          expect([MapWrapper.createFromStringMap({'a': 'b'})]).toEqual([MapWrapper.createFromStringMap({'a': 'b'})]);
          expect([MapWrapper.createFromStringMap({'a': 'b'})]).not.toEqual([MapWrapper.createFromStringMap({'a': 'c'})]);
        }));
      }));
      describe('toEqual for Maps', (function() {
        it('should detect equality for same reference', (function() {
          var m1 = MapWrapper.createFromStringMap({'a': 1});
          expect(m1).toEqual(m1);
        }));
        it('should detect equality for same content', (function() {
          expect(MapWrapper.createFromStringMap({'a': 1})).toEqual(MapWrapper.createFromStringMap({'a': 1}));
        }));
        it('should detect missing entries', (function() {
          expect(MapWrapper.createFromStringMap({'a': 1})).not.toEqual(MapWrapper.createFromStringMap({}));
        }));
        it('should detect different values', (function() {
          expect(MapWrapper.createFromStringMap({'a': 1})).not.toEqual(MapWrapper.createFromStringMap({'a': 2}));
        }));
        it('should detect additional entries', (function() {
          expect(MapWrapper.createFromStringMap({'a': 1})).not.toEqual(MapWrapper.createFromStringMap({
            'a': 1,
            'b': 1
          }));
        }));
      }));
      describe("spy objects", (function() {
        var spyObj;
        beforeEach((function() {
          spyObj = new SpyTestObj();
        }));
        it("should pass the runtime check", (function() {
          var t = spyObj;
          expect(t).toBeDefined();
        }));
        it("should return a new spy func with no calls", (function() {
          expect(spyObj.spy("someFunc")).not.toHaveBeenCalled();
        }));
        it("should record function calls", (function() {
          spyObj.spy("someFunc").andCallFake((function(a, b) {
            return a + b;
          }));
          expect(spyObj.someFunc(1, 2)).toEqual(3);
          expect(spyObj.spy("someFunc")).toHaveBeenCalledWith(1, 2);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      ddescribe = $__m.ddescribe;
      expect = $__m.expect;
      tick = $__m.tick;
      async = $__m.async;
      SpyObject = $__m.SpyObject;
      beforeEach = $__m.beforeEach;
      proxy = $__m.proxy;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      IMPLEMENTS = $__m.IMPLEMENTS;
    }],
    execute: function() {
      TestObj = (function() {
        var TestObj = function TestObj(prop) {
          this.prop = prop;
        };
        return ($traceurRuntime.createClass)(TestObj, {}, {});
      }());
      SpyTestObj = (function($__super) {
        var SpyTestObj = function SpyTestObj() {
          $traceurRuntime.superConstructor(SpyTestObj).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(SpyTestObj, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, SpyTestObj.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(SpyTestObj, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(TestObj)];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/test_lib/test_lib_spec.map

//# sourceMappingURL=../../../angular2/test/test_lib/test_lib_spec.js.map