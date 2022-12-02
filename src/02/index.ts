import { pipe }  from 'ramda'

//
// --- Day 2: Rock Paper Scissors ---
//
// What would your total score be if everything goes exactly according to your strategy guide?
//

// Shapes
type Shape = 'ROCK' | 'PAPER' | 'SCISSOR'

const SHAPE_POINTS : Record<Shape, number> = {
    ROCK: 1,
    PAPER: 2,
    SCISSOR: 3
}

type RoundResult = 'WIN' | 'TIE' | 'LOSE'

const RESULT_POINTS: Record<RoundResult, number> = {
    WIN: 6,
    TIE: 3,
    LOSE: 0,
}

// parsing rules
type Mapping = Record<string, Shape>
const THEM_MAPPING : Mapping = { 'A': 'ROCK', 'B': 'PAPER', 'C': 'SCISSOR' }
const US_MAPPING : Mapping = { 'X': 'ROCK', 'Y': 'PAPER', 'Z': 'SCISSOR' }

// game rules

const RULES: Record<Shape, Record<Shape, RoundResult>> = {
    ROCK: {
        ROCK: 'TIE',
        PAPER: 'WIN',
        SCISSOR: 'LOSE',
    },
    PAPER: {
        ROCK: 'LOSE',
        PAPER: 'TIE',
        SCISSOR: 'WIN',
    },
    SCISSOR: {
        ROCK: 'WIN',
        PAPER: 'LOSE',
        SCISSOR: 'TIE',
    }
}
// other possible (flatten) declaration for the previous
// const GAME_RULES = [
//     ['🪨', '🪨', '🤝'],
//     ['🪨', '🧻', '👍'],
//     ['🪨', '✂️', '👎'],
//
//     ['🧻', '🪨', '👎'],
//     ['🧻', '🧻', '🤝'],
//     ['🧻', '✂️', '👍'],
//
//     ['✂️', '🪨', '👍'],
//     ['✂️', '🧻', '👎'],
//     ['✂️', '✂️', '🤝'],
// ]

// option 2 just declare the minimum rules without caring the order
// const RULES = makeAllPossibleScenarios(
//     '🧻'.beats('🪨').beats('✂️').beats('🧻'),
// )


type PlayInstruction = [them: Shape, me: Shape]

//
// behavior
//

const parseTokens = (tuple: [string, string]) : PlayInstruction => [THEM_MAPPING[tuple[0]], US_MAPPING[tuple[1]]]
const parse = (s: string) => parseTokens(s.split(' ') as [string, string])

const computeRoundScore = ([them, me]: PlayInstruction) => RESULT_POINTS[RULES[them][me]] + SHAPE_POINTS[me]
const playAndComputeRoundScore = pipe(parse, computeRoundScore)

export const exercise = (plays: string[]) => plays.reduce(
    (total, play) => total + playAndComputeRoundScore(play),
    0
)