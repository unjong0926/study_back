const pool = require("../DB/db")




exports.postCoupon = async (req, res) => {
  try{
    const user = req.session.user
    if(req.body.int){
    console.log(req.body.int)
    const intType = req.body.int
    const intCouponQ = "INSERT INTO coupon VALUES(null, ?, null, now(), 'X', now() + INTERVAL 7 DAY)"
    const intCouponR = await pool.query(intCouponQ,[intType])
  }
    else{
      console.log(req.body.per)
      const perType = req.body.per
      const perCouponQ = "INSERT INTO coupon VALUES(null, ?, null, now(), 'X', now() + INTERVAL 7 DAY)"
      const perCouponR = await pool.query(perCouponQ,[perType])
    }
    const selcCpnQ = "SELECT coupon_id FROM coupon ORDER BY coupon_id DESC LIMIT 1"
    const selcCpnR = await pool.query(selcCpnQ)
    const cpnInsQ = "INSERT INTO coupon_list VALUES(null, ?, ?)"
    const cpnInsR = await pool.query(cpnInsQ, [user, selcCpnR[0][0].coupon_id])
  }
  catch(err){
    console.error(err)
  }
}