const db = require('../config/db');

const Post = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM posts ORDER BY publish_date DESC');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
        return rows[0];
    },

    getRecent: async () => {
        const [rows] = await db.query('SELECT * FROM posts ORDER BY publish_date DESC LIMIT 3');
        return rows;
    },

    // Hàm thêm bài viết chuẩn
    create: async (data) => {
        const sql = 'INSERT INTO posts (title, content, type, thumbnail_url, publish_date) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(sql, [
            data.title, 
            data.content, 
            data.type, 
            data.thumbnail_url, 
            data.publish_date
        ]);
        return result;
    },

    update: async (id, data) => {
        const sql = 'UPDATE posts SET title = ?, content = ?, type = ?, thumbnail_url = ?, publish_date = ? WHERE id = ?';
        const [result] = await db.execute(sql, [data.title, data.content, data.type, data.thumbnail_url, data.publish_date, id]);
        return result;
    },

    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM posts WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Post;