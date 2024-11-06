import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

interface DebugConsoleProps {
    consoleOutput: { time: string; message: string }[]
}

export default function DebugConsole({ consoleOutput }: DebugConsoleProps) {
    return (
        <div className="w-1/3 border-l flex flex-col">
            <div className="p-2 flex items-center gap-2 border-b">
                <Terminal className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">Debug Console</span>
            </div>
            <div className="flex-1 bg-muted p-4 font-mono text-sm overflow-auto">
                {consoleOutput.map((output, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-primary"
                    >
                        <span className="text-muted-foreground">{output.time}</span> {output.message}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}