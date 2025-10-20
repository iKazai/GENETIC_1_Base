wl = document.getElementById("word-list").children;

for (let i = 0; i < wl.length; i++) {
    word = ""
    for (let j = 0; j < 8; j++) {
        word += Math.random() > 0.5 ? 0 : 1;
    }
    wl[i].textContent = word
}