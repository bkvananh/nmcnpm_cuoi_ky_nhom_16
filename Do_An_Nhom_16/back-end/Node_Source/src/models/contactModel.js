const db = require('../config/db');

const Contact = {
    // 1. Tạo liên hệ mới
    create: async (data) => {
        const sql = 'INSERT INTO contacts (name, email, message, status) VALUES (?, ?, ?, "unread")';
        const [result] = await db.execute(sql, [data.name, data.email, data.message]);
        return result;
    },

    // 2. Lấy danh sách
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
        return rows;
    },

    // 3. Đánh dấu đã đọc
    markAllRead: async () => {
        const sql = 'UPDATE contacts SET status = "read" WHERE status = "unread"';
        const [result] = await db.execute(sql);
        return result;
    },

    // 4. Xóa liên hệ 
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM contacts WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Contact;