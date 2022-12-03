//
// --- Day 3: xxx ---
//

import {assoc, head, intersection, pipe, range, splitAt, splitEvery} from "ramda"

const priorityMap = (startChar:string, endChar:string, startPriority: number) : Record<string, number> => {
    const thisChar = ({ [startChar]: startPriority })
    if (startChar === endChar) return thisChar
    return ({
        ...thisChar,
        ...priorityMap(String.fromCharCode(startChar.charCodeAt(0) + 1), endChar, startPriority + 1)
    })
}

/** { character: priority } iex. { a: 1, b: 2, ..., z: 26, A: 27, B: 28, ... } */
const PRIORITIES: Record<string, number> = {
    ...priorityMap('a', 'z', 1),
    ...priorityMap('A', 'Z', 27)
}

const priorityOf = (char: string | undefined) => char ? PRIORITIES[char[0]] : 0

const splitRucksackCompartments = (rucksack: string) => splitAt(rucksack.length / 2, rucksack)

const findRepeatedType = ([compartment1, compartment2]: string[]) =>
    head(intersection(compartment1.split(''), compartment2.split('')))

const sumPriorities = (sum:number, repeated:string|undefined): number => sum + priorityOf(repeated)

//
// PART 1
//

export const part1 = (input: string[]): number => input
    .map(pipe(splitRucksackCompartments, findRepeatedType))
    .reduce(sumPriorities, 0)

//
// PART 2
//
export const part2 = (input: string[]): number => splitEvery(3, input)
    .map((rucksacks) => {
        const [r1, r2, r3] = rucksacks
        const commonTypes = intersection(
            intersection(r1.split(''), r2.split('')),
            r3.split('')
        )
        return commonTypes[0]
    })
    .reduce(sumPriorities, 0)
