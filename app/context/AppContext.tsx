'use client'

import React, { createContext, useContext, useState } from 'react'

interface AppContextType {
    rolId: string | null
    setRolId: (rolId: string) => void
    adminId: string | undefined
    personaId: string | undefined
    empresaId: string | undefined
    instructorId: string | undefined
    rolNombre: string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [rolId, setRolId] = useState<string>('')
    const adminId = process.env.NEXT_PUBLIC_NESTJS_ROL_ADMIN_ID
    const personaId = process.env.NEXT_PUBLIC_NESTJS_ROL_PERSONA_ID
    const instructorId = process.env.NEXT_PUBLIC_NESTJS_ROL_INSTRUCTOR_ID
    const empresaId = process.env.NEXT_PUBLIC_NESTJS_API_URL

    let rolNombre = ''

    if (rolId == adminId) {
        rolNombre = 'Administrador'
    } else if (rolId == personaId) {
        rolNombre = 'Persona'
    } else if (rolId == instructorId) {
        rolNombre = 'Instructor'
    } else if (rolId == empresaId) {
        rolNombre = 'Empresa'
    }

    return <AppContext.Provider value={{ rolId, setRolId, adminId, personaId, empresaId, instructorId, rolNombre }}>{children}</AppContext.Provider>
}

export const useRol = (): AppContextType => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error('useRol debe ser utilizado dentro de un RolProvider')
    }

    return context
}
