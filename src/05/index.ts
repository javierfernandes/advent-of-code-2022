//
// --- Day 5: Supply Stacks ---
//

import { applySpec, compose, drop, head, isEmpty, join, map, match, not, nth, pipe, prop, splitEvery, times, trim, when } from 'ramda'

type Stack = string[]
type Move = { from: number, to: number, amount: number }
type State = { stacks: Stack[], moves: Move[] }

//
// Parsing
//

const parseStackToken = when(compose(not, isEmpty), nth(1)) // ie: [A] => A
export const stacksParser = (line: string, result: State) => {
    if (isEmpty(result.stacks)) { // first line, capture the size of the stacks (width) and init them
        result.stacks = times(() => [], Math.floor(line.length / 3))
    }
    splitEvery(4, line)
        .map(pipe(trim, parseStackToken))
        .forEach((token, i) => {
            if (!isEmpty(token))
                result.stacks[i].push(token)
        })
}

const parseMoveParts = pipe(
    match(/move (\d*) from (\d*) to (\d*)/),
    drop(1),
    map(parseInt),
    applySpec({ amount: nth(0), from: nth(1), to: nth(2) })
)
export const movesParser = (l: string, { moves }: State) => moves.push(parseMoveParts(l))
const isStackFooter = (line:string) => line.match('\w\d')

/**
 * Parses the list of lines producing a State object
 * It mutates the state object to construct it using 2 different (mutating) parser functions/strategies
 */
export const parse = (lines: string[]): State => {
    let parser = stacksParser // first parse the stack part (kinda strategy)

    return lines.reduce((state: State, line: string) => {
        if (line === '') { parser = movesParser } // switch to moves parser
        else if (!isStackFooter(line)) {  // ignore line with stack numbers (footer)
            parser(line, state)
        }
        return state
    }, ({ stacks: [], moves: [] })) // new empty state
}

//
// Processing Logic
//

const applyMove = ({ stacks }: State, reverse: boolean) => ({ amount, from, to }: Move) => {
    const elements = stacks[from - 1].splice(0, amount)
    stacks[to - 1].unshift(...reverse ? elements.reverse() : elements)
}
const applyAllMoves = (state: State, reverse: boolean) => { state.moves.forEach(applyMove(state, reverse)); return state }

const headOfStacksString = pipe(prop('stacks'), map(head), join(''))

const makePart = (reversing: boolean) => (lines: string[]): string =>
    headOfStacksString(applyAllMoves(parse(lines), reversing))

//
// Parts
//

export const part1 = makePart(true)
export const part2 = makePart(false)
