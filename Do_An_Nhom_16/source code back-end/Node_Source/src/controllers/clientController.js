const Product = require('../models/productModel');
const Post = require('../models/postModel');
const Branch = require('../models/branchModel');
const Comment = require('../models/commentModel');
const Contact = require('../models/contactModel');

const clientController = {
    // RF-05: Trang Thực đơn (Có lọc theo Category)
    menu: async (req, res) => {
        try {
            const categoryId = req.query.cat; // Lấy tham số ?cat=1
            let products;

            if (categoryId) {
                products = await Product.getByCategory(categoryId);
            } else {
                products = await Product.getAll();
            }

            res.render('client/thuc-don', { products, currentCat: categoryId });
        } catch (err) {
            console.error(err);
            res.send('Lỗi tải thực đơn');
        }
    },

    // RF-02: Trang Tin tức
    news: async (req, res) => {
        try {
            const posts = await Post.getAll();
            res.render('client/tin-tuc', { posts });
        } catch (err) {
            console.error(err);
            res.send('Lỗi tải tin tức');
        }
    },

    // RF-03: Chi tiết bài viết + RF-07: Load comment
    postDetail: async (req, res) => {
        try {
            const id = req.params.id;
            const post = await Post.getById(id);
            const comments = await Comment.getApprovedByPostId(id);

            if (!post) return res.redirect('/tin-tuc');

            res.render('client/chi-tiet', { post, comments });
        } catch (err) {
            console.error(err);
            res.send('Lỗi tải bài viết');
        }
    },

    // RF-07: Gửi bình luận
    postComment: async (req, res) => {
        try {
            const { post_id, author_name, content } = req.body;
            if (!author_name || !content) return res.redirect('back');

            await Comment.create({ post_id, author_name, content });
            // Có thể thêm flash message: "Đang chờ duyệt"
            res.redirect(`/tin-tuc/${post_id}`);
        } catch (err) {
            console.error(err);
            res.send('Lỗi gửi bình luận');
        }
    },

    // RF-06: Tra cứu chi nhánh
    branches: async (req, res) => {
        try {
            const city = req.query.city;
            let branches;
            if (city) {
                branches = await Branch.getByCity(city);
            } else {
                branches = await Branch.getAll();
            }
            res.render('client/chi-nhanh', { branches, selectedCity: city });
        } catch (err) {
            console.error(err);
            res.send('Lỗi tải chi nhánh');
        }
    },

    // RF-17: Trang tĩnh
    about: (req, res) => res.render('client/ve-chung-toi'),
    contact: (req, res) => res.render('client/lien-he'),

    // RF-09: Xử lý form liên hệ
    submitContact: async (req, res) => {
        try {
            const { name, email, message } = req.body;
            if (!name || !email || !message) {
                return res.send('Vui lòng nhập đủ thông tin');
            }
            await Contact.create({ name, email, message });
            res.redirect('/lien-he?success=true');
        } catch (err) {
            console.error(err);
            res.send('Lỗi gửi liên hệ');
        }
    }
};

module.exports = clientController;