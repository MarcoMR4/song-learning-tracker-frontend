export function useAuth() { 

    const supabaseAuth = useSupabaseClient().auth;

    const login = async (email: string, password: string) => {
        const { error } = await supabaseAuth.signInWithPassword({ email, password });
        if (error) {
            console.error('Login error:', error.message);
            alert('Login failed: ' + error.message);
        } else {
            console.log('Login successful');
            navigateTo('/');
        }
    };

    const register = async (email: string, password: string) => {
        const { error } = await supabaseAuth.signUp({ email, password });
        if (error) {
            console.error('Register error:', error.message);
            alert('Registration failed: ' + error.message);
        } else {
            console.log('Registration successful');
            navigateTo('/login');
        }
    };

    const logout = async () => {
        const { error } = await supabaseAuth.signOut();
        if (error) {
            console.error('Logout error:', error.message);
            alert('Logout failed: ' + error.message);
        } 
        else {
            console.log('Logout successful');
            navigateTo('/login');
        }
    };  

    return{ 
        login, 
        register, 
        logout 
    };
}