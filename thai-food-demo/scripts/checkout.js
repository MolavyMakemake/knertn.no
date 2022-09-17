function order_HTML(item){
    return `
    <div class="order">
        <p>${item}</p>
        <p>500kr per p.</p>
        <div class="order-vars">
            <input class="order-amount" type="number" name="porsjoner" min="1" step="0.1" value="1">
            <div class="remove-order" id="${item}"></div>
        </div>
    </div>
    `
}

let content = ""
items.forEach(item => content += order_HTML(item))
document.querySelector(".order-list").innerHTML = content;


function remove_item(e){
    let item = e.target.id;
    items.splice(items.indexOf(item), 1);
    localStorage.setItem("items", JSON.stringify(items));

    e.path[2].remove();
}

document.querySelectorAll(".remove-order").forEach(e => {
    e.addEventListener("click", remove_item)
})