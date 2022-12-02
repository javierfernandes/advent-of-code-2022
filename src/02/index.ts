//
// --- Day 2: Rock Paper Scissors ---
//
// What would your total score be if everything goes exactly according to your strategy guide?
//
const WIN_POINTS = 6
const TIE_POINTS = 3
const LOSE_POINTS = 0

const THEM_ROCK = 'A', THEM_PAPER = 'B', THEM_SCISSOR = 'C'
const ME_ROCK = 'X', ME_PAPER = 'Y', ME_SCISSOR = 'Z'

const parse = (s: string) : [string, string] => s.split(' ') as [string, string]

const computePlayScore = ([them, me]: [string, string]): number => {
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

const shapeScore = (shape: string): number => {
    switch(shape) {
        case ME_ROCK: return 1
        case ME_PAPER: return 2
        case ME_SCISSOR: return 3
        default: throw new Error(`Unknown shape ${shape}`)
    }
}
const computeRoundScore = (play: [string, string]) => computePlayScore(play) + shapeScore(play[1])
const playAndComputeScore = (play: string): number => computeRoundScore(parse(play))

export const exercise = (plays: string[]): number =>
    plays.reduce((total: number, play) => {
        const score  = playAndComputeScore(play)
        console.log(`ROUND = ${play}, SCORE = ${score}, TOTAL = ${total + score}`)
        return total + score
    }, 0)