import { part1, part2 } from "./index"
import { readFileSync } from "fs"
import path from "path"

describe('advent-of-code-2022 / ', () => {

    const readDataFile = () => readFileSync(path.join(__dirname, 'data.txt'), 'utf8').split('\n')

    describe('part1', () => {

        it(`should work as the given example`, () => {
            expect(part1([
                '2-4,6-8',
                '2-3,4-5',
                '5-7,7-9',
                '2-8,3-7',
                '6-6,4-6',
                '2-6,4-8',
            ])).toBe(2)
        })

        it('should work with the given data.txt', () => {
            expect(part1(readDataFile()))
                .toEqual(441)
        })

    })

    describe('part2', () => {

        it(`should work as the given example`, () => {
            expect(part2([
                '2-4,6-8',
                '2-3,4-5',
                '5-7,7-9',
                '2-8,3-7',
                '6-6,4-6',
                '2-6,4-8',
            ])).toBe(4)
        })

        it('should work with the given data.txt', () => {
            expect(part2(readDataFile()))
                .toEqual(861)
        })

    })

})