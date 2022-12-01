//
// --- Day 1: Calorie Counting ---
//
// In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).
// Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
//

type Top3 = [first: number, second:number, third: number]

const newTop3 = (current: Top3, other: number): Top3 => {
    if (other >= current[0]) return [other, current[0], current[1]]
    if (other >= current[1]) return [current[0], other, current[1]]
    if (other >= current[2]) return [current[0], current[1], other]
    return current
}

/**
 * Iterative recursive solution (tail recursive).
 * The data is carried as fn arguments
 *  - top3: the current top 3 max calories of elves
 *  - current: the calories count we are doing for the current elf up to this point
 */
const recursiveTop3ElvesByCalories = (items: string[], top3: Top3, current: number): Top3 => {
    // last item, return max(winner | current)
    if (items.length === 0) return newTop3(top3, current)

    // processLine
    const [maybeCalories, ...restItems] = items
    if (maybeCalories === '') {
        // ended with current -> compute who's best and create a next current
        return recursiveTop3ElvesByCalories(restItems, newTop3(top3, current), 0)
    } else {
        // accumulate calories for current
        return recursiveTop3ElvesByCalories(restItems, top3, current + parseInt(maybeCalories))
    }
}

export const top3ElvesByCalories =
    (items: string[]): Top3 => recursiveTop3ElvesByCalories(items, [0, 0, 0], 0)