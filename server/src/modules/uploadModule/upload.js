const express = require("express");
const router = express.Router();
const app = express();
const multer = require("multer");
const path = require("path");

// storage engine 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});


const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 10
    // }
})
router.post("/", upload.single('profile'), (req, res) => {

    res.json({
        success: 1,
        profile_url: `http://localhost:8010/profile/${req.file.filename}`
    })
})

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}
router.use(errHandler);
// app.listen(4000, () => {
//     console.log("server up and running");
// })
module.exports = router;
