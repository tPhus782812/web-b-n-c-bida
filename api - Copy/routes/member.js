var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
var db = require('../models/database');


router.get('/', function (req, res) {
    if (req.session.daDangNhap) {
        let sql = `SELECT * FROM users`;
        db.query(sql, function (err, data){
        res.render("users_list.ejs", {users: data});
        });
    }
    else {
        req.session.back = req.originalUrl;
        res.redirect("/thanhvien/dangnhap");
    }
});

router.get('/dangky', function(req, res) {
    res.render("dangky.ejs");
 });
router.get('/doipass', function (req, res) {
    let sql = `SELECT * FROM users`;
    db.query(sql, function (err, data) {
        res.render("doipass.ejs", { users: data });
    });
});
router.get('/camon', function (req, res) {
    res.render("camon.ejs");
});

router.post('/luu', function (req, res) {
    let ten = req.body.ten;
    let u = req.body.username;
    let p = req.body.password;
    let em = req.body.email;
    let sothich = req.body.sothich;
    let tinh = req.body.tinh;
    var salt = bcrypt.genSaltSync(10);
    var pass_mahoa = bcrypt.hashSync(p, salt);
    let user_info = { ten: ten, username: u, password: pass_mahoa, email: em, sothich: sothich, tinh: tinh };
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, user_info);
    res.redirect("/thanhvien/camon");
})
router.get('/thanhcong', function (req, res) {
    res.render("thanhcong.ejs");
});

router.get('/dangnhap', function (req, res) {
    res.render("dangnhap.ejs");
});
router.post('/dangnhap_', function (req, res) {
    let u = req.body.username;
    let p = req.body.password;
    let sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, u, (err, rows) => {
        if (rows.length <= 0) {
            res.redirect("/thanhvien/dangnhap");
            return;
        }
        let user = rows[0];
        let pass_fromdb = user.password;
        let kq = bcrypt.compareSync(p, pass_fromdb);
        if (kq == true) {
            // console.log("OK");     
            var sess = req.session;  //initialize session variable
            sess.daDangNhap = true;
            sess.username = user.username;
            // res.redirect("/thanhvien/thanhcong");
            if (sess.back) {
                res.redirect(sess.back);
            }
            else {
                res.redirect("/thanhvien/thanhcong");
            }
        }
        else {
            console.log("Not OK");
            res.redirect("/thanhvien/dangnhap");
        }
    });
});
router.get('/download', function (req, res) {
    if (req.session.daDangNhap) {
        res.render("download.ejs", { un: req.session.username });
    }
    else {
        req.session.back = req.originalUrl;
        res.redirect("/thanhvien/dangnhap");
    }
});

router.get('/thoat', function (req, res) {
    req.session.destroy();
    res.redirect("/thanhvien/");
});

router.get('/doipass', function (req, res) {
    if (req.session.daDangNhap) {
        res.render("doipass.ejs", { un: req.session.username });
    }
    else {
        req.session.back = req.originalUrl;
        res.redirect("/thanhvien/dangnhap");
    }
});

router.post('/doimatkhau', function (req, res) {
    let u = req.body.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    // Truy vấn để lấy thông tin người dùng từ username
    let selectSql = 'SELECT * FROM users WHERE username = ?';
    db.query(selectSql, u, (err, rows) => {
        if (rows.length <= 0) {
            res.redirect("/thanhvien/dangnhap");
            return;
        }
        let user = rows[0];
        let pass_fromdb = user.password;
        // Kiểm tra xác thực mật khẩu cũ
        if (bcrypt.compareSync(oldPassword, pass_fromdb)) {
            // Mật khẩu cũ trùng khớp, tiến hành cập nhật mật khẩu mới
            var salt = bcrypt.genSaltSync(10);
            var newPass = bcrypt.hashSync(newPassword, salt);
            // Cập nhật mật khẩu mới vào cơ sở dữ liệu
            let updateSql = 'UPDATE users SET password = ? WHERE id = ?';
            db.query(updateSql, [newPass, user.id], (err, result) => {
                if (err) throw err;
                // Cập nhật thành công, chuyển hướng đến trang thành công
                res.redirect("/thanhvien/thanhcong");
            });
        } else {
            // Mật khẩu cũ không đúng, chuyển hướng đến trang đăng nhập và hiển thị thông báo
            console.log("Mật khẩu cũ không đúng");
            res.redirect("/thanhvien/dangnhap");
        }
    });
});



// router.post('/update', function (req, res) {
//     let ten = req.body.ten;
//     let u = req.body.username;
//     let p = req.body.password;
//     let em = req.body.email;
//     let sothich = req.body.sothich;
//     let tinh = req.body.tinh;
    
//     // Kiểm tra tính hợp lệ của dữ liệu đầu vào ở đây

//     bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash(p, salt, function(err, pass_mahoa) {
//             let user_info = { ten: ten, username: u, password: pass_mahoa, email: em, sothich: sothich, tinh: tinh };
//             let sql = 'UPDATE users SET ten = ?, username = ?, password = ?, email = ?, sothich = ?, tinh = ? WHERE id = ?';
//             db.query(sql, [user_info.ten, user_info.username, user_info.password, user_info.email, user_info.sothich, user_info.tinh, req.params.id], function (err, result) {
//                 if (err) throw err;
//                 // Xử lý kết quả ở đây
//                 res.redirect("/thanhvien/camon");
//             });
//         });
//     });
// });


router.get('/doipass/:id', function (req, res) {
    let id = req.params.id;
    let sql = `SELECT id, ten, username, password,email,sothich,tinh FROM users where id=${id}`;
    db.query(sql, function (err, arr) {
      res.render("doipass", { users: arr[0] });
    });
  });

module.exports = router;


