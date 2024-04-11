// This TypeScript program will only compile if MagicSquare types contain
// valid magic squares.
// -- Alok Menghrajani

// Helper type to keep things tidy.
//   We don't stricly need And but I feel it makes things more readable. It also
//   helps fit the article + code on a single page.
type And<A extends boolean, B extends boolean> = A extends true ? B : false

// -----------------------------------------------------------------------------
// Array related types
// -----------------------------------------------------------------------------

// Creates an array of length N:
//   N is the input parameter. R (in a Prolog-like fashion) is the output and
//   defaults to []. Recursively adds "any" to R until the length matches N.
type Arr<N extends number, R extends any[] = []> = R["length"] extends N ? R
  : Arr<N, [...R, any]>

// Returns the first element of the array or "any".
type First<T extends any[]> = T extends [infer H, ...infer _] ? H : any

// Returns the array without the first element. Returns [] for empty inputs.
type Shift<T extends any[]> = T extends [infer _, ...infer Rest] ? Rest : any[]

// Returns the last element of the array or "any".
type Last<T extends any[]> = T extends [...infer _, infer L] ? L : any

// Returns the array without the last element. Returns [] for empty inputs.
type Pop<T extends any[]> = T extends [...infer H, infer _] ? H : any

// -----------------------------------------------------------------------------
// Grid (array of array) related types
// -----------------------------------------------------------------------------

// Returns the first elements of each array (i.e. first col)
type Col<T extends any[][], R extends any[] = []> = T["length"] extends 0 ? R :
  Col<Shift<T>, [...R, First<First<T>>]>

// Returns the remaining grid after removing the first col.
type Reduce<T extends any[][], R extends any[][] = []> = T["length"] extends 0 ? R :
  Reduce<Shift<T>, [...R, Shift<First<T>>]>

// Returns the first main diagonal (top left to bottom right). We grab the top
//   left element and then recurse on the grid without the top row and left col.
type D1<T extends any[][], R extends any[] = []> = T["length"] extends 0 ? R :
  D1<Reduce<Shift<T>>, [...R, First<First<T>>]>

// Returns the second main diagonal (bottom left to top right). We grab the
//   bottom left element and then recurse on the grid without the last row and
//   left col.
type D2<T extends any[][], R extends any[] = []> = T["length"] extends 0 ? R :
  D2<Reduce<Pop<T>>, [...R, First<Last<T>>]>

// Returns the transpose of the grid.
type Tr<T extends any[][], R extends any[][] = []> = First<T>["length"] extends 0 ? R :
  Tr<Reduce<T>, [...R, Col<T>]>

// -----------------------------------------------------------------------------
// Magic square related types
// -----------------------------------------------------------------------------

// Flatten grid to an array.
type Flatten<T extends any[][], R extends any[] = []> = T["length"] extends 0 ? R :
  Flatten<Shift<T>, [...R, ...First<T>]>

// Checks that A doesn't appear anywhere in B
type Unique<A extends any, B extends any[]> = B["length"] extends 0 ? true :
  A extends First<B> ? false : Unique<A, Shift<B>>

// Checks that every element is unique by recursively calling Unique.
type AllDiff<A extends any[]> = A["length"] extends 0 ? true :
  And<Unique<First<A>, Shift<A>>, AllDiff<Shift<A>>>

// Sums all elements of T and puts the result in R (again, Prolog-style).
type Sum<T extends any[], R extends any[] = []> = T["length"] extends 0 ? R :
  Sum<Shift<T>, [...R, ...Arr<First<T>>]>

// Checks that all the elements of T sum to S. T's type should be number[],
//   but the typechecker doesn't like that! Ironically, type-level programming
//   ends up being untyped!
type SameSums<T extends any[], S extends any[]> = T["length"] extends 0 ? true :
  And<Sum<First<T>> extends S ? true : false, SameSums<Shift<T>, S>>

// We are done, we can now define the MagicSquare type! We check that:
//   - all the rows sum to the first row
//   - all the rows of the transpose (i.e. all the cols) sum to the first row
//   - the first main diagonal sums to the first row
//   - the second main diagonal sums to the first row
//   - the grid contains all different numbers
type MagicSquare<T extends any[][]> = And<SameSums<[...Shift<T>, ...Tr<T>, D1<T>, D2<T>], Sum<First<T>>>,
  AllDiff<Flatten<T>>>

// -----------------------------------------------------------------------------
// Examples
// -----------------------------------------------------------------------------

// 3x3 magic square:
let x: any
const three_by_three: true = x as MagicSquare<[
  [2, 7, 6],
  [9, 5, 1],
  [4, 3, 8],
]>

// 0x0 magic square:
const zero_by_zero: true = x as MagicSquare<[[]]>

// 1x1 magic square:
const one_by_one: true = x as MagicSquare<[[42]]>

// 4x4 magic square:
const four_by_four: true = x as MagicSquare<[
  [1, 15, 14, 4],
  [10, 11, 8, 5],
  [7, 6, 9, 12],
  [16, 2, 3, 13],
]>

// 5x5 magic square:
const five_by_five: true = x as MagicSquare<[
  [17, 24, 1, 8, 15],
  [23, 5, 7, 14, 16],
  [4, 6, 13, 20, 22],
  [10, 12, 19, 21, 3],
  [11, 18, 25, 2, 9],
]>

// 6x6 magic square:
const six_by_six: true = x as MagicSquare<[
  [35, 3, 31, 8, 30, 4],
  [1, 32, 9, 28, 5, 36],
  [6, 7, 2, 33, 34, 29],
  [26, 21, 22, 17, 12, 13],
  [19, 23, 27, 10, 14, 18],
  [24, 25, 20, 15, 16, 11],
]>

// 7x7 magic square:
const seven_by_seven: true = x as MagicSquare<[
  [22, 47, 16, 41, 10, 35, 4],
  [5, 23, 48, 17, 42, 11, 29],
  [30, 6, 24, 49, 18, 36, 12],
  [13, 31, 7, 25, 43, 19, 37],
  [38, 14, 32, 1, 26, 44, 20],
  [21, 39, 8, 33, 2, 27, 45],
  [46, 15, 40, 9, 34, 3, 28],
]>

// and so on... The type checker enforces limits on recursion depth, so there's
// an implicit maximum grid size.
