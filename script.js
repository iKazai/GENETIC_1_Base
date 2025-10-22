const generate_button = document.getElementById("generate-btn");
const sort_button = document.getElementById("sort-btn");
const reset_button = document.getElementById("reset-btn");
const mutate_button = document.getElementById("mutate-btn");
const replace_button = document.getElementById("replace-btn");
const auto_button = document.getElementById("auto-btn");

var wl = []
var HTMLwl = document.getElementById("word-list").children
for (let i = 0; i < wl.length; i++) {
        wl.push(HTMLwl[i].textContent)
}

var mwl = []
var HTMLmwl = document.getElementById("mutated-word-list").children
for (let i = 0; i < mwl.length; i++) {
        wl.push(HTMLmwl[i].textContent)
}


function reset_experiment(){
    wl = []
    mwl = []
    document.getElementById("generation-number").textContent = 0;
    generate_button.style.backgroundColor = "";
    updateHTML()
}

function mutate_pop(){
    mwl[0] = wl[0]
    for (let i = 1; i < wl.length - 1; i++) {
        mwl[i] = wl[i].split("").map((x) => Math.random() > 0.5 ? "1" - x : x).join("")
    }
    mwl[wl.length - 1] = wl[wl.length - 1].split("").map((x) => "1" - x).join("")
    updateHTML()
}

function sort_pop(){
    wl.sort(comparePopulation)
    if(wl[0] == "11111111"){
        alert(`The best individual has been created in ${document.getElementById("generation-number").textContent} generations !`)
    }
    updateHTML()
}

function replace_pop(){
    wl = mwl.slice()
    mwl = []
    document.getElementById("generation-number").textContent++;
    generate_button.style.backgroundColor = "gray";
    updateHTML()
}

function updateHTML(){
    for (let i = 0; i < HTMLwl.length; i++) {
        HTMLwl[i].textContent = wl[i]
        HTMLmwl[i].textContent = mwl[i]
    }
}

function generate_pop(){
        reset_experiment()
    for (let i = 0; i < HTMLwl.length; i++) {
        word = ""
        for (let j = 0; j < 8; j++) {
            word += Math.random() > 0.5 ? 0 : 1;
        }
        wl.push(word)
    }
    updateHTML()
}

generate_button.addEventListener("click", (event) => {
    generate_pop()
})

function comparePopulation(indiv1, indiv2){
    return  indiv2.split("").reduce((memo, num) => memo + parseInt(num), 0) - indiv1.split("").reduce((memo, num) => memo + parseInt(num), 0)
}


sort_button.addEventListener("click", (event) => {
    sort_pop()
})


mutate_button.addEventListener("click", (event) => {
    mutate_pop()
})

replace_button.addEventListener("click", (event) => {
    replace_pop()
})


reset_button.addEventListener("click", (event) => {
    reset_experiment()
})

var auto_pressed = false

// Remplacement de la fonction sleep par une version asynchrone
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// Modification de la logique du bouton auto pour des mises à jour en temps réel
auto_button.addEventListener("click", async (event) => {
    if (auto_pressed) {
        auto_button.textContent = "Auto generation";
        auto_pressed = false;
    } else {
        auto_button.textContent = "Stop";
        auto_pressed = true;
        reset_experiment();
        generate_pop();

        while (wl[0] !== "11111111" && auto_pressed) {
            // Étape 1 : Sort
            sort_button.style.backgroundColor = "yellow";
            sort_pop();
            await sleep(1000);
            sort_button.style.backgroundColor = "";

            // Étape 2 : Mutate
            mutate_button.style.backgroundColor = "yellow";
            mutate_pop();
            await sleep(1000);
            mutate_button.style.backgroundColor = "";

            // Étape 3 : Replace
            replace_button.style.backgroundColor = "yellow";
            replace_pop();
            await sleep(1000);
            replace_button.style.backgroundColor = "";
        }

        auto_button.textContent = "Auto generation";
        auto_pressed = false;
    }
});
