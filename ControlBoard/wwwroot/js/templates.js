function applyTemplates() {
    replacePanels(); // order is important, because moving nodes around seems to strip away event handlers
    replaceSliders(); 
}

function replaceSliders()
{
    var nodes = document.getElementsByClassName("slider-horizontal")
    var template = document.getElementsByClassName("t-slider")[0];
    var count = nodes.length;
    for (var i = 0; i < count; i++) {
        
        var input = nodes[i];
        input.addEventListener("input", updateHSlider);
        var slider = template.cloneNode(true);
        slider.children[1].innerHTML = input.alt;
        input.parentElement.insertBefore(slider, input);
        input.classList.add("w3-display-left");
        input.classList.add("slider-hidden");
        input.classList.remove("slider-horizontal");
        slider.insertBefore(input, null);
        slider.classList.add("slider-horizontal");
        updateHSlider2(input);
    }

    var nodes = document.getElementsByClassName("slider-vertical")
    var template = document.getElementsByClassName("t-slider-vert")[0];
    var count = nodes.length;
    for (var i = 0; i < count; i++) {
        var input = nodes[i];
        input.addEventListener("input", updateVSlider);
        var slider = template.cloneNode(true);
        slider.children[1].innerHTML = input.alt;
        input.parentElement.insertBefore(slider, input);
        input.classList.add("w3-display-bottom");
        input.classList.add("slider-hidden-vertical");
        input.classList.remove("slider-vertical");
        slider.insertBefore(input, null);
        slider.classList.add("slider-vertical");
        updateVSlider2(input);
    }
}

function replacePanels()
{
    // groups all the contents of the "panel" div under a child div, and injects a button in front of the child div
    var nodes = document.getElementsByClassName("panel")
    var template = document.getElementsByClassName("t-panel")[0];
    var count = nodes.length;
    for (var i = 0; i < count; i++) {
        var node = nodes[i];
        var button = template.children[0].cloneNode(true);
        button.addEventListener("click", function () { toggleShow(this.nextElementSibling); });
        button.insertBefore(document.createTextNode(node.title + " "), button.children[0]);
        var panel = document.createElement("div");
        panel.innerHTML = node.innerHTML;
        node.innerHTML = "";
        node.insertBefore(button, null);
        node.insertBefore(panel, null);
    }
}

function copyClasses(source, dest) {
    var classes = source.classList;
    for (var i = 0; i < classes.length; i++) {
         dest.classList.add(classes[i]);
    }
}

function toggleShow(node)
{
    if (node.style.display != "none") {
        node.style.display = "none";
    } else {
        node.style.display = "block";
    }
}
function updateHSlider() {
    updateHSlider2(this);
}

function updateHSlider2(slider)
{
    slider.parentElement.children[0].style.width = 100 * (slider.value - slider.min) / (slider.max - slider.min) + "%";
    slider.parentElement.children[2].innerHTML = slider.value;
    slider.parentElement.title = slider.value;
}
function updateVSlider() {
    updateVSlider2(this);
}

function updateVSlider2(slider) {
    slider.parentElement.children[0].style.height = 100 * (slider.value - slider.min) / (slider.max - slider.min) + "%";
    slider.parentElement.children[2].innerHTML = slider.value;
    slider.parentElement.title = slider.value;
}