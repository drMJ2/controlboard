function applyTemplates() {
    replaceSliders();
    replacePanels();
}

function replaceSliders()
{
    var nodes = document.getElementsByClassName("t-slider") 
    var template = document.getElementsByClassName("slider-horizontal")[0];
    var count = nodes.length;
    for (var i = 0; i < count; i++) {
        
        var input = nodes[0];
        var valueAsPercentage = (100 * (input.value - input.min)/ (input.max - input.min)) + "%";
        var slider = template.cloneNode(true);
        slider.name = input.name;
        slider.children[0].style.width = valueAsPercentage;
        slider.children[0].innerHTML = input.alt;
        slider.children[1].innerHTML = input.value;
        copyClassesExcept(input, slider, "t-slider");
        input.parentElement.replaceChild(slider, input);
    }

    var nodes = document.getElementsByClassName("t-slider-vert")
    var template = document.getElementsByClassName("slider-vertical")[0];
    var count = nodes.length;
    for (var i = 0; i < count; i++) {
        
        var input = nodes[0];
        var valueAsPercentage = (100 * (input.value - input.min) / (input.max - input.min)) + "%";
        var slider = template.cloneNode(true);
        slider.name = input.name;
        slider.children[0].style.height = valueAsPercentage;
        slider.children[1].innerHTML = input.value;
        slider.children[2].innerHTML = input.alt;
        copyClassesExcept(input, slider, "t-slider-vert");
        input.parentElement.replaceChild(slider, input);
    }
}

function replacePanels()
{
    var nodes = document.getElementsByClassName("t-panel")
    var template = document.getElementsByClassName("panel")[0];
    var count = nodes.length;
    for (var i = 0; i < count; i++) {
        var node = nodes[i];
        var panel = template.cloneNode(true);
        var button = panel.children[0];
        button.addEventListener("click", function () { toggleShow(this.nextElementSibling); });
        button.insertBefore(document.createTextNode(node.title + " "), button.children[0]);
        node.parentElement.insertBefore(panel, node);
        panel.insertBefore(node, null);
        node.classList.add("panel-body");
    }
}

function copyClassesExcept(source, dest, exception) {
    var classes = source.classList;
    for (var i = 0; i < classes.length; i++) {
        if (classes[i] != exception) {
            dest.classList.add(classes[i]);
        }
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