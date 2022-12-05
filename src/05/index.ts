//
// --- Day 5: Supply Stacks ---
//

import { append, applySpec, compose, drop, head, isEmpty, join, lensProp, map, match, not, nth, over, pipe, splitEvery, times, trim, when } from 'ramda'

export type Stack = string[]
type Move = { from: number, to: number, amount: number }

//
// Processing: parsing + evaluating moves
//

const parseStackToken = when(compose(not, isEmpty), pipe(nth(1), trim)) // ie: [A] => A
export const stackLineProcessor = (line: string, stacks: Stack[]) => {
    if (isEmpty(stacks)) { // first line, capture the size of the stacks (width) and init them
        stacks = times(() => [], Math.floor(line.length / 3))
    }
    return splitEvery(4, line)// process the stacks line as "tokens" 1 for each stack
        .map(parseStackToken)
        .reduce((stacks, token, i) => {
            if (isEmpty(token)) return stacks
            return over(lensProp(i), append(token), stacks)
        }, stacks)
}

// move

const parseMove = pipe(
    match(/move (\d*) from (\d*) to (\d*)/),
    drop(1),
    map(parseInt),
    applySpec({ amount: nth(0), from: nth(1), to: nth(2) })
)

const applyMove = (stacks: Stack[], reverse: boolean, { amount, from, to }: Move) => {
    // mutable logic. It could be migrated to generate a new stacks[] instead of mutating it
    const elements = stacks[from - 1].splice(0, amount)
    stacks[to - 1].unshift(...reverse ? elements.reverse() : elements)
    return stacks
}

export const moveLineProcessor = (reversing: boolean) => (line: string, stacks: Stack[]) =>
    applyMove(stacks, reversing, parseMove(line))
const isStackFooter = (line:string) => line.match('\w\d')
const isStackMovesSeparator = (line: string) => line === ''

/**
 * Parses the list of lines producing a State object
 * It mutates the state object to construct it using 2 different (mutating) parser functions/strategies
 */
export const processLines = (reversing: boolean) => (lines: string[]): Stack[] => {
    let processor = stackLineProcessor // first parse the stack part (kinda strategy)

    return lines.reduce((stacks: Stack[], line: string) => {
        if (isStackMovesSeparator(line)) {
            processor = moveLineProcessor(reversing) // switch to moves processing
            return stacks
        }
        else if (isStackFooter(line)) {  // ignore line with stack numbers (footer)
            return stacks
        } else {
            return processor(line, stacks)
        }
    }, [])
}

// Parts

const makePart = (reversing: boolean) => pipe(processLines(reversing), map(head), join(''))

export const part1 = makePart(true)
export const part2 = makePart(false)
