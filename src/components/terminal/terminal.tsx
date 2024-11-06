'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Folder, File, Code } from 'lucide-react'
import { renderTree } from "@/components/terminal/utils"

interface FileSystem {
    [key: string]: string | FileSystem
}

interface OutputItem {
    command: string
    response: string[]
    timestamp: string
}

interface TerminalProps {
    fileSystem: FileSystem
    onBack?: () => void
    initialMessage?: string[]
    asciiArt?: React.ReactNode
    textColorClass?: string
    dividerColorClass?: string
    borderColorClass?: string
}

const commands = ['ls', 'cd', 'cat', 'tree', 'help', 'clean']


export default function Terminal({
                                     fileSystem,
                                     onBack,
                                     initialMessage = [],
                                     asciiArt,
                                     textColorClass = 'text-green-500',
                                     dividerColorClass = 'via-green-500',
                                     borderColorClass = 'border-green-500'
                                 }: TerminalProps) {
    const [output, setOutput] = useState<OutputItem[]>([])
    const [currentPath, setCurrentPath] = useState<string[]>([])
    const [currentInput, setCurrentInput] = useState('')
    const [suggestion, setSuggestion] = useState('')
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [isTyping, setIsTyping] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const shouldScrollRef = useRef(true)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const outputEndRef = useRef<HTMLDivElement>(null)

    const getCurrentDir = (path: string[] = currentPath) => {
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

    const isDirectory = (item: FileSystem | string): item is FileSystem => {
        return typeof item === 'object'
    }

    const getCurrentTimestamp = () => {
        const now = new Date()
        return now.toLocaleTimeString()
    }

    const handleCommand = async (command: string) => {
        setCommandHistory(prev => [...prev, command])
        setHistoryIndex(-1)

        const parts = command.split(' ')
        const cmd = parts[0]
        const args = parts.slice(1)
        let response: string[] = []

        switch (cmd) {
            case 'ls':
                let targetDir: FileSystem | string | null
                let targetPath: string[]
                if (args.length > 0) {
                    targetPath = [...currentPath, ...args]
                    targetDir = getCurrentDir(targetPath)
                } else {
                    targetPath = currentPath
                    targetDir = getCurrentDir()
                }
                if (targetDir && typeof targetDir === 'object') {
                    response = Object.keys(targetDir)
                } else {
                    response = ['No es un directorio válido']
                }
                break
            case 'cd':
                if (args.length === 0) {
                    setCurrentPath([])
                    response = ['Cambiado al directorio raíz']
                } else if (args[0] === '..') {
                    setCurrentPath(prev => prev.slice(0, -1))
                    response = ['Subiendo un nivel de directorio']
                } else {
                    const newPath = args[0].split('/').filter(Boolean)
                    const tempPath = [...currentPath]
                    let valid = true

                    for (const dir of newPath) {
                        if (dir === '..') {
                            if (tempPath.length > 0) {
                                tempPath.pop()
                            }
                        } else {
                            const nextDir = getCurrentDir(tempPath)
                            if (nextDir && typeof nextDir === 'object' && dir in nextDir) {
                                if (isDirectory(nextDir[dir])) {
                                    tempPath.push(dir)
                                } else {
                                    valid = false
                                    break
                                }
                            } else {
                                valid = false
                                break
                            }
                        }
                    }

                    if (valid) {
                        setCurrentPath(tempPath)
                        response = [`Cambiado al directorio: ${tempPath.join('/')}`]
                    } else {
                        response = ['No es un directorio válido o es un archivo']
                    }
                }
                break
            case 'cat':
                if (args[0]) {
                    const currentDir = getCurrentDir()
                    if (currentDir && typeof currentDir === 'object' && args[0] in currentDir) {
                        const content = currentDir[args[0]]
                        if (typeof content === 'string') {
                            response = [content]
                        } else {
                            response = ['No es un archivo válido']
                        }
                    } else {
                        response = ['Archivo no encontrado']
                    }
                }
                break
            case 'tree':
                let treeDir: FileSystem | string | null
                let treePath: string[]
                if (args.length > 0) {
                    treePath = [...currentPath, ...args]
                    treeDir = getCurrentDir(treePath)
                } else {
                    treePath = currentPath
                    treeDir = getCurrentDir()
                }
                if (treeDir && typeof treeDir === 'object') {
                    response = renderTree(treeDir, treePath.join('/') || '.')
                } else {
                    response = ['No es un directorio válido']
                }
                break
            case 'help':
                response = [
                    'Comandos disponibles:',
                    'ls [directorio] - Listar contenido del directorio actual o especificado',
                    'cd <directorio> - Cambiar al directorio especificado (acepta rutas completas)',
                    'cat <archivo> - Mostrar contenido del archivo',
                    'tree [directorio] - Mostrar estructura de directorios del directorio actual o especificado',
                    'clean - Limpiar la pantalla',
                    'help - Mostrar esta ayuda',
                ]
                break
            case 'clean':
                setOutput([])
                setCurrentPath([])
                return
            default:
                response = ['Comando no reconocido. Usa "help" para ver los comandos disponibles.']
        }

        setIsTyping(true)
        shouldScrollRef.current = true
        const newOutput: OutputItem = {
            command,
            response: [],
            timestamp: getCurrentTimestamp()
        }
        setOutput(prev => [...prev, newOutput])

        for (let i = 0; i < response.length; i++) {
            await new Promise<void>(resolve => {
                setTimeout(() => {
                    setOutput(prev => {
                        const updated = [...prev]
                        const lastItem = updated[updated.length - 1]
                        if (!lastItem.response.includes(response[i])) {
                            lastItem.response.push(response[i])
                        }
                        return updated
                    })
                    resolve()
                }, 50)
            })
        }
        setIsTyping(false)
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }, 0)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isTyping) {
            e.preventDefault()
            return
        }

        if (e.key === 'Enter') {
            handleCommand(currentInput)
            setCurrentInput('')
            setSuggestion('')
        } else if (e.key === 'Tab') {
            e.preventDefault()
            if (suggestion) {
                setCurrentInput(currentInput + suggestion)
                setSuggestion('')
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1
                setHistoryIndex(newIndex)
                setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1
                setHistoryIndex(newIndex)
                setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
            } else if (historyIndex === 0) {
                setHistoryIndex(-1)
                setCurrentInput('')
            }
        }
    }

    const updateSuggestion = (input: string) => {
        const [cmd, ...args] = input.split(' ')
        let possibleSuggestion = ''

        if (args.length === 0) {
            if (cmd === '') {
                possibleSuggestion = 'tree'
            } else {
                const matchingCommand = commands.find(c => c.startsWith(cmd) && c !== cmd)
                if (matchingCommand) {
                    possibleSuggestion = matchingCommand.slice(cmd.length)
                }
            }
        } else {
            const path = args.join(' ').split('/')
            const lastPart = path.pop() || ''
            let currentDir: FileSystem | string | null = fileSystem

            for (const part of path) {
                if (typeof currentDir === 'object' && part in currentDir) {
                    currentDir = currentDir[part]
                } else {
                    currentDir = null
                    break
                }
            }

            if (currentDir && typeof currentDir === 'object') {
                const items = Object.keys(currentDir)
                const suggestion = items.find(item => item.startsWith(lastPart) && item !== lastPart)
                if (suggestion) {
                    possibleSuggestion = suggestion.slice(lastPart.length)
                }
            }
        }

        setSuggestion(possibleSuggestion)
    }

    useEffect(() => {
        setOutput([
            {
                command: 'init',
                response: initialMessage.length > 0 ? initialMessage : [
                    'Bienvenido al terminal interactivo',
                    'Usa comandos como "ls", "cd", "cat" y "tree" para explorar',
                    'Escribe "help" para ver todos los comandos disponibles'
                ],
                timestamp: getCurrentTimestamp()
            }
        ])
    }, [initialMessage])

    useEffect(() => {
        if (scrollAreaRef.current && shouldScrollRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }, [output])

    useEffect(() => {
        if (outputEndRef.current) {
            outputEndRef.current.scrollIntoView({behavior: 'smooth'})
        }
    }, [output])

    useEffect(() => {
        updateSuggestion(currentInput)
    }, [currentInput])

    return (
        <div className="h-full bg-black p-4 font-mono">
            <Card className={`w-full h-full bg-black ${borderColorClass}`}>
                <CardHeader>
                    <CardTitle className={`${textColorClass}`}>Terminal</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[calc(100vh-200px)] w-full pr-4" ref={scrollAreaRef}>
                        {asciiArt}
                        {output.map((item, index) => (
                            <div key={index}>
                                <div className="mb-2">
                                    <span className={`${textColorClass}`}>[{item.timestamp}] </span>
                                    <span className={`${textColorClass}`}>$ {item.command}</span>
                                </div>
                                {item.response.map((line, lineIndex) => (
                                    <div key={lineIndex} className="ml-4">
                                        {line.includes('/') ? <Folder className="inline mr-2" size={16}/> :
                                            line.includes('.') ? <File className="inline mr-2" size={16}/> :
                                                <Code className="inline mr-2" size={16}/>}
                                        {line}
                                    </div>
                                ))}
                                {index < output.length - 1 && (
                                    <div className="my-5 flex items-center">
                                        <div className={`flex-grow h-px bg-gradient-to-r from-transparent ${dividerColorClass} to-transparent`}></div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={outputEndRef}/>
                        <div className="flex items-center relative">
                            <span className={`${textColorClass}`}>user@terminal:~{currentPath.length > 0 ? '/' + currentPath.join('/') : ''}$</span>
                            <div className="flex-grow relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={currentInput}
                                    onChange={(e) => setCurrentInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className={`bg-transparent border-none outline-none w-full ${textColorClass} font-bold`}
                                    autoFocus
                                    disabled={isTyping}
                                />
                                <span className={`absolute left-0 text-${textColorClass} pointer-events-none opacity-50`}>
                                    {currentInput}{suggestion}
                                </span>
                            </div>
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <span className={`text-xs ${textColorClass}`}>Tip: Usa Tab para autocompletar, ↑↓ para navegar el historial</span>
                    {onBack && (
                        <Button variant="outline" onClick={onBack}
                                className={`${textColorClass} ${borderColorClass} hover:bg-green-500 hover:text-black`}>
                            Salir
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}