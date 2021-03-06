module.exports = {
  userTestData: {
    userId: '000user01234',
    users: [
      {
        _id: '000user01234',
        name: 'Dhruvil',
        email: 'dp@gmail.com',
        password: 'password',
        notes: [],
      },
      {
        _id: '000user01235',
        name: 'Kunal',
        email: 'km@gmail.com',
        password: 'password',
        notes: [],
      },
    ],
  },

  noteTestData: {
    userId: '000user12345',
    noteId: '000note12345',
    testData: {
      _id: '000user12345',
      name: 'Dhruvil',
      email: 'd@gmail.com',
      password: 'password',
      notes: [
        {
          _id: '000note12345',
          name: 'Meeting',
          description: 'Meeting regarding discord message format',
          reminderTime: '2021-05-24T05:30:00.000+00:00',
        },
        {
          _id: '000note12346',
          name: 'Implement',
          description: 'Implement discord message format task',
          reminderTime: '2021-05-24T05:30:00.000+00:00',
        },
        {
          _id: '000note12347',
          name: 'Issue',
          description: 'Work on search by name issue in todo list',
          reminderTime: '2021-05-22T05:30:00.000+00:00',
        },
      ],
    },
  },

  getNoteTestData: [
    {
      name: 'Meeting',
      description: 'Meeting regarding discord message format',
      reminderTime: '2021-05-24T05:30:00.000Z',
    },
    {
      name: 'Implement',
      description: 'Implement discord message format task',
      reminderTime: '2021-05-24T05:30:00.000Z',
    },
    {
      name: 'Issue',
      description: 'Work on search by name issue in todo list',
      reminderTime: '2021-05-22T05:30:00.000Z',
    },
  ],
};
