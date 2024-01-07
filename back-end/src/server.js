//main server file

//libraries & resources
const http = require('http');
const express = require ('express');
const cors = require('cors');
const app = express();
const config = require('../config.json');




//config variables
const port = config.SERVER_PORT
const ip = config.SERVER_IP


//router variables
const apiAuth = require('./routes/security/apiAuth')
const ReceivingLeadersRoute = require('./routes/Rscripts/league-stats/ReceivingLeaders');
const PositionDataRoute = require('./routes/Rscripts/league-stats/PositionData');
const OffDefEPARoute = require('./routes/Rscripts/league-stats/OffDefEPA');

//middleware
app.use(cors());
app.use(apiAuth);

//Rscript routes
app.use('/ReceivingLeaders', ReceivingLeadersRoute);
app.use('/PositionData', PositionDataRoute);
app.use('/OffDefEPA', OffDefEPARoute);

const server = http.createServer(app);
server.listen(port,ip, ()=>{
    console.log('server started');
})

