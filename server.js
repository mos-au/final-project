const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const upload = multer({ dest: "uploads/" });

server.post("/upload", upload.single("image"), function (req, res, next) {
  // req.file is the `image` file
  // req.body will hold the text fields, if there were any
  res.json(req.file);
});

server.use(router);

server.listen(5000, () => {
  console.log("Customized JSON-Server is running at http://localhost:5000/");
});
