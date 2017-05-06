module.exports = {
    'secretKey': process.env.SECRET,
    'mongoUrl' : process.env.MONGO,
    'facebook': {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'https://localhost:3443/users/facebook/callback'
    }
}