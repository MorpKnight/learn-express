import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import './database/handler.js';

import servantRoute from './routes/servant.js';
import authRoute from './routes/auth.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: "ADBAIWUDBPAJDNPSIDBPOWAIUDABIGF",
    resave: false,
    saveUninitialized: false,
}))

app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
})

app.use('/api/v1', authRoute);

app.use((req, res, next) => {
    if(req.session.user){
        next();
    } else {
        res.send(401);
    }
})

app.use('/api/v1', servantRoute);

app.listen(3000, () => {
    console.log(`Running on port http://localhost:3000`);
})