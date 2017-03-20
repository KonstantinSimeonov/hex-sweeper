'use strict';

module.exports = ({ dataServices, serverConfig }) => ({
    getDifficulties(req, res) {
        res.status(200).json({ difficulties: ['low', 'medium', 'hard'] });
    }
});