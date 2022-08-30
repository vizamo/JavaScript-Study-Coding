const add_dragon = () => {
    const div = document.createElement("div");
    const heading = document.createElement("h1");
    heading.textContent = "Create new dragon!";
    const content = document.createElement("h4");
    content.textContent = "Dragon name: \n" +
        "Dragon age: \n" +
        "Dragon history: \n";
    div.appendChild(heading);
    div.appendChild(content);
    return div;
}

export default add_dragon;