export type AuthContextValue = {
    loading: boolean,
    username: string | null,
    isAuthenticated: boolean,
    onboardingCompletedState: boolean,
    register: (username: string, password: string) => Promise<boolean>,
    login: (username: string, password: string) => Promise<boolean>,
    logout: () => void,
    resetCredentials: () => Promise<void>,
    setOnboardingCompleted: (completed: boolean) => Promise<void>,
    refresh: () => Promise<void>,
    biometricLogin: () => Promise<boolean>,
}