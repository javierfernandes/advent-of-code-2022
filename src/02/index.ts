import { pipe }  from 'ramda'
//
// --- Day 2: Rock Paper Scissors ---
//
// What would your total score be if everything goes exactly according to your strategy guide?
//

const THEM_ROCK = 'A', THEM_PAPER = 'B', THEM_SCISSOR = 'C'
const ME_ROCK = 'X', ME_PAPER = 'Y', ME_SCISSOR = 'Z'

const WIN_POINTS = 6
const TIE_POINTS = 3
const LOSE_POINTS = 0

const SHAPE_POINTS : { [key: string]: number } = {
    [ME_ROCK]: 1,
    [ME_PAPER]: 2,
    [ME_SCISSOR]: 3
}

const RULES: Record<string,Record<string,number>> = {
    [THEM_ROCK]: {
        [ME_ROCK]: TIE_POINTS,
        [ME_PAPER]: WIN_POINTS,
        [ME_SCISSOR]: LOSE_POINTS,
    },
    [THEM_PAPER]: {
        [ME_ROCK]: LOSE_POINTS,
        [ME_PAPER]: TIE_POINTS,
        [ME_SCISSOR]: WIN_POINTS,
    },
    [THEM_SCISSOR]: {
        [ME_ROCK]: WIN_POINTS,
        [ME_PAPER]: LOSE_POINTS,
        [ME_SCISSOR]: TIE_POINTS,
    }
}

type PlayInstruction = [them: string, me: string]

//
//

const parse = (s: string) : PlayInstruction => s.split(' ') as PlayInstruction

const computePlayScore = ([them, me]: PlayInstruction): number => RULES[them][me]

const shapeScore = (shape: string) => SHAPE_POINTS[shape]

const computeRoundScore = (play: PlayInstruction) => computePlayScore(play) + shapeScore(play[1])
const playAndComputeRoundScore = pipe(parse, computeRoundScore)

export const exercise = (plays: string[]) =>
    plays.reduce((total, play) => total + playAndComputeRoundScore(play), 0)