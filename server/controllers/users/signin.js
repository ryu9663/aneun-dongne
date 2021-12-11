const { User } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../tokenFunctions");

module.exports = (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    where: {
      email,
      password,
    },
  })
    .then((data) => {
      // console.log("하이하이하이", data);
      if (!data) {
        res.status(404).send("invalid user");
      } else {
        delete data.dataValues.password;
        const accessToken = generateAccessToken(data.dataValues);
        console.log("로긴 액세스토큰 콘솔로그", accessToken);
        res.cookie("jwt", accessToken);
        sendAccessToken(res, accessToken);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
