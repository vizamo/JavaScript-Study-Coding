const dragon = (params) => {
    const div = document.createElement("div");
    const heading = document.createElement("h1");

    if (params.get('id')) {
        heading.textContent = 'Dragon id = ${params.get('id')}'
    }
    else {
        heading.textContent = 'Error input';
    }

    div.appendChild(heading);
    return div;
}

export default dragon;