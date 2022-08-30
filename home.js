const home = () => {
    const div = document.createElement("div");
    const heading = document.createElement("h1");
    heading.textContent = "Home page";
    const content = document.createElement("h4");
    content.textContent = "A dragon is a large, serpentine legendary creature that appears in the folklore of many cultures around the world.\n" +
        "Beliefs about dragons vary considerably through regions, but dragons in western cultures since the High Middle Ages\n" +
        "have often been depicted as winged, horned, four-legged, and capable of breathing fire. Dragons in eastern cultures\n" +
        "are usually depicted as wingless, four-legged, serpentine creatures with above-average intelligence.";
    div.appendChild(heading);
    div.appendChild(content);
    return div;
}

export default home;