const db = require('../config/db');

const Contact = {
    // RF-09: Lưu tin nhắn khách hàng
    create: async (data) => {
        const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
        const [result] = await db.execute(sql, [data.name, data.email, data.message]);
        return result;
    },

    // RF-15: Admin xem danh sách liên hệ
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
        return rows;
    }
};

module.exports = Contact;