//
// --- Day 7: No Space Left On Device ---
//

import {Dir} from "fs";
import {min, minBy, reduce} from "ramda";

const TOTAL__DISK_SIZE = 70000000

interface TreeNode {
    parent?: Directory
    name: String

    fullName(): String

    size(): number
    isDir(): boolean
    isRoot(): boolean

    collect<T>(collector: (node:TreeNode, level: number)=>T, currentLevel: number): T[]
}
class File implements TreeNode {
    parent?: Directory
    name: String
    _size: number
    constructor(parent: Directory, name: String, size: number) {
        this.parent = parent
        this.name = name
        this._size = size
    }

    size() { return this._size }
    isDir() { return false }
    isRoot() { return false }

    fullName() { return `${this.parent ? this.parent.fullName() + '/' : ''}${this.name} (${this._size})`}

    collect<T>(collector: (node:TreeNode, level: number)=>T, currentLevel: number = 0): T[]  {
        return [collector(this, currentLevel)]
    }
}

class Directory implements TreeNode {
    parent?: Directory
    name: String
    private entries: TreeNode[]
    constructor(name: String, parent?: Directory) {
        this.parent = parent
        this.name = name
        this.entries = []
    }

    isDir() { return true }
    isRoot() { return this.parent === undefined }

    fullName() { return `${this.parent ? this.parent.fullName() + '/' : ''}${this.name}`}

    collect<T>(collector: (node:TreeNode, level: number)=>T, currentLevel: number = 0): T[] {
        return [
            collector(this, currentLevel),
            ...this.entries.flatMap(e => e.collect(collector, currentLevel + 1))
        ]
    }
    getRoot() { return this.parent ? this.parent.getRoot() : this }

    size() { return this.entries.reduce((acc, entry) => acc + entry.size(), 0)}

    // commands interpretation to infer the FS
    cd(target: String): Directory {
        if (target === '/') { return this.getRoot() }
        if (target === '..') { return this.parent }
        return this.makeDir(target)
    }

    makeDir(name: String): Directory {
        let dir = this.entries.find(e => e.name === name)
        if (!dir) {
            dir = new Directory(name, this)
            this.entries.push(dir)
        }
        return dir
    }

    makeFile(name: String, size: number) {
        let file = this.entries.find(e => e.name === name)
        if (!file) {
            this.entries.push(new File(this, name, size))
        }
    }

}

const parseLSEntry = (line:String): (d: Directory)=>void => {
    const dirMatch = line.match(/^dir\s*([^\s]*)/)
    if (dirMatch) {
        return dir => dir.makeDir(dirMatch[1])
    }
    return dir => {
        const [size, name] = line.split(' ')
        dir.makeFile(name, parseInt(size))
    }
}
const parseLine = (directory: Directory, line:String): Directory => {

    // cd
    let m = line.match(/^\$\s*cd\s*([^\s]*)/)
    if (m) {
        return directory.cd(m[1])
    }
    if (line.match(/^\$\s*ls/)) {
        // nothing to do here
        return directory
    }
    // then it means it is an ls output (this won't scale)
    parseLSEntry(line)(directory)
    return directory
}

export const inferFileSystemTree = (lines: string[]): Directory => lines.reduce(parseLine, new Directory('ROOT'))

/** count dirs with size >= 100000 then sum */
export const part1 = (lines: string[]): number => {
    const fs = inferFileSystemTree(lines)
    console.log('>>>>', fs.cd('/')
        .collect((n, i) => n.fullName()))

    return fs.getRoot().collect((node) => {
        if (node.isRoot()) return 0
        if (node.isDir()) {
            console.log('dir ', node.name, 'size', node.size(), node.size() <= 100000 ? 'RECORDED' : 'IGNORED')
        }
        if (node.isDir() && node.size() <= 100000) {
            console.log('collected', node.size(), 'from', node)
            return node.size()
        }
        return 0
    }).reduce((acc, size) => acc + size, 0)
}




export const part2 = (lines: string[], spaceNeeded: number): number => {
    const fs = inferFileSystemTree(lines).getRoot()
    const availableSpace = TOTAL__DISK_SIZE - fs.size()
    const spaceToFree = spaceNeeded - availableSpace

    console.log('FS', JSON.stringify(fs.collect((n, i) => n.fullName()), null, 2))
    console.log('USED SPACE', fs.size())
    console.log('>> AVAIL', availableSpace)
    console.log('>> SPACE NEEDED', spaceNeeded)
    console.log(">>> >SPACE TO FREE", spaceToFree)

    const dirs: Directory[] = fs.collect(node => {
        if (node.isRoot()) return null
        return (node.isDir() && node.size() >= spaceToFree) ?
            node
            : null
    }).filter(d => !!d)

    console.log('POTENTIAL DIRS are', dirs.map(d => [d.fullName(), d.size()]))

    return dirs.reduce((best, d) => d.size() < best ? d.size() : best, 999999999999999)
}