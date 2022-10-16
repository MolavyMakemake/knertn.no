function order_HTML(item){
    let out = "";
    console.log(item);
    item.types.forEach(type => {
        out += `
        <div class="order">
            <p>${item}</p>
            <p>500kr per p.</p>
            <div class="order-vars">
                <input class="order-amount" type="number" name="porsjoner" min="1" step="0.1" value="1">
                <div class="remove-order" id="${item}"></div>
            </div>
        </div>`
    });
    return out;
}

let content = ""
for (item in items)
    if (items[item].in_cart)
        content += order_HTML(items[item])

document.querySelector(".order-list").innerHTML = content;


function remove_item(e){
    let item = e.target.id;
    items.splice(items.indexOf(item), 1);
    localStorage.setItem("items", JSON.stringify(items));

    e.path[2].remove();
}

function send_mail(){
    form = document.querySelector("form");

    m_subject = "Bestilling til "
    date = form["date"].value;

    fname = form["fname"].value;
    pnum = form["pnum"].value;
    details = form["details"].value;
    if (!date || !fname || !pnum || !details)
    {
        alert("Plis fyll ut alle feltene")
        return;
    }

    m_body = fname + "   " + pnum;
    m_body += "\n" + details;
    m_body += "\n" + items;

    m_subject += date;

    m_subject = encodeURIComponent(m_subject);
    m_body = encodeURIComponent(m_body);
    window.open(`mailto:kesinee81@outlook.com?subject=${m_subject}&body=${m_body}`)
}

document.querySelectorAll(".remove-order").forEach(e => {
    e.addEventListener("click", remove_item)
})