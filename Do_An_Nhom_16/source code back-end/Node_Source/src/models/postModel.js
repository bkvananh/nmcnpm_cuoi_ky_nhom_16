const db = require('../config/db');

const Post = {
    // Lấy danh sách bài viết (Sắp xếp mới nhất trước)
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM posts ORDER BY publish_date DESC');
        return rows;
    },

    // Lấy chi tiết bài viết
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
        return rows[0];
    },

    // RF-01: Lấy 3 bài viết mới nhất cho trang chủ
    getRecent: async () => {
        const [rows] = await db.query('SELECT * FROM posts ORDER BY publish_date DESC LIMIT 3');
        return rows;
    },

    // Thêm bài viết
    create: async (data) => {
        const sql = 'INSERT INTO posts (title, content, type, thumbnail_url, publish_date) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(sql, [data.title, data.content, data.type, data.thumbnail_url, data.publish_date]);
        return result;
    },

    // Sửa bài viết
    update: async (id, data) => {
        const sql = 'UPDATE posts SET title = ?, content = ?, type = ?, thumbnail_url = ?, publish_date = ? WHERE id = ?';
        const [result] = await db.execute(sql, [data.title, data.content, data.type, data.thumbnail_url, data.publish_date, id]);
        return result;
    },

    // Xóa bài viết
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM posts WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Post;