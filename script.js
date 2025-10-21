const generate_button = document.getElementById("generate-btn");
const sort_button = document.getElementById("sort-btn");
const reset_button = document.getElementById("reset-btn");

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


function updateHTML(){
    for (let i = 0; i < HTMLwl.length; i++) {
        HTMLwl[i].textContent = wl[i]
        HTMLmwl[i].textContent = mwl[i]
    }
}

generate_button.addEventListener("click", (event) => {
    wl = []
    mwl = []
    for (let i = 0; i < HTMLwl.length; i++) {
        word = ""
        for (let j = 0; j < 8; j++) {
            word += Math.random() > 0.5 ? 0 : 1;
        }
        wl.push(word)
    }
    updateHTML()
})

function comparePopulation(indiv1, indiv2){
    return  indiv2.split("").reduce((memo, num) => memo + parseInt(num), 0) - indiv1.split("").reduce((memo, num) => memo + parseInt(num), 0)
}


sort_button.addEventListener("click", (event) => {
    mwl = wl.slice().sort(comparePopulation)
    updateHTML()
})


reset_button.addEventListener("click", (event) => {
    wl = []
    mwl = []
    updateHTML()
})