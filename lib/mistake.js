class Definer {
  // General errors
  static general_err1 = "Att: something went wrong!";
  static general_err2 = "Att: there is no data with that params!";
  static general_err3 = "Att: file upload error!";

  /**  member auth related errors*/

  static auth_err1 = "Att: mongodb validation is failed!";
  static auth_err2 = "Att: jwt creation err!";
  static auth_err3 = "Att: no member with that mb_nick!";
  static auth_err4 = "Att: your credintials do not match!";
  static auth_err5 = "Att: you are not authenticated!";

  /** product related errors */
  static product_err1 = "Att: product creation is failed";

  /** order related errors */
  static order_err1 = "Att: order creation is falied";
  static order_err2 = "Att: order items creation is falied";
}

module.exports = Definer;
