const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.supabaseId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authenticate;
