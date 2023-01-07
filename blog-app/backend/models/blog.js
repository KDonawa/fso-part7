const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  author: String,
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  likes: { type: Number, default: 0 },
  comments: [String],
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model("Blog", blogSchema);
