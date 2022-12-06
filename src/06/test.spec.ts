import { Solution, solution1, solution2, part1, part2 } from './index'
import { readFileSync } from 'fs'
import path from "path"
import { describe, it, expect } from '@jest/globals'

describe('advent-of-code-2022 / ', () => {

    const readDataFile = () => readFileSync(path.join(__dirname, 'data.txt'), 'utf8').split('\n')[0]

    const makeTests = (solutionName: string, solution: Solution) => {

        describe(solutionName, () => {

            describe('part1', () => {

                it(`should work as the given example`, () => {
                    expect(
                        part1(solution, 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'
                    )).toBe(7)
                })

                it('should work with the given data.txt', () => {
                    expect(part1(solution, readDataFile()))
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
                    expect(part2(solution, s)).toBe(expected)
                })

                it('should work with the given data.txt', () => {
                    expect(part2(solution, readDataFile()))
                        .toEqual(3444)
                })

            })

        })

    }

    makeTests('solution1: with reduce', solution1)
    makeTests('solution1: with recursive function', solution2)

})