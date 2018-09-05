/// <reference path="../../codebot.ts" />

function initTooltips() {
    if (isMobile())
        return;
    if (get("#tipbox"))
        return;
    let tipbox = `
<div id="tipbox"><span></span>
    <img id="tip-below" src="/images/tip-below.png">
    <img id="tip-above" src="/images/tip-above.png">
</div>`.toElement();

    function milliTime() {
        return new Date().getTime();
    }

    let startTime = milliTime();
    let stopTime =  startTime;
    let showing = false;
    let timer: number;

    function tooltipOver() {
        if (showing)
            return;
        startTime = milliTime();
        showing = true;
        let me = this as HTMLElement;
        timer = setTimeout(function () {
            startTime = milliTime();
            tipbox.firstElementChild.innerHTML = me.getAttribute("data-tooltip");
            tipbox.addClass("visible");
            if (me.hasClass("fixed"))
                tipbox.addClass("fixed");
            else                
                tipbox.removeClass("fixed");
            let reposition = () => {
                let bounds = me.bounds;
                let x = bounds.x + (bounds.width - tipbox.offsetWidth) / 2;
                let y = bounds.y - tipbox.offsetHeight - 8;
                if (x < 20) {
                    tipbox.addClass("left");
                    x = bounds.x + bounds.width / 2;
                }
                else {
                    tipbox.removeClass("left");
                }
                if (y < document.body.scrollTop) {
                    y = bounds.y + bounds.height + 8;
                    tipbox.addClass("below").removeClass("above");
                }
                else
                    tipbox.addClass("above").removeClass("below");
                setStyle(tipbox, { left: x,top: y });
            }
            reposition();
            shortDelay(reposition);
        }, 1000);
    }

    function tooltipOut() {
        window.clearTimeout(timer);
        tipbox.removeClass("visible");
        showing = false;
    }

    function bodyChange() {
        let elements = getAll(".tooltip");
        for (let e of elements) {
            e.removeClass("tooltip");
            e.addEventListener("mouseover", tooltipOver);
            e.addEventListener("mouseout", tooltipOut);
        }
    }

    function bodyRemoved() {
        stopTime = milliTime();
        if (stopTime - startTime > 100)
        {
            window.clearTimeout(timer);
            tipbox.removeClass("visible");
            showing = false;
        }
    }

    document.body.addEventListener("DOMNodeInserted", bodyChange);
    document.body.addEventListener("DOMNodeRemoved", bodyRemoved);
    document.body.appendChild(tipbox);
    document.body.addEventListener("scroll", bodyRemoved);
}