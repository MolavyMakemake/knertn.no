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
    e.addEventListener("click", expand_catagory)
})

function pm_item(e){
    let pm_counter = e.path[1].querySelector(".num-item");
    let n = parseInt(pm_counter.innerHTML);

    if (pm_counter === null) return;

    switch (e.target.innerHTML){
        case "+":
            if (n < 15){
                pm_counter.innerHTML = n + 1;
            }
                
            break;

        case "-":
            if (n > 0)
                pm_counter.innerHTML = n - 1;
            break;
    }
}


function add_item(e){
    let item = e.target.id;
    
    if (items.includes(item)){
        items.splice(items.indexOf(item), 1)
        e.target.innerHTML = "Legg til";
        e.target.className = "menu-item-btn add-item";
    }
    else {
        items.push(item);
        animate_order_btn();
        e.target.innerHTML = "Fjern";
        e.target.className = "menu-item-btn remove-item";
    }

    localStorage.setItem("items", JSON.stringify(items))
    document.querySelector(".order-counter").innerHTML = items.length;
}

function update_event_listener(){
    document.querySelectorAll(".menu-item-btn").forEach(e => {
        e.addEventListener("click", add_item);
    })
}

document.querySelector(".order-counter").innerHTML = items.length;