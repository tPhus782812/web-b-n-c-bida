var db = require('../models/database');
var express = require('express');
var router = express.Router();
//router api
router.get('/', (req, res) => {
    let sql = `SELECT * FROM category ;`;

    db.query(sql, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
})
router.get('/:id', (req, res) => {
    let id = req.params.id;
    if (isNaN(id) == true) {
        res.json({ 'thongbao': `Loại ${id} không được tồn tại !! Vui lòn nhập lại.` });
        return;
    }
    let sql = `SELECT id, name FROM category WHERE id = ${id}`;
    db.query(sql, (err, data) => {
        if (err) throw err;
        res.json(data[0]);
    })
})
router.post('/', (req, res) => {
    let data = req.body;
    let sql = `INSERT INTO category SET ?`;
    db.query(sql, data, (err, data) => {
        if (err) res.json({ 'thongbao': `Lỗi ${err}` });
        else res.json({ 'thongbao': 'Đã chèn xong sản phẩm' });
    })
})
router.put('/:id', (req, res) => {
    let id = req.params.id;
    if (isNaN(id) == true) {
        res.json({ 'thongbao': `Sản phẩm ${id} không được tồn tại !! Vui lòn nhập lại.` });
        return;
    }
    let data = req.body;
    let sql = `UPDATE category SET ? WHERE id = ${id}`;
    db.query(sql, data, (err, data) => {
        if (err) res.json({ 'thongbao': `Lỗi ${err}` });
        else res.json({ 'thongbao': `Đã cập nhật xong sản phẩm ${id}` });
    })
})
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM category WHERE id = ${id}`;
    db.query(sql, id, (err, data) => {
        if (err) res.json({ 'thongbao': `Lỗi ${err}` });    
        else res.json({ 'thongbao': `Đã xóa thành công sản phẩm ${id}` });
    })
})
module.exports = router;