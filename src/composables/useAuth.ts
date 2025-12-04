export function useAuth() { 

    const supabaseAuth = useSupabaseClient().auth;

    const {
        showError,
        showSuccess
    } = useQuasarUi();

    const login = async (email: string, password: string) => {
        const { error } = await supabaseAuth.signInWithPassword({ email, password });
        if (error) {
            console.error('Login error:', error.message);
            showError('Login failed: ' + error.message);
        } else {
            console.log('Login successful');
            showSuccess('Welcome!');
            setTimeout(() => {
                navigateTo('/');
            }, 3000);
        }
    };

    const register = async (email: string, password: string) => {
        const { error } = await supabaseAuth.signUp({ email, password });
        if (error) {
            console.error('Register error:', error.message);
            showError('Registration failed: ' + error.message);
        } else {
            console.log('Registration successful');
            showSuccess('Registration successful!');
            navigateTo('/login');
        }
    };

    const logout = async () => {
        const { error } = await supabaseAuth.signOut();
        if (error) {
            console.error('Logout error:', error.message);
            showError('Logout failed: ' + error.message);
        } 
        else {
            console.log('Logout successful');
            showSuccess('Logged out successfully');
            setTimeout(() => {
                navigateTo('/login');
            }, 3000);
           
        }
    };  

    return{ 
        login, 
        register, 
        logout 
    };
}