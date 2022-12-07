import { part1, part2, inferFileSystemTree } from "./index"
import { readFileSync } from "fs"
import path from "path"
import { describe, it, expect, jest, test} from '@jest/globals'
import {repeat} from "ramda";

describe('advent-of-code-2022 / ', () => {

    const readDataFile = () => readFileSync(path.join(__dirname, 'data.txt'), 'utf8').split('\n')

    describe('parsing', () => {

        describe('inferFileSystemTree', () => {

            it.each([
                // just CD
                [
                    [
                        '$ cd a',
                    ],
                    [
                        'ROOT',
                        'ROOT/a'
                    ]
                ],
                [
                    [
                        '$ cd a',
                        '$ cd b',
                        '$ cd c',
                    ],
                    [
                        'ROOT',
                        'ROOT/a',
                        'ROOT/a/b',
                        'ROOT/a/b/c',
                    ]
                ],
                [
                    [
                        '$ cd a',
                        '$ cd ..',
                        '$ cd b',
                        '$ cd ..',
                        '$ cd c',
                    ],
                    [
                        'ROOT',
                        'ROOT/a',
                        'ROOT/b',
                        'ROOT/c',
                    ]
                ],
                [
                    [
                        '$ cd a',
                        '$ cd b',
                        '$ cd /',
                        '$ cd c',
                    ],
                    [
                        'ROOT',
                        'ROOT/a',
                        'ROOT/a/b',
                        'ROOT/c',
                    ]
                ],
                // just LS
                [
                    [
                        '$ ls',
                        'dir a',
                    ],
                    [
                        'ROOT',
                        'ROOT/a',
                    ]
                ],
                [
                    [
                        '$ ls',
                        'dir a',
                        'dir b',
                        'dir c',
                    ],
                    [
                        'ROOT',
                        'ROOT/a',
                        'ROOT/b',
                        'ROOT/c',
                    ]
                ],
                [
                    [
                        '$ ls',
                        '14848514 b.txt'
                    ],
                    [
                        'ROOT',
                        'ROOT/b.txt (14848514)',
                    ]
                ],
                [
                    [
                        '$ ls',
                        'dir a',
                        '14848514 b.txt'
                    ],
                    [
                        'ROOT',
                        'ROOT/a',
                        'ROOT/b.txt (14848514)',
                    ]
                ],
            ])('given lines %s -> gives %s', (lines, expectedTree) => {
                expect(inferFileSystemTree(lines)
                    .cd('/')
                    .collect((n, i) => n.fullName())
                ).toEqual(expectedTree)
            })

        })

    })

    describe('part1', () => {

        it(`should work as the given example`, () => {
            expect(part1(
                `$ cd /
$ ls
dir a
10 b.txt
`.split('\n')
            )).toEqual(0)
        })

        it(`should work as the given example`, () => {
            expect(part1([
                '$ cd a',
                '$ ls',
                '100000 b.txt',
            ])).toEqual(100000)
        })

        it(`should work as the given example`, () => {
            expect(part1([
                '$ cd a',
                '$ ls',
                '50000 b.txt',
                '50000 c.txt',
            ])).toEqual(100000)
        })

        it(`should work as the given example`, () => {
            expect(part1(
                `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`.split('\n')
            )).toBe(95437)
        })

        it('should work with the given data.txt', () => {
            expect(part1(readDataFile()))
                .toEqual(1206825)
        })

    })

    describe('part2', () => {

        it(`should work as the given example`, () => {
            expect(part2(                `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`.split('\n'),
                30000000
            )).toBe(24933642)
        })

        it('should work with the given data.txt', () => {
            expect(part2(readDataFile(), 30000000))
                .toEqual(9608311)
        })

    })

})