import { part1, part2 } from "./index"
import { readFileSync } from "fs"
import path from "path"
import { describe, it, expect, jest, test} from '@jest/globals'

describe('advent-of-code-2022 / ', () => {

    const readDataFile = () => readFileSync(path.join(__dirname, 'data.txt'), 'utf8').split('\n')[0]

    describe('part1', () => {

        it(`should work as the given example`, () => {
            expect(part1(
                'mjqjpqmgbljsphdztnvjfqwrcgsmlb'
            )).toBe(7)
        })

        it('should work with the given data.txt', () => {
            expect(part1(readDataFile()))
                .toEqual(1262)
        })

    })

    describe('part2', () => {

        it.each([
            ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 19],
            ['bvwbjplbgvbhsrlpgdmjqwftvncz', 23],
            ['nppdvjthqldpwncqszvftbrmjlhg', 23],
            ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 29],
            ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 26]
        ])(`with %s gives %d`, (s: string, expected: number) => {
            expect(part2(s)).toBe(expected)
        })

        it('should work with the given data.txt', () => {
            expect(part2(readDataFile()))
                .toEqual(3444)
        })

    })

})