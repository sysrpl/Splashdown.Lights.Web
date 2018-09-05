function initPixels() {
    interface Border {
        length: number;
        bottom: number;
        right: number;
        top: number;
        left: number;
    }
    
    let border: Border;
    let colors = false;
    let pixels: Array<HTMLDivElement>;

    function readPixels() {
        sendWebRequestType("/?method=getpixels", "arraybuffer", r => {
            let data = r.responseBytes;
            if (data.length > 3) {
                colors = true;
                let i = 0;
                let j = 0;
                while (i < data.length) 
                    pixels[j++].style.backgroundColor = "rgb(" + data[i++] + "," + data[i++] + "," + data[i++] + ")";
            } 
            else if (colors) {
                colors = false;
                for (let p of pixels)
                    p.style.backgroundColor = "rgb(0,0,0)";
            }
        });
    }    

    function readProgram() {
        sendWebRequest("/?method=geteffect", r => {
            let e = r.responseText;
            if (e.length) {
                let item = get(`.program.${e}`);
                if (item)
                    item.click();
            }
        });
    }

    sendWebRequest("/?method=getborder", r => {
        border = r.responseJSON;
        let container = get("#pixels");
        let rect = container.getBoundingClientRect();
        let width = rect.width;
        let height = rect.height;
        let index = 0; 
        let count = 0;
        pixels = new Array<HTMLDivElement>(border.length);
        for (var i = 0; i < pixels.length; i++) {
            let pixel = document.createElement("div");
            container.appendChild(pixel);
            if (i < border.bottom) {
                index = i; 
                count = border.bottom;
                pixel.style.bottom = "0";
                pixel.style.left = ((width - 10) / count * index) + "px";
            }
            else if (i < border.right) {
                index = i - border.bottom; 
                count = border.right - border.bottom;
                pixel.style.right = "0";
                pixel.style.bottom = ((height - 10) / count * index) + "px";
            }
            else if (i < border.top) {
                index = i - border.right; 
                count = border.top - border.right;
                pixel.style.top = "0";
                pixel.style.right = ((width - 12) / count * index) + "px";
            } 
            else {
                index = i - border.top; 
                count = border.left - border.top;
                pixel.style.left = "0";
                pixel.style.top = ((height - 1) / count * index) + "px";
            }
            pixels[i] = pixel;
        }
        setInterval(readPixels, 250);
        setInterval(readProgram, 1000);
    });
}