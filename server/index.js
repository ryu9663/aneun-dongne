require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
// const { upload } = require("./upload");
// const db = require("./models");
// const { update } = require("../update");
// const { sequelize } = require("./models/index");
const controllers = require("./controllers");
const upload = require("./controllers/upload-image");
const app = express();

const PORT = process.env.PORT;

// const controllers = require("./controllers");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["https://localhost:3000", "http://localhost:3000", "https://aneun-dongne.com", "http://aneun-dongne.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", controllers.home);
app.get("/post/:contentId", controllers.postDetails);

app.get("/user/info", controllers.getAuth);
app.patch("/user/info", upload.single("image"), controllers.updateAuth);
app.delete("/user/info", controllers.deleteAuth);

app.get("/mypage/likelists", controllers.myLikes);
app.get("/mypage/commentlists", controllers.myComments);

app.get("/visited", controllers.readVisiteds);
//formData의 속성명("image")과 일치하는 파일 하나를 받는다. 나머지는 그대로 req.body로 들어간다.
app.post("/visited", upload.single("image"), controllers.createVisited);
app.patch("/visited", upload.single("image"), controllers.updateVisited);
app.delete("/visited", controllers.deleteVisited);

app.post("/user/signup", controllers.signup);
app.post("/user/login", controllers.signin);

app.get("/user/kakao/callback", controllers.kakaoCallBack);
app.get("/signout", controllers.kakaoSignout);
app.post("/signout", controllers.signout);
app.post("/home/bookmark", upload.single("image"), controllers.bookmark);

app.get("/comment/:contentId", controllers.readComments);
app.post("/comment/:contentId", controllers.createComment);
app.patch("/comment/:contentId", controllers.updateComment);
app.delete("/comment/:contentId", controllers.deleteComment);

app.get("/like/:contentId", controllers.getLikeCount);
app.post("/like/:contentId", controllers.addLike);
app.delete("/like/:contentId", controllers.deleteLike);

app.get("/hashtagslist", controllers.getTags);

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(PORT, () => console.log("https server runnning"));
} else {
  server = app.listen(PORT, () => console.log("http server runnning"));
}

// (배포)
// let server;
// server = app.listen(PORT, () => console.log("http server runnning"));
module.exports = server;
