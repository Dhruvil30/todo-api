const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  notes: [
    {
      type: new mongoose.Schema(
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
          reminderTime: { type: Date, required: true },
        },
        { timestamps: true },
      ),
    },
  ],
},
{ timestamps: true });

const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;
