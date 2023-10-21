import {createRouter, createWebHistory} from "vue-router";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Movies from "@/pages/Movies";

const routes = [
    { path: '/login', component: Login},
    { path: '/signup', component: Signup},
    { path: '/movies', component: Movies,
        beforeEnter: (to, from, next) => {
            console.log('toooooo', to, from, next)
            if (to.path === '/movies'  && !localStorage.getItem('token')) {
                // Si el usuario no tiene un token válido, redirígelo a la página de inicio de sesión
                next('/login');
            } else {
                // Permite el acceso a la ruta
                next();
            }
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;