const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    // Extract the token from the Authorization header
    const token = req.headers.authorization;

    // Check if token exists and is properly formatted
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }

    // Extract the token without the 'Bearer ' prefix
    const tokenWithoutBearer = token.split(' ')[1];

    // Verify the token
    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // If verification fails, respond with an error
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Extract organization ID from the params
        const organizationIdFromParams = req.params.organization_id;

        // Extract organization ID from the decoded token
        const organizationIdFromToken = decoded.organization_id;

        // Compare organization IDs
        if (organizationIdFromParams !== organizationIdFromToken) {
            return res.status(403).json({ message: 'Forbidden: Organization ID mismatch' });
        }

        // If verification succeeds, attach the organization ID to the request object
        req.organization_id = decoded.organization_id;
        // Call the next middleware or route handler
        next();
    });
}

module.exports = { verifyToken };
