import getBooks from "./pages/book-list.js";
import addBook from "./pages/book-form.js";
import editBook from "./pages/book-edit.js";

export const navigateTo = (path) => {
    history.pushState(null, null, path);
    router();
}
const clearContentBlock = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
export const router = async () => {
    const routes = [
        { path: "/", renderView: getBooks },
        { path: "/add-book", renderView: addBook },
        { path: "/book", renderView: editBook }
    ];
    const currentPath = location.pathname;
    const params = new URLSearchParams(location.search);
    const routeMatch = routes.find(route => route.path === currentPath);
    const ContentBlock = document.getElementById("content");
    clearContentBlock(ContentBlock);
    if (routeMatch) {
        const view = await routeMatch.renderView(params);
        ContentBlock.appendChild(view);
    }
    else {
        const view = await routes[0].renderView(params);
        ContentBlock.appendChild(view);
    }
}