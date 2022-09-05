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

    opened_catagory.scrollIntoView({
        behavior: 'smooth',
        block: "center"
    });
}


//create_menu();
document.querySelectorAll(".menu-catagory").forEach(e => {
    e.addEventListener("click", expand_catagory)
})

