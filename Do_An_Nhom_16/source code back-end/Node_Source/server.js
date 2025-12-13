require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./src/config/db.js'); // Import kết nối DB
const webRoutes = require('./src/routes/web');
const app = express();
const port = process.env.PORT || 3000;

// --- 1. Cấu hình View Engine (EJS) ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Trỏ về thư mục views gốc

// --- 2. Cấu hình Static Files (CSS, JS, Images) ---
app.use(express.static(path.join(__dirname, 'public'))); // Thư mục public chứa assets

// --- 3. Cấu hình Body Parser (Xử lý dữ liệu Form gửi lên) ---
app.use(bodyParser.urlencoded({ extended: true })); // Đọc data từ form (application/x-www-form-urlencoded)
app.use(bodyParser.json()); // Đọc data JSON (nếu dùng AJAX)

// --- 4. Cấu hình Session (Lưu trạng thái đăng nhập) ---
app.use(session({
    secret: process.env.SESSION_SECRET || 'cafe_secret_key_123', // Chuỗi bí mật
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // Session tồn tại 1 tiếng
}));

// --- 5. Middleware toàn cục (Global Variables cho View) ---
app.use((req, res, next) => {
    // Truyền thông tin user đăng nhập xuống tất cả các view EJS
    res.locals.user = req.session.user || null;
    next();
});

// --- 6. Routes (Sẽ thêm ở Prompt sau) ---
app.use('/', webRoutes);

// --- 7. Khởi động Server ---
app.listen(port, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${port}`);
    console.log(`📂 Static folder: ${path.join(__dirname, 'public')}`);
});