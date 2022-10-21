/*
Uses BNF-based trivariate Ackermann to represent numbers up to A_p0(W_10)(9007199254740991)
Each number is written as A_S(m,n) where A is a transfinite extension of the trivariate Ackermann function via EBPF and m,n are hereditarily represented.
We have A_S(m1,n1) + A_T(m2,n1) = A_0(A_S(m1,n1), A_T(m2,n1)) and A_S(m1,n1) * A_T(m2,n1) = A_1(A_S(m1,n1), A_T(m2,n1)).
Thus it is an overall improvement of Infinitae in terms of power and how easy it is to program.

Definition of A:

A_0(n,m) = n+m
A_1(n,0) = 0
For p >= 2, A_p(n,0) = 1
For m > 0, A_p+1(n,m) = A_p(n,A_p+1(n,m-1))
For limit p and m > 0, A_p(n,m) = A_p[m](n,n)
*/

(function (globalScope) {
    class Ordinal {
        static Ord(e) {
            return new Ordinal(e)
        }
      
        constructor(expression) {
            let arr = expression.split("+")
            if (arr.length == 1) {
                arr = arr[0]
                if (arr == "0") {
                    this.type = 0                  // Type 0: zero, type 1: sum, type 2: principal
                    this.index = null              // Index is null if not of type 2.
                    this.summands = null           // Summands is null if not of type 1/
                    this.input = null              // Input is null if not of type 2
                }
                else {
                    narr = arr.split("ψ")
                    narr.shift()
                    for (let i = 0 i < narr.length i++) {
                        arr[i] = narr[i].split("(")
                    }
                    arr = narr.flat()
                    this.type = 2
                    this.index = +narr[0]
                    this.summands = null
                    str = arr[0].split("")
                    str.shift()
                    str.shift()
                    str.shift()
                    str.pop()
                    str = str.join("")
                    this.input = Ord(str)
                }   
            }
            else {
                this.type = 1
                this.index = null
                arr.shift()
                this.summands = arr
                this.input = null
            }
        }
    }

    class Num {
        constructor(expression) {
            switch (typeof expression) {
                case 'number':
                    ar = expression % 2
                    if (ar == 1) {
                        if (expression == 1) {
                            this.isz = false
                            this.e = new Ordinal(2)
                            this.n = new Num(0)
                            this.m = new Num(0)
                            // I did the forbidden and defined 1 as 0^0. Please forgive me.
                        }
                        if (expression > 1) {
                            this.isz = false
                            this.e = new Ordinal(0)
                            this.n = new Num(expression-1)
                            this.m = new Num(1)
                        } 
                    }
                    if (ar == 0) {
                        if (expression == 0) {
                            this.isz = true
                            this.e = null
                            this.n = null
                            this.m = null
                        }
                    }
                case 'string':
                    index = expression.split("{")[1].split("}")[0]
                    inputs = expression.split("{")[1].split("}")[1].split("(")[1].split(")")[0]
                    leftinput = inputs.split(",")[0]
                    rightinput = inputs.split(",")[1]
                    this.isz = (Number(index) == 0 && Number(leftinput) == 0 && Number(rightinput) == 0) || (Number(index) == 1 && Number(rightinput) == 0)
                    // I'll handle the case when index is a limit ordinal later
                    this.e = new Ordinal(index)
                    this.n = new Num(leftinput)
                    this.m = new Num(rightinput)
                case 'bool':
                    return new Num(+ bool)
                case 'undefined':
                    return new Num(0)
                case 'object':
                    if (expression.isArray()) {

                    }
                    if (expression instanceof Num) {

                    }
                    if (expression instanceof Ordinal) {

                    }
                    if (expression instanceof Rational) {

                    }
                    else {
                        throw "Invalid constructor."
                    }
            }
        }
    }

    class Rational {

    }
})(this)