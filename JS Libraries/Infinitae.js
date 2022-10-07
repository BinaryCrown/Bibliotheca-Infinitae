// A large number library which uses Buchholz's psi function and the SGH to store numbers up to g_BO(900719925474099)

(function (globalScope) {
    "use strict";
  
    class Ordinal {
        static Ord(e) {
            return new Ordinal(e);
        }
      
        constructor(expression) {
            let arr = expression.split("+");
            if (arr.length == 1) {
                arr = arr[0];
                if (arr == "0") {
                    this.type = 0;                  // Type 0: zero, type 1: sum, type 2: principal
                    this.index = null;              // Index is null if not of type 2.
                    this.summands = null;           // Summands is null if not of type 1/
                    this.input = null;              // Input is null if not of type 2
                }
                else {
                    narr = arr.split("ψ");
                    narr.shift();
                    for (let i = 0; i < narr.length; i++) {
                        arr[i] = narr[i].split("(");
                    }
                    arr = narr.flat();
                    this.type = 2;
                    this.index = +narr[0];
                    this.summands = null;
                    str = arr[0].split("");
                    str.shift();
                    str.shift();
                    str.shift();
                    str.pop();
                    str = str.join("");
                    this.input = Ord(str);
                }   
            }
            else {
                this.type = 1;
                this.index = null;
                arr.shift();
                this.summands = arr;
                this.input = null;
            }
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