//Require our packages for session & store
const session = require('express-session')
const store = require('connect-mongo')

module.exports = app => {

    app.use(
        session({
            secret: process.env.SESS_SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                maxAge: 120000,
            },
            store: store.create({
                mongoUrl: 'mongodb://localhost/lab-express-basic-auth',
            })
            
        })
    )
}

  