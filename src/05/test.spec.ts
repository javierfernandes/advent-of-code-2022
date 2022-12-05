import {move, movesParser, parse, part1, part2, stacksParser} from "./index"
import { readFileSync } from "fs"
import path from "path"

describe('advent-of-code-2022 / Day 05', () => {

    const move = (amount: number, from: number, to: number) => ({ from, to, amount })

    describe('parsing', () => {

        describe('stackParser', () => {

            it.each([

                ['[A]', [['A']]],
                ['[A] [B]', [['A'], ['B']]],
                ['    [B]', [[], ['B']]],
                ['    [B]    ', [[], ['B'], []]],

            ])('should parse %s into %s', (line:string, expectedStack: string[][]) => {
                const result = { stacks: [], moves: [] }
                stacksParser(line, result)
                expect(result.stacks).toEqual(expectedStack)
            })

        })

        describe('movesParser', () => {

            it.each([

                ['move 2 from 8 to 2\n', [move(2, 8, 2)]],
                ['move 10 from 8 to 20\n', [move(10, 8, 20)]],

            ])('should parse %s expecting moves %s', (line:string, expectedMoves: string[][]) => {
                const result = { stacks: [], moves: [] }
                movesParser(line, result)
                expect(result.moves).toEqual(expectedMoves)
            })

        })

        describe('parse', () => {

            it.each([

                [
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
                    {
                        stacks: [['N', 'Z'], ['D', 'C', 'M'], ['P']],
                        moves: [
                            move(1, 2, 1),
                            move(3, 1, 3),
                            move(2, 2, 1),
                            move(1, 1, 2)
                        ]
                    }
                ]

            ])('should parse %s into %p', (text: string, expectedResult: ParseR) => {
                expect(parse(text.split('\n')))
                    .toEqual(expectedResult)
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