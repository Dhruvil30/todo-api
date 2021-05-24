require('dotenv').config();

const rp = require('request-promise');
const discordWebhookUrl = process.env.DISCORD_URL;

const defineDiscordObject = (data) => {
  const fieldsList = []
  for (note of data) {
    let value = note.description + "\n" + note.reminderTime.toISOString().substring(11, 19);
    fieldsList.push({
      "name": note.name,
      "value": value,
    })
  }
  return {
    fields: fieldsList,
    color: 14177041
  };
};

const message = (userName, data) => {
  const discordObject = {
    "username": "Todos Bot",
    "content": "**```Todos for " + userName + '```**',
    embeds: [],
  };

  discordObject.embeds.push(defineDiscordObject(data));
  
  return discordObject;
};

module.exports.sentDiscordNotification = (userName, data) => {
  const options = {
    method: 'POST',
    uri: discordWebhookUrl,
    body: message(userName, data),
    json: true,
  };
  rp(options);
};