const {Team} = require("discord.js");
const Interpreter = require("../interpreter.js");
const {default: axios} = require("axios");

module.exports = async (client) => {
    await axios.get("https://api.leref.ga/package/version");
    const app = await client.application.fetch();
    if (app.owner instanceof Team) {
        client.aoiOptions.Owner = app.owner.members.map((x) => x.id);
    } else {
        client.aoiOptions.Owner = [app.owner.id];
    }

    await require("./aoiWarning.js")(client);

    require("./custom/timeout.js")(
        {client, interpreter: Interpreter},
        undefined,
        undefined,
        undefined,
        true,
    );
    require("./custom/timeoutPulse.js")(
        {client, interpreter: Interpreter},
        undefined,
        undefined,
        undefined,
        undefined,
        true,
    );

    if (client.cmd.loop.size) {
        require("./custom/loop.js")(client);
    }

};
