const pool = require('../DB/db');


exports.getList = async (req, res) => {
  try{
    const user = req.session.user;
    if(!user){
      console.log("세션 사라짐")
    }
    else{
    const userNameQ = 'SELECT user_name FROM user WHERE user_id = ?'
    const userNameR = await pool.query(userNameQ, [user])
    const userOrderQ = 'SELECT C.book_name, A.detail_info, A.order_id, A.discount_price, A.order_date, A.user_card_info, A.user_default_address, A.user_detail_address FROM `order` A INNER JOIN order_list B ON A.order_id = B.order_order_id INNER JOIN book_info C ON B.book_info_book_id = C.book_id WHERE A.user_user_id = ? ORDER BY order_date'
    const userOrderR = await pool.query(userOrderQ, [user])
    res.send([userOrderR[0], userNameR[0]])}
  }
  catch(err){
    console.error(err)
  }
}


exports.postList = async (req, res) => {
  try{
    
  }
  catch(err){
    console.error(err)
  }
}