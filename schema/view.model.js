const mongoose = require("mongoose");
const { like_view_group_list, board_id_enum_list } = require("../lib/config");
const schema = mongoose.Schema;

const viewSchema = new mongoose.Schema(
  {
    mb_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    view_ref_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    view_group: {
      type: String,
      required: true,
      enum: {
        values: like_view_group_list,
      },
      bo_id: {
        type: String,
        require: false,
        enum: {
          values: board_id_enum_list,
        },
      },
    },
  },
  { timestamps: { createdAt: true } }
);

module.exports = mongoose.model("View", viewSchema);
