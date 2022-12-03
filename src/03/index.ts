//
// --- Day 3: xxx ---
//

import {add, head, intersection, pipe, split, splitAt, splitEvery} from 'ramda'

//
// First we build a PRIORITIES map object to resolve priorities of characters.
// A helper function to create the dictionary (recursive)
//
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

//
// rucksacks common functions
//

const splitRucksackCompartments = (rucksack: string) => splitAt(rucksack.length / 2, rucksack)

/** find the repeated character in a list of strings (might be compartments or whole rucksacks) */
const findRepeatedCharacter = (strings: string[]) => head(strings
    .map(split('')) // must map from string to string[] (list of characters) to use reduce
    .reduce(intersection) // this should be done in a single iteration
)

//
// PART 1
//

export const part1 = (input: string[]): number => input
    .map(pipe(splitRucksackCompartments, findRepeatedCharacter, priorityOf))
    .reduce(add)

//
// PART 2
//

export const part2 = (input: string[]): number =>
    splitEvery(3, input)
    .map(pipe(findRepeatedCharacter, priorityOf))
    .reduce(add)
