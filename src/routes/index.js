const express = require('express');
const componentRoutes = require('../components/index');

const router = express.Router();

router.use('/users', componentRoutes.userRoutes);
router.use('/notes', componentRoutes.noteRoutes);

module.exports = router;