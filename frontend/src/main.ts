import {initRouter} from "./router";

initRouter({
    notFoundRoute: {
        path: 'not-found',
        component: 'app-not-found-page',
        page: import('./pages/not-found/not-found.page'),
    },
    routes: [
        {
            path: 'home',
            component: 'app-home-page',
            page: import('./pages/home/home.page'),
        }
    ]
});
