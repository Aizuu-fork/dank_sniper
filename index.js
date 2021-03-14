const { inspect } = require('util');
const dank_ = require("./dank_");
const client = new dank_();
require("dotenv").config();

client.on("message", async (msg) => {
    if (
        msg.guild.id !== "380289224043266048" || !client.config.responseAble.some(x => msg.author.id === x)
    ) return;

    if (msg.content.startsWith("eval")) {
        const args = msg.content.slice(4)
            .trim()
            .split(/ +/g);
        const isAsync = args.includes('--async');
        const isSilent = args.includes('--silent');
        const code = args.filter(e => !e.match(/^--(async|silent)$/)).join(' ');
        try {
            let result = eval(isAsync ? `(async()=>{${code}})()` : code);
            let isResultPromise = false;
            if (result instanceof Promise) {
                result = await result;
                isResultPromise = true;
            }
            if (isSilent) return;
            let inspectedResult = typeof result === 'string' ? result : inspect(result, {
                depth: 0
            });
            if (isResultPromise) {
                inspectedResult = `Promise<${typeof result === 'string' ? inspect(inspectedResult) : inspectedResult}>`;
            }
            return msg.channel.send(`${isURL(inspectedResult) ? inspectedResult : `\`\`\`js\n${inspectedResult}\`\`\``}`);
        } catch (e) {
            return msg.channel.send(`${`\`\`\`js\n${e}\n\`\`\``}`);
        }

        function isURL(url) {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        }
    }
    if (client.eventCollect) {
        if (msg.author.id === client.config.responseAble[0] && msg.content.includes("Type" | "typing")) {
            const message = msg.content.match(/`.+`/gi);
            if (!message) return
            msg.channel.startTyping()
            client.util.delay(6e3)
            for (let i = 0; i < 5; i++) {
                client.util.delay(5e3)
                msg.channel.send(message[0].replace(/\`/gi, ''));
            }
            msg.channel.stopTyping(true);
        }
    }
    if (msg.content === "fish") {
        msg.channel.startTyping()
        client.util.delay(1e3);
        msg.channel.send("pls fish");
        msg.channel.stopTyping(true)
        return
    }
    if (msg.content === "hunt") {
        msg.channel.startTyping()
        client.util.delay(1e3);
        msg.channel.send("pls hunt");
        msg.channel.stopTyping(true)
        return
    }
    if (msg.content === "daily") {
        msg.channel.startTyping()
        client.util.delay(1e3);
        msg.channel.send("pls daily");
        msg.channel.stopTyping(true)
        return
    }
    if (msg.content.startsWith("say")) {
        if (!msg.content) return
        msg.channel.startTyping()
        client.util.delay(1e3);
        msg.channel.send(msg.content.replace(/say/gi, ""));
        msg.channel.stopTyping(true)
        return
    }
    if (msg.channel.id === client.config.channel) {
        if (msg.author.id === client.config.responseAble[0] && msg.content.includes("Type" | "typing")) {
            const message = msg.content.match(/`.+`/gi);
            if (!message) return
            msg.channel.startTyping()
            client.util.delay(8e3)
            for (let i = 0; i < 5; i++) {
                client.util.delay(7e3)
                msg.channel.send(message[0].replace(/\`/gi, ''));
            }
            msg.channel.stopTyping(true);
        }
    } else if (msg.author.id === client.config.responseAble[0] && msg.content.includes("You don't have a fishing pole")) {
        return msg.channel.send('pls buy fishingpole')
    } else if (msg.author.id === client.config.responseAble[0] && msg.content.includes("You don't have a hunting rifle")) {
        return msg.channel.send('pls buy huntingrifle')
    }
});


client.event();
client.build();