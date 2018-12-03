function applyTemplates() {
    replacePanels(); // order is important, because moving nodes around seems to strip away event handlers
    replaceSliders("horizontal"); 
    replaceSliders("vertical"); 
}

function replaceSliders(/*string: horizontal or vertical*/type)
{
    // creates a div around the range input tag (based on template)
    // the stule and classes of the range input tag are copied to the outer div
    var nodes = document.getElementsByClassName("slider-" + type);
    var template = document.getElementsByClassName("t-slider-"+type)[0];
    var count = nodes.length;
    for (var i = 0; i < count; i++) {
        
        var input = nodes[i];
        input.addEventListener("input", updateSlider);
        var slider = template.cloneNode(true);
        slider.children[2].innerHTML = input.alt;
        input.parentElement.insertBefore(slider, input);
        input.classList.remove("slider-" + type);
        copyClasses(input, slider);
        for (var prop in input.style) {
            slider.style[prop] = input.style[prop];
        }
        
        input.classList.add("slider-hidden-" + type);


        slider.insertBefore(input, null);
        slider.classList.add("slider-" + type);
        updateSlider2(input, type);

    }
}


function replacePanels()
{
    // groups all the contents of the "panel" div under a child div, and injects a button in front of the child div
    // the user-defined div remains the parent, and keeps its style and classes
    var nodes = document.getElementsByClassName("panel");
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
function updateSlider() {
    if (this.classList.contains("slider-hidden-horizontal")) {
        updateHSlider2(this);
    }
    else {
        updateVSlider2(this);
    }
}

function updateVSlider() {
    updateVSlider2(this);
}

function updateSlider2(slider, type)
{
    if (type == "vertical") {
        updateVSlider2(slider);
    }
    else {
        updateHSlider2(slider);
    }
}

function updateVSlider2(slider) {
    slider.parentElement.children[0].style.height = 100 * (slider.value - slider.min) / (slider.max - slider.min) + "%";
    slider.parentElement.children[1].style.height = (100 - 100 * (slider.value - slider.min) / (slider.max - slider.min)) + "%";
    slider.parentElement.children[3].innerHTML = slider.value;
    slider.parentElement.title = slider.value;
}

function updateHSlider2(slider) {
    slider.parentElement.children[0].style.width = 100 * (slider.value - slider.min) / (slider.max - slider.min) + "%";
    slider.parentElement.children[1].style.width = (100 - 100 * (slider.value - slider.min) / (slider.max - slider.min)) + "%";
    slider.parentElement.children[3].innerHTML = slider.value;
    slider.parentElement.title = slider.value;
}