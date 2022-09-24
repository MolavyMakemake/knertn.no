function animate_order_btn(){
    document.querySelector(".order-btn").style.scale = 1.1;
    setTimeout(() => document.querySelector(".order-btn").style.scale = 1, 200)
}

function expand_header(){
    document.querySelector(".header-title").style.visibility = "hidden";
    document.querySelector("#expand-header").style.visibility = "hidden";
    document.querySelector(".header-links").style.visibility = "visible";
    document.querySelector("#retract-header").style.visibility = "visible";
}
function retract_header(){
    document.querySelector(".header-title").style.visibility = "visible";
    document.querySelector("#expand-header").style.visibility = "visible";
    document.querySelector(".header-links").style.visibility = "hidden";
    document.querySelector("#retract-header").style.visibility = "hidden";
}

window.addEventListener("resize", (e) => {
    return;
    if (window.innerWidth >= 800)
    {
        retract_header();
    }
})