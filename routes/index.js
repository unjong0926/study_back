const express = require('express');
const router = express.Router();
 //사용할 컨트롤러 선언
const signUpCtrl = require('../controller/signupCtrl.js');
const loginCtrl = require('../controller/loginCtrl.js');
const bookCtrl = require("../controller/bookCtrl.js");
const myPageCtrl = require("../controller/myPageCtrl.js");
const cartCtrl = require("../controller/cartCtrl.js");
const orderCtrl = require("../controller/orderCtrl.js");
const orderPageCtrl = require("../controller/orderPageCtrl.js")
const logoutCtrl = require("../controller/logoutCtrl.js")
const couponCtrl = require("../controller/couponCtrl.js")
const monthlySales = require("../controller/monthlySales.js")

//메인 쿠폰 받는 라우터
router.post('/', couponCtrl.postCoupon)

//회원가입 라우터
router.post('/sign_up', signUpCtrl.post_UserInfo);

//로그인 라우터
router.post("/login", loginCtrl.post_Login);

//로그아웃 라우터
router.post("/logout", logoutCtrl.postLogout)

//도서정보 라우터
router.get("/book", bookCtrl.get_Book);
//도서정보 보낼 라우터
router.post("/cart_book", bookCtrl.post_CartBook);
router.post("/order_book", bookCtrl.post_OrderBook);

//마이페이지 라우터
router.get("/my_page", myPageCtrl.getMyPage);
router.post("/card", myPageCtrl.postCard);
router.post("/address", myPageCtrl.postAddr);

//장바구니 라우터
router.get('/cart', cartCtrl.getCart)
router.post('/cart', cartCtrl.postCart)

//주문 및 바로구매 라우터
router.get('/order', orderCtrl.getOrder)
router.post('/order', orderCtrl.postOrder)

//주문내역 페이지 라우터
router.get('/order_page', orderPageCtrl.getList)

//판매량 라우터
router.get('/sales', monthlySales.get_monthly)
router.post('/sales', monthlySales.post_monthly)

module.exports = router;
