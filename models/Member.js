const MemberModel = require("../schema/member.model");
const Definer = require("../lib/mistake.js");
const assert = require("assert");
const bcrypt = require("bcryptjs");
class Member {
  constructor() {
    this.memberModel = MemberModel;
  }

  async signupData(input) {
    try {
      const salt = await bcrypt.genSalt();
      input.mb_password = await bcrypt.hash(input.mb_password, salt);
      const new_member = new this.memberModel(input);
      //   let result;

      //TODO: Authenticate based on JWT

      try {
        const result = await new_member.save();
        result.mb_password = "";
        console.log(result);
        return result;
      } catch (mongo_err) {
        console.log(mongo_err);
        throw new Error(Definer.auth_err1);
      }

      //   const result = await new_member.save();
    } catch (err) {
      throw err;
    }
  }

  //   async saveNewMemberData() {
  //     try{
  //         await
  //     }catch(err){

  //     }
  //   }
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
}

module.exports = Member;
