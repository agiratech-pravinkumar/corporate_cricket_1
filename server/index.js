const express = require('express');
const cors = require('cors');
const corporateRoutes = require('./routes/corporateRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const connectToDB = require('./utils/mongo');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

connectToDB();

const bodyParser = require('body-parser');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(`/hello`,(req,res)=>{
    res.send({
        message: 'Hello World'
    });
})
app.use('/', corporateRoutes);
app.use('/tournaments', tournamentRoutes);

const port = process.env.PORT || 8800;

app.listen(port, () => { 
    console.log(`Server is running ${port}`);
});
