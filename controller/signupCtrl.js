const pool = require("../DB/db")

//회원가입에서 받아온 데이터
exports.post_UserInfo = async (req, res) => {
  const userID = req.body.id;
  const userPW = req.body.pw;
  const userName = req.body.userName;
  const signState = {};

  const signUpQ = 'INSERT INTO user(user_id, password, user_name) VALUES(?,?,?)';
  const signUpR = await pool.query(signUpQ, [
    userID,
    userPW,
    userName,
  ]);
  signState.state = '값이 들어감'
  res.send({signState: signState})
}
