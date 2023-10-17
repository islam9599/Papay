const MemberModel = require("../schema/member.model");
const Definer = require("../lib/mistake.js");
class Member {
  constructor() {
    this.memberModel = MemberModel;
  }

  async signupData(input) {
    try {
      // let result;
      const new_member = new this.memberModel(input);
      try {
        const result = await new_member.save();
        result.mb_password = "";
        console.log(result);
        return result;
      } catch (mongo_err) {
        console.log(mongo_err);
        throw new ERROR(Definer.auth_err1);
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
}

module.exports = Member;
