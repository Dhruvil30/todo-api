module.exports = {
    getUserId: ((req, res) => {
        const env = process.env.ENV;
        if (env === 'local') return req.session.userId;
        else if (env === 'TEST') return req.get('userId');
    })
}