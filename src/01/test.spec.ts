import { top3Elves } from "./index"
import { readFileSync } from "fs"
import * as path from 'path'

describe('advent-of-code-2022 / 01', () => {

    it(`
    [
    ] -> [0, 0, 0]
    `, () => {
        expect(top3Elves([])).toEqual([0,0,0])
    })

    it(`
    [
      '10'
    ] -> [10, 0, 0]
    `, () => {
        expect(top3Elves(['10'])).toEqual([10, 0, 0])
    })

    it(`
    [
      '10',
      '',
      '1'
    ] -> [10, 1, 0]
    `, () => {
        expect(top3Elves(['10', '', '1'])).toEqual([10, 1, 0])
    })

    it(`
        [
          '10',
          '',
          '11'
        ] -> [11, 10, 0]
    `, () => {
        expect(top3Elves(['10', '', '11'])).toEqual([11, 10, 0])
    })

    it(`
        [
          '5',
          '5'
          '',
          '10'
          '1'
          ''
          '2'
          '2'
        ] -> [11, 10, 4]
    `, () => {
        expect(top3Elves([
            '5', '5',
            '',
            '10', '1',
            '',
            '2', '2'
        ])).toEqual([11, 10, 4])
    })

    describe('input data case', () => {

        it('should work fine with the example data', () => {
            expect(top3Elves([
                '1000',
                '2000',
                '3000',
                '',
                '4000',
                '',
                '5000',
                '6000',
                '',
                '7000',
                '8000',
                '9000',
                '',
                '10000',
            ])).toEqual([
                24000,
                11000,
                10000,
            ])
        })

        it('should give the result with the given input data', () => {
            const content = readFileSync(path.join(__dirname, 'input-data.txt'), 'utf8').split('\n')
            const result = top3Elves(content)
            expect(result).toEqual([
                72070,
                70586,
                69149,
            ])
            // sum is
            expect(result.reduce((a, b) => a + b, 0))
                .toEqual(211805)
        })

    })


})