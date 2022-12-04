//
// --- Day 4: Camp Cleanup ---
//

import { anyPass, count, flip, match, pipe, range } from 'ramda'

type Range = number[] // ie. 2-6 is [2, 3, 4, 5, 6]
type RangePairsPredicate = (a: Range, b: Range) => boolean

const parseRange = (from:string, to:string): Range => range(parseInt(from), parseInt(to) + 1)
const parseLine = (s:string) => {
    const [_, aStart, aEnd, bStart, bEnd] = match(/(\d*)-(\d*)\,(\d*)-(\d*)/, s)
    return [
        parseRange(aStart, aEnd),
        parseRange(bStart, bEnd),
    ]
}

const countLines = (predicate: RangePairsPredicate) => count(pipe(parseLine, ([a, b]) => predicate(a, b)))

//
// PART 1
//

/** Tells if every element of a, is included in b */
const fullyIncludes = <T> (a: T[], b: T[]) => a.every(_ => b.includes(_))

// count pairs where one range fullyIncludes the other (either A ⊆ B or B ⊆ A);
export const part1 = countLines(anyPass([fullyIncludes, flip(fullyIncludes)]))

//
// PART 2
//

// counts pairs that overlaps at least in 1 element. That is one of them includes at least 1 element of the other
export const part2 = countLines((a, b) => b.some(_ => a.includes(_)))