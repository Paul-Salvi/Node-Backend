const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require('./src/routes/user.routes');
const loginRoutes = require('./src/routes/login.routes');

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/login', loginRoutes);

app.get('/', (req, res) => { res.send("{'Health Check':'Healthy' }"); });
app.listen(port, () => { console.log(`Server is listening on port ${port}`); });