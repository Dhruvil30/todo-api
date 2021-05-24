const userService = require('./user.service');

module.exports = {
    
    login: async (req, res, next) => {
        try {
            const data = req.body;
            const eventData = await userService.authenticate(data);
            req.session.userId = eventData.id;
            req.session.userName = eventData.name;
            res.status(200).json(eventData);
        } catch (error) {
            next(error);
        }
    },

    register: async (req, res, next) => {
        try {
            const data = req.body;
            const eventData = await userService.create(data);
            req.session.userId = eventData.id;
            req.session.userName = eventData.name;
            res.status(201).json(eventData);
        } catch (error) {
            next(error);
        }
    },

    logout: async (req, res) => {
        req.session.userId = null;
        res.status(200).json({ message: 'User Logged Out.' });
    }

}


// getAll: async (req, res) => {
//     try {
//         const evenData = await userService.getAll();
//         res.status(200).json(evenData);
//     } catch {
//         res.status(400).json({ message: error.message });
//     }
// },

// update: async (req, res) => {
//     try{
//         const { id: userId } = req.params;
//         const data = req.body;
//         const eventData = await userService.update(data, userId);
//         res.status(200).json(eventData);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// },

// delete: async (req, res) => {
//     try {
//         const { id: userId } = req.params;
//         const eventData = await userService.delete(userId);
//         res.status(200).json(eventData);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }