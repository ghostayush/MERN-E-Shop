//creating token and saving in cookie

const sendToken = (user,statuscode,res)=>{
    const token = user.getJWTToken();

    //option for cookie
    const options = {
        
        maxAge: 24 * 60 * 60 * 1000,
         httpOnly: true 
    };

    res.status(statuscode).cookie("token", token, options).json({
        success: true,
        user,
        token,
      });
};

module.exports = sendToken;