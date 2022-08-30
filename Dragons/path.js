import home from "./home.js";
import dragons from "./dragons.js";
import add_dragon from "./add_dragon.js";
import dragon from "./dragon.js";

const router = () => {
    const routes = [
        { path: '/', renderView: home },
        { path: '/dragons', renderView: dragons },
        { path: '/add_dragon', renderView: add_dragon },
        { path: '/dragon', renderView: dragon }
    ];
    const currentPath = location.pathname;
    const defaultRoute = routes[0];
    const route = routes.find(route => route.path === currentPath);

    const params = new URLSearchParams(location.search);

    const contentContainer = document.getElementById("content");
    if (contentContainer.firstChild) {
        contentContainer.removeChild(contentContainer.firstChild);
    }
    if (route) {
        const view = route.renderView(params);
        contentContainer.appendChild(view);
    }
    else {
        const view = defaultRoute.renderView(params);
        contentContainer.appendChild(view);
    }
};

const navigate = (path) => {
    history.pushState(null, null, path)
    router()
}
window.addEventListener('popstate', e => {
    router()
});
window.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', event => {
        event.preventDefault();
        if (event.target.matches('a')) {
            navigate(event.target.href);
        }
    });
    router()
})
