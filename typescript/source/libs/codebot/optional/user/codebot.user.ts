/// <reference path="../../codebot.ts" />

/** User represents the person viewing the web page. */
class User {
    private _title = "";
    private _timer = 0;
    private _name = "anonymous";
    private _users = [this._name];

    /** Connect to the server and request a name of available users.
     * @param connected A callback notifying you that the list has been received.
     */
    connect(connected: Proc) {
        sendWebRequest("/?method=users", (request) => {
            this._users = JSON.parse(request.response);
            if (this.isAnynomous)
                this._name = this._users[0];
            connected();
        });
    }

    /** Log into a domain given a username and password.
     * @param name The name of the user.
     * @param password The password for the user.
     * @param complete A optional callback containing true if login was a success. 
     */
    login(name?: string, password?: string, complete?: Action<boolean>) : void {
        let data = {
            name: name ? name : ((get("#name") || get("#username") || get("#login")) as HTMLInputElement).value,
            password: password ? password : (get("#password") as HTMLInputElement).value,
            redirect: false
        }
        postWebRequest("/?method=login", data, (request) => {
            let success = request.response == "OK"; 
            if (complete)
                complete(success);
            else if (success)
                navigate("/");
            else {
                let box = get("#loginWindow");
                if (box) 
                    box.reapplyClass("shake");
                let title = get("#loginTitle");
                if (title) {
                    if (this._title == "")
                    this._title = title.innerHTML;
                    title.innerHTML = "Invalid username or password";
                    if (this._timer)
                        clearTimeout(this._timer);
                    this._timer = setTimeout(() => {
                        title.innerHTML = this._title;
                        this._timer = 0;
                    }, 3500);
                }
            }
        });
    }

    /** Log out of a domain.
     * @param complete An optional callback notifying you when log out has completed. 
     */
    logout(complete?: Proc) : void {
        if (complete)
            sendWebRequest("/?method=logout", () =>  complete());
        else
            sendWebRequest("/?method=logout", () =>  navigate("/"));
    }

    /** Returns true if the user was not logged in. */
    get isAnynomous() : boolean {
        return this._name == "anonymous";
    }

    /** Get or set the name of the current user.
     */
    get name() : string {
        return this._name; 
    }

    set name(value: string)
    {
        this._name = value.trim();
        if (this._name.length == 0)
            this._name = "anonymous";
        else if (this._name.toLowerCase() == "anonymous")
            this._name = "anonymous";
    }

    /** Get a list of available users */
    get users() : string[] {
        return this._users;
    }
}

/** The current user. */
let user = new User();