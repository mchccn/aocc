export { /** vera.#1369 */ };

type List = ReadonlyArray<unknown>;
type Node = [x: List, y: List];

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type LastOf<T> = UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never;

type UnionToTuple<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N ? [] : [...UnionToTuple<Exclude<T, L>>, L];

// ++
type Increment<N extends List> = [...N, any];

// --
type Decrement<N extends List> = N extends [...infer Head, any] ? Head : never;

// String.prototype.split
type Split<S extends string, Separator extends string = "", R extends List = []> =
    S extends ""
        ? R
        : S extends `${infer A}${Separator}${infer B}`
            ? Split<B, Separator, [...R, A]>
            : [...R, S];

type ToTuple<N extends number, T extends List = []> = T["length"] extends N ? T : ToTuple<N, [...T, any]>;

type ParseInputLines<T extends string[]> = {
    [K in keyof T]:
        // .map((line) => line.split(" "))
        Split<T[K], " "> extends [infer A, infer B]
            // .map(([dir, n]) => [dir, +n])
            ? B extends `${infer N extends number}`
                ? [A, ToTuple<N>]
                : never
            : never
};

// .map((position) => [position[0] + 1, position[1] +  1])
type ShiftAll<Positions extends Node[]> = {
    [K in keyof Positions]: [Increment<Positions[K][0]>, Increment<Positions[K][1]>];
};

// [position[0] + 1, position[1] + 1]
type Shift<Position extends Node> = [Increment<Position[0]>, Increment<Position[1]>];

type HumanReadable<Position extends Node> = [Position[0]["length"], Position[1]["length"]] extends infer T ? T : never;

type Neighbors<A extends Node, B extends Node> =
    B extends (
        | [Increment<A[0]>, Increment<A[1]>]
        | [          A[0] , Increment<A[1]>]
        | [Decrement<A[0]>, Increment<A[1]>]
        | [Decrement<A[0]>,           A[1] ]
        | [Decrement<A[0]>, Decrement<A[1]>]
        | [          A[0] , Decrement<A[1]>]
        | [Increment<A[0]>, Decrement<A[1]>]
        | [Increment<A[0]>,           A[1] ]
        | [          A[0] ,           A[1] ]
    ) ? true : false;

// A > B
type GreaterThan<A extends List, B extends List> = A extends [...B, any, ...any[]] ? true : false;
// A < B
type LessThan<A extends List, B extends List> = B extends [...A, any, ...any[]] ? true : false;

// [b.x > a.x ? b.x - 1 : b.x < a.x ? b.x + 1 : b.x, b.y > a.y ? b.y - 1 : b.y < a.y ? b.y + 1 : b.y]
type Move<A extends Node, B extends Node> =
    [
        GreaterThan<B[0], A[0]> extends true
            ? Decrement<B[0]>
            : LessThan<B[0], A[0]> extends true
                ? Increment<B[0]>
                : B[0],
        GreaterThan<B[1], A[1]> extends true
            ? Decrement<B[1]>
            : LessThan<B[1], A[1]> extends true
                ? Increment<B[1]>
                : B[1]
    ] extends infer T ? T : never;

type LeftMove<
    GivenHead extends Node,
    GivenTail extends Node,
    Positions extends Node[],
    N extends List,
    Head extends Node = Shift<GivenHead>,
    Tail extends Node = Shift<GivenTail>,
    MovedHead extends Node = [Decrement<Head[0]>, Head[1]],
> = N["length"] extends 0
    ? [GivenHead, GivenTail, Positions]
    : Neighbors<MovedHead, Tail> extends false
        ? LeftMove<MovedHead, Move<Head, Tail>, [...ShiftAll<Positions>, Move<Head, Tail>], Decrement<N>>
        : LeftMove<MovedHead, Tail, [...ShiftAll<Positions>, Tail], Decrement<N>>;

type RightMove<
    Head extends Node,
    Tail extends Node,
    Positions extends Node[],
    N extends List,
    MovedHead extends Node = [Increment<Head[0]>, Head[1]],
> = N["length"] extends 0
    ? [Head, Tail, Positions]
    : Neighbors<MovedHead, Tail> extends false
        ? RightMove<MovedHead, Move<Head, Tail>, [...Positions, Move<Head, Tail>], Decrement<N>>
        : RightMove<MovedHead, Tail, [...Positions, Tail], Decrement<N>>;

type UpMove<
    GivenHead extends Node,
    GivenTail extends Node,
    Positions extends Node[],
    N extends List,
    Head extends Node = Shift<GivenHead>,
    Tail extends Node = Shift<GivenTail>,
    MovedHead extends Node = [Head[0], Decrement<Head[1]>],
> = N["length"] extends 0
    ? [GivenHead, GivenTail, Positions]
    : Neighbors<MovedHead, Tail> extends false
        ? UpMove<MovedHead, Move<Head, Tail>, [...ShiftAll<Positions>, Move<Head, Tail>], Decrement<N>>
        : UpMove<MovedHead, Tail, [...ShiftAll<Positions>, Tail], Decrement<N>>;

type DownMove<
    Head extends Node,
    Tail extends Node,
    Positions extends Node[],
    N extends List,
    MovedHead extends Node = [Head[0], Increment<Head[1]>],
> = N["length"] extends 0
    ? [Head, Tail, Positions]
    : Neighbors<MovedHead, Tail> extends false
        ? DownMove<MovedHead, Move<Head, Tail>, [...Positions, Move<Head, Tail>], Decrement<N>>
        : DownMove<MovedHead, Tail, [...Positions, Tail], Decrement<N>>;

type ProcessMovements<
    Movements extends [string, List][],
    Head extends Node = [[], []],
    Tail extends Node = [[], []],
    Positions extends Node[] = [],
> = Movements extends []
    ? Positions
    : Movements extends [[infer Dir, infer N extends List], ...infer Rest extends [string, List][]]
        ? (Dir extends "L" // dir === "L"
            ? LeftMove<Head, Tail, Positions, N>
                : Dir extends "R" // dir === "R"
                ? RightMove<Head, Tail, Positions, N>
                    : Dir extends "U" // dir === "U"
                    ? UpMove<Head, Tail, Positions, N>
                        : Dir extends "D" // dir === "D"
                        ? DownMove<Head, Tail, Positions, N> : never) extends [infer NewHead extends Node, infer NewTail extends Node, infer NewPositions extends Node[]]
                            ? ProcessMovements<Rest, NewHead, NewTail, NewPositions>
                            : never
        : never;

type Day9<Input extends string> =
    // Filter duplicate positions
    UnionToTuple<
        // for (const [dir, n] of movements) {
        ProcessMovements<
            // .map((line) => line.split(" ")).map(([dir, n]) => [dir, +n])
            ParseInputLines< 
                // input.split("\n")
                Split<Input, "\n">
            >
        >[number]
    >["length"]

type Example = Day9<`\
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`>;
