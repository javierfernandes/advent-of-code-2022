import { pipe }  from 'ramda'

//
// --- Day 2: Rock Paper Scissors ---
//
// What would your total score be if everything goes exactly according to your strategy guide?
//

// Shapes
enum Shape { ROCK, PAPER, SCISSOR }
const { ROCK, PAPER, SCISSOR } = Shape

const SHAPE_POINTS : Record<Shape,number> = {
    [ROCK]: 1,
    [PAPER]: 2,
    [SCISSOR]: 3
}

// parsing rules
const createMapping = (rock: string, paper : string, scissor: string): Record<string, Shape> => ({
    [rock]: ROCK,
    [paper]: PAPER,
    [scissor]: SCISSOR,
})
const THEM_MAPPING :Record<string, number> = createMapping('A', 'B', 'C')
const ME_MAPPING :Record<string, number> = createMapping('X', 'Y', 'Z')

// match points

const WIN_POINTS = 6
const TIE_POINTS = 3
const LOSE_POINTS = 0

const RULES: Record<string,Record<string,number>> = {
    [ROCK]: {
        [ROCK]: TIE_POINTS,
        [PAPER]: WIN_POINTS,
        [SCISSOR]: LOSE_POINTS,
    },
    [PAPER]: {
        [ROCK]: LOSE_POINTS,
        [PAPER]: TIE_POINTS,
        [SCISSOR]: WIN_POINTS,
    },
    [SCISSOR]: {
        [ROCK]: WIN_POINTS,
        [PAPER]: LOSE_POINTS,
        [SCISSOR]: TIE_POINTS,
    }
}

type PlayInstruction = [them: Shape, me: Shape]

//
//

const mapToken = (t: string, i: number) : Shape => ((i === 0) ? THEM_MAPPING : ME_MAPPING)[t]
const parse = (s: string) => (s.split(' ').map(mapToken)) as PlayInstruction

const computeRoundScore = ([them, me]: PlayInstruction) => RULES[them][me] + SHAPE_POINTS[me]
const playAndComputeRoundScore = pipe(parse, computeRoundScore)

export const exercise = (plays: string[]) =>
    plays.reduce((total, play) => total + playAndComputeRoundScore(play), 0)