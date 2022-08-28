const menu_items = 
{
    "item-1" : { "image" : "tam-1.jpg" },
    "item-2" : { "image" : "tam-2.jpg" },
    "item-2" : { "image" : "tam-2.jpg" }
}

const menu_catagories = 
[
    { "name" : "catagory-1", "image" : "tam.jpg", "items" : ["item-1", "item-2", "item-3"] },
    { "name" : "catagory-2", "image" : "tom.jpg", "items" : ["item-1", "item-2", "item-3"] },
    { "name" : "catagory-3", "image" : "yam.jpg", "items" : ["item-1", "item-2", "item-3"] },
    { "name" : "catagory-4", "image" : "gaeng.jpg", "items" : ["item-1", "item-2", "item-3"] },
    { "name" : "catagory-5", "image" : "gluten-free.jpg", "items" : ["item-1", "item-2", "item-3"] },
    { "name" : "catagory-6", "image" : "kids-menu.jpg", "items" : ["item-1", "item-2", "item-3"] }
]


function opened_inner_HTML(i){
    let catagory = menu_catagories[i];
    return `
    <div class="catagory-info">
        <h1>${catagory.name}</h1>
        <h5>
            An ingredient found in many Thai dishes and used in every region of the country is nam pla, a clear fish sauce that is very aromatic. 
            Fish sauce is a staple ingredient in Thai cuisine.
        </h5>
    </div>
    <div class="catagory-items"></div>

    <img src="images/${catagory.image}">
    <div class="cross" onclick="close_opened_catagory()"></div>
    `;
}

function opened_catagory_HTML(i){
    
    let e = document.createElement("div");
    e.innerHTML = opened_inner_HTML(i);
    e.className = "menu-opened";
    return e;
}

function catagory_HTML(i){
    let catagory = menu_catagories[i];
    return `
    <div class="menu-catagory" id="c${i}" style="background-image: url(images/${catagory.image})">
        <h1 class="menu-catagory-title">${catagory.name}</h1>
    </div>
    `
}