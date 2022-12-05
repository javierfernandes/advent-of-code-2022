//
// --- Day X: xxx ---
//

import {compose, drop, head, isEmpty, map, match, negate, not, nth, pipe, range, splitEvery, trim, when} from 'ramda'

type Stack = string[]
type Move = { from: number, to: number, amount: number }
type State = { stacks: Stack[], moves: Move[] }

export const move = (amount: number, from: number, to: number) => ({ from, to, amount })
const newState = () => ({ stacks: [], moves: [] })

//
// Parsing
//

const parseStackToken = when(compose(not, isEmpty), nth(1)) // ie: [A] => A
export const stacksParser = (line: string, result: State) => {
    if (result.stacks.length === 0) {
        const nrOfStacks = Math.floor(line.length / 3)
        result.stacks = range(0, nrOfStacks).map(() => [])
    }
    splitEvery(4, line)
        .map(pipe(trim, parseStackToken))
        .forEach((e, i) => {
            if (!isEmpty(e)) {
                result.stacks[i].push(e)
            }
        })

}

const parseMoveParts = pipe(
    match(/move (\d*) from (\d*) to (\d*)/),
    drop(1),
    map(parseInt)
)
export const movesParser = (l: string, { moves }: State) => {
    const [amount, from, to] = parseMoveParts(l)
    moves.push(move(amount, from, to))
}
const isStackFooter = (line:string) => line.match('\w\d')

/**
 * Parses the list of lines producing a State object
 * It mutates the state object to construct it using 2 different (mutating) parser functions/strategies
 */
export const parse = (lines: string[]): State => {
    let parser = stacksParser // first parse the stack part (~strategy)
    return lines.reduce((state: State, line: string) => {
        if (line === '') { parser = movesParser } // switch to moves parser
        else if (!isStackFooter(line)) {  // ignore line with stack numbers (footer)
            parser(line, state)
        }
        return state
    }, newState())
}

//
// Part 1
//

const applyMove = (state: State) => ({ amount, from, to }: Move) => {
    state.stacks[to - 1].unshift(...state.stacks[from - 1].splice(0, amount).reverse())
}

const headOfStacksString = ({ stacks }: State) => stacks.map(head).join('')
const applyAllMoves = (state: State) => state.moves.forEach(applyMove(state))

export const part1 = (lines: string[]): string => {
    const state = parse(lines)
    applyAllMoves(state)
    return headOfStacksString(state)
}

//
// Part 2
//

export const part2 = (lines: string[]): number => {
    throw new Error('Not implemented yet')
}

