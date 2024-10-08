const pool = require('../DB/db');


exports.getOrder = async (req, res) => {
  try{
    const user = req.session.user;
    console.log(user, "001");
    const loginedUserCardQ = `
    SELECT C.card_date, C.card_num, C.card_info
    FROM user U 
    INNER JOIN card C ON U.user_id = C.user_user_id
    WHERE user_id = ?
    `;
    const loginedUserAddrQ = `
    SELECT A.address_num, A.defalut_address, A.detail_address
    FROM user U
    INNER JOIN address A ON U.user_id = A.user_user_id
    WHERE user_id = ?
    `;
    const cpnDataQ = 'SELECT * FROM coupon A INNER JOIN coupon_list B on A.coupon_id = B.coupon_coupon_id WHERE user_user_id = ? and coupon_usetype = "X"'
    

    const loginedUserCardR = await pool.query(loginedUserCardQ, [user]);
    const loginedUserAddrR = await pool.query(loginedUserAddrQ, [user]);
    const cpnDataR = await pool.query(cpnDataQ, [user])
    res.send([loginedUserCardR[0], loginedUserAddrR[0], cpnDataR[0]])
  }
  catch(err){
    console.error(err)
  }
}


exports.postOrder = async (req, res) => {
  try{
    console.log(req.body)
    const info = req.body.info
    const user = req.session.user;
    const book = req.body.books.length;
    const price = req.body.price;
    const count = req.body.count;
    const cardNum = req.body.userCard.num;
    const cardInfo = req.body.userCard.info;
    const cardDate = req.body.userCard.date;
    const postNum = req.body.userAddr.num;
    const defAddr = req.body.userAddr.def;
    const detAddr = req.body.userAddr.det;
    const disprice = req.body.disprice;
  
    if(info === 0){
    const orderQ = 'INSERT INTO `order` VALUES(null, ?, now(), ?,?,?,?,?,?,?,?,null,?)'
    const orderR = await pool.query(orderQ, [
      count,
      price,
      user,
      defAddr,
      detAddr,
      cardInfo,
      postNum,
      cardNum,
      cardDate,
      disprice
    ])
    
    const orderIdQ = 'SELECT order_id FROM `order` WHERE user_user_id = ? ORDER BY order_id DESC LIMIT 1'
    const orderIdR = await pool.query(orderIdQ, [user])
    
    for(let i = 0; i< book; i++){
      const bookName = req.body.books[i].name;
      const findBookIdQ = "SELECT book_id FROM book_info WHERE book_name = ?"
      const findBookIdR = await pool.query (findBookIdQ, [bookName])
      const orderListQ = "INSERT INTO order_list VALUES(null, ? ,?)"
      const orderListR = await pool.query(orderListQ, [findBookIdR[0][0].book_id, orderIdR[0][0].order_id])
    }
    res.send("주문이 완료 되었습니다. 마이페이지로 이동합니다.")}

    else{
      const cpnType = req.body.userCpn.type;
      const cpnNum = req.body.userCpn.num

      const orderQ = 'INSERT INTO `order` VALUES(null, ?, now(), ?,?,?,?,?,?,?,?,?,?)'
      const orderR = await pool.query(orderQ, [
      count,
      price,
      user,
      defAddr,
      detAddr,
      cardInfo,
      postNum,
      cardNum,
      cardDate,
      cpnType,
      disprice
    ])
    
    const orderIdQ = 'SELECT order_id FROM `order` WHERE user_user_id = ? ORDER BY order_id DESC LIMIT 1'
    const orderIdR = await pool.query(orderIdQ, [user])

    const useCpnQ = 'UPDATE coupon SET coupon_usetype = "O", coupon_used = now() WHERE coupon_id = ?'
    const useCpnR = await pool.query(useCpnQ,[cpnNum])
    
    for(let i = 0; i< book; i++){
      const bookName = req.body.books[i].name;
      const findBookIdQ = "SELECT book_id FROM book_info WHERE book_name = ?"
      const findBookIdR = await pool.query (findBookIdQ, [bookName])
      const orderListQ = "INSERT INTO order_list VALUES(null, ? ,?)"
      const orderListR = await pool.query(orderListQ, [findBookIdR[0][0].book_id, orderIdR[0][0].order_id])
    }
    res.send("주문이 완료 되었습니다. 마이페이지로 이동합니다.")
    }
  }
  catch(err){
    console.error(err)
  }
}