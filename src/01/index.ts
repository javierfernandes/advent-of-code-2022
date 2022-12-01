//
// --- Day 1: Calorie Counting ---
//
// In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).
// Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
//

/**
 * Iterative recursive solution (tail recursive).
 * The data is carried as
 *  - winner: the current max calories of an elf
 *  - current: the count we are doing for the current elf up to this point
 */
const recursiveElfWithMostCalories = (items: string[], winner: number, current: number): number | null => {
    // last item, return max(winner | current)
    if (items.length === 0) return current === 0 ? null : Math.max(current, winner)

    // processLine
    const [maybeCalories, ...restItems] = items
    if (maybeCalories === '') {
        // ended with current -> compute who's best and create a next current
        return recursiveElfWithMostCalories(restItems, Math.max(current, winner), 0)
    } else {
        // accumulate calories for current
        return recursiveElfWithMostCalories(restItems, winner, current + parseInt(maybeCalories))
    }
}

export const elfWithMostCalories =
    (items: string[]): number | null => recursiveElfWithMostCalories(items, 0, 0)