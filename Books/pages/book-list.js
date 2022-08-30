import { build } from "../func.js";

const getBooks = async (params) => {
    document.title = "List of books";

    const books = await fetch("../data/index.php?cmd=show_books")
        .then(response => response.json());
    const page = document.createElement("div");
    page.id = "block"

    const table_values = build("table");
    books.forEach(book => {
        const titlerow = build("td", linkToContact(book))
        const authorsrow = build("td", "Authors")
        const graderow = build("td", parseInt(book.grade))
        titlerow.className = "table_values_text"
        authorsrow.className = "table_values_text"
        graderow.className = "table_values_grade"
        const row = build("tr", titlerow, authorsrow, graderow)
        table_values.appendChild(row);
    });
    table_values.className = "table_values_data"

    const table_heading = build("table",
            build("tr",
                build("th", "Title"),
                build("th", "Authors"),
                build("th", "Grade")
            )
    )
    table_heading.className = "table_heading";

    if (params.get('success')) {
        const msg = build("div")
        if (params.get('success') === "1") {
            msg.className = "suc-add-box";
            msg.textContent = "Book is successfully added";
        }
        else if (params.get('success') === "2") {
            msg.className = "suc-change-box";
            msg.textContent = "Book is successfully changed";
        }
        else if (params.get('success') === "3") {
            msg.className = "suc-del-box";
            msg.textContent = "Book is successfully deleted";
        }
        msg.id = "message-block"
        page.prepend(msg);
    }
    page.appendChild(table_heading);
    page.appendChild(table_values);
    return page;
}
function linkToContact(book) {
    const link = build("a", book.title);
    link.href = `/book?id=${encodeURIComponent(book.id)}`;
    link.setAttribute("navigation-link", "");
    return link;
}

export default getBooks;