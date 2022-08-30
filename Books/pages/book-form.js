import {build, displayErrors, createButton, textInput, GradeInput, ReadInput} from "../func.js";
import { navigateTo } from "../router.js";

const addBook = async () => {
    document.title = "Create new book in the list";

    const page = build("div");
    page.id = "block"
    const form = createBookForm();

    page.appendChild(form);
    return page;
}

function createBookForm() {
    const titleGroup = textInput("Title:", "title", "title", "", "Write here books title", "");
    const gradeGroup = GradeInput("Grade:", 0);
    const isReadGroup = ReadInput("Read:", 0);

    const submitButton = createButton("Save book", "submitButton", "submit_button")
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

        fetch(`data/index.php?cmd=save_book`, {
            method: "POST",
            body: JSON.stringify(dataToSend)
        })
            .then(async response => {
                if (response.ok) {
                    navigateTo("/?success=1");
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
    const submit = build("tr", build("td"), submitButton);

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
export default addBook;