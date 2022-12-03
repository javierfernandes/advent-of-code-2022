//
// --- Day X: xxx ---
//
// Comment here
//

import {assoc, head, intersection, range, splitEvery} from "ramda";

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


//
// PART 1
//

export const part1 = (input: string[]): number => input
.map((rucksack: string) => {
    const [compartment1, compartment2] = splitRucksack(rucksack)
    const repeated = intersection(compartment1.split(''), compartment2.split(''))
    return head(repeated)
})
.reduce((acc, repeated) => acc + priorityOf(repeated), 0)

//
// PART 2
// TODO: unify with part1 !
export const part2 = (input: string[]): number => splitEvery(3, input)
    .map((rucksacks) => {
        const [r1, r2, r3] = rucksacks
        const commonTypes = intersection(
            intersection(r1.split(''), r2.split('')),
            r3.split('')
        )
        return commonTypes[0]
    })
// TODO: repeated
.reduce((acc, repeated) => acc + priorityOf(repeated), 0)
