module.exports = {
    'secretKey': process.env.secretKey,
    'mongoUrl' : process.env.mongoUrl,
    'facebook': {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: 'https://localhost:3443/users/facebook/callback'
    }
}