const sidebar = document.querySelector(".sidebar")
const sidebarToggler = document.querySelector(".sidebar-toggle");
const menuToggler = document.querySelector(".menu-toggle");


let fullSidebarHeight = `calc(100vh - 30px)`;
let collapsedSidebarHeight = `56px`;

sidebarToggler.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
})

const toggleMenu = (isMenuActive) => {
    sidebar.style.height = isMenuActive ? `${sidebar.scrollHeight}px` : collapsedSidebarHeight;
    menuToggler.querySelector("span").innerText = isMenuActive ? "close" : "menu";
}

menuToggler.addEventListener("click", () => {
    toggleMenu(sidebar.classList.toggle("menu-active"))
})

