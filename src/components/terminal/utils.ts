import { FileSystem } from './types'

export const commands = ['ls', 'cd', 'cat', 'tree', 'help', 'clean']

export const getCurrentDir = (fileSystem: FileSystem, path: string[]) => {
    let current: FileSystem | string = fileSystem
    for (const dir of path) {
        if (typeof current === 'object' && dir in current) {
            current = current[dir]
        } else {
            return null
        }
    }
    return current
}

export const isDirectory = (item: FileSystem | string): item is FileSystem => {
    return typeof item === 'object'
}

export const renderTree = (obj: FileSystem, prefix = '') => {
    const lines: string[] = []
    const renderNode = (key: string, value: string | FileSystem, nodePrefix = '') => {
        if (typeof value === 'object') {
            lines.push(`${nodePrefix}${key}/`)
            const entries = Object.entries(value)
            entries.forEach(([childKey, childValue], index) => {
                const isLast = index === entries.length - 1
                const childPrefix = nodePrefix + (isLast ? '└── ' : '├── ')
                renderNode(childKey, childValue, childPrefix)
            })
        } else {
            lines.push(`${nodePrefix}${key}`)
        }
    }

    renderNode(prefix, obj)
    return lines
}

export const getCurrentTimestamp = () => {
    const now = new Date()
    return now.toLocaleTimeString()
}