'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { pythonCode, goCode, debugSteps } from '@/lib/constants'
import ControlPanel from './control-panel'
import CodeDisplay from './code-display'
import DebugConsole from './debug-console'
import { Button } from "@/components/ui/button"

export default function DebugPortfolio() {
    const router = useRouter()
    const [language, setLanguage] = useState<'python' | 'go'>('python')
    const [currentLine, setCurrentLine] = useState(0)
    const [consoleOutput, setConsoleOutput] = useState<{ time: string, message: string }[]>([])
    const [isRunning, setIsRunning] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [currentSubStep, setCurrentSubStep] = useState(0)

    const codeContent = language === 'python' ? pythonCode : goCode

    const updateConsole = useCallback((step: number, subStep: number) => {
        const stepData = debugSteps[language][step];
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-ES', { hour12: false });

        if (stepData.output[subStep]) {
            const newOutput = { time: timeString, message: stepData.output[subStep] };
            setConsoleOutput(prev => {
                if (!prev.some(item => item.message === newOutput.message)) {
                    return [...prev, newOutput];
                }
                return prev;
            });
        }
    }, [language]);

    const handleStepOver = useCallback(() => {
        if (currentStep < debugSteps[language].length - 1) {
            setCurrentStep(prevStep => {
                const nextStep = prevStep + 1;
                updateConsole(nextStep, 0);
                return nextStep;
            });
            setCurrentSubStep(0);
        }
    }, [currentStep, language, updateConsole]);

    const handleStepInto = useCallback(() => {
        const currentStepData = debugSteps[language][currentStep];
        if (currentSubStep < currentStepData.lines.length - 1) {
            setCurrentSubStep(prevSubStep => {
                const nextSubStep = prevSubStep + 1;
                if (currentStepData.output[nextSubStep]) {
                    updateConsole(currentStep, nextSubStep);
                }
                return nextSubStep;
            });
        } else if (currentStep < debugSteps[language].length - 1) {
            setCurrentStep(prevStep => {
                const nextStep = prevStep + 1;
                updateConsole(nextStep, 0);
                return nextStep;
            });
            setCurrentSubStep(0);
        }
    }, [currentStep, currentSubStep, language, updateConsole]);

    const handleAuto = useCallback(() => {
        setIsRunning(true)
    }, [])

    const handleStop = useCallback(() => {
        setIsRunning(false)
    }, [])

    const handleReset = useCallback(() => {
        setCurrentStep(0)
        setCurrentSubStep(0)
        setConsoleOutput([])
        setIsRunning(false)
    }, [])

    useEffect(() => {
        handleAuto()
    }, [handleAuto])

    useEffect(() => {
        if (isRunning) {
            const timer = setTimeout(() => {
                if (currentStep < debugSteps[language].length - 1 ||
                    (currentStep === debugSteps[language].length - 1 &&
                        currentSubStep < debugSteps[language][currentStep].lines.length - 1)) {
                    handleStepInto();
                } else {
                    setIsRunning(false);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isRunning, currentStep, currentSubStep, language, handleStepInto]);

    useEffect(() => {
        setCurrentLine(debugSteps[language][currentStep].lines[currentSubStep])
    }, [currentStep, currentSubStep, language])

    return (
        <div className="h-screen bg-background text-foreground flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
                <ControlPanel
                    isRunning={isRunning}
                    onAuto={handleAuto}
                    onStop={handleStop}
                    onStepOver={handleStepOver}
                    onStepInto={handleStepInto}
                    onReset={handleReset}
                    currentStep={currentStep}
                    language={language}
                />
                <div className="flex-1 text-center">
                    <span className="text-sm text-muted-foreground">
                        Paso {currentStep + 1} de {debugSteps[language].length}: {debugSteps[language][currentStep].name}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={language} onValueChange={(value: 'python' | 'go') => setLanguage(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecciona un lenguaje" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="go">Go</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => router.push('/')}>Volver</Button>
                </div>
            </div>
            <div className="flex-1 flex overflow-hidden">
                <CodeDisplay codeContent={codeContent} currentLine={currentLine} />
                <DebugConsole consoleOutput={consoleOutput} />
            </div>
        </div>
    )
}