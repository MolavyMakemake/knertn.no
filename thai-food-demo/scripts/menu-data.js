const menu_items = 
{
    "Rød Karri" : { "types" : [ "Kylling", "And"], "ingredients" : "Gryte med kokosmelk, bambus skudd, basilikum og frisk frukt" },
    "Gul Karri" : { "types" : ["Biff", "Kylling lår"], "ingredients" : "Gryte med massaman karri, kokosmelk, poteter gulerøtter og peanøtter" },
    "Phaneng" : { "types" : ["Kylling", "Svinekjøtt"], "ingredients" : "Kokosmelk, limeblader og eggplanter" },
    "Grønn Karri": { "types" : ["Kylling", "Reker"], "ingredients" : "Kokosmelk basilikum og bambus skudd" },

    "Tom Kha Gai" : { "types" : ["Kylling", "Reker"], "ingredients" : "Sitrongress, kokosmelk, lime, tomater og koreander" },
    "Tom Yam Kong" : { "types" : [""], "ingredients" : "Sitrongress, lime blader, galangal, melk og koreander" },

    "Salat" : { "types" : ["Biff", "Reker", "Svinekjøtt"], "ingredients" : "Glassnudler, rødløk, lime, chili, hvitløk og koreander (Sterk om ønskelig)" },
    "Tofu Salat" : { "types" : [""], "ingredients" : "Glassnudler, rødløk, lime, chili, hvitløk, koreander, peanøtter og tomater (Sterk om ønskelig)" },
    "Papaya Salat" : { "types" : [""], "ingredients" : "Chili hvitløk palmsokker lime og tomater (Sterk om ønskelig)" },

    "Klassisk" : { "types" : [ "Biff", "Kylling", "Reker med cashewnøtter"], "ingredients" : "Paprika, østersaus og chili" },
    "Pepper" : { "types" : ["Biff", "Kylling"], "ingredients" : "Grønnsaker, hvitløk, svart pepper, soya og østersaus" },
    "Sterk" : { "types" : ["Biff", "Kylling", "Reker"], "ingredients" : "Hvitløk chili bambus skudd og basilikum (sterk)" },
    "Strimlet" : { "types" : ["Kylling", "Reker"], "ingredients" : "Ananas augurk løk og tomater" },
    "Wok Rød Karri" : { "types" : ["Kylling", "Svinekjøtt", "Reker"], "ingredients" : "Bønnestengler, chili hvitløk basilikum (sterk)" },
    "Stekt ris" : { "types" : ["Kylling", "Reker"], "ingredients" : "Ris egg gulerøtter tomater lime, chili og fiskesaus" },

    "Pad Thai" : { "types" : ["Kylling", "Reker"], "ingredients" : "Risnudler egg, tamarind saus soya peanøtter og chili" },
    "Egg nudler" : { "types" : ["Kylling", "Reker", "Tofu"], "ingredients" : "Eggnudler grønnsaker soya og østersaus" },
    "Risnudler" : { "types" : ["Kylling", "Reker"], "ingredients" : "Risnudler med hvitløk chili og whisky (sterk)" },
    "Store Risnudler" : { "types" : ["Kylling", "Svinekjøtt"], "ingredients" : "Brokkoli, svart soya og østers saus" },

    "Kylling spyd" : { "types" : [""], "ingredients" : "Serveres med peanøttsaus" },
    "Svinekjøtt spyd" : { "types" : [""], "ingredients" : "Serveres med peanøttsaus" },
    "Vårruller med kylling" : { "types" : [""], "ingredients" : "Serveres med søt chilisaus" },
    "Vårruller med reker" : { "types" : [""], "ingredients" : "Serveres med søt chilisaus" },
}

const menu_catagories = 
[
    { "name" : "Karri", "image" : "tam.jpg", "items" : ["Rød Karri", "Gul Karri", "Phaneng", "Grønn Karri"] },
    { "name" : "Supper", "image" : "tom.jpg", "items" : ["Tom Kha Gai", "Tom Yam Kong"] },
    { "name" : "Salater", "image" : "yam.jpg", "items" : ["Salat", "Tofu Salat", "Papaya Salat"] },
    { "name" : "Wok", "image" : "gaeng.jpg", "items" : ["Klassisk", "Pepper", "Sterk", "Strimlet", "Wok Rød Karri", "Stekt ris"] },
    { "name" : "Nudler", "image" : "gluten-free.jpg", "items" : ["Pad Thai", "Egg nudler", "Risnudler", "Store Risnudler"] },
    { "name" : "Grill", "image" : "kids-menu.jpg", "items" : ["Kylling spyd", "Svinekjøtt spyd", "Vårruller med kylling", "Vårruller med reker"] }
]

function retrieve_cookies(){
    items = JSON.parse(localStorage.getItem("items"));
    isValid = items != null
    if (isValid)
        for (item in menu_items)
            isValid &= items[item] != undefined;
    
    if (!isValid)
    {
        items = {};
        for (item in menu_items)
        {
            items[item] = { "in_cart" : false, "types" : [] }
        }
    }
}
retrieve_cookies();


function item_HTML(item_key){
    let item = menu_items[item_key]
    let types = "";
    let btn_html = items[item_key].in_cart ?
    `
    <div class="menu-item-btn remove-item" id="${item_key}">
        Fjern
    </div>
    ` : `
    <div class="menu-item-btn add-item" id="${item_key}">
        Legg til
    </div>
    `

    item.types.forEach(type => {
        if (type != "")
        types += `
        <div class="menu-item-sub">
            <input type="checkbox" id="${type}">
            <label for="${type}">${type}</label>
        </div>
        `
    })

    return`
    <div class="item-description">
        <h3 class="item-title">${item_key}</h3>
        <h6 class="item-ingredients">${item.ingredients}</h6>
    </div>
    <div class="menu-item-subs">
        ${btn_html}
        <div>${types}</div>
    </div>
    `
}

function change_item(e){
    opened_catagory.querySelector(".menu-item").innerHTML = item_HTML(e.innerHTML);
    update_event_listener();
}

function opened_inner_HTML(i){
    let catagory = menu_catagories[i];
    let items_HTML = "";
    catagory.items.forEach(item => items_HTML += `<div class="catagory-item-btn" onclick="change_item(this)">${item}</div>`)

    return `
    <img src="images/tam-1.jpg">
    <div class="menu-item-img-cover"></div>
    <div class="catagory-info">
        <h2>${catagory.name}</h2>
        <h5>
            An ingredient found in many Thai dishes and used in every region of the country is nam pla, a clear fish sauce that is very aromatic. 
            Fish sauce is a staple ingredient in Thai cuisine.
        </h5>
    </div>
    <div class="catagory-items">
        <div class="menu-items">${items_HTML}</div>
        <div class="menu-item">${item_HTML(catagory.items[0])}</div>
    </div>
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