//
// --- Day 6: Tuning Trouble ---
//

import { uniq } from 'ramda'

type Memory = { startOfPacket?: number, startOfMessage?: number, chars: string[] }

const process = (input: string): Memory => {
    const initValue = { startOfPacket: undefined, chars: [] }  as Memory

    return input.split('').reduce((memory, char, i) => {
        memory.chars.push(char)
        if (memory.chars.length > 14) { memory.chars.splice(0, 1) }

        // start-of-packet
        if (!memory.startOfPacket && uniq(memory.chars.slice(-4)).length === 4) {
            memory.startOfPacket = i + 1
        }
        // start-of-message
        if (!memory.startOfMessage && uniq(memory.chars).length === 14) {
            memory.startOfMessage = i + 1
        }
        return memory
    }, initValue )
}

export const part1 = (input: string) => process(input).startOfPacket

export const part2 = (input: string) => process(input).startOfMessage