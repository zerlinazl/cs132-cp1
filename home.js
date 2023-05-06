/**
 * JS for main page for CP2, extending CP1.
 * Requirements: make at least 2 actions responding to different events.
 */
(function() {
    "use strict";

    // consts
    // An assortment of colors to randomly assign to the location button elements.
    // Includes purple-gray, sunset pink, jet, cambridge blue, and citron
    const COLOR_PALETTE = ["#7a7485", "#FF7C74", "#35353C", "#87CBAC", "#DEC56A", "#504C57", "#322F37"];
    
    // module globals
    // to count the number of food samples on page
    let numFood = 0;

    function init() {
        // add event listeners
        const locBtns = qsa(".location h2");
        console.log(locBtns);
        for (let i=0; i<locBtns.length; i++) {
            locBtns.item(i).addEventListener("mouseenter", hoverResponse);
        }
        const hungryBtn = qs("button");
        hungryBtn.addEventListener("click", genFood);
    }

    // randomly assigns a color to each location button upon hover
    function hoverResponse() {
        const btns = qsa("h2");
        for (let i=0; i<btns.length; i++) {
            btns.item(i).style.backgroundColor = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
        }
    }

    // generate or replace "food sample" food images.
    // creates new children until there are 4 on page, then further clicks replace existing images.
    // uses appendChild, replaceChild, and calls toggleHidden which contains the classList modifier.
    function genFood() {
        numFood += 1;
        const container = qs("#food-imgs");
        const newfood = document.createElement("img");
        let randNew = 1 + Math.floor(Math.random() * 9);
        newfood.src = "food" + randNew + ".png";
        newfood.alt = "food" + randNew;
        if (numFood < 4) {
            container.appendChild(newfood);
        }
        else if (numFood === 4) {
            toggleHidden();
        }
        else {
            // Below nth child selector learned from MDN web docs: 
            // https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child
            let randChild = Math.floor(1 + Math.random() * 4);
            let oldfood = qs('#food-imgs :nth-child(' + randChild + ')');
            container.replaceChild(newfood, oldfood);
        }
    }

    // reveals a message once you click "I'm hungry" 5 times.
    // uses classList toggle function.
    function toggleHidden() {
        let hidden = qs(".hidden");
        hidden.classList.toggle("hidden");
    }

    init();

})();