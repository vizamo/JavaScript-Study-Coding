import { navigateTo } from "../router.js";
import {build, createButton, displayErrors, GradeInput, ReadInput, textInput} from "../func.js";

const editBook = async (params) => {
    document.title = "Book edit page";
    const page = build("div");
    page.id = "block";

    const bookId = params.get("id");
    let book;
    if (bookId) {
        book = await fetch(`/data/index.php?cmd=findById&id=${encodeURIComponent(bookId)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response;
            })
            .then(response => response.json())
            .catch(error => console.log("Book not found"));
    }

    if (book) {
        const bookEditForm = createBookEditForm(book);
        page.appendChild(bookEditForm);
    } else {
        const alert = build("div", "Book not found");
        alert.className = "error-block";
        alert.role = "alert";
        page.appendChild(alert);
    }

    return page;
}

function createBookEditForm(book) {
    const titleGroup = textInput("Title:", "title", "title", "", "Write here books title", book.title);
    const gradeGroup = GradeInput("Grade:", book.grade);
    const isReadGroup = ReadInput("Read:", book.isRead);

        const submitButton = createButton("Edit book", "submitButton", "submit_button")
        submitButton.addEventListener("click", e => {
            e.preventDefault();
            const title = document.getElementById("title").value;
            const grade = document.getElementsByName("grade").values;
            const isRead = document.getElementById("isRead").value;

            const dataToSend = {
                title,
                grade,
                isRead
            };

        fetch(`data/index.php?cmd=edit_book&id=${encodeURIComponent(book.id)}`, {
            method: "POST",
            body: JSON.stringify(dataToSend)
        })
            .then(async response => {
                if (response.ok) {
                    navigateTo("/?success=2");
                }
                else {
                    return response.json().then(errorBody => {
                        const error = new Error(response.statusText);
                        error.data = errorBody;
                        throw error;
                    })
                }
            })
            .catch(error => displayErrors(error.data["errors"]));

    });
    const deleteButton = createButton("Delete book", "deleteButton", "delete_button")
    deleteButton.addEventListener("click", e => {
        e.preventDefault();
        fetch(`data/index.php?cmd=delete_book&id=${encodeURIComponent(book.id)}`, { method: "POST" })
            .then(async response => {
                if (response.ok) {
                    navigateTo("/?success=3");
                }
        return deleteButton;
    })})
    const submit = build("tr", deleteButton, submitButton);

    const tableInput = build("table",
        titleGroup,
        gradeGroup,
        isReadGroup,
        submit);
    tableInput.className = "fill_table"
    const formInput = build("form", tableInput)
    formInput.className = "fill_form"
    return formInput
    }


export default editBook;