const dragons = () => {
    const div = document.createElement("div");
    const heading = document.createElement("h1");
    heading.textContent = "Dragons list";
    const content = document.createElement("h4");
    content.textContent = "Ancalagon the Black - The greatest of the winged dragons. Created by the Dark Lord Melkor. Destroyed by Eärendil during the War of Wrath. \n" +
        "Chrysophylax Dives - A wily dragon who loses a battle of wills to Farmer Giles." +
        "Dagurashibanipal - An ancient dragon, whose looted horde provides a tribe of orcs with the means to rise above their cannon-fodder station in the Evil Horde of Darkness.";
    div.appendChild(heading);
    div.appendChild(content);
    return div;
}

export default dragons;
