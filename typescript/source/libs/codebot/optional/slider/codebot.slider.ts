/// <reference path="../../codebot.ts" />

class Slider {
    private _slider: HTMLElement;
    private _knob: HTMLElement;
    private _associate: HTMLElement;
    private _position: number;
    private _min: number;
    private _max: number;
    private _step: number;

    onchange: Action<Slider>;

    private update() {
        if (this._associate)
            this._associate.innerText = this._position.toString();
        let width = this._slider.getBoundingClientRect().width - 26;
        let range = this._max - this._min;
        let percent = (this._position - this.min) / range;
        this._knob.style.left = (width * percent).toString() + "px";
    }

    get position(): number {
        return this._position;
    }

    set position(value: number) {
        if (value < this._min)
            value = this._min;
        else if (value > this._max)
            value = this._max;
        let r = 1 / this._step;
        value = Math.round(value * r) / r;
        if (value == this._position)
            return;
        this._position = value;
        this.update();
        if (this.onchange)
            this.onchange(this);
    }

    get step() : number {
        return this._step;
    }

    set step(value: number) {
        if (value < 0.01)
            value = 0.01;
        this._step = value;
        this.position = this._position;
    }

    get min(): number {
        return this._min;
    }

    set min(value: number) {
        this._min = value;
        if (this._position < this._min)
            this._position = this._min;
        this.update();
    }

    get max(): number {
        return this._max;
    }

    set max(value: number) {
        this._max = value;
        if (this._position > this._max)
            this._position = this._max;
        this.update();
    }

    constructor(slider: string, associate?: string) {
        this._slider = get(slider);
        this._knob = this._slider.get(".knob");
        this._associate = associate ? get(associate) : null;
        this._position = 0;
        this._min = 0;
        this._max = 100;
        this._step = 1;
        this.onchange = null;
        let me = this;

        function sliderMouseMove(e: MouseEvent, s: Slider) {
            let rect = s._slider.getBoundingClientRect();
            let x = e.clientX - rect.left;
            if (x < 0)
                x = 0;
            else if (x > rect.width)
                x = 1;
            else
                x = x / rect.width;
            let range = s._max - s._min;
            s.position = range * x + s._min;
        }

        function sliderMouseUp(e: MouseEvent, s: Slider) {
            if (e.button == 0) {
                s._knob.removeClass("pressed");
                document["_slider"] = null;
            }
        }

        this._slider.addEventListener("mousedown", e => {
            document["_slider"] = me;
            me._knob.addClass("pressed");
            sliderMouseMove(e, me);
        });

        if (isUndefined(window["_slider"])) {
            window["_slider"] = true;
            document.addEventListener("mousemove", e => {
                if (document["_slider"]) {
                    let s: Slider = document["_slider"];
                    sliderMouseMove(e, s);
                }
            });
            document.addEventListener("mouseup", e => {
                if (document["_slider"]) {
                    let s: Slider = document["_slider"];
                    sliderMouseUp(e, s);
                }
            });
        }
    }
}