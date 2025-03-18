const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const employeSchema = new mongoose.Schema(
  {
    dbId: { type: Number, unique: true },
    employeId: Number,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
  },
  { timestamps: true }
);

// Apply auto-increment plugin
employeSchema.plugin(AutoIncrement, { inc_field: "dbId" });

module.exports = mongoose.model("Employee", employeSchema);
