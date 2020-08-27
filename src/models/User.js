const {Schema, model} = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema(
  {
    name: {type: String, required: true},
    email: {type: String, trim: true, required: true, unique: true},
    password: {type: String, trim: true, required: true},
  },
  {timestamps: true}
);

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);

  return await bcryptjs.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

module.exports = model('User', UserSchema);
