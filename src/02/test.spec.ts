import { part1, part2 } from './index'
import { readFileSync } from "fs"
import * as path from 'path'

describe('advent-of-code-2022 / day 2', () => {

    describe('part 1', () => {

        it('should work fine with the given example', () => {
            expect(part1([
                'A Y',
                'B X',
                'C Z',
            ])).toEqual(15)
        })

        it('should give the result with the given input data', () => {
            const content = readFileSync(path.join(__dirname, 'data.txt'), 'utf8').split('\n')
            expect(part1(content)).toEqual(13675)
        })

    })

    describe('part 2', () => {

        it('should work fine with the given example', () => {
            expect(part2([
                'A Y',
                'B X',
                'C Z',
            ])).toEqual(12)
        })

        it('should give the result with the given input data', () => {
            const content = readFileSync(path.join(__dirname, 'data.txt'), 'utf8').split('\n')
            expect(part2(content)).toEqual(14184)
        })

    })

})