//main server file

//libraries & resources
const http = require('http');
const express = require ('express');
const cors = require('cors');
const app = express();
const sequelizePositionData = require('./connections/positionDataSchema');
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


//position_data models
const QBLeaders = require('./models/position-data/QBLeaders');
const WRLeaders = require('./models/position-data/WRLeaders');
const RBLeaders = require('./models/position-data/RBLeaders');
const TELeaders = require('./models/position-data/TELeaders');
const KLeaders = require('./models/position-data/KLeaders');

//authenticate connection with database
sequelizePositionData.authenticate().then(()=>{
    console.log("position_data schema connection successful")
}).catch((error)=>{
    console.log(error);
})

//connect to database and start server
sequelizePositionData.sync().then(()=>{
    console.log("position_data tables created successfully");
}).catch((error)=>{
    console.log(error);
})

const server = http.createServer(app);
server.listen(port,ip, ()=>{
    console.log('server started');
})

