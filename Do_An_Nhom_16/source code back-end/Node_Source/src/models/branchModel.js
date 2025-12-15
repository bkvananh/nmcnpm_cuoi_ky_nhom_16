const db = require('../config/db');

const Branch = {
    // Lấy tất cả chi nhánh
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM branches');
        return rows;
    },

    // Hàm thêm mới (Đã sửa lỗi mapping cột map_iframe)
    create: async (data) => {
        const sql = 'INSERT INTO branches (name, address, city, phone, map_iframe) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(sql, [
            data.name, 
            data.address, 
            data.city, 
            data.phone, 
            data.map_link // Form gửi lên là map_link, ta map nó vào cột map_iframe
        ]);
        return result;
    },

    // Hàm xóa
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM branches WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Branch;