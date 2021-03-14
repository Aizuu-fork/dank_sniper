const { Client } = require("discord.js");
const config = require("./config.json");
const util = require("./util");

module.exports = class dank_ extends Client {
    constructor(opt) {
        super({
            disableMentions: "all",
            presence: {
                status: "idle"
            },
            _tokenType: "" 
        }, opt);

        this.config = config;
        this.util = util;
        this.eventCollect = false;
    }

    event() {
        this.on("ready", () => {
            const msg = this.channels.cache.get("820564645848809476");
            setInterval(() => {
                msg.startTyping();
                this.util.delay(1e3);
                msg.send("pls fish");
                this.util.delay(3e3);
                msg.send("pls hunt");
                msg.stopTyping(true);
                return;
            }, 4e4);
            console.log(`${this.user.tag} is Ready!`);
        });
    }

    build() {
        this.login(process.env.token ? process.env.token : this.config.token);
    }
}