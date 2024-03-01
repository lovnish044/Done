const express = require("express")
const router = express.Router();
const {createBook,createMember,createresult,checkOutBook,overDue,booklist,eventt} = require("../controllers/Book")
// basic router for testing porpose
router.route("/create").post(createBook);

router.route("/member").post(createMember);
router.route("/result").post(createresult);
router.route("/createEvent").post(eventt);
router.route("/books").get(checkOutBook);
router.route("/overDue").get(overDue);

router.route("/booklist").get(booklist);

module.exports = router;