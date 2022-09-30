// A large number library which uses Cantor normal form and the Hardy hierarchy to store numbers up to H_e0(900719925474099)
// Generalizes hardy-hierarchy.py by adding more methods.

(function (globalScope) {
    "use strict";
  
    class Ordinal {
        static Ord(e) {
            return new Ordinal(e);
        }
      
        constructor(expression) {
            this.exponents = null;
            this.coefficients = null;
        }
    }

    class Num {
        static Inf(i, n) {
            return new Num(i, n);
        }

        constructor(indexes, number) {
            if (!(number instanceof Number)) {
                throw "Input to Hardy hierarchy invalid."
            }
            else {
                for (let i = 0; i < indexes.length; i++) {
                    this.indexes.push(Ord(indexes[i]));
                }
                this.number = number;
            }
        }
    }
    Num.prototype.add = function (i, n) {
    // H_n(m)*2 = H_w(H_n(m))
    }
})(this);