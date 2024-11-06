'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Github, Linkedin, Mail } from 'lucide-react'

const skills = [
    { name: 'Desarrollo Web', level: 'Experto' },
    { name: 'Aplicaciones Móviles', level: 'Avanzado' },
    { name: 'Diseño de Sistemas', level: 'Intermedio' },
    { name: 'Gestión de Proyectos', level: 'Avanzado' },
    { name: 'Inteligencia Artificial', level: 'Básico' },
    { name: 'Experiencia de Usuario', level: 'Intermedio' },
]

const projects = [
    {
        name: 'Tienda en Línea',
        description: 'Creé una plataforma de compras en línea fácil de usar y segura',
        impact: 'Ayudó a pequeños negocios a vender sus productos en internet'
    },
    {
        name: 'App de Recordatorios',
        description: 'Desarrollé una aplicación móvil para gestionar tareas y recordatorios',
        impact: 'Mejoró la productividad de más de 10,000 usuarios'
    },
    {
        name: 'Sistema de Reservas',
        description: 'Diseñé un sistema para reservar citas en línea',
        impact: 'Redujo los tiempos de espera en clínicas y salones de belleza'
    }
]

export default function NormalView() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('about')

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl shadow-lg">
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-20 h-20 border-2 border-orange-500">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Matias" />
                            <AvatarFallback>MA</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-3xl font-bold text-foreground">Matias</CardTitle>
                            <CardDescription className="text-lg text-muted-foreground">Creador de Soluciones Digitales</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="about">Sobre mí</TabsTrigger>
                            <TabsTrigger value="skills">Habilidades</TabsTrigger>
                            <TabsTrigger value="projects">Proyectos</TabsTrigger>
                        </TabsList>
                        <TabsContent value="about">
                            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                <p className="text-lg text-muted-foreground">
                                    ¡Hola! Soy Matias, un apasionado creador de soluciones digitales. Me dedico a construir
                                    aplicaciones y sitios web que hacen la vida más fácil a las personas y ayudan a los negocios
                                    a crecer en el mundo digital.
                                </p>
                                <p className="text-lg mt-4 text-muted-foreground">
                                    Mi objetivo es crear tecnología que sea fácil de usar y realmente útil. Me encanta
                                    enfrentarme a nuevos desafíos y encontrar formas creativas de resolver problemas complejos.
                                </p>
                                <p className="text-lg mt-4 text-muted-foreground">
                                    Cuando no estoy frente a la computadora, disfruto de la fotografía, los viajes y el senderismo.
                                    Estas actividades me inspiran y me ayudan a tener nuevas ideas para mis proyectos.
                                </p>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="skills">
                            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {skills.map((skill) => (
                                        <Card key={skill.name} className="p-4">
                                            <CardTitle className="text-lg text-foreground">{skill.name}</CardTitle>
                                            <CardDescription className="text-muted-foreground">{skill.level}</CardDescription>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="projects">
                            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                {projects.map((project) => (
                                    <Card key={project.name} className="mb-4 p-4">
                                        <CardTitle className="text-xl text-foreground">{project.name}</CardTitle>
                                        <CardDescription className="mt-2 text-muted-foreground">{project.description}</CardDescription>
                                        <div className="mt-2">
                                            <Badge className="mt-2 bg-orange-500 text-white">Impacto: {project.impact}</Badge>
                                        </div>
                                    </Card>
                                ))}
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <Button variant="outline" size="icon" onClick={() => window.open('https://github.com/matias-dev', '_blank')}
                                className="text-foreground border-orange-500 hover:bg-orange-500 hover:text-white">
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => window.open('https://linkedin.com/in/matias-dev', '_blank')}
                                className="text-foreground border-orange-500 hover:bg-orange-500 hover:text-white">
                            <Linkedin className="h-4 w-4" />
                            <span className="sr-only">LinkedIn</span>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => window.location.href = 'mailto:matias@example.com'}
                                className="text-foreground border-orange-500 hover:bg-orange-500 hover:text-white">
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Email</span>
                        </Button>
                    </div>
                    <Button variant="outline" onClick={() => router.push('/')}
                            className="text-foreground border-orange-500 hover:bg-orange-500 hover:text-white">
                        Volver al Inicio
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}