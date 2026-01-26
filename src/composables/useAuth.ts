export function useAuth() { 

    const supabaseAuth = useSupabaseClient().auth;

    const {
        showError,
        showSuccess
    } = useQuasarUi();

    const loading = ref(false);

    const login = async (email: string, password: string) => {
        loading.value = true;
        try {
            const { error } = await supabaseAuth.signInWithPassword({ email, password });
            if (error) {
                console.error('Login error:', error.message);
                showError('Login failed: ' + error.message);
            } else {
                showSuccess('Welcome!');
                navigateTo('/');
            }
        } catch (err) {
            console.error('Unexpected error in login:', err);
            showError('Unexpected error during login.');
        } finally {
            loading.value = false;
        }
    };

    const register = async (email: string, password: string) => {
        loading.value = true;
        try {
            const { error } = await supabaseAuth.signUp({ email, password });
            if (error) {
                console.error('Register error:', error.message);
                showError('Registration failed: ' + error.message);
            } else {
                showSuccess('Registration successful!');
                navigateTo('/login');
            }
        } catch (err) {
            console.error('Unexpected error in register:', err);
            showError('Unexpected error during registration.');
        } finally {
            loading.value = false;
        }
    };

    const logout = async () => {
        loading.value = true;
        try {
            const { error } = await supabaseAuth.signOut();
            if (error) {
                console.error('Logout error:', error.message);
                showError('Logout failed: ' + error.message);
            } 
            else {
                showSuccess('Logged out successfully');
                navigateTo('/login');
            }
        } catch (err) {
            console.error('Unexpected error in logout:', err);
            showError('Unexpected error during logout.');
        } finally {
            loading.value = false;
        }
    };  

    return{ 
        login, 
        register, 
        logout,
        loading
    };
}