require('dotenv').config();

const { CronJob } = require('cron');
const { sentDiscordNotification } = require('./discord-bot');
const userService = require('../components/user/user.service');
const noteService = require('../components/note/note.service');

const formatNotesData = (data) => {
  if (!data.length) return [];
  return data[0].notes.map((note) => {
    const formatedData = {
      name: note.name,
      description: note.description,
      reminderTime: note.reminderTime,
    };
    return formatedData;
  });
};

const sendTodayTask = async (user) => {
  const data = await noteService.getTodayNotes(user.id);
  const formatedData = formatNotesData(data);
  if (formatedData.length) sentDiscordNotification(user.name, formatedData);
};

const sendNotification = async (users) => {
  const usersPromises = [];
  users.forEach((user) => usersPromises.push(new Promise(() => sendTodayTask(user))));
  try {
    await Promise.all(usersPromises);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsersData: async () => {
    const userData = await userService.getAllUserForTodoScheduler();
    return userData;
  },

  runScheduler: (users) => {
    const job = new CronJob('* * * * *', () => {
      sendNotification(users);
    });

    job.start();
  },
};
