//
// --- Day X: xxx ---
//
// Comment here
//

import {assoc, head, intersection, range} from "ramda";

const splitRucksack = (rucksack: string) => {
    const c1 = rucksack.slice(0, rucksack.length / 2)
    const c2 = rucksack.slice(rucksack.length / 2)
    return [c1, c2]
}

// TODO: unify reduces
const PRIORITIES: Record<string, number> = {
    // a-z: 'a' in JS starts at 97, here it is 1
    ...range(97, 97 + 26).reduce((acc, charCode) => assoc(String.fromCharCode(charCode), charCode - 96, acc), {}),
    // A-Z: in JS A is 65, here it is 27, so 65 - 27 = 38, so delta is 38
    ...range(65, 65 + 26).reduce((acc, charCode) => assoc(String.fromCharCode(charCode), charCode - 38, acc), {}),
}

const priorityOf = (char: string | undefined) => char ? PRIORITIES[char[0]] : 0

export const exercise = (input: string[]): number => input
.map((rucksack: string) => {
    const [compartment1, compartment2] = splitRucksack(rucksack)
    const repeated = intersection(compartment1.split(''), compartment2.split(''))

    // console.log('rucksack', rucksack)
    // console.log('c1', compartment1)
    // console.log('c2', compartment2)
    // console.log('repeated', repeated)

    return head(repeated)
})
.reduce((acc, repeated) => acc + priorityOf(repeated), 0)

console.log('PRIORITIES', PRIORITIES)