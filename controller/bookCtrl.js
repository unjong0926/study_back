const pool = require('../DB/db');

//도서정보로 보낼 데이터
exports.get_Book = async (req, res) => {
  try{
    const user = req.session.user;
    const bookInfoQ = 'SELECT * FROM book_info';
    const bookInfoR = await pool.query(bookInfoQ);
    res.send([bookInfoR[0], user])
  }
  catch(err){
    console.error(err)
  }
}

//장바구니 테이블에 저장할 도서정보
exports.post_CartBook  = async (req, res) =>{
  try{
    const user = req.session.user
    const checkUserCartQ = 'SELECT * FROM cart WHERE user_user_id = ?'
    const checkUserCartR = await pool.query(checkUserCartQ, [user])
    const cartState = {}
    let userCart;
    if(checkUserCartR[0].length === 0){
      const createCartQ = 'INSERT INTO cart VALUES(null, now(), ?)'
      const createCartR = await pool.query(createCartQ,[user])
      userCart = createCartR[0][0].cart_id
      console.log(userCart,"카트 생성 완료")
    }
    else{
      userCart = checkUserCartR[0][0].cart_id
    }
    const bookId = req.body.id;
    const insertCartQ = 'INSERT INTO cart_list VALUES (null, ? ,?, 1)';
    const insertCartR = await pool.query(insertCartQ, [userCart, bookId])
    cartState.state = "장바구니 추가 완료"
    res.json({cartState: cartState})
    
  }
  catch(err){
    console.error(err)
  }
}

//주문 테이블에 저장할 도서정보
exports.post_OrderBook  = async (req, res) =>{
  try{

  }
  catch(err){
    console.error(err)
  }
}
