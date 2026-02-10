document.getElementById("nav-menu").classList.add("d-none");
document.getElementById("bx-x").classList.add("d-none");



const onBurgerClick = () => {
    document.getElementById("nav-menu").classList.toggle("d-none");
    document.getElementById("bx-menu").classList.toggle("d-none");
    document.getElementById("bx-x").classList.toggle("d-none");
    if (!document.getElementById("nav").classList.contains("d-none")) {
        document.querySelector("#nav-menu>li:first-child a").focus();
    }
}

document.getElementById("burger-button-display").addEventListener("click", onBurgerClick );




document.querySelectorAll("button.modal-button-open").forEach((button) => {
    button.addEventListener("click", () => {
        let id = button.getAttribute("aria-controls");
        document.getElementById(id).classList.add("modal-show");
        document.querySelector(".modal-show>div").focus();

    })

});

document.querySelectorAll(".modal-wrapper>a.sr-only").forEach((a) => {
    a.addEventListener("focus", () => {
        a.closest(".modal-wrapper").querySelector(":scope>div").focus();
    })

    });

document.querySelectorAll(".modal-wrapper").forEach((wrapper) => {
    wrapper.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            wrapper.classList.remove("modal-show");
            document.querySelector("button[aria-controls='" + wrapper.id + "']").focus();
        }
    });
});


document.querySelectorAll(".modal-button-close").forEach((button => {
    button.addEventListener("click", () => {
        

        let wrapper = button.closest(".modal-wrapper");
        wrapper.classList.remove("modal-show");
        document.querySelector("button[aria-controls=" + wrapper.id + "]").focus();
    });
}));

document.querySelectorAll(".modal-wrapper>a.sr-only").forEach((a) => {
    a.addEventListener("focus", () => {
        a.closest(".modal-wrapper").querySelector(":scope>div").focus();
    })


});
