import { part1, part2 } from "./index"
import { readFileSync } from "fs"
import path from "path"

describe('advent-of-code-2022 / ', () => {

    const readDataFile = () => readFileSync(path.join(__dirname, 'data.txt'), 'utf8').split('\n')

    describe.skip('part1', () => {

        it(`should work as the given example`, () => {
            expect(part1([
                // TODO: example input here
            ])).toBe(666) // TODO
        })

        it('should work with the given data.txt', () => {
            expect(part1(readDataFile()))
                .toEqual(666) // TODO: expected value here
        })

    })

    describe.skip('part2', () => {

        it(`should work as the given example`, () => {
            expect(part2([
                // TODO: example input here
            ])).toBe(666) // TODO
        })

        it.only('should work with the given data.txt', () => {
            expect(part2(readDataFile()))
                .toEqual(666) // TODO
        })

    })

})