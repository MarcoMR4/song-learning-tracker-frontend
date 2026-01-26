export function useAuth() { 

    const supabaseAuth = useSupabaseClient().auth;

    const {
        showError,
        showSuccess
    } = useQuasarUi();

    const successRedirectTimeout = 500;
    const successRedirectLogoutTimeout = 500;

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
            }, successRedirectTimeout);
        }
    };

    const register = async (email: string, password: string) => {
        const { error } = await supabaseAuth.signUp({ email, password });
        if (error) {
            console.error('Register error:', error.message);
            showError('Registration failed: ' + error.message);
        } else {
            showSuccess('Registration successful!');
            setTimeout(() => {
                navigateTo('/login');
            }, successRedirectTimeout);
        }
    };

    const logout = async () => {
        const { error } = await supabaseAuth.signOut();
        if (error) {
            console.error('Logout error:', error.message);
            showError('Logout failed: ' + error.message);
        } 
        else {
            showSuccess('Logged out successfully');
            setTimeout(() => {
                navigateTo('/login');
            }, successRedirectLogoutTimeout);
        }
    };  

    return{ 
        login, 
        register, 
        logout 
    };
}