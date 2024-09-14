//main server file

//libraries & resources
const http = require('http');
const express = require ('express');
const cors = require('cors');
const app = express();
const sequelizePositionData = require('./connections/positionDataSchema');
const sequelizeTeamData = require('./connections/teamDataSchema');
const config = require('../config.json');

//config variables
const port = config.SERVER_PORT
const ip = config.SERVER_IP


//router variables
const apiAuth = require('./routes/security/apiAuth')
const globalUpdateRoute = require('./routes/Rscripts/global-update/GlobalUpdate');
const OffDefEPARoute = require('./routes/Rscripts/league-stats/OffDefEPA');

const s3ImageRoute = require('./routes/access-points/s3Image');
const positionDataRoute = require('./routes/access-points/positionData');
const teamDataRoute = require('./routes/access-points/teamData');

//middleware
app.use(cors());
app.use(apiAuth);

//Rscript routes
app.use('/GlobalUpdate', globalUpdateRoute);
app.use('/OffDefEPA', OffDefEPARoute);


//access point routes
app.use('/Images', s3ImageRoute);
app.use('/PositionData', positionDataRoute);
app.use('/Teams', teamDataRoute);


//position_data models
const QBLeaders = require('./models/position-data/QBLeaders');
const WRLeaders = require('./models/position-data/WRLeaders');
const RBLeaders = require('./models/position-data/RBLeaders');
const TELeaders = require('./models/position-data/TELeaders');
const KLeaders = require('./models/position-data/KLeaders');


//team_data model
const TeamStats = require('./models/TeamStats');

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

sequelizeTeamData.authenticate().then(()=>{
    console.log("team data schema connection successful")
}).catch((error)=>{
    console.log(error);
})

sequelizeTeamData.sync().then(() => {
    console.log("team data tables created successfully");
}).catch((err) => {
    console.error(err);
})

const server = http.createServer(app);
server.listen(port,ip, ()=>{
    console.log('server started');
})

