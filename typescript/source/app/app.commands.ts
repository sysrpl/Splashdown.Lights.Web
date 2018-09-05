interface Details {
    name: string;
    long: string;
    description: string;
    direction: number;
    speed: number;
    length: number;
    brightness: number;
    saturation: number;
    color1: string;
    color2: string;
    color3: string;
    framerate: number;
}

let selection: HTMLElement = null;

let commands = {
    select: (program: HTMLElement) => {
        if (selection == program)
            return;
        if (selection)
            selection.removeClass("selected");
        selection = program;
        selection.addClass("selected");
        postWebRequest("/?method=seteffect", { name: `${selection.innerText}`});
        setTimeout(() => 
            sendWebRequest("/?method=getdetails", r => {
                let details: Details = JSON.parse(r.responseText);
                get("#help").innerHTML = `status: program ${details.name} selected<br>
                    ${details.long}<br>
                    <br>
                    ${details.description}`;
            }
        ), 200);
    },
    reset: () => {
        let help = get("#help");
        if (selection) {
            let message = help.innerHTML;
            sendWebRequest("/?method=reset");
            let s = `status: resetting settings for ${selection.innerText}`;
            help.innerHTML = s;
            setTimeout(() => { if (help.innerHTML == s) help.innerHTML = message; }, 2000);
        }
        else {
            help.innerHTML = "status: no program is selected to reset"
        }
    },
    settings: () => {
        let help = get("#help");
        let message = help.innerHTML;
        if (selection) {
            let s = `status: retreiving settings for ${selection.innerText}`;
            help.innerHTML = s;
            sendWebRequest("/?method=getdetails", r => {
                let details: Details = JSON.parse(r.responseText);
                get("#title").innerHTML = `settings for ${details.name}`;
                controls.updating = true;
                controls.color1.value = details.color1;
                controls.color2.value = details.color2;
                controls.color3.value = details.color3;
                controls.speed.position = details.speed;
                controls.length.position = details.length * 100;
                controls.brightness.position = details.brightness * 100;
                controls.saturation.position = details.saturation * 100;
                controls.updating = false;
                get("#frame").removeClass("expand");
                get("#front").addClass("flip");
                get("#back").removeClass("flip");
                get("#shadow").removeClass("flip");
                get("#edge").addClass("flip");
                setTimeout(() => { if (help.innerHTML == s) help.innerHTML = message; }, 4000);
            });
        }
        else {
            help.innerHTML = "status: select a program above first, then try settings again"
        }
    },
    stop: () => {
        if (selection)
            selection.removeClass("selected");
        selection = null;
        sendWebRequest("/?method=stop");
        get("#help").innerHTML = "status: no program selected";
    }
}