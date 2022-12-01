//
// --- Day 1: Calorie Counting ---
//
// In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).
// Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
//

type Top3 = [first: number, second:number, third: number]
const ELF_BREAK_LINE = ''

/**
 * If the given "other" calories should be part of the top3 then it returns and updated one
 * Otherwise the top3 as it is.
 * It is a "manual" basic impl. An "object" would take this away into a better abstraction, but it is not
 * really necessary.
 */
const updateTop3 = (current: Top3, other: number): Top3 => {
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
export const top3ElvesByCalories = (items: string[], top3: Top3  = [0, 0, 0], current: number = 0): Top3 => {
    // last item -> return top3 (maybe updated with the last elf we were counting)
    if (items.length === 0) return updateTop3(top3, current)

    // still calories to count

    const [maybeCalories, ...restItems] = items
    return maybeCalories === ELF_BREAK_LINE ?
        // finished counting current -> maybe update top3 & continue with the rest of the list
        top3ElvesByCalories(restItems, updateTop3(top3, current), 0)
        :
        // still counting current elf -> accumulate calories & continue
        top3ElvesByCalories(restItems, top3, current + parseInt(maybeCalories))
}