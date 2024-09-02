const pool = require('../DB/db');

exports.get_monthly = async (req, res) => {
  try {
    const bestBookQ = 'SELECT book_name FROM book_info A INNER JOIN monthly_sales B ON A.book_id = B.book_info_book_id ORDER BY sales_book DESC LIMIT 3'
    const bestBookR = await pool.query(bestBookQ)
    res.send(bestBookR[0])
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.post_monthly = async (req, res) => {
  try {
    const amount = req.body.count;

    // 책 판매량 업데이트
    for (let i = 0; i < amount.length; i++) {
      const id = amount[i].id;
      const count = parseInt(amount[i].count)
      const monthlySalesQ = 'UPDATE monthly_sales SET sales_book = sales_book + ? WHERE book_info_book_id = ?';
      await pool.query(monthlySalesQ, [count, id]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
