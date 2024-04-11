// Various tests I wrote while implementing MagicSquare.
const a: unique symbol = Symbol();
type A = typeof a;

const b: unique symbol = Symbol();
type B = typeof b;

const c: unique symbol = Symbol();
type C = typeof c;

const d: unique symbol = Symbol();
type D = typeof d;

const e: unique symbol = Symbol();
type E = typeof e;

const f: unique symbol = Symbol();
type F = typeof f;

const g: unique symbol = Symbol();
type G = typeof g;

const h: unique symbol = Symbol();
type H = typeof h;

const i: unique symbol = Symbol();
type I = typeof i;

// And
const andTT: true = x as And<true, true>
const andTF: false = x as And<true, false>
const andFT: false = x as And<false, true>
const andFF: false = x as And<false, false>

// Arr
const arr0 = [] as Arr<0>
const arr1 = [x] as Arr<1>
const arr2 = [x, x] as Arr<2>

// First
const first = a as First<[A, B, C]>

// Shift
const shift = [b, c] as Shift<[A, B, C]>

// Last
const last = c as Last<[A, B, C]>

// Pop
const pop = [a, b] as Pop<[A, B, C,]>

// Col
const col = [a, d, g] as Col<[[A, B, C], [D, E, F], [G, H, I]]>

// Reduce
const reduce = [[b, c], [e, f], [h, i]] as Reduce<[[A, B, C], [D, E, F], [G, H, I]]>

// D1
const d1 = [a, e, i] as D1<[[A, B, C], [D, E, F], [G, H, I]]>

// D2
const d2 = [g, e, c] as D2<[[A, B, C], [D, E, F], [G, H, I]]>

// Tr
const tr = [[a, d, g], [b, e, h], [c, f, i]] as Tr<[[A, B, C], [D, E, F], [G, H, I]]>

// Flatten
const flatten = [a, b, c, d, e, f, g, h, i] as Flatten<[[A, B, C], [D, E, F], [G, H, I]]>

// Unique
const unique1: true = x as Unique<A, [B, C]>
const unique2: false = x as Unique<A, [A, B, C]>

// AllDiff
const alldiff1: true = x as AllDiff<[A, B, C]>
const alldiff2: false = x as AllDiff<[A, B, B]>
const alldiff3: false = x as AllDiff<[A, B, A]>

// Sum
const sum1 = [x, x, x] as Sum<[3]>
const sum2 = [x, x, x, x, x] as Sum<[3, 2]>
const sum3 = [x, x, x, x] as Sum<[1, 1, 2]>

// SameSums
const sameSums1: true = x as SameSums<[[3], [1, 2], [1, 1, 1]], [any, any, any]>
const sameSums2: false = x as SameSums<[[3], [1, 2], [1, 1, 2]], [any, any, any]>

// MagicSquare
const magicSquare1: true = x as MagicSquare<[
  [2, 7, 6],
  [9, 5, 1],
  [4, 3, 8],
]>
const magicSquare2: false = x as MagicSquare<[
  [2, 7, 6],
  [9, 5, 10],
  [4, 3, 8],
]>
const magicSquare3: false = x as MagicSquare<[
  [2, 2],
  [2, 2],
]>
