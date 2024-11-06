import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CodeDisplayProps {
    codeContent: string[]
    currentLine: number
}

export default function CodeDisplay({ codeContent, currentLine }: CodeDisplayProps) {
    const codeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (codeRef.current) {
            const lineElement = codeRef.current.querySelector(`[data-line="${currentLine}"]`)
            if (lineElement) {
                lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }
    }, [currentLine])

    return (
        <div className="flex-1 overflow-auto p-4 font-mono" ref={codeRef}>
            {codeContent.map((line, index) => (
                <div
                    key={index}
                    data-line={index + 1}
                    className={`relative ${currentLine === index + 1 ? 'bg-accent text-accent-foreground' : ''}`}
                >
                    <span className="inline-block w-8 text-muted-foreground select-none">{index + 1}</span>
                    <span>{line}</span>
                    {currentLine === index + 1 && (
                        <motion.div
                            className="absolute left-0 w-full h-full border-l-2 border-primary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}