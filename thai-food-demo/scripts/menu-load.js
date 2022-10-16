let menu = document.querySelector("#menu");

let opened_catagory = null;
let closed_catagory = null;
let closed_catagory_index = null;

function create_menu(){
    let content = "";
    
    for (let i = 0; i < menu_catagories.length; i++) 
        content += catagory_HTML(i)
    
    menu.innerHTML = content;
}

function close_opened_catagory(){
    opened_catagory.remove();
    menu.insertBefore(closed_catagory, menu.children[closed_catagory_index]);

    opened_catagory = null;
}

function expand_catagory(e){
    id = Number(e.target.id[1]);
    catagory = menu_catagories[id];

    if (opened_catagory != null)
        close_opened_catagory();

    closed_catagory_index = id;

    closed_catagory = e.target;
    opened_catagory = opened_catagory_HTML(id);
    menu.insertBefore(opened_catagory, menu.children[0]);
    closed_catagory.remove();

    update_event_listener();

    opened_catagory.scrollIntoView({
        behavior: 'smooth',
        block: "center"
    });
}


create_menu();
document.querySelectorAll(".menu-catagory").forEach(e => {
    e.addEventListener("mousedown", expand_catagory)
})

function update_order_counter(){

    let e = document.querySelector(".order-counter")
    let sum = 0;
    for (item in items)
        if (items[item].in_cart)
            sum++;
        

    e.parentElement.style.visibility = items.length == 0 ? "hidden" : "visible";
    e.innerHTML = sum;
}


function add_item(e){
    let item = items[e.target.id];
    let subs = e.path[1].querySelectorAll("input");

    if (item.in_cart){
        item.in_cart = false;
        e.target.innerHTML = "Legg til";
        e.target.className = "menu-item-btn add-item";
    }
    else {
        item.in_cart = true;
        animate_order_btn();
        e.target.innerHTML = "Fjern";
        e.target.className = "menu-item-btn remove-item";
        let checked = false;
        subs.forEach(sub => checked |= sub.checked);
        if (!checked)
            subs[0].checked = true;
    }

    localStorage.setItem("items", JSON.stringify(items))
    update_order_counter();
}

function update_types(e){

}

function update_event_listener(){
    document.querySelectorAll(".menu-item-btn").forEach(e => {
        e.addEventListener("mousedown", add_item);
    })
    document.querySelectorAll("checkbox").forEach(e => {
        e.addEventListener("change", update_types);
    })
}

update_order_counter();