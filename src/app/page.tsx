'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Terminal, Code } from 'lucide-react'

const viewOptions = [
    { name: 'Versión Amigable', icon: User, description: 'Una vista fácil de entender para todos', path: '/normal' },
    { name: 'Versión Terminal', icon: Terminal, description: 'Explora mi trabajo como si fueras un desarrollador', path: '/terminal' },
    { name: 'Versión Técnica', icon: Code, description: 'Analiza el código detrás de mi portfolio', path: '/debug' }
]

export default function Home() {
    const [hoveredView, setHoveredView] = useState<string | null>(null)
    const router = useRouter()

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl shadow-lg">
                <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-orange-500">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Matias" />
                        <AvatarFallback>MA</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl font-bold text-foreground">Bienvenido al Portfolio de Matias</CardTitle>
                    <CardDescription className="text-xl mt-2 text-muted-foreground">
                        Desarrollador de Software & Creador de Soluciones Digitales
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center mb-6">
                    <p className="text-lg text-muted-foreground">
                        Explora mi trabajo de tres maneras diferentes. Elige la que más te guste o te resulte más cómoda.
                    </p>
                </CardContent>
                <CardContent className="grid gap-6 sm:grid-cols-3">
                    {viewOptions.map((option) => (
                        <motion.div
                            key={option.name}
                            whileHover={{ scale: 1.05 }}
                            onHoverStart={() => setHoveredView(option.name)}
                            onHoverEnd={() => setHoveredView(null)}
                        >
                            <Card
                                className={`h-full cursor-pointer transition-colors ${
                                    hoveredView === option.name ? 'bg-secondary' : ''
                                }`}
                                onClick={() => router.push(option.path)}
                            >
                                <CardHeader>
                                    <option.icon className="w-12 h-12 mx-auto mb-2 text-orange-500" />
                                    <CardTitle className="text-xl text-center text-foreground">{option.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-center text-muted-foreground">{option.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </CardContent>
                <CardFooter className="flex justify-center mt-6">
                    <Button variant="outline" onClick={() => window.open('https://linkedin.com/in/matias-dev', '_blank')}
                            className="text-foreground border-orange-500 hover:bg-orange-500 hover:text-white">
                        Conéctate conmigo en LinkedIn
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}