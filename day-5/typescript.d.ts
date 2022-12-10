export { /** vera.#1369 */ };

type List = ReadonlyArray<unknown>;

// --
type Decrement<N extends List> = N extends [...infer Head, any] ? Head : never;

// String.prototype.split
type Split<S extends string, Separator extends string = "", R extends List = []> =
    S extends ""
        ? R
        : S extends `${infer A}${Separator}${infer B}`
            ? Split<B, Separator, [...R, A]>
            : [...R, S];

// Array.prototype.join
type Join<A extends string[], Separator extends string = "", R extends string = ""> =
    A extends []
        ? R
        : A extends [infer First extends string, ...infer Rest extends string[]]
            ? Join<Rest, Separator, R extends "" ? First : `${R}${Separator}${First}`>
            : never;

type ToTuple<N extends number, T = any, A extends List = []> = A["length"] extends N ? A : ToTuple<N, T, [...A, T]>;

type Reverse<A extends List, R extends List = []> = A extends [infer Head, ...infer Tail] ? Reverse<Tail, [Head, ...R]> : R;

type Chunks<A extends List, Size extends number, Chunk extends List = [], R extends List = []> =
    A extends [infer First, ...infer Rest]
        ? Chunk["length"] extends Size
            ? Chunks<Rest, Size, [First], [...R, Chunk]>
            : Chunks<Rest, Size, [...Chunk, First], R>
        : [...R, Chunk];

type MapToLetter<A extends string[][]> = { [K in keyof A]: A[K][1] & string };

type PushAllIfExists<A extends string[][], B extends string[]> = {
    [K in keyof A]:
        K extends keyof B
            ? B[K] extends " "
                ? A[K]
                : [...A[K], B[K]]
            :  A[K];
};

type MakeStacks<Lines extends string[], Stacks extends string[][]> =
    Lines extends [infer Line extends string, ...infer Rest extends string[]]
        ? MakeStacks<Rest, PushAllIfExists<Stacks, MapToLetter<Chunks<Split<Line>, 4>>>>
        : Stacks;

type ParseStacks<Input extends string> =
    Reverse<Split<Input, "\n">> extends [infer Count extends string, ...infer State extends string[]]
        ? MakeStacks<State, ToTuple<Split<Count, "   ">["length"], []>>
        : never;

type MoveCrates<Stacks extends string[][], Move extends List, From extends List, To extends List> =
    {
        [K in keyof Stacks]:
            K extends `${From["length"]}`
                ? Stacks[K] extends [...infer Stack, ...Move]
                    ? Stack
                    : never
                : K extends `${To["length"]}`
                    ? [...Stacks[K], ...(
                        Stacks[From["length"]] extends [...infer Stack, ...Move]
                            ? Stacks[From["length"]] extends [...Stack, ...infer Moved extends string[]]
                                ? Reverse<Moved> // For part 2, just replace this line with `? Moved` instead.
                                : never
                            : never
                    )]
                    : Stacks[K];
    };

type GetTopCrates<Stacks extends string[][]> = { [K in keyof Stacks]: Stacks[K] extends [...string[], infer Last extends string] ? Last : " " };

type Execute<Stacks extends string[][], Instructions extends string[]> =
    Instructions extends [infer First extends string, ...infer Rest extends string[]]
        ? First extends `move ${infer Move extends number} from ${infer From extends number} to ${infer To extends number}`
            ? Execute<MoveCrates<Stacks, ToTuple<Move>, Decrement<ToTuple<From>>, Decrement<ToTuple<To>>>, Rest>
            : never
        : Stacks;

type Day5<Input extends string> =
    Split<Input, "\n\n"> extends [infer Stacks extends string, infer Instructions extends string]
        ? Join<GetTopCrates<Execute<ParseStacks<Stacks>, Split<Instructions, "\n">>> extends infer X extends string[] ? X : never>
        : never;

type Example = Day5<`\
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`>;
