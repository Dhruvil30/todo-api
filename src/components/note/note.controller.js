const noteService = require('./note.service');
const noteEventController = require('../../socket/note-events/noteEvent.controller');

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

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const eventData = await noteService.getAll(userId);
      const formatedData = eventData.notes.map((note) => {
        return {
          name: note.name,
          description: note.description,
          reminderTime: note.reminderTime
        };
      });
      res.status(200).json(formatedData);
    } catch (error) {
      next(error);
    }
  },

  getByName: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const searchName = req.query.name;
      const eventData = await noteService.getByName(userId, searchName);
      const formatedData = formatNotesData(eventData);
      res.status(200).json(formatedData);
    } catch (error) {
      next(error);
    }
  },

  getTodayNotes: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const eventData = await noteService.getTodayNotes(userId);
      const formatedData = formatNotesData(eventData);
      res.status(200).json(formatedData);
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const noteId = req.params.id;
      const eventData = await noteService.get(userId, noteId);
      const formatedData = {
        name: eventData.name,
        description: eventData.description,
        reminderTime: eventData.reminderTime
      };
      res.status(200).json(formatedData);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const data = req.body;
      const IoObj = req.IoObj;
      await noteService.create(userId, data);
      noteEventController.sendUpdatedData(data, userId, IoObj);
      res.status(201).json();
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const noteId = req.params.id;
      const data = req.body;
      await noteService.update(userId, noteId, data);
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const noteId = req.params.id;
      await noteService.delete(userId, noteId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
};
