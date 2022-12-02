import {pipe, toPairs} from 'ramda'

//
// --- Day 2: Rock Paper Scissors ---
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

// option 2 just declare the minimum rules without caring the order
// const RULES = makeAllPossibleScenarios(
//     '🧻'.beats('🪨').beats('✂️').beats('🧻'),
// )


type PlayInstruction = [them: Shape, me: Shape]

//
// generic behavior between parts
//

type UsParser = (us: string, them: Shape) => Shape

const parse = (parseUsPart: UsParser, s: string) => {
    const [them, ours] = s.split(' ')
    const theirShape = THEM_MAPPING[them]
    return [theirShape, parseUsPart(ours, theirShape)] as PlayInstruction
}

const computeRoundScore = ([them, me]: PlayInstruction) => RESULT_POINTS[RULES[them][me]] + SHAPE_POINTS[me]
const playAndComputeRoundScore = (usParser: UsParser, play: string) => computeRoundScore(parse(usParser, play))

const makePart = (parser: UsParser) => (plays: string[]) => plays.reduce(
    (total, play) => total + playAndComputeRoundScore(parser, play),
    0
)

//
// part 1
//

const US_MAPPING : Mapping = { 'X': 'ROCK', 'Y': 'PAPER', 'Z': 'SCISSOR' }

export const part1 = makePart(us => US_MAPPING[us])

//
// part 2
//

const PART2_MAPPING: Record<string, RoundResult> = {
    X: 'LOSE',
    Y: 'TIE',
    Z: 'WIN'
}

const findShapeThat = (options: Record<Shape, RoundResult>, expected: RoundResult): Shape =>
    Object.keys(options)
        .find(key => options[key as Shape] === expected) as Shape

const whatBeats = (theirs: Shape) => findShapeThat(RULES[theirs], 'WIN')
const whatLosesAgainst = (theirs: Shape) => findShapeThat(RULES[theirs], 'LOSE')
const chooseShape = (theirs:Shape, result: RoundResult): Shape => {
    switch (result) {
        case 'TIE': return theirs
        case 'WIN': return whatBeats(theirs)
        case 'LOSE': return whatLosesAgainst(theirs)
        default:
            throw new Error('Unknown expected result')
    }
}
export const part2 = makePart((expectedResult, theirs) => chooseShape(theirs, PART2_MAPPING[expectedResult]))