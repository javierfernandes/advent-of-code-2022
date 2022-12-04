import { part1, part2 } from "./index"
import { readFileSync } from "fs"
import path from "path"

describe('advent-of-code-2022 / day 3', () => {

    describe('part1', () => {

        it(`sum of priorities for sample data is 157`, () => {
            expect(part1([
                'vJrwpWtwJgWrhcsFMMfFFhFp',
                'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
                'PmmdzqPrVvPwwTWBwg',
                'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
                'ttgJtRGJQctTZtZT',
                'CrZsJsPPZsGzwwsLwLmpwMDw',
            ])).toBe(157)
        })

        it('should give the result with the given input data', () => {
            const content = readFileSync(path.join(__dirname, 'data.txt'), 'utf8').split('\n')
            expect(part1(content)).toEqual(7597)
        })

    })

    describe('part2', () => {

        it(`sum of priorities for sample data is 157`, () => {
            expect(part2([
                'vJrwpWtwJgWrhcsFMMfFFhFp',
                'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
                'PmmdzqPrVvPwwTWBwg',
                'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
                'ttgJtRGJQctTZtZT',
                'CrZsJsPPZsGzwwsLwLmpwMDw',
            ])).toBe(70)
        })

        it('should give the result with the given input data', () => {
            const content = readFileSync(path.join(__dirname, 'data.txt'), 'utf8').split('\n')
            expect(part2(content)).toEqual(2607)
        })

    })

})