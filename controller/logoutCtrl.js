exports.postLogout = async (req, res) => {
  try{
    req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.clearCookie('connect.sid', { path: '/' }); // 'connect.sid'는 기본적으로 사용되는 쿠키 이름입니다.
    return res.status(200).json({ message: "Logout successful" });
  })
  }
  catch(err){
    console.error(err)
  }
}