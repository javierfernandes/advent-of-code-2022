import {elfWithMostCalories} from "./index";
import {readFileSync} from "fs";
import * as path from 'path';

describe('advent-of-code-2022 / 01', () => {

    it('should return null if it is an empty list of calories', () => {
        expect(elfWithMostCalories([])).toBe(null)
    })

    it(`
    [
      '10'
    ] -> Elf<1, 10>
    `, () => {
        expect(elfWithMostCalories(['10'])).toEqual([1, 10])
    })

    it(`
    [
      '10',
      '',
      '1'
    ] -> Elf<1, 10>
    `, () => {
        expect(elfWithMostCalories(['10', '', '1'])).toEqual([1, 10])
    })

    it(`
    [
      '10',
      '',
      '11'
    ] -> Elf<1, 10>
    `, () => {
        expect(elfWithMostCalories(['10', '', '11'])).toEqual([2, 11])
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
    ] -> Elf<1, 10>
    `, () => {
        expect(elfWithMostCalories([
            '5', '5',
            '',
            '10', '1',
            '',
            '2', '2'
        ])).toEqual([2, 11])
    })

    describe('input data case', () => {

        it('should give the result', () => {
            const content = readFileSync(path.join(__dirname, 'input-data.txt'), 'utf8').split('\n')
            expect(elfWithMostCalories(content)).toEqual([40, 72070])
        })

    })


})