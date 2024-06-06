var db = require('../models/database');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/product_new/:sosp', (req, res) => {
  if (isNaN(req.params.sosp) == true) {
    res.json({ 'thongbao': 'Sai kiểu tham số!' });
    return;
  }
  let sosp = req.params.sosp;
  if (sosp <= 0) sosp = 8;
  let sql = `SELECT id, id_cate, name, price, price_sale,date, image, quantity FROM product WHERE hidden = 1 ORDER BY date desc LIMIT 0, ${sosp};`;

  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': `Lỗi ${err}` });
    else res.json(data);
  })
})

router.get('/product_hot/:sosp', (req, res) => {
  if (isNaN(req.params.sosp) == true) {
    res.json({ 'thongbao': 'Sai kiểu tham số!' });
    return;
  }
  let sosp = req.params.sosp;
  if (sosp <= 0) sosp = 8;
  let sql = `  SELECT id, name, price, price_sale, image FROM product WHERE hidden = 1 AND hot = 1 ORDER BY date desc LIMIT 0, ${sosp};`;

  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': `Lỗi ${err}` });
    else res.json(data);
  })
})
// router.get('/product/:id', (req, res) => {
//   let id = req.params.id;
//   let sql = `SELECT id, id_cate, name, price, price_sale, date, image, quantity FROM product WHERE id = ${id};
//   `
//   db.query(sql, (err, arr) => {
//     let sp = arr[0][0];
//     let tt = arr[1][0];
//     let obj = Object.assign(sp, tt);
//     res.json(obj)
//   })
// })

router.get('/product/:id', (req, res) => {
  let id = req.params.id;
  if (isNaN(id) == true) {
      res.json({ 'thongbao': `Sản phẩm ${id} không được tồn tại !! Vui lòn nhập lại.` });
      return;
  }
  let sql = ` SELECT id, id_cate, name, price, price_sale,date, image, quantity, hidden, hot, description FROM product WHERE id = ${id}`;
  db.query(sql, (err, data) => {
      if (err) res.json({ 'thongbao': `Lỗi ${err}` });
      else if (data.length == 0) res.json({ 'thongbao': `Sản phẩm ${id} không được tồn tại !! Vui lòn nhập lại.` });
      res.json(data[0]);
  })
})

router.get('/product_cate/:id', (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM product WHERE hidden = 1 AND id_cate = ${id} ORDER BY date desc;`;
  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': `Lỗi ${err}` });
    else res.json(data);
  })
})
router.get('/list_cate', (req, res) => {
  let sql = `SELECT * FROM cate ;`;
  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': `Lỗi ${err}` });
    else res.json(data);
  })
})

module.exports = router;

