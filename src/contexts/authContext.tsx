import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { AuthContextValue } from "../types/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import KeyChain from 'react-native-keychain'

export const KEYCHAIN_SERVICE = '@app:user-password'
export const ONBOARDING_KEY = '@app:onboarding-completed'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [username, setUsername] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [onboardingCompletedState, setOnboardingCompletedState] = useState<boolean>(false)

    const loadOnboarding = async () => {
        const value = await AsyncStorage.getItem(ONBOARDING_KEY)
        setOnboardingCompletedState(value === 'true')
    }

    const loadCredentials = async () => {
        const creds = await KeyChain.getGenericPassword({ service: KEYCHAIN_SERVICE })
        if (creds) {
            setUsername(creds.username)
            setIsAuthenticated(true)
        }
        setUsername(null)
    }

    useEffect(() => {
        loadCredentials()
        loadOnboarding()
    }, [])

    const register = async (usr: string, pwd: string) => {
        try {
            const result = await KeyChain.setGenericPassword(usr, pwd, { service: KEYCHAIN_SERVICE })
            return !!result
        } catch (error) {
            return false
        }
    }

    const login = async (usr: string, pwd: string) => {
        try {
            const creds = await KeyChain.getGenericPassword({ service: KEYCHAIN_SERVICE })
            if (creds && creds.username === usr && creds.password === pwd) {
                setUsername(usr)
                setIsAuthenticated(true)
                return true
            }
            return false
        } catch (error) {
            return false
        }
    }

    const logout = async () => {
        await KeyChain.resetGenericPassword({service: KEYCHAIN_SERVICE})
        setIsAuthenticated(false)
        setUsername(null)
    }

    const resetCredentials = async () => {
        try {
            await KeyChain.getGenericPassword({ service: KEYCHAIN_SERVICE })
            setUsername(null)
            setIsAuthenticated(false)
        } catch (error) {
            console.log(error)
        }
    }

    const setOnboardingCompleted = async (completed: boolean) => {
        await AsyncStorage.setItem(ONBOARDING_KEY, completed ? 'true' : 'false')
        setOnboardingCompletedState(completed)
    }

    const refresh = async () => {
        await Promise.all([loadOnboarding(), loadCredentials()])
    }

    const value = useMemo<AuthContextValue>(() => ({
        username,
        isAuthenticated,
        onboardingCompletedState,
        register,
        login,
        logout,
        resetCredentials,
        setOnboardingCompleted,
        refresh,
    }), [username, isAuthenticated, onboardingCompletedState])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return ctx
}
