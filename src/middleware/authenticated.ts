export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser();
  const to = useRoute();

  const publicRoutes = ['/login', '/register', '/forgot-password'];

  if (publicRoutes.includes(to.path)) {
    return;
  }

  if (!user.value) {
    return navigateTo('/login');
  }
})