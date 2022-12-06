//
// --- Day 6: Tuning Trouble ---
//

import { uniq } from 'ramda'

//
// Solution 1: iterating using reduce
//

type Memory = { found?: number, chars: string[] }
export type Solution = (input: string[], limit: number) => number | undefined

export const solution1: Solution = (input, limit) => input
    .reduce((memory, char, i) => {
        memory.chars.push(char)
        // trim memory
        if (memory.chars.length > limit) { memory.chars.splice(0, 1) }

        // check pattern
        if (!memory.found && uniq(memory.chars).length === limit) {
            memory.found = i + 1
        }
        return memory
    }, { chars: [] }  as Memory )
    .found

//
// Solution 2: iterative recursive
//

type Store = { append: (s: string) => void, found: () => boolean }

const createStore = (limit: number): Store => {
    const mem = [] as string[]
    return {
        append: (char: string) => {
            mem.push(char)
            if (mem.length > limit) { mem.splice(0, 1) }
        },
        found: () => uniq(mem).length === limit
    }
}

const processRecursing = (chars: string[], index: number, memory: Store): number | undefined => {
    if (chars.length === 0) return undefined
    const [char, ...rest] = chars
    memory.append(char)
    return memory.found() ? index : processRecursing(rest, index + 1, memory)
}
export const solution2 : Solution = (input, limit) => processRecursing(input, 1, createStore(limit))

//

export const part1 = (solution: Solution, input: string) => solution(input.split(''), 4)
export const part2 = (solution: Solution, input: string) => solution(input.split(''), 14)