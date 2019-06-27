import './initial-components';
import {initRouter} from './navigation/router';

initRouter({
    notFoundRoute: {
        path: '404',
        component: 'app-not-found-page',
        page: import('./pages/not-found/not-found.page'),
    },
    routes: [
        {
            path: '',
            component: 'app-home-page',
            page: import('./pages/home/home.page'),
        },
        {
            path: 'settings',
            component: 'app-settings-page',
            page: import('./pages/settings/settings.page'),
        },
        {
            path: 'detail/video',
            component: 'app-detail-page',
            page: import('./pages/detail/detail.page'),
            hasVariable: true
        },
        {
            path: 'detail',
            component: 'app-detail-page',
            page: import('./pages/detail/detail.page'),
            hasVariable: true
        }
    ]
});
