interface DateConstructor {
    /** Create a new Date object from its string representation.
     * @param s The string representation of a date. */
    fromString(s: string): Date;
}

Date.fromString = function (s: string): Date {
    var i = Date.parse(s);
    return new Date(i);
}

interface Date {
    /** Format a Date object to a string.
     * @param formatString A description of how the date is to be formatted. */
    format(formatString: string): string;
    /** Compute the time passed between nwo and a date. */
    timeAgo(): string;
}

const DateShortFormat = "#M#/#DD#/#YYYY# #h#:#mm# #AMPM#"
const DateShortDayFormat = "#MM#/#DD# #hh#:#mm# #ampm#";
const DateLongFormat = "#DDDD# #MMMM# #D#, #YYYY# #h#:#mm# #AMPM#";
const DateDefaultFormat = DateLongFormat;

Date.prototype.format = function (formatString: string): string {
    let YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
    let dateObject = this;
    YY = ((YYYY = dateObject.getFullYear()) + "").slice(-2);
    MM = (M = dateObject.getMonth() + 1) < 10 ? ("0" + M) : M;
    MMM = (MMMM = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"][M - 1]).substring(0, 3);
    DD = (D = dateObject.getDate()) < 10 ? ("0" + D) : D;
    DDD = (DDDD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        "Saturday"][dateObject.getDay()]).substring(0, 3);
    th = (D >= 10 && D <= 20) ? "th" : ((dMod = D % 10) == 1) ? "st" : (dMod == 2) ? "nd" : (dMod == 3) ? "rd" : "th";
    formatString = (formatString) ? formatString : DateDefaultFormat;
    formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#",
        MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#",
        DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);
    h = (hhh = dateObject.getHours());
    if (h == 0)
        h = 24;
    if (h > 12)
        h -= 12;
    hh = h < 10 ? ('0' + h) : h;
    AMPM = (ampm = hhh < 12 ? "am" : "pm").toUpperCase();
    mm = (m = dateObject.getMinutes()) < 10 ? ("0" + m) : m;
    ss = (s = dateObject.getSeconds()) < 10 ? ("0" + s) : s;
    return formatString
        .replace("#hhh#", hhh)
        .replace("#hh#", hh)
        .replace("#h#", h)
        .replace("#mm#", mm)
        .replace("#m#", m)
        .replace("#ss#", ss)
        .replace("#s#", s)
        .replace("#ampm#", ampm)
        .replace("#AMPM#", AMPM);
}

Date.prototype.timeAgo = function (): string {
    var a = new Date() as any;
    var b = this as any;
    var diff = a - b;
    var seconds = Math.floor(diff / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1)
        return interval + " year(s) ago";
    if (interval == 1)
        return "1 year ago";
    interval = Math.floor(seconds / 2592000);
    if (interval > 1)
        return interval + " months ago";
    if (interval == 1)
        return "1 month ago";
    interval = Math.floor(seconds / 86400);
    if (interval > 1)
        return interval + " days ago";
    if (interval == 1)
        return "1 day ago";
    interval = Math.floor(seconds / 3600);
    if (interval > 1)
        return interval + " hours ago";
    if (interval == 1)
        return interval + "1 hour ago";
    interval = Math.floor(seconds / 60);
    if (interval > 1)
        return interval + " minutes ago";
    if (interval == 1)
        return interval + "1 minute ago";
    return Math.floor(seconds) + " seconds ago";
}

/** TimePart relates different slices of time to seconds */
const enum TimePart {
    Second = 1,
    Minute = 60,
    Hour = Minute * 60,
    Day = Hour * 24,
    Week = Day * 7
}

/** TimeLeft parses iso time left into text and seconds */
class TimeLeft {
    /** The time left as text with zero or less descripted as Completed */
    readonly message: string;
    /** The number of seconds left */
    readonly time: number;
    /** Create TimeLeft give an iso time left string */
    constructor(s: string) {
        this.time = 0;
        if (s.isEmpty() || s[0] != "P") {
            this.time = TimePart.Week * 2;
            this.message = "Inactive";
            return;
        }
        if (s == "PT0S") {
            this.message = "Completed";
            return;
        }
        let phrase = "";
        let count = 0;
        let n = "";
        for (let c of s) {
            if (c >= '0' && c <= '9')
                n += c;
            else if (c == 'D') {
                let x = n;
                n = "";
                if (x.isEmpty())
                    continue;
                this.time += parseInt(x) * TimePart.Day;
                if (count < 2)
                    phrase = `${phrase} ${x}d`;
                count++;
            }
            else if (c == 'H') {
                let x = n;
                n = "";
                if (x.isEmpty())
                    continue;
                this.time += parseInt(x) * TimePart.Hour;
                if (count < 2)
                    phrase = `${phrase} ${x}h`;
                count++;
            }
            else if (c == 'M') {
                let x = n;
                n = "";
                if (x.isEmpty())
                    continue;
                this.time += parseInt(x) * TimePart.Minute;
                if (count < 2)
                    phrase = `${phrase} ${x}m`;
                count++;
            }
            else if (c == 'S') {
                let x = n;
                n = "";
                if (x.isEmpty())
                    continue;
                this.time += parseInt(x) * TimePart.Second;
                if (count < 2)
                    phrase = `${phrase} ${x}s`;
                count++;
            }
            else
                n = "";
        }
        this.message = phrase;
    }

    toString(): string {
        return this.message;
    }
}
