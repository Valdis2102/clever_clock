class Userinfo {
    constructor() {
        this.timeOpened = new Date();
        this.timezone = (new Date()).getTimezoneOffset() / 60;
    };

    async ip() {
        let result = await (await fetch('https://api.db-ip.com/v2/free/self'));
        let data = await result.json();
        return data;
    };
};