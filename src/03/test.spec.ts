import { exercise } from "./index"
import {readFileSync} from "fs";
import path from "path";
import {part1} from "../02";

describe('advent-of-code-2022 / 0x', () => {

    describe('part1', () => {

        it(`sum of priorities for sample data is 157`, () => {
            expect(exercise([
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
            expect(exercise(content)).toEqual(0)
        })

    })

})