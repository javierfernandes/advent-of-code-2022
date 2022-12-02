import { exercise } from './index'
import { readFileSync } from "fs"
import * as path from 'path'

describe('advent-of-code-2022 / 0x', () => {

    describe('input data case', () => {

        it('should work fine with the given example', () => {
            expect(exercise([
                'A Y',
                'B X',
                'C Z',
            ])).toEqual(15)
        })

        it('should give the result with the given input data', () => {
            const content = readFileSync(path.join(__dirname, 'data.txt'), 'utf8').split('\n')
            expect(exercise(content)).toEqual(13675)
        })

    })

})