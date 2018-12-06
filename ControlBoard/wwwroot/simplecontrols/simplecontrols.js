ctl = {};

// Updates panels and sliders
ctl.apply = function() {
    // order is important, because moving nodes around seems to strip away event handlers. Panels must be first.
    replacePanels();
    replaceSliders("ctl-hslider");
    replaceSliders("ctl-vslider");
};

// Creates a div around the range input tag (based on template)
// The style and classes of the range input tag are copied to the outer div
function replaceSliders(/*string: ctl-hslider or ctl-vslider*/className)
{
    var nodes = document.getElementsByClassName(className);
    var template = document.getElementById("ctl-template-slider");
    var count = nodes.length;
    for (var i = 0; i < count; i++) {
        
        var input = nodes[i];

        // create and insert a copy of the slider template
        var slider = template.cloneNode(true);
        slider.id = null;
        slider.children[0].children[2].innerHTML = input.title;
        input.parentElement.insertBefore(slider, input);
        
        // copy classes and inline style from the range input tag, including data-fill-color
        copyClasses(input, slider);
        for (var prop in input.style) {
            slider.style[prop] = input.style[prop];
        }
        // vertical sliders require special handling of width/height/transform
        slider.children[0].children[0].style.background = input.dataset.fillColor;
        if (className === "ctl-vslider") {
            if (input.style.height) {
                slider.children[0].style.width = input.style.height;
                var o = input.clientHeight / 2;
                slider.children[0].style["transform-origin"] = o + "px " + o + "px";
            }

            slider.children[0].style.width = input.style.height;
            slider.children[0].style.height = input.style.width;
        }

        // keep the source range input as a hidden last child. we still need it for the oninput event, and any custom event handlers, but clear the inline style
        input.classList.remove(className);
        input.classList.add("sld-hidden-slider");
        input.addEventListener("change", updateSlider); // for IE
        input.addEventListener("input", updateSlider);
        for (prop in input.style) {
            input.style[prop] = "";
        }

        slider.children[0].insertBefore(input, null);

        // update the values
        updateSlider2(input);
    }
}

// Groups all the contents of the "panel" div under a child div, and injects a button in front of the child div.
// The user-defined div remains the parent, and keeps its style and classes.
function replacePanels()
{
    var nodes = document.getElementsByClassName("ctl-panel");
    var template = document.getElementById("ctl-template-panel");
    var count = nodes.length;
    for (var i = 0; i < count; i++) {
        var node = nodes[i];

        // set up the header
        var button = template.children[0].cloneNode(true);
        button.addEventListener("click", function () { toggleShow(this.nextElementSibling); });
        button.insertBefore(document.createTextNode(node.title + " "), button.children[0]);

        // move the contents of the user-provded div to a new sub-div
        var panel = document.createElement("div");
        panel.innerHTML = node.innerHTML;
        node.innerHTML = "";

        // place the button and the new div under the user-provided div
        node.insertBefore(button, null);
        node.insertBefore(panel, null);
    }
}

// Copies CSS classes from one element to the other
function copyClasses(source, dest) {
    var classes = source.classList;
    for (var i = 0; i < classes.length; i++) {
         dest.classList.add(classes[i]);
    }
}

// Toggles the display of an element
function toggleShow(element)
{
    if (element.style.display !== "none") {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
}

// Event handler for the range input oninput event.
function updateSlider() {
    updateSlider2(this);
}

// Updates the elements of a slider based on the state of the input control
function updateSlider2(rangeInput) {
    var value = 100 * (rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min);
    var slider = rangeInput.parentElement;
    slider.children[0].style.width = value + "%";
    slider.children[1].style.width = (100 - value) + "%";
    slider.children[3].innerHTML = rangeInput.value;
    rangeInput.title = slider.children[2].innerHTML + "=" + rangeInput.value;
}
