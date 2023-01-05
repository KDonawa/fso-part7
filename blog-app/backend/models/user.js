const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, minLength: 3 },
  password: { type: String, required: true, minLength: 3 },
  name: { type: String, default: "Anonymous" },
  blogs: { type: [Schema.Types.ObjectId], ref: "Blog" },
});

userSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

module.exports = model("User", userSchema);
