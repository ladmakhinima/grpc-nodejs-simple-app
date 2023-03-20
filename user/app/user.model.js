const { Schema, model } = require("mongoose");

const UserModel = new Schema(
  {
    id: Number,
    name: String,
    isMarried: Boolean,
    skills: [String],
    role: Number,
  },
  { timestamps: false, _id: true }
);

UserModel.pre("save", async function (next) {
  const count = await this.constructor.count();
  this.set({ id: count + 1 });
  return next();
});

module.exports = {
  UserModel: model("users", UserModel),
};
