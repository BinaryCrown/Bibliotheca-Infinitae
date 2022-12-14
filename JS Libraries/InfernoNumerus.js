// A large number library which uses logarithms to store numbers up to 10^^900719925474099.
// Some significant accuracy is sacrificed if the number is small enough (less than 10^^100), however.
// Some snippets of code e.g. Inferno.prototype.mod were borrowed from aarextiaokhiao/magna_numerus.js/logarithmica_numerus_lite.js

(function (globalScope) {
    "use strict";
  
    var tetrate = (a, b) => {
      if (b == 1) {
        return a;
      } else {
        return a ** tetrate(a, b - 1);
      }
    };
  
    class Inferno {
      static Inf(v) {
        return new Inferno(v);
      }
  
      constructor(v) {
        if (v == null) {
          this.log = Number.NEGATIVE_INFINITY;
          this.val = 0;
        }
        if (v instanceof Inferno) {
          this.log = v.log;
          this.val = v.val;
        } else if (typeof v == "string") {
          let parts = v.split("e");
          if (parts.length == 1) {
            // If there is no e, store the logarithm.
            this.log = Math.log10(v);
            this.val = v;
          } else if (parts[0].length == 0) {
            // If the e is the first character, store the number itself.
            this.val = this.log = Number(v.slice(1));
          } else {
            if (v.slice(0, v.indexOf("e")) == 1) {
              this.val = this.log = Number(
                new Inferno(v.slice(v.indexOf("e") + 1)).val
              );
            }
          }
        } else if (typeof v == "number") {
          this.log = Math.log10(v);
          this.val = v;
        } else {
          this.log = Number.NEGATIVE_INFINITY;
          this.val = 0;
        }
      }
  
      static fromNum(v) {
        let temp = new Inferno();
        temp.log = Math.log10(v);
        temp.val = v;
        return temp;
      }
  
      static fromString(v) {
        let temp = new Inferno();
        let parts = v.split("e");
        if (parts.length == 1) {
          // If there is no e, store the logarithm.
          temp.log = Math.log10(v);
          temp.val = v;
        } else if (parts[0].length == 0) {
          // If the e is the first character, store the number itself.
          temp.val = temp.log = Number(v.slice(1));
        } else {
          if (v.slice(0, v.indexOf("e")) == 1) {
            temp.val = temp.log = Number(
              new Inferno(v.slice(v.indexOf("e") + 1)).val
            );
          }
        }
        return temp;
      }
      static fromArray(v) {
        // [A] = A, [A, B] = AeB, [A, B, C] = AeBeC, etc.
        let str = v[0];
        v = v.splice(0, 1);
        for (let j in v) {
          str.concat("e" + j);
        }
        return Inferno.fromString(str);
      }
  
      static toString(v) {
        v = new Inferno(v);
        if (v.log == Number.NEGATIVE_INFINITY) {
          return "0";
        }
        if (v.log == Number.POSITIVE_INFINITY) {
          return "Infinity";
        }
        if (v.log >= 1e21 || v.log <= -1e21) {
          return "e" + toString(v.log);
        }
        if (v.log >= 21 || v.log < -6) {
          return (
            (10 ** (v.log - Math.floor(v.log))).toString() +
            "e" +
            Math.floor(v.log)
          );
        } else {
          return (10 ** v.log).toString();
        }
      }
  
      toString() {
        return Inferno.toString(this);
      }
  
      static toNumber(v) {
        v = new Inferno(v);
        if (this.IsInf()) {
          return Number.POSITIVE_INFINITY;
        }
        if (this.IsZero()) {
          return 0;
        } else {
          return 10 ** v.log;
        }
      }
  
      toNumber() {
        return Inferno.toNumber(this);
      }
    }
    Inferno.prototype.add = function (v) {
      v = new Inferno(v);
      var logdiff = this.log - v.log;
      if (logdiff >= 15 || v.l == Number.NEGATIVE_INFINITY) {
        return this;
      }
      if (logdiff <= -15 || this.l == Number.NEGATIVE_INFINITY) {
        return v;
      }
      v.log += Math.log10(1 + 10 ** logdiff);
      v.val = v.log;
      return v;
    };
    Inferno.prototype.sub = function (v) {
      v = new Inferno(v);
      let logdiff = this.log - v.log;
      if (logdiff < 0) {
        this.log = Number.NEGATIVE_INFINITY;
        this.val = 0;
        return this;
      }
      if (logdiff >= 15 || v.log == Number.NEGATIVE_INFINITY) {
        return this;
      }
      this.log += Math.log10(1 - 10 ** -logdiff);
      this.val = this.log;
      return this;
    };
    Inferno.prototype.mul = function (v) {
      v = new Inferno(v);
      this.log += v.log;
      this.val *= v.val;
      return this;
    };
    Inferno.prototype.div = function (v) {
      v = new Inferno(v);
      if (
        (this.log == Number.POSITIVE_INFINITY ||
          this.log == Number.NEGATIVE_INFINITY) &&
        v.log == this.log
      ) {
        this.log = Number.NEGATIVE_INFINITY;
        this.val = 0;
        return this;
      }
      this.log -= v.log;
      this.val /= v.val;
      return this;
    };
    Inferno.prototype.pow = function (v) {
      this.log *= v;
      this.val **= v;
      return this;
    };
    Inferno.prototype.mod = function (v) {
      v = new Inferno(v);
      if (
        (this.log == Number.POSITIVE_INFINITY ||
          this.log == Number.NEGATIVE_INFINITY) &&
        v.log == this.log
      ) {
        this.log = Number.NEGATIVE_INFINITY;
        this.val = 0;
        return this;
      }
      var logdiff = this.log - v.log;
      if (logdiff < 0) {
        return this;
      }
      if (logdiff >= 15 || logdiff == 0) {
        v.log = Number.NEGATIVE_INFINITY;
      } else {
        var modulo = 10 ** logdiff;
        var modInt = Math.floor(modulo);
        if (modulo == modInt) {
          v.log = Number.NEGATIVE_INFINITY;
        } else {
          v.log += Math.log10(modulo - modInt);
          v.val = v.log;
        }
      }
      return v;
    };
    Inferno.prototype.inv = function () {
      this.log = -this.log;
      this.val = 1 / this.val;
      return this;
    };
    Inferno.prototype.eq = function (v) {
      v = new Inferno(v);
      return this.log == v.log;
    };
    Inferno.prototype.ex = function (v) {
      v = new Inferno(v);
      return this.log === v.log;
    };
    Inferno.prototype.gt = function (v) {
      v = new Inferno(v);
      return this.log > v.log;
    };
    Inferno.prototype.gte = function (v) {
      v = new Inferno(v);
      return this.log >= v.log;
    };
    Inferno.prototype.lt = function (v) {
      v = new Inferno(v);
      return this.log < v.log;
    };
    Inferno.prototype.lte = function (v) {
      v = new Inferno(v);
      return this.log <= v.log;
    };
    Inferno.prototype.bool = function () {
      if (
        this.log == Number.NEGATIVE_INFINITY ||
        this == null ||
        this == undefined
      ) {
        return false;
      }
      return true;
    };
    Inferno.prototype.IsInf = function () {
      let z = [Number.MAX_SAFE_INTEGER];
      for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
        z.push(10);
      }
      let k = Inferno.fromArray(z);
      return this.log <= k.log();
    };
    Inferno.prototype.IsZero = function () {
      let z = [Number.MAX_SAFE_INTEGER];
      for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
        z.push(10);
      }
      let k = Inferno.fromArray(z);
      return this.log <= -k;
    };
    Inferno.prototype.bas = function (v) {
      v = new Inferno(v);
      v.log *= this.val;
      v.val **= this.val;
      return v;
    };
    Inferno.prototype.neg = function (v = this.zero) {
      v = new Inferno(v);
      var logdiff = v.log - this.log;
      if (logdiff < 0) {
        v.log = Number.NEGATIVE_INFINITY;
        return v;
      }
      if (logdiff >= 15 || this.log == Number.NEGATIVE_INFINITY) {
        return v;
      }
      v.log += Math.log10(1 - 10 ** -logdiff);
      v.val = v.log;
      return v;
    };
    Inferno.prototype.doub = function () {
      return this.mul(2);
    };
    Inferno.prototype.trip = function () {
      return this.mul(3);
    };
    Inferno.prototype.half = function () {
      return this.mul(1 / 2);
    };
    Inferno.prototype.third = function () {
      return this.mul(1 / 3);
    };
    Inferno.prototype.sqr = function () {
      return this.pow(2);
    };
    Inferno.prototype.cb = function () {
      return this.pow(3);
    };
    Inferno.prototype.nroot = function (v) {
      return this.pow(1 / v);
    };
    Inferno.prototype.sqrt = function () {
      return this.nroot(2);
    };
    Inferno.prototype.cbrt = function () {
      return this.nroot(3);
    };
    Inferno.prototype.log = function () {
      return new Inferno(this.log);
    };
    Inferno.prototype.ln = function () {
      return new Inferno(Math.log(this.val));
    };
    Inferno.prototype.log2 = function () {
      return new Inferno(Math.log2(this.val));
    };
    Inferno.prototype.logb = function (v) {
      return new Inferno(Math.log(this.val) / Math.log(v));
    };
    Inferno.prototype.logbr = function (v) {
      return new Inferno(Math.log(v) / Math.log(this.val));
    };
    Inferno.prototype.floor = function (v = 1) {
      return new Inferno(Math.floor(this.val / v) * v);
    };
    Inferno.prototype.round = function (v = 1) {
      return new Inferno(Math.round(this.val / v) * v);
    };
    Inferno.prototype.ceil = function (v = 1) {
      return new Inferno(Math.ceil(this.val / v) * v);
    };
    Inferno.prototype.ran = function (v = 0) {
      return new Inferno(Math.random() * (this.val - v) + v);
    };
    Inferno.prototype.sign = function () {
      return new Inferno(Math.sign(this.val));
    };
    Inferno.prototype.abs = function () {
      return new Inferno(Math.abs(this.val));
    };
    Inferno.prototype.num = function () {
      return this.toNumber();
    };
    Inferno.prototype.neq = function (v) {
      return !this.eq(v);
    };
    Inferno.prototype.nex = function (v) {
      return !this.ex(v);
    };
    Inferno.prototype.min = function (v) {
      return this.lt(v) ? this : v;
    };
    Inferno.prototype.max = function (v) {
      return this.gt(v) ? this : v;
    };
  
    // CONSTANTS
  
    Inferno.prototype.zero = new Inferno(0);
    Inferno.prototype.one = new Inferno(1);
    Inferno.prototype.E = new Inferno(Math.E);
    Inferno.prototype.LN2 = new Inferno(Math.LN2);
    Inferno.prototype.LN10 = new Inferno(Math.LN10);
    Inferno.prototype.LOG2E = new Inferno(Math.LOG2E);
    Inferno.prototype.LOG10E = new Inferno(Math.LOG10E);
    Inferno.prototype.PI = new Inferno(Math.PI);
    Inferno.prototype.SQRT1_2 = new Inferno(Math.SQRT1_2);
    Inferno.prototype.SQRT2 = new Inferno(Math.SQRT2);
    Inferno.prototype.POSITIVE_INFINITY = new Inferno(Math.POSITIVE_INFINITY);
  })(this);
  