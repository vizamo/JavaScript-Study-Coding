export function build(tagName, ...nodes) {
    const element = document.createElement(tagName);
    for (let node of nodes) {
        if (typeof node === "string" || typeof node === "number") {
            const textNode = document.createTextNode(node);
            element.appendChild(textNode);
        } else {
            element.appendChild(node);
        }
    }
    return element;
}
export function errorBlock(errors) {
    const errorBlock = build("div");
    errorBlock.id = "error-block";
    errorBlock.role = "alert";
    const list = build("ul");
    for (let err of errors) {
        const listItem = build("li", err);
        list.appendChild(listItem);
    }
    errorBlock.appendChild(list);
    return errorBlock;
}
export function displayErrors(errorList) {
    console.log(errorList)
    clearExistingErrorBlock();
    const errors = errorBlock(errorList);
    const page = document.getElementById("content");
    console.log("RERERE")
    page.prepend(errors);
}
function clearExistingErrorBlock() {
    const errorBlock = document.getElementById("error-block");
    if (errorBlock) {
        errorBlock.remove();
    }
}
export function createButton(value, name, className) {
    const button = build("button", value);
    button.className = className;
    button.type = "submit";
    button.name = name
    const row = build("td", button)
    return row
}
export function textInput(text, id, name, className, placeholder, value) {
    const input = createTextInput(id, name, className, placeholder, value);
    const label = build("label", text);
    label.for = input.id;
    const row1 = build("td", label)
    const row2 = build("td", input)
    const group = build("tr", row1, row2);
    return group;
}
function createTextInput(id, name, className, placeholder, value) {
    const input = build("input");
    input.id = id;
    input.name = name;
    input.className = className;
    input.type = "text";
    if (placeholder) {
        input.placeholder = placeholder;
    }
    if (value) {
        input.value = value;
    }
    return input;
}
export function GradeInput(text_in_grade, value) {
    const grades = build("td")
    for (let a in [...Array(5).keys()]) {
        a = parseInt(a) + 1
        const input = createGradeInput(a, value)
        const label = build("label", " " + a);
        label.for = "grade" + a;
        grades.appendChild(label)
        grades.appendChild(input)
    }
    const text = build("td", text_in_grade)
    const group = build("tr", text, grades);
    return group;
}
function createGradeInput(id, value) {
    const input = build("input");
    input.id = "grade" + id;
    input.type = "radio";
    input.name = "grade";
    input.value = parseInt(id);
    if (value === id) {
        input.checked = true;
    }
    return input;
}
export function ReadInput(text_in_read, value) {
    const label = build("label", text_in_read);
    label.for = "isRead";
    const input = build("input")
    input.type = "checkbox";
    input.name = "isRead";
    input.id = "isRead";
    input.value = value;
    if (value === 1) {
        input.checked = true;
    }
    const row1 = build("td", label)
    const row2 = build("td", input)
    const group = build("tr", row1, row2);
    return group;
}