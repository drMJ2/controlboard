function applyTemplates() {
    replaceSliders();
}

function replaceSliders()
{
    var nodes = document.getElementsByClassName("t-slider") 
    var template = document.getElementById("t-slider");
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
    var template = document.getElementById("t-slider-vert");
    var count = nodes.length;
    for (var i = 0; i < count; i++) {
        
        var input = nodes[0];
        var valueAsPercentage = (100 * (input.value - input.min) / (input.max - input.min)) + "%";
        var slider = template.cloneNode(true);
        slider.name = input.name;
        slider.children[1].style.height = valueAsPercentage;
        slider.children[1].innerHTML = input.value;
        slider.children[2].innerHTML = input.alt;
        copyClassesExcept(input, slider, "t-slider-vert");
        input.parentElement.replaceChild(slider, input);
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