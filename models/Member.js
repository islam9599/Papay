const MemberModel = require("../schema/member.model");
const Definer = require("../lib/mistake.js");
const assert = require("assert");
const bcrypt = require("bcryptjs");
const {
  shapeIntoMongooseObjectId,
  lookup_auth_member_following,
  lookup_auth_member_liked,
} = require("../lib/config");
const View = require("./View");
const Like = require("./Like");

class Member {
  constructor() {
    this.memberModel = MemberModel;
  }

  async signupData(input) {
    try {
      const salt = await bcrypt.genSalt();
      input.mb_password = await bcrypt.hash(input.mb_password, salt);
      const new_member = new this.memberModel(input);

      let result;
      try {
        result = await new_member.save();
        result.mb_password = "";
        console.log(result);
        return result;
      } catch (mongo_err) {
        console.log(mongo_err);
        throw new Error(Definer.mongodb_validation_err);
      }

      //   const result = await new_member.save();
    } catch (err) {
      throw err;
    }
  }

  async loginData(input) {
    try {
      const member = await this.memberModel
        .findOne({ mb_nick: input.mb_nick }, { mb_nick: 1, mb_password: 1 })
        .exec();

      assert.ok(member, Definer.auth_err3);
      //   console.log(member);
      const isMatch = await bcrypt.compare(
        input.mb_password,
        member.mb_password
      );

      assert.ok(isMatch, Definer.auth_err4);
      return await this.memberModel.findOne({ mb_nick: input.mb_nick }).exec();
      //   console.log("member::::", member);
    } catch (err) {
      throw err;
    }
  }
  async getChosenMemberData(member, id) {
    try {
      id = shapeIntoMongooseObjectId(id);
      const auth_member = shapeIntoMongooseObjectId(member?._id);

      console.log("member:::", member);

      let aggregateQuery = [
        { $match: { _id: id, mb_status: "ACTIVE" } },
        { $unset: "mb_password" },
      ];

      if (member) {
        await this.viewChosenItemByMember(member, id, "member");

        aggregateQuery.push(lookup_auth_member_liked(auth_member));
        aggregateQuery.push(
          lookup_auth_member_following(auth_member, "members")
        );
      }

      const result = await this.memberModel.aggregate(aggregateQuery).exec();
      assert.ok(result, Definer.general_err2);
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  async viewChosenItemByMember(member, view_ref_id, group_type) {
    try {
      view_ref_id = shapeIntoMongooseObjectId(view_ref_id);
      const mb_id = shapeIntoMongooseObjectId(member._id);

      const view = new View(mb_id);

      //Validation needed
      const isValid = await view.validateChosenTarget(view_ref_id, group_type);
      console.log("isValid:::", isValid);
      assert.ok(isValid, Definer.general_err2);

      //Logged user has been seen before
      const doesExist = await view.checkViewExitence(view_ref_id);
      console.log("doesExist::::", doesExist);
      if (!doesExist) {
        const result = await view.insertMemberView(view_ref_id, group_type);
        assert.ok(result, Definer.general_err1);
      }
      return true;
    } catch (err) {
      throw err;
    }
  }
  async likeChosenItemByMember(member, like_ref_id, group_type) {
    try {
      const mb_id = shapeIntoMongooseObjectId(member?._id);
      like_ref_id = shapeIntoMongooseObjectId(like_ref_id);
      // group_type = shapeIntoMongooseObjectId(group_type);

      const like = new Like(mb_id);
      const isValid = await like.validateTargetItem(like_ref_id, group_type);
      console.log("isValid:::::::", isValid);
      assert.ok(isValid, Definer.general_err2);

      const doesExist = await like.checkLikeExistence(like_ref_id);
      console.log("doesExist:::::::", doesExist);

      let data = doesExist
        ? await like.removeMemberLike(like_ref_id, group_type)
        : await like.insertMemberLike(like_ref_id, group_type);
      assert.ok(data, Definer.general_err1);

      const result = {
        like_group: data.like_group,
        like_ref_id: data.like_ref_id,
        like_status: doesExist ? 0 : 1,
      };
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;
