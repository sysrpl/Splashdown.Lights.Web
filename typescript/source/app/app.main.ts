function main() {
    let frame = get("#frame");
    let front = get("#front");
    let back = get("#back");
    let shadow = get("#shadow");
    let edge = get("#edge");
    let fullscreen = get("#fullscreen");

    front.addEventListener("click", commands.settings);

    get("#done").addEventListener("click", () => {
        back.addClass("flip");
        shadow.addClass("flip");
        front.removeClass("flip");
        edge.removeClass("flip");
    });

    fullscreen.addEventListener("click", () => {
        frame.toggleClass("expand");
        if (frame.hasClass("expand")) {
            fullscreen.removeClass("fa-search-plus");
            fullscreen.addClass("fa-search-minus");
        } 
        else {
            fullscreen.removeClass("fa-search-minus");
            fullscreen.addClass("fa-search-plus");
        }
    });

    get("#terminal").addEventListener("click", e => {
        e.stopPropagation();
    });

    let now = new Date();
    let stamp = now.format("#DDD# #MM# #D# #h#:#mm#:#ss# #YYYY#");
    get("#stamp").innerText = stamp;

    initControls();

    function programsLoaded(json: string) {
        let effects: string[] = JSON.parse(json);
        let html = "";
        for (let e of effects) {
            html += `<div class="program ${e}" onclick="commands.select(this)">${e}</div>`
        }
        get("#programs").innerHTML = html;
    }

    sendWebRequest("/?method=effects", r => programsLoaded(r.responseText));
    initPixels();
}