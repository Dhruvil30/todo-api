require('dotenv').config();

const { CronJob } = require('cron');
const discordObject = require('./discord-bot');
const userService = require('../components/user/user.service');
const noteService = require('../components/note/note.service');

const formatNotesData = (data) => {
  if (!data.length) return [];
  return data[0].notes.map((note) => {
    return {
      name: note.name,
      description: note.description,
      reminderTime: note.reminderTime
    };
  });
};

const sendNotification = async (users) => {
  for (user of users) {
    const data = await noteService.getTodayNotes(user.id);
    const formatedData = formatNotesData(data);
    if (formatedData.length) discordObject.sentDiscordNotification(user.name, formatedData);
  }
};

module.exports = {
  getUsersData: async () => {
    const userData = await userService.getAllUserForTodoScheduler();
    return userData;
  },

  runScheduler: (users) => {
    const job = new CronJob('00 * * * * *', () => {
      sendNotification(users);
    });

    job.start();
  }
};
