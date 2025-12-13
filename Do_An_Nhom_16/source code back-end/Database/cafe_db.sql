-- Tạo Database
CREATE DATABASE IF NOT EXISTS cafe_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cafe_db;

-- 1. Bảng Users (Admin) - Phục vụ RF-10
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Sau này sẽ lưu hash bcrypt
    full_name VARCHAR(100),
    role ENUM('admin', 'staff') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Categories (Danh mục món) - Phục vụ lọc RF-05
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- VD: Cà phê, Trà, Freeze
    slug VARCHAR(50) -- VD: ca-phe, tra, freeze (dùng cho URL)
);

-- 3. Bảng Products (Món ăn) - Phục vụ RF-05, RF-12
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 0) NOT NULL, -- Lưu giá VND
    image_url VARCHAR(255), -- Lưu link ảnh (URL)
    category_id INT,
    is_featured BOOLEAN DEFAULT 0, -- 1 = Món nổi bật (RF-01)
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 4. Bảng Posts (Tin tức) - Phục vụ RF-02, RF-03, RF-11
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT, -- Chứa HTML
    type ENUM('event', 'promo') DEFAULT 'event', -- Sự kiện hoặc Khuyến mãi
    thumbnail_url VARCHAR(255),
    publish_date DATETIME DEFAULT CURRENT_TIMESTAMP, -- Hẹn giờ đăng
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Bảng Branches (Chi nhánh) - Phục vụ RF-06, RF-13
CREATE TABLE IF NOT EXISTS branches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL, -- Để lọc theo thành phố
    phone VARCHAR(20),
    map_link TEXT -- Link Google Map iframe
);

-- 6. Bảng Comments (Bình luận) - Phục vụ RF-07, RF-14
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    status ENUM('pending', 'approved', 'spam') DEFAULT 'pending', -- Chờ duyệt
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- 7. Bảng Contacts (Liên hệ) - Phục vụ RF-09, RF-15
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================= DATA SEEDING (Dữ liệu mẫu) =================

-- Insert Admin (Pass: 123456)
INSERT INTO users (username, password, full_name, role) 
VALUES ('admin', '123456', 'Quản Trị Viên', 'admin');

-- Insert Danh mục
INSERT INTO categories (name, slug) VALUES 
('Cà Phê', 'coffee'),
('Trà', 'tea'),
('Freeze', 'freeze'),
('Bánh Ngọt', 'cake');

-- Insert 10 Món Highlands (Giá & Tên tham khảo thực tế)
INSERT INTO products (name, price, category_id, image_url, description, is_featured) VALUES
-- Cà Phê (Cat ID: 1)
('Phin Sữa Đá', 29000, 1, 'https://www.highlandscoffee.com.vn/vnt_upload/product/03_2018/PHIN-SUA-DA.png', 'Cà phê phin truyền thống kết hợp với sữa đặc.', 1),
('Phin Đen Đá', 29000, 1, 'https://www.highlandscoffee.com.vn/vnt_upload/product/05_2018/PHIN-DEN-DA.png', 'Đậm đà hương vị cà phê Việt.', 0),
('Bạc Xỉu Đá', 29000, 1, 'https://www.highlandscoffee.com.vn/vnt_upload/product/04_2020/Bac_Xiu_Da.png', 'Nhiều sữa ít cafe, vị ngọt béo.', 0),

-- Trà (Cat ID: 2)
('Trà Sen Vàng', 39000, 2, 'https://www.highlandscoffee.com.vn/vnt_upload/product/03_2018/TRA-SEN-VANG.png', 'Trà Oolong kết hợp hạt sen và kem sữa.', 1),
('Trà Thạch Đào', 39000, 2, 'https://www.highlandscoffee.com.vn/vnt_upload/product/03_2018/TRA-THACH-DAO.png', 'Trà đào thanh mát cùng miếng đào giòn.', 0),
('Trà Thanh Đào', 39000, 2, 'https://www.highlandscoffee.com.vn/vnt_upload/product/03_2018/TRA-THANH-DAO.png', 'Hương vị sả và đào đặc trưng.', 0),

-- Freeze (Cat ID: 3)
('Freeze Trà Xanh', 49000, 3, 'https://www.highlandscoffee.com.vn/vnt_upload/product/03_2018/FREEZE-TRA-XANH.png', 'Thức uống đá xay đậm vị trà xanh Nhật Bản.', 1),
('Caramel Phin Freeze', 49000, 3, 'https://www.highlandscoffee.com.vn/vnt_upload/product/03_2018/CARAMEL-PHIN-FREEZE.png', 'Cà phê đá xay kết hợp sốt caramel.', 0),
('Classic Phin Freeze', 49000, 3, 'https://www.highlandscoffee.com.vn/vnt_upload/product/03_2018/CLASSIC-PHIN-FREEZE.png', 'Cà phê đá xay truyền thống với thạch.', 0),

-- Bánh (Cat ID: 4)
('Bánh Mì Que', 19000, 4, 'https://www.highlandscoffee.com.vn/vnt_upload/product/03_2018/BANH-MI-QUE.png', 'Bánh mì que pate nóng hổi.', 0);