const express = require('express');
const router = express.Router();

// --- Import Controllers ---
const homeController = require('../controllers/homeController');
const clientController = require('../controllers/clientController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

// --- Import Middleware ---
const authMiddleware = require('../middlewares/auth');

// ==================================================================
// 1. PUBLIC ROUTES (Khách hàng - Không cần đăng nhập)
// ==================================================================

// Trang chủ
router.get('/', homeController.index);

// Trang Thực đơn (Có lọc ?cat=...) [cite: 2]
router.get('/thuc-don', clientController.menu);

// Trang Tin tức & Chi tiết tin [cite: 2]
router.get('/tin-tuc', clientController.news);
router.get('/tin-tuc/:id', clientController.postDetail);

// Xử lý gửi bình luận (POST) [cite: 2]
router.post('/tin-tuc/comment', clientController.postComment);

// Trang Chi nhánh (Có lọc ?city=...) [cite: 2]
router.get('/chi-nhanh', clientController.branches);

// Trang Liên hệ & Gửi form liên hệ [cite: 2]
router.get('/lien-he', clientController.contact);
router.post('/lien-he', clientController.submitContact);

// Trang Giới thiệu (Về chúng tôi) [cite: 2]
router.get('/ve-chung-toi', clientController.about);


// ==================================================================
// 2. AUTH ROUTES (Xác thực)
// ==================================================================

// Đăng nhập (GET để xem form, POST để xử lý) [cite: 5]
router.get('/admin/login', authController.loginPage);
router.post('/admin/login', authController.login);

// Đăng xuất [cite: 5]
router.get('/admin/logout', authController.logout);


// ==================================================================
// 3. ADMIN ROUTES (Quản trị - BẢO MẬT)
// ==================================================================
// Lưu ý: Tất cả route dưới đây đều đi qua middleware 'requireLogin'
// để đảm bảo chỉ Admin mới truy cập được.

// --- Dashboard ---
router.get('/admin/dashboard', authMiddleware.requireLogin, adminController.dashboard);

// --- Quản lý Món ăn (Products) [cite: 5] ---
router.get('/admin/products', authMiddleware.requireLogin, adminController.listProducts);
router.get('/admin/products/add', authMiddleware.requireLogin, adminController.addProductPage); // Form thêm
router.post('/admin/products/store', authMiddleware.requireLogin, adminController.storeProduct); // Xử lý lưu
router.get('/admin/products/delete/:id', authMiddleware.requireLogin, adminController.deleteProduct); // Xóa

// --- Quản lý Bài viết (Posts) [cite: 5] ---
router.get('/admin/posts', authMiddleware.requireLogin, adminController.listPosts);
router.get('/admin/posts/add', authMiddleware.requireLogin, adminController.addPostPage);
router.post('/admin/posts/store', authMiddleware.requireLogin, adminController.storePost);
router.get('/admin/posts/delete/:id', authMiddleware.requireLogin, adminController.deletePost);

// --- Quản lý Chi nhánh (Branches) [cite: 5] ---
router.get('/admin/branches', authMiddleware.requireLogin, adminController.listBranches);
router.get('/admin/branches/add', authMiddleware.requireLogin, adminController.addBranchPage);
router.post('/admin/branches/store', authMiddleware.requireLogin, adminController.storeBranch);
router.get('/admin/branches/delete/:id', authMiddleware.requireLogin, adminController.deleteBranch);

// --- Duyệt Bình luận (Comments) [cite: 5] ---
router.get('/admin/comments', authMiddleware.requireLogin, adminController.listComments);
router.get('/admin/comments/approve/:id', authMiddleware.requireLogin, adminController.approveComment); // Duyệt
router.get('/admin/comments/delete/:id', authMiddleware.requireLogin, adminController.deleteComment);   // Xóa

// --- Xem Liên hệ (Contacts) [cite: 5] ---
router.get('/admin/contacts', authMiddleware.requireLogin, adminController.listContacts);

module.exports = router;