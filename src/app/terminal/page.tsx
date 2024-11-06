import {fileSystem} from "@/components/data";
import StaticOvalDonutTerminal from "@/components/terminal/chipa";
import Terminal from "@/components/terminal/terminal";

export default function TerminalPage() {
    return (
        <Terminal
            fileSystem={fileSystem}
            textColorClass="text-orange-500"
            dividerColorClass="via-orange-500"
            borderColorClass="border-orange-500"
            asciiArt={<StaticOvalDonutTerminal/>}
            initialMessage={[
                'Bienvenido al portfolio interactivo de Matias',
                'Usa comandos como "ls", "cd", "cat" y "tree" para explorar',
                'Escribe "help" para ver todos los comandos disponibles'
            ]}
        />
    )
}