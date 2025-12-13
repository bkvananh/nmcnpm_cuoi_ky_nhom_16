const Product = require('../models/productModel');
const Post = require('../models/postModel');
const Branch = require('../models/branchModel');
const Comment = require('../models/commentModel');
const Contact = require('../models/contactModel');

const adminController = {
    // --- Dashboard ---
    dashboard: async (req, res) => {
        // Có thể đếm số lượng để hiển thị thống kê nếu muốn
        res.render('admin/dashboard');
    },

    // --- RF-12: Quản lý Menu (Món ăn) ---
    listProducts: async (req, res) => {
        const products = await Product.getAll();
        res.render('admin/products/list', { products });
    },
    
    // Form thêm món
    addProductPage: (req, res) => {
        res.render('admin/products/add');
    },

    // Xử lý thêm món
    storeProduct: async (req, res) => {
        try {
            const { name, price, category_id, image_url, description } = req.body;
            // Validate
            if (!name || !price) return res.send('Thiếu tên hoặc giá');
            
            await Product.create({
                name, price, category_id, image_url, description, 
                is_featured: req.body.is_featured ? 1 : 0
            });
            res.redirect('/admin/products');
        } catch (err) {
            console.error(err);
            res.send('Lỗi thêm món');
        }
    },

    // Xóa món
    deleteProduct: async (req, res) => {
        await Product.delete(req.params.id);
        res.redirect('/admin/products');
    },

    // --- RF-11: Quản lý Bài viết ---
    listPosts: async (req, res) => {
        const posts = await Post.getAll();
        res.render('admin/posts/list', { posts });
    },

    addPostPage: (req, res) => {
        res.render('admin/posts/add');
    },

    storePost: async (req, res) => {
        try {
            const { title, content, type, thumbnail_url, publish_date } = req.body;
            await Post.create({ title, content, type, thumbnail_url, publish_date });
            res.redirect('/admin/posts');
        } catch (err) {
            console.error(err);
            res.send('Lỗi thêm bài viết');
        }
    },

    deletePost: async (req, res) => {
        await Post.delete(req.params.id);
        res.redirect('/admin/posts');
    },

    // --- RF-13: Quản lý Chi nhánh ---
    listBranches: async (req, res) => {
        const branches = await Branch.getAll();
        res.render('admin/branches/list', { branches });
    },

    addBranchPage: (req, res) => res.render('admin/branches/add'),

    storeBranch: async (req, res) => {
        try {
            const { name, address, city, phone, map_link } = req.body;
            await Branch.create({ name, address, city, phone, map_link });
            res.redirect('/admin/branches');
        } catch (err) {
            console.error(err);
            res.send('Lỗi thêm chi nhánh');
        }
    },

    deleteBranch: async (req, res) => {
        await Branch.delete(req.params.id);
        res.redirect('/admin/branches');
    },

    // --- RF-14: Duyệt Bình luận ---
    listComments: async (req, res) => {
        const comments = await Comment.getAll();
        res.render('admin/comments/list', { comments });
    },

    approveComment: async (req, res) => {
        await Comment.updateStatus(req.params.id, 'approved');
        res.redirect('/admin/comments');
    },

    deleteComment: async (req, res) => {
        await Comment.delete(req.params.id);
        res.redirect('/admin/comments');
    },

    // --- RF-15: Xem Liên hệ ---
    listContacts: async (req, res) => {
        const contacts = await Contact.getAll();
        res.render('admin/contacts/list', { contacts });
    }
};

module.exports = adminController;