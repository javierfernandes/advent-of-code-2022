//
// --- Day 6: Tuning Trouble ---
//

import { uniq } from 'ramda'

type Memory = { found?: number, chars: string[] }

const process = (input: string, limit: number): number|undefined => {
    const initValue = { startOfPacket: undefined, chars: [] }  as Memory

    return input.split('').reduce((memory, char, i) => {
        memory.chars.push(char)
        // trim memory
        if (memory.chars.length > limit) { memory.chars.splice(0, 1) }

        // check pattern
        if (!memory.found && uniq(memory.chars).length === limit) {
            memory.found = i + 1
        }
        return memory
    }, initValue ).found
}

export const part1 = (input: string) => process(input, 4)

export const part2 = (input: string) => process(input, 14)