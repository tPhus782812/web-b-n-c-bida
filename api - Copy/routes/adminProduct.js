const {adminAuth, userAuth } = require('../auth');
var db = require('../models/database');
var express = require('express');
var router = express.Router();
//router api
router.get('/',adminAuth, (req, res) => {
    let limit = ``;
    if (req.query._limit != undefined && isNaN(req.query._limit) == false) {
        let sosp = Number(req.query._limit);
        if (sosp <= 0) sosp = 3;
        limit = `LIMIT 0, ${sosp}`;
    }
    let sort = ``;
    if (req.query._sort != undefined) { // có biến _sort localhost:3000/admin/sp?_sort=ten
        let str = req.query._sort;
        sort = `ORDER BY ${str} asc`;
    }
    let sql = `SELECT * FROM product LIMIT 0,8`;
    db.query(sql, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
})
router.get('/:id',adminAuth, (req, res) => {
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
router.post('/',adminAuth, (req, res) => {
    let data = req.body;
    let sql = `INSERT INTO product SET ?`;
    db.query(sql, data, (err, data) => {
        if (err) res.json({ 'thongbao': `Lỗi ${err}` });
        else res.json({ 'thongbao': 'Đã chèn xong sản phẩm' });
    })
})
router.put('/:id',adminAuth, (req, res) => {
    let id = req.params.id;
    if (isNaN(id) == true) {
        res.json({ 'thongbao': `Sản phẩm ${id} không được tồn tại !! Vui lòn nhập lại.` });
        return;
    }
    let data = req.body;
    let sql = `UPDATE product SET ? WHERE id = ${id}`;
    db.query(sql, data, (err, data) => {
        if (err) res.json({ 'thongbao': `Lỗi ${err}` });
        else res.json({ 'thongbao': `Đã cập nhật xong sản phẩm ${id}` });
    })
})
router.delete('/:id',adminAuth, (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM product WHERE id = ${id}`;
    db.query(sql, id, (err, data) => {
        if (err) res.json({ 'thongbao': `Lỗi ${err}` });
        else res.json({ 'thongbao':  `Đã xóa thành công sản phẩm ${id}` });
    })
})
module.exports = router;