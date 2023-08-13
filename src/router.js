import { createRouter, createWebHistory } from 'vue-router'


// Компоненты страниц
import { ItemPage, ExperiencePage, TasksPage, LoginPage } from './views';


export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/',
            name: 'profile',
            component: ItemPage,
        },
        {
            path: '/experience',
            name: 'experience',
            component: ExperiencePage
        },
        {
            path: '/items/:item',
            name: 'items',
            component: ItemPage
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: TasksPage
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/logout',
            name: 'logout',
            component: ItemPage
        },
    ]
})