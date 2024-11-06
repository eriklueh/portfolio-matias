export interface FileSystem {
    [key: string]: string | FileSystem
}

export interface OutputItem {
    command: string
    response: string[]
    timestamp: string
}

export interface TerminalProps {
    fileSystem: FileSystem
    onBack?: () => void
    initialMessage?: string[]
    asciiArt?: React.ReactNode
}