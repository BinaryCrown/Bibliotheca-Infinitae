/*
Uses EBNF-based trivariate Ackermann to represent numbers up to A_p0(W_W)(9007199254740991)
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