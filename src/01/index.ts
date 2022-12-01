
// ElfWithCalories Type & operations
// [position, nrOfCalories]
type ElfWithCalories = [number, number]
/** constructs a new ElfWithCalories for the given position */
const elf = (position: number): ElfWithCalories => [position, 0]
const calories = (elf:ElfWithCalories) => elf[1]

/** Immutable "addCalories" operation over and ElfWithCalories. Returns a new object */
const addCalories = (elf: ElfWithCalories, amount: number): ElfWithCalories => [
    elf[0],
    elf[1] + amount
]

/** Gives the better elf between a required one a and an optional b. If b is null then a is returned */
const betterBetween = (elfA: ElfWithCalories, elfB: ElfWithCalories | null): ElfWithCalories => {
    if (elfB === null) return elfA
    return calories(elfA) >= calories(elfB) ? elfA : elfB
}

//
// main function
//

const recursiveElfWithMostCalories = (items: string[], winner: ElfWithCalories | null, current: ElfWithCalories): ElfWithCalories | null => {
    // last item, return winner|current
    if (items.length === 0) return current[1] === 0 ? null : betterBetween(current, winner)

    // processLine
    const [maybeCalories, ...restItems] = items
    if (maybeCalories === '') {
        // ended with current -> compute who's best and create a next current
        return recursiveElfWithMostCalories(restItems, betterBetween(current, winner), elf(current[0] + 1))
    } else {
        // accumulate calories for current.
        return recursiveElfWithMostCalories(restItems, winner, addCalories(current, parseInt(maybeCalories)))
    }
}

export const elfWithMostCalories = (items: string[]): ElfWithCalories | null =>
    recursiveElfWithMostCalories(items, null, elf(1))