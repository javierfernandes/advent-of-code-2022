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

type PlayInstruction = [them: string, me: string]

//
//

const parse = (s: string) : PlayInstruction => s.split(' ') as PlayInstruction

const computePlayScore = ([them, me]: PlayInstruction): number => {
    if (them === THEM_ROCK) {
        if (me === ME_ROCK) return TIE_POINTS
        if (me === ME_PAPER) return WIN_POINTS
        if (me === ME_SCISSOR) return LOSE_POINTS
    }
    else if (them === THEM_PAPER) {
        if (me === ME_ROCK) return LOSE_POINTS
        if (me === ME_PAPER) return TIE_POINTS
        if (me === ME_SCISSOR) return WIN_POINTS
    }
    else if (them === THEM_SCISSOR) {
        if (me === ME_ROCK) return WIN_POINTS
        if (me === ME_PAPER) return LOSE_POINTS
        if (me === ME_SCISSOR) return TIE_POINTS
    }
    throw new Error(`Unknown combination ${them} - ${me}`)
}


const shapeScore = (shape: string) => SHAPE_POINTS[shape]

const computeRoundScore = (play: PlayInstruction) => computePlayScore(play) + shapeScore(play[1])
const playAndComputeRoundScore = pipe(parse, computeRoundScore)

export const exercise = (plays: string[]) =>
    plays.reduce((total, play) => total + playAndComputeRoundScore(play), 0)