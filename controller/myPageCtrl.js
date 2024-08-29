const pool = require('../DB/db');

//마이페이지로 보낼 데이터
exports.getMyPage = async (req, res) => {
  try{
    const user = req.session.user
    if(!user){
      console.log("세션 사라짐")
    }
    else{
    const myPageDataQ = 'SELECT * FROM user WHERE user_id =?';
    const cardDataQ = 'SELECT * FROM card WHERE user_user_id = ?';
    const addrDataQ = 'SELECT * FROM address WHERE user_user_id = ?';
    const cpnDataQ = 'SELECT * FROM coupon A INNER JOIN coupon_list B on A.coupon_id = B.coupon_coupon_id WHERE user_user_id = ? and coupon_usetype = "X"'
    
    const myPageDataR = await pool.query(myPageDataQ, [user]);
    const cardDataR = await pool.query(cardDataQ, [user]);
    const addrDataR = await pool.query(addrDataQ, [user]);
    const cpnDataR = await pool.query(cpnDataQ, [user])
    res.send([myPageDataR[0], cardDataR[0], addrDataR[0],cpnDataR[0]]);}
  }
  catch(err){
    console.error(err)
  }
}


exports.postCard = async (req, res) => {
  const cardNum = req.body.id;
  const cardInfo = req.body.info;
  const cardDate = req.body.date;
  const userId = req.body.userId;
  const cardState = {};
  try{
    const cardInsQ = 'INSERT INTO card VALUES(?,?,?,?)';
    const cardInsR = await pool.query(cardInsQ,[
      cardNum,
      cardInfo,
      cardDate,
      userId,
    ])
    cardState.state = "카드 정보 기입"
    res.send({cardState: cardState})
  }
  catch(err){
    console.error(err)
  }
}

exports.postAddr = async (req, res) => {
  const addrNum = req.body.num;
  const addrDef = req.body.def;
  const addrDet = req.body.det;
  const userId = req.body.userId;
  const addrState = {};
  try{
    const cardInsQ = 'INSERT INTO address VALUES(null,?,?,?,?)';
    const cardInsR = await pool.query(cardInsQ,[
      addrNum,
      addrDef,
      addrDet,
      userId,
    ])
    addrState.state = "배송지 정보 기입"
    res.send({addrState: addrState})
  }
  catch(err){
    console.error(err)
  }
}