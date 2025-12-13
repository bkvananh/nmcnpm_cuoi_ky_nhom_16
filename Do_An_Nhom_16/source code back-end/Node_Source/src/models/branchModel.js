const db = require('../config/db');

const Branch = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM branches');
        return rows;
    },

    // RF-06: Lọc theo thành phố
    getByCity: async (city) => {
        const [rows] = await db.query('SELECT * FROM branches WHERE city = ?', [city]);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM branches WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (data) => {
        const sql = 'INSERT INTO branches (name, address, city, phone, map_link) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(sql, [data.name, data.address, data.city, data.phone, data.map_link]);
        return result;
    },

    update: async (id, data) => {
        const sql = 'UPDATE branches SET name = ?, address = ?, city = ?, phone = ?, map_link = ? WHERE id = ?';
        const [result] = await db.execute(sql, [data.name, data.address, data.city, data.phone, data.map_link, id]);
        return result;
    },

    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM branches WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Branch;