const assert = require("assert");
const memberModel = require("../schema/member.model");
const ViewModel = require("../schema/view.model");
const Definer = require("../lib/mistake");
const { exec } = require("child_process");

class View {
  constructor(mb_id) {
    this.viewModel = ViewModel;
    this.memberModel = memberModel;
    this.mb_id = mb_id;
  }

  async validateChosenTarget(view_ref_id, group_type) {
    try {
      let result;
      switch (group_type) {
        case "member":
          result = await this.memberModel
            .findById({
              _id: view_ref_id,
              mb_status: "ACTIVE",
            })
            .exec();
          break;
      }
      return !!result;
    } catch (err) {
      throw err;
    }
  }

  async insertMemberView(view_ref_id, group_type) {
    try {
      const new_view = await this.viewModel({
        mb_id: this.mb_id,
        view_ref_id: view_ref_id,
        view_group: group_type,
      });
      const result = await new_view.save();
      assert.ok(result, Definer.general_err1);

      //Target items viewlar sonini 1 donaga oshiramiz
      await this.modifyItemViewCounts(view_ref_id, group_type);

      return result;
    } catch (err) {
      throw err;
    }
  }
  async modifyItemViewCounts(view_ref_id, group_type) {
    try {
      switch (group_type) {
        case "member":
          await this.memberModel
            .findByIdAndUpdate(
              {
                _id: view_ref_id,
              },
              { $inc: { mb_views: 1 } }
            )
            .exec();
          break;
      }
      return true;
    } catch (err) {
      throw err;
    }
  }
  async checkViewExitence(view_ref_id) {
    try {
      const view = await this.viewModel
        .findOne({
          mb_id: this.mb_id,
          view_ref_id: view_ref_id,
        })
        .exec();
      console.log("view::::", view);
      //   return view ? true : false;
      return !!view;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = View;