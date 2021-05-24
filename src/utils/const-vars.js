module.exports = {

    noteTestData: {
        userId: '000user12345',
        noteId: '000note12345',
        testData: {
            _id: '000user12345',
            name: "Dhruvil",
            email: "d@gmail.com",
            password: "password",
            notes: [
                {
                    _id: '000note12345',
                    name: 'Meeting',
                    description: 'Meeting regarding discord message format',
                    reminderTime: '2021-05-24T05:30:00.000+00:00'
                },
                {
                    _id: '000note12346',
                    name: 'Implement',
                    description: 'Implement discord message format task',
                    reminderTime: '2021-05-24T05:30:00.000+00:00'
                },
                {
                    _id: '000note12347',
                    name: 'Issue',
                    description: 'Work on search by name issue in todo list',
                    reminderTime: '2021-05-22T05:30:00.000+00:00'
                }
            ]
        }
    }

}
