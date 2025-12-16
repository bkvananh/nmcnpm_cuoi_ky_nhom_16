const db = require('../config/db');

const Comment = {
    // Lấy comment đã duyệt của 1 bài viết (Client xem)
    getApprovedByPostId: async (postId) => {
        const [rows] = await db.query('SELECT * FROM comments WHERE post_id = ? AND status = "approved" ORDER BY created_at DESC', [postId]);
        return rows;
    },

    // Lấy tất cả comment (Admin xem để duyệt)
    getAll: async () => {
        // Join với bảng posts để biết comment của bài nào
        const sql = `
            SELECT comments.*, posts.title as post_title 
            FROM comments 
            JOIN posts ON comments.post_id = posts.id 
            ORDER BY comments.created_at DESC
        `;
        const [rows] = await db.query(sql);
        return rows;
    },

    // RF-07: Khách gửi comment (Mặc định status = pending)
    create: async (data) => {
        const sql = 'INSERT INTO comments (post_id, author_name, content, status) VALUES (?, ?, ?, "pending")';
        const [result] = await db.execute(sql, [data.post_id, data.author_name, data.content]);
        return result;
    },

    // RF-14: Admin duyệt hoặc xóa (Update status)
    updateStatus: async (id, status) => {
        const [result] = await db.execute('UPDATE comments SET status = ? WHERE id = ?', [status, id]);
        return result;
    },

    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM comments WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Comment;