import { part1, part2, stackLineProcessor} from "./index"
import { readFileSync } from 'fs'
import path from 'path'
import { describe, it, expect, jest, test} from '@jest/globals'

describe('advent-of-code-2022 / Day 05', () => {

    describe('parsing', () => {

        describe('stackParser', () => {

            it.each([

                ['[A]', [['A']]],
                ['[A] [B]', [['A'], ['B']]],
                ['    [B]', [[], ['B']]],
                ['    [B]    ', [[], ['B'], []]],

            ])('should parse %s into %s', (line:string, expectedStack: string[][]) => {
                expect(stackLineProcessor(line, [])).toEqual(expectedStack)
            })

        })

    })

    const readDataFile = () => readFileSync(path.join(__dirname, 'data.txt'), 'utf8').split('\n')

    describe('part1', () => {

        it(`should work as the given example`, () => {
            expect(part1(
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`.split('\n')
            )).toBe('CMZ')
        })

        it('should work with the given data.txt', () => {
            expect(part1(readDataFile()))
                .toEqual('SPFMVDTZT')
        })

    })

    describe('part2', () => {

        it(`should work as the given example`, () => {
            expect(part2(
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`.split('\n')
            )).toBe('MCD')
        })

        it('should work with the given data.txt', () => {
            expect(part2(readDataFile()))
                .toEqual('ZFSJBPRFP')
        })

    })

})