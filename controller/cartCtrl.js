const pool = require('../DB/db');


exports.getCart = async (req, res) => {
  try{
    const user = req.session.user;
    console.log(user, "장바구니 페이지") //세션 체크용 콘솔
    if(!user){
      console.log("아직 로그인하지 않았습니다.")
    }
    else{
          const searchCartQ = 'SELECT cart_id FROM cart WHERE user_user_id = ?'
          const searchCartR = await pool.query(searchCartQ,[user])
        const userCartId = searchCartR[0][0].cart_id
    const showCartListQ = `
      SELECT book_info.book_name, book_info.book_inventory, book_info.book_price, cart_list.count_book
      FROM book_info
      INNER JOIN cart_list ON book_info.book_id = cart_list.book_info_book_id
      WHERE cart_list.cart_cart_id = ?;
    `;
    const showCartListR = await pool.query(showCartListQ,[userCartId]);
    console.log(showCartListR[0]) // 에러 체크용 콘솔
    res.send(showCartListR[0])
    }
  }
  catch(err){
    console.error(err)
  }
}


exports.postCart = async (req, res) => {
  try{
    
  }
  catch(err){
    console.error(err)
  }
}