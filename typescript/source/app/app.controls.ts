interface Controls {
    updating: boolean;
    color1: HTMLInputElement;
    color2: HTMLInputElement;
    color3: HTMLInputElement;
    speed: Slider;
    length: Slider;
    brightness: Slider;
    saturation: Slider;
}

let controls: Controls = {
    updating: true,
    color1: null,
    color2: null,
    color3: null,
    speed: null,
    length: null,
    brightness: null,
    saturation: null
};

function initControls() {
    let timer: number = 0;
    let timeout = 50;
    controls.color1 = get("#color1") as HTMLInputElement;
    controls.color1.oninput = () => {
        if (controls.updating)
            return;
        if (timer != 0)
            clearTimeout(timer);
        timer = setTimeout(() => {
            timer = 0;
            postWebRequest("/?method=setcolor", { value: controls.color1.value, index: 1 });
        }, timeout);
    }
    controls.color2 = get("#color2") as HTMLInputElement;
    controls.color2.oninput = () => {
        if (controls.updating)
            return;
        if (timer != 0)
            clearTimeout(timer);
        timer = setTimeout(() => {
            timer = 0;
            postWebRequest("/?method=setcolor", { value: controls.color2.value, index: 2 });
        }, timeout);
    }
    controls.color3 = get("#color3") as HTMLInputElement;
    controls.color3.oninput = () => {
        if (controls.updating)
            return;
        if (timer != 0)
            clearTimeout(timer);
        timer = setTimeout(() => {
            timer = 0;
            postWebRequest("/?method=setcolor", { value: controls.color3.value, index: 3 });
        }, timeout);
    }
    controls.color3 = get("#color3") as HTMLInputElement;
    controls.speed = new Slider("#speed .slider", "#speed .associate");
    controls.speed.step = 0.1;
    controls.speed.min = -5;
    controls.speed.max = 5;
    controls.speed.position = 1;
    controls.speed.onchange = (e) => {
        if (controls.updating)
            return;
        if (timer != 0)
            clearTimeout(timer);
        timer = setTimeout(() => {
            timer = 0;
            postWebRequest("/?method=setspeed", { value: e.position });
        }, timeout);
    };
    controls.length = new Slider("#length .slider", "#length .associate");
    controls.length.step = 25;
    controls.length.min = 25;
    controls.length.max = 1000;
    controls.length.position = 100;
    controls.length.onchange = (e) => {
        if (controls.updating)
            return;
        if (timer != 0)
            clearTimeout(timer);
        timer = setTimeout(() => {
            timer = 0;
            postWebRequest("/?method=setlength", { value: e.position / 100 });
        }, timeout);
    };
    controls.brightness = new Slider("#brightness .slider", "#brightness .associate");
    controls.brightness.step = 1;
    controls.brightness.min = 0;
    controls.brightness.max = 100;
    controls.brightness.position = 100;
    controls.brightness.onchange = (e) => {
        if (controls.updating)
            return;
        if (timer != 0)
            clearTimeout(timer);
        timer = setTimeout(() => {
            timer = 0;
            postWebRequest("/?method=setbrightness", { value: e.position / 100 });
        }, timeout);
    };
    controls.saturation = new Slider("#saturation .slider", "#saturation .associate");
    controls.saturation.step = 1;
    controls.saturation.min = 0;
    controls.saturation.max = 100;
    controls.saturation.position = 100;
    controls.saturation.onchange = (e) => {
        if (controls.updating)
            return;
        if (timer != 0)
            clearTimeout(timer);
        timer = setTimeout(() => {
            timer = 0;
            postWebRequest("/?method=setsaturation", { value: e.position / 100 });
        }, timeout);
    };
}