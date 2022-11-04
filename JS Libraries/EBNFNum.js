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
                    for (let i = 0; i < narr.length; i++) {
                        arr[i] = narr[i].split("(")
                    }
                    arr = narr.flat()
                    this.type = 2
                    this.index = +narr[0]
                    this.summands = null
                    str = arr[0].split("")
                    str.splice(0,3)
                    str.pop()
                    str = str.join("")
                    this.input = new Ordinal(str)
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
        static toString(v) {
            if (v.summands == null) {
                return "ψ_" + index.toString() + "(" + Ordinal.toString(this.input) + ")"
            }
            else {
                let sr = []
                for (let i = 0; i < v.summands.length; i++) {
                    sr.push(Ordinal.toString(v.summands[i]))
                }
                return sr.join("+")
            }
        }

        toString() {
            return Ordinal.toString(this)
        }

        FS(i) {
            // Returns the i'th FS of the ordinal represented by this
        }

        static __lt__(v,w) {
            // Returns alpha < beta where alpha is the ordinal represented by v and beta is the ordinal represented by w
        }

        static isLim(v) {
            // Returns whether the ordinal represented by v is a limit
        }
    }
    
    function getIsz(i, l, r) {
        s = (Number(i) == 0 && l == r == 0) || (Number(i) == 1 && Number(r) == 0)
        if (s) {
            return s
        }
        return getIsz((new Ordinal(i)).FS(new Num(r)), l, l)
    }
    
    class Num {
        constructor(expression) {
            switch (typeof expression) {
                case 'number':
                    this.isz = expression == 0
                    ar = expression % 2
                    if (ar == 1) {
                        if (expression == 1) {
                            this.e = new Ordinal(2)
                            this.n = new Num(0)
                            this.m = new Num(0)
                            // I did the forbidden and defined 1 as 0^0. Please forgive me.
                        }
                        if (expression > 1) {
                            this.e = new Ordinal(0)
                            this.n = new Num(expression-1)
                            this.m = new Num(1)
                        } 
                    }
                    if (ar == 0) {
                        if (expression == 0) {
                            this.e = null
                            this.n = null
                            this.m = null
                        }
                        if (expression == 2) {
                            this.e = new Ordinal(0)
                            this.n = new Num(1)
                            this.m = new Num(1)
                        }
                        if (expression > 2) {
                            this.e = new Ordinal(1)
                            this.n = new Num(2)
                            this.m = new Num(expression/2)
                        }
                    }
                case 'string':
                    if (+expression != NaN) {
                        this.isz = +expression == 0
                        this.e = new Num(+expression).e
                        this.n = new Num(+expression).n
                        this.m = new Num(+expression).m
                    }
                    else {
                        index = expression.split("{")[1].split("}")[0]
                        inputs = expression.split("{")[1].split("}")[1].split("(")[1].split(")")[0]
                        leftinput = inputs.split(",")[0]
                        rightinput = inputs.split(",")[1]
                        this.isz = getIsz(index, Number(leftinput), Number(rightinput))
                        this.e = new Ordinal(index)
                        this.n = new Num(leftinput)
                        this.m = new Num(rightinput)
                    }
                case 'bool':
                    this.isz = new Num(+ bool).isz
                    this.e = new Num(+ bool).e
                    this.n = new Num(+ bool).n
                    this.m = new Num(+ bool).m
                case 'undefined':
                    this.isz = true
                    this.e = null
                    this.n = null
                    this.m = null
                case 'object':
                    if (expression.isArray()) {
                        if (expression.length == 0) {
                            this.isz = true
                            this.e = null
                            this.n = null
                            this.m = null
                        }
                        if (expression.length == 1) {
                            this.isz = new Num(expression[0]).isz
                            this.e = new Num(expression[0]).e
                            this.n = new Num(expression[0]).n
                            this.m = new Num(expression[0]).m
                        }
                        if (expression.length == 2) {
                            this.isz = new Num(expression[0]).isz && new Num(expression[1]).isz
                            this.e = new Ordinal(0)
                            this.n = new Num(expression[0])
                            this.m = new Num(expression[1])
                        }
                        if (expression.length > 2) {
                            s = [expression[0], expression[1]]
                            expression.splice(0,2)
                            this.e = new Ordinal(0)
                            this.n = new Num(s)
                            this.m = new Num(expression)
                        }
                    }
                    if (expression instanceof Num) {
                        this.isz = expression.isz;
                        this.e = expression.e;
                        this.n = expression.n;
                        this.m = expression.m;
                    }
                    if (expression instanceof Rational) {
                        this.isz = expression.wholepart.isz;
                        this.e = expression.wholepart.e;
                        this.n = expression.wholepart.n;
                        this.m = expression.wholepart.m;
                    }
                    else {
                        throw "Invalid constructor."
                    }
            }
        }
        static fromNum(v) {
            let temp = new Num(undefined)
            ar = v % 2
            if (ar == 1) {
                if (v == 1) {
                    temp.isz = false
                    temp.e = new Ordinal(2)
                    temp.n = new Num(0)
                    temp.m = new Num(0)
                }
                if (v > 1) {
                    temp.isz = false
                    temp.e = new Ordinal(0)
                    temp.n = new Num(v-1)
                    temp.m = new Num(1)
                } 
            }
            if (ar == 0) {
                if (v == 0) {
                    temp.isz = true
                    temp.e = null
                    temp.n = null
                    temp.m = null
                }
                if (v == 2) {
                    temp.isz = false
                    temp.e = new Ordinal(0)
                    temp.n = new Num(1)
                    temp.m = new Num(1)
                }
                if (v > 2) {
                    temp.isz = false
                    temp.e = new Ordinal(1)
                    temp.n = new Num(2)
                    temp.m = new Num(v/2)
                }
            }
            return temp
        }

        static fromString(v) {
            let temp = new Num(undefined)
            if (+v != NaN) {
                temp = Num.fromNum(+v)
            }
            else {
                index = v.split("{")[1].split("}")[0]
                inputs = v.split("{")[1].split("}")[1].split("(")[1].split(")")[0]
                leftinput = inputs.split(",")[0]
                rightinput = inputs.split(",")[1]
                temp.isz = getIsz(index, Number(leftinput), Number(rightinput))
                temp.e = new Ordinal(index)
                temp.n = new Num(leftinput)
                temp.m = new Num(rightinput)
            }
            return temp
        }

        static fromArray(v) {
            let temp = new Num(undefined)
            if (v.length == 0) {
                temp.isz = true
                temp.e = null
                temp.n = null
                temp.m = null
            }
            if (v.length == 1) {
                temp.isz = new Num(v[0]).isz
                temp.e = new Num(v[0]).e
                temp.n = new Num(v[0]).n
                temp.m = new Num(v[0]).m
            }
            if (v.length == 2) {
                temp.isz = new Num(v[0]).isz && new Num(v[1]).isz
                temp.e = new Ordinal(0)
                temp.n = new Num(v[0])
                temp.m = new Num(v[1])
            }
            if (v.length > 2) {
                s = [v[0], v[1]]
                v.splice(0,2)
                temp.e = new Ordinal(0)
                temp.n = new Num(s)
                temp.m = new Num(v)
            }
        }

        static toString(v) {
            switch (v.isz) {
                case true:
                    return "0"
                case false:
                    return "A_{" + Ordinal.toString(this.e) + "}(" + Num.toString(this.n) + "," + Num.toString(this.m) + ")"
            }
        }

        toString() {
            return Num.toString(this)
        }

        static toNumber(v) {
            /*
            Definition of A:
            A_0(n,m) = n+m
            A_1(n,0) = 0
            For p >= 2, A_p(n,0) = 1
            For m > 0, A_p+1(n,m) = A_p(n,A_p+1(n,m-1))
            For limit p and m > 0, A_p(n,m) = A_p[m](n,n)
            */

            if (this.e == new Ordinal(0)) {
                return Ordinal.toNumber(this.n) + Ordinal.toNumber(this.m)
            }

            if (this.e == new Ordinal(1) && this.m == new Num(0)) {
                return 0
            }

            if (Ordinal.__lt__(new Ordinal(1), this.e) && this.m == new Num(0)) {
                return 1
            }

            if (Ordinal.__lt__(new Ordinal(0), this.e) && this.m != new Num(0) && !(Ordinal.isLim(this.e))) {
                let temp = new Ordinal(undefined)
                // Finish rest later
            }

        }
    }

    class Rational {
        // We'll make this later
    }
})(this)