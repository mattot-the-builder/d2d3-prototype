function openMenu(evt, menuName) {
    var menuContents = document.getElementsByClassName("menu-contents");
    for (var i = 0; i < menuContents.length; i++) {
        menuContents[i].classList.add("hidden");
    }

    var menuButtons = document.getElementsByClassName("menu-button");
    for (var i = 0; i < menuButtons.length; i++) {
        menuButtons[i].classList.remove("active");
    }

    // Show the current tab and add the "active" class to the button
    document.getElementById(menuName).classList.remove("hidden");
    evt.currentTarget.classList.add("active");
}
