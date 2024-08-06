const pool = require("../DB/db")

//로그인 페이지에서 받아온 데이터
exports.post_Login = async(req, res) =>{
  const login = {};

  const userID = req.body.id;
  const userPW = req.body.pw;
  const userCheckQ = 'SELECT * FROM user WHERE user_id=? and password=?';
  const userCheckR = await pool.query(userCheckQ, [userID, userPW]);
  
  if(userCheckR[0].length>0){
    login.state = "로그인이 완료되었습니다.";
    req.session.user = userID;
    
    req.session.save()
    res.json({login: login});
  }
  else{
    login.state = "없는 값 입니다.";
    res.json({login:login});
  }
}