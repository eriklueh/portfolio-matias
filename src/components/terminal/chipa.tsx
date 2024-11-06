'use client'

import React, { useEffect, useState } from 'react'

export default function StaticOvalDonutTerminal() {
    const [terminalOutput, setTerminalOutput] = useState<string[]>([])

    useEffect(() => {
        const width = 80
        const height = 24
        const R1 = { x: 1, y: 0.5 }
        const R2 = { x: 2.5, y: 1 }
        const K2 = 5
        const K1 = width * K2 * 3 / (8 * (Math.max(R1.x, R1.y) + Math.max(R2.x, R2.y)))

        // Fixed angles for a static frame
        const A = 1.0
        const B = 0.5

        const buffer: string[] = new Array(width * height).fill(' ')
        const zBuffer: number[] = new Array(width * height).fill(0)

        for (let j = 0; j < 6.28; j += 0.07) {
            for (let i = 0; i < 6.28; i += 0.02) {
                const sinI = Math.sin(i)
                const cosJ = Math.cos(j)
                const sinA = Math.sin(A)
                const sinJ = Math.sin(j)
                const cosA = Math.cos(A)
                const cosI = Math.cos(i)
                const cosB = Math.cos(B)
                const sinB = Math.sin(B)

                const circleX = R2.x + R1.x * cosI
                const circleY = R1.y * sinI

                const x = circleX * (cosB * Math.cos(j) + sinA * sinB * sinJ) - circleY * cosA * sinB
                const y = R2.y * (sinB * Math.cos(j) - sinA * cosB * sinJ) + circleY * cosA * cosB
                const z = K2 + cosA * circleX * sinJ + circleY * sinA
                const ooz = 1 / z

                const xp = Math.floor(width / 2 + K1 * ooz * x)
                const yp = Math.floor(height / 2 - K1 * ooz * y)

                const L = cosI * cosJ * sinB - cosA * cosI * sinJ - sinA * sinI + cosB * (cosA * sinI - cosI * sinA * sinJ)

                if (L > 0) {
                    const idx = xp + yp * width
                    if (ooz > zBuffer[idx]) {
                        zBuffer[idx] = ooz
                        const luminanceIndex = Math.floor(L * 8)
                        buffer[idx] = '.,-~:;=!*#$@'[luminanceIndex > 0 ? luminanceIndex : 0]
                    }
                }
            }
        }

        const centerX = Math.floor(width / 2);
        const centerY = Math.floor(height / 2);
        const text = "chipa";
        for (let i = 0; i < text.length; i++) {
            const idx = (centerY - 9) * width + (centerX - Math.floor(text.length / 2) + i);
            buffer[idx] = text[i];
        }

        const frame = []
        for (let y = 0; y < height; y++) {
            let line = ''
            for (let x = 0; x < width; x++) {
                line += buffer[x + y * width]
            }
            frame.push(line)
        }

        setTerminalOutput([
            ...frame,

        ])
    }, [])

    return (
        <div className="bg-black text-yellow-500 p-1 font-mono">
            <pre className="text-xs leading-none whitespace-pre-wrap">
                {terminalOutput.join('\n')}
            </pre>
        </div>
    )
}