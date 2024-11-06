import { Button } from "@/components/ui/button"
import { Play, Square, StepForward, CornerDownRight, RotateCcw } from 'lucide-react'
import { debugSteps } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface ControlPanelProps {
    isRunning: boolean
    onAuto: () => void
    onStop: () => void
    onStepOver: () => void
    onStepInto: () => void
    onReset: () => void
    currentStep: number
    language: 'python' | 'go'
}

export default function ControlPanel({
                                         isRunning,
                                         onAuto,
                                         onStop,
                                         onStepOver,
                                         onStepInto,
                                         onReset,
                                         currentStep,
                                         language
                                     }: ControlPanelProps) {
    return (
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="sm"
                onClick={onAuto}
                disabled={isRunning}
                className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
            >
                <Play className="h-4 w-4 mr-2" />
                Auto
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={onStop}
                disabled={!isRunning}
                className={cn(
                    "text-red-400 hover:text-red-300 hover:bg-red-500/10",
                    isRunning && "bg-red-500/20"
                )}
            >
                <Square className="h-4 w-4 mr-2" />
                Stop
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={onStepOver}
                disabled={isRunning || currentStep === debugSteps[language].length - 1}
                className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
            >
                <StepForward className="h-4 w-4 mr-2" />
                Step Over
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={onStepInto}
                disabled={isRunning || (currentStep === debugSteps[language].length - 1 &&
                    currentStep === debugSteps[language][currentStep].lines.length - 1)}
                className="text-purple-500 hover:text-purple-400 hover:bg-purple-500/10"
            >
                <CornerDownRight className="h-4 w-4 mr-2" />
                Step Into
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10"
            >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
            </Button>
        </div>
    )
}