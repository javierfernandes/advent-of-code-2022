//
// --- Day 6: Tuning Trouble ---
//

import { uniq } from 'ramda'

//
// Solution 1: iterating using reduce
//

export type Solution = (input: string[], limit: number) => number | undefined

const createMemory = (limit: number) => {
    const mem: string[] = []
    let found: number
    const self = {
        append: (char: string, i: number) => {
            // append
            mem.push(char)
            // trim
            if (mem.length > limit) { mem.splice(0, 1) }
            // detect
            if (!found && uniq(mem).length === limit) { found = i + 1 }
            return self
        },
        found: () => found,
    }
    return self
}

export const solution1: Solution = (input, limit) => input
    .reduce(
        (memory, char, i) => memory.append(char, i),
     createMemory(limit) )
    .found()

//
// Solution 2: iterative recursive
//

type Memory = { append: (s: string) => void, found: () => boolean }

const createStore = (limit: number): Memory => {
    const mem = [] as string[]
    return {
        append: (char: string) => {
            mem.push(char)
            if (mem.length > limit) { mem.splice(0, 1) }
        },
        found: () => uniq(mem).length === limit
    }
}

const processRecursing = (chars: string[], index: number, memory: Memory): number | undefined => {
    if (chars.length === 0) return undefined
    const [char, ...rest] = chars
    memory.append(char)
    return memory.found() ? index : processRecursing(rest, index + 1, memory)
}
export const solution2 : Solution = (input, limit) => processRecursing(input, 1, createStore(limit))

//

export const part1 = (solution: Solution, input: string) => solution(input.split(''), 4)
export const part2 = (solution: Solution, input: string) => solution(input.split(''), 14)