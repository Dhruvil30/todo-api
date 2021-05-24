const mongoose = require('mongoose');
const Event = require('../../lib/mongooseConfig').models.userModel;

module.exports = {

    getAll: async (userId) => {
        const query = { "_id": userId }
        const queryResult = await Event.findOne(query);
        return queryResult;
    },

    getByName: async (userId, searchName) => {
        const query = [
            { "$match": {"_id": mongoose.Types.ObjectId(userId)}},
            { "$unwind": "$notes" },
            { "$match": {
                "notes.name": { "$regex": searchName, "$options": "i" }
            }},
            { "$group": {
                "_id": "$_id",
                "notes": { "$push": "$notes" },
            }}
        ];
        const queryResult = await Event.aggregate(query);
        return queryResult;
    },

    getTodayNotes: async (userId) => {
        let day = 1 * 24 * 60 * 60 * 1000;
        let startTime = new Date();
        startTime.setUTCHours(0,0,0,0);
        let endTime = new Date(startTime.getTime() + day);

        const query = [
            { "$match": {"_id": mongoose.Types.ObjectId(userId)}},
            { "$project": {
                "notes": {"$filter": {
                    "input": '$notes',
                    "as": 'note',
                    "cond": {
                        "$and" : [
                            { "$gte": ['$$note.reminderTime', startTime] },
                            { "$lt": ['$$note.reminderTime', endTime] }
                        ]
                    }
                }}
            }}
        ];
        const queryResult = await Event.aggregate(query);
        return queryResult;
    },

    get: async (userId, noteId) => {
        const userQuery = { "_id": userId };
        const query = { "notes": {
                "$elemMatch" : { "_id": noteId}
            }};
        const queryResult = await Event.findOne(userQuery).select(query);
        if (!queryResult.notes.length) throw new Error('RESOURCE_NOT_FOUND');
        return queryResult.notes[0];
    },

    create: async (userId, data) => {
        const query = { "$push": { "notes": data }};
        const queryResult = await Event.findByIdAndUpdate(userId, query, { new: true });
        return queryResult;
    },

    update: async (userId, noteId, data) => {
        const userQuery = { "_id": userId };
        const query = { '$set': {
                'notes.$.name': data.name,
                'notes.$.description': data.description,
                'notes.$.reminderTime': data.reminderTime
            }};
        const queryResult = await Event.findOne(userQuery).updateOne({'notes._id': noteId}, query, { omitUndefined: true });
        if (!queryResult.nModified) throw new Error('DATA_NOT_MODIFIED');
    },
    
    delete: async (userId, noteId) => {
        const userQuery = { "_id": userId };
        const query = { "$pull": { "notes": { "_id": noteId }}};
        const queryResult = await Event.findOne(userQuery).updateOne(query);
        if (!queryResult.nModified) throw new Error('RESOURCE_NOT_FOUND');
    }

};