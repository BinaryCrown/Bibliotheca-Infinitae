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
            return new Num(i, c);
        }

        constructor(index, number) {
            if (!(number instanceof Number)) {
                throw "Input to Hardy hierarchy invalid."
            }
            else {
                this.index = Ord(index);
                this.number = number;
            }
        }
    }
})(this);