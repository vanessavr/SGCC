import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import React from 'react'
import { AppProvider } from './context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'SGCC',
    description: 'Sistema de Gestión de Cursos Complementarios CPIC',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <AppProvider>
                    {children}
                    <Toaster />
                </AppProvider>
            </body>
        </html>
    )
}
