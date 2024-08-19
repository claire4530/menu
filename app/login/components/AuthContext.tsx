// AuthContext.js
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
    username: string
    password: string
}

interface AuthContextType {
    user: User | null
    signUp: (username: string, password: string) => void
    signIn: (username: string, password: string) => boolean
    signOut: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const signUp = (username: string, password: string) => {
        // Here you can save the username and password to local storage or send them to an API for storage
        setUser({ username, password })
    }

    const signIn = (username: string, password: string) => {
        // Here you can implement your sign-in logic, for now, I'll just compare with the saved user
        const savedUser = localStorage.getItem('user')
        if (
            savedUser &&
            JSON.parse(savedUser).username === username &&
            JSON.parse(savedUser).password === password
        ) {
            setUser(JSON.parse(savedUser))
            return true
        } else {
            return false
        }
    }

    const signOut = () => {
        // Here you can implement sign-out logic
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
