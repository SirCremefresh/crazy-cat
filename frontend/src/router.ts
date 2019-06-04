import './components/layout/layout.component';

interface Route {
	component: string,
	path: string,
	hasVariable?: boolean,
	page: any
}

const mountPoint: HTMLElement = document.getElementById('app');

let layout: HTMLElement;
let routes: Route[];
let notFoundRoute: Route;

export function initRouter(options: {
	routes: Route[], notFoundRoute: Route
}): Promise<void> {
	routes = options.routes;
	notFoundRoute = options.notFoundRoute;
	window.onpopstate = () => updateRoute();
	layout = document.createElement('app-layout');
	mountPoint.appendChild(layout);
	return updateRoute();
}

export function navigateTo(path: string) {
	path = trimSlashes(path);

	history.pushState({}, path, trimSlashes(path));
	return updateRoute();
}

function trimSlashes(path: string) {
	return path.toString().replace(/\/$/, '').replace(/^\//, '');
}

function getPath(): string {
	const path = decodeURI(window.location.pathname);
	return trimSlashes(path);
}

function findRoute(path: string): Route {

	return routes.find((route) => {
		if (route.hasVariable) {
			return route.path === path.slice(0, path.lastIndexOf('/'));
		} else {
			return route.path === path;
		}
	});
}

async function updateRoute(): Promise<void> {
	const route = findRoute(getPath());

	let component;
	if (route === undefined) {
		await notFoundRoute.page;
		component = notFoundRoute.component;
		history.pushState({}, 'not found', trimSlashes(notFoundRoute.path));
	} else {
		await route.page;
		component = route.component;
	}

	while (layout.firstChild) {
		layout.removeChild(layout.firstChild);
	}

	layout.appendChild(document.createElement(component));
}
