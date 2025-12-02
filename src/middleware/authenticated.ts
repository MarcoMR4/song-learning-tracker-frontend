export default defineNuxtRouteMiddleware(() => {
    const user = useSupabaseUser();
    console.log('User:', user.value);
    if (!user.value){
        return navigateTo('/login');
    }
});