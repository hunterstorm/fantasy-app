const TeamStats = require('../../../models/TeamStats');

const teamNameMap = {
    ARI: {
        team_full_name: "Arizona Cardinals",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/arizona_cardinals.png'
    },
    ATL: {
        team_full_name: "Atlanta Falcons",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/atlanta_falcons.png'
    },
    BAL: {
        team_full_name: "Baltimore Ravens",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/baltimore_ravens.png'
    },
    BUF: {
        team_full_name: "Buffalo Bills",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/buffalo_bills.png'
    },
    CAR: {
        team_full_name: "Carolina Panthers",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/carolina_panthers.png'
    },
    CHI: {
        team_full_name: "Chicago Bears",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/chicago_bears.png'
    },
    CIN: {
        team_full_name: "Cincinnati Bengals",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/cincinnati_bengals.png'
    },
    CLE: {
        team_full_name: "Cleveland Browns",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/cleveland_browns.png'
    },
    DAL: {
        team_full_name: "Dallas Cowboys",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/dallas_cowboys.png'
    },
    DEN: {
        team_full_name: "Denver Broncos",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/denver_broncos.png'
    },
    DET: {
        team_full_name: "Detroit Lions",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/detroit_lions.png'
    },
    GB: {
        team_full_name: "Green Bay Packers",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/greenbay_packers.png'
    },
    HOU: {
        team_full_name: "Houston Texans",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/houston_texans.png'
    },
    IND: {
        team_full_name: "Indianapolis Colts",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/indianapolis_colts.png'
    },
    JAX: {
        team_full_name: "Jacksonville Jaguars",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/jacksonville_jaguars.png'
    },
    KC: {
        team_full_name: "Kansas City Chiefs",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/kansascity_chiefs.png'
    },
    LAC: {
        team_full_name: "Los Angeles Chargers",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/los_angeles_chargers.png'
    },
    LA: {
        team_full_name: "Los Angeles Rams",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/log_angelos_rams.png'
    },
    LV: {
        team_full_name: "Las Vegas Raiders",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/las_vegas_raiders.png'
    },
    MIA: {
        team_full_name: "Miami Dolphins",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/miami_dolphins.png'
    },
    MIN: {
        team_full_name: "Minnesota Vikings",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/minnesota_vikings.png'
    },
    NE: {
        team_full_name: "New England Patriots",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/new_england_patriots.png'
    },
    NO: {
        team_full_name: "New Orleans Saints",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/new_orleans_saints.png'
    },
    NYG: {
        team_full_name: "New York Giants",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/new_york_giants.png'
    },
    NYJ: {
        team_full_name: "New York Jets",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/new_york_jets.png'
    },
    PHI: {
        team_full_name: "Philadelphia Eagles",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/philedelphia_eagles.png'
    },
    PIT: {
        team_full_name: "Pittsburgh Steelers",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/pittsburgh_steelers.png'
    },
    SEA: {
        team_full_name: "Seattle Seahawks",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/seattle_seahawks.png'
    },
    SF: {
        team_full_name: "San Francisco 49ers",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/san_fransisco_49ers.png'
    },
    TB: {
        team_full_name: "Tampa Bay Buccaneers",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/tampa_bay_buccaneers.png'
    },
    TEN: {
        team_full_name: "Tennessee Titans",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/tennessee_titans.png'
    },
    WAS: {
        team_full_name: "Washington Commanders",
        photo_URL: 'https://fantasy-app.s3.us-west-2.amazonaws.com/washington_commanders.png'
    }
};


const insertTeamStatsIntoDatabase = async (jsonDataArray) => {
    const promises = jsonDataArray.map(async (jsonData) => {
        try {
            const teamData = teamNameMap[jsonData.posteam];
            if (teamData) {
                jsonData.team_full_name = teamData.team_full_name;
                jsonData.photo_URL = teamData.photo_URL;
            }

            await TeamStats.upsert(jsonData, {
                updateOnDuplicate: [
                    'posteam', 
                    'run_rate', 
                    'pass_rate', 
                    'total_yards', 
                    'total_run_yards', 
                    'total_pass_yards', 
                    'total_fg_made', 
                    'total_fg_missed', 
                    'fg_rate',
                    'team_full_name',
                    'photo_URL'
                ]
            });
        } catch (error) {
            console.error('Error processing JSON data:', error);
        }
    });

    await Promise.all(promises);
};

module.exports = {
    processTeamData: async (scriptOutput) => {
        try {
            let jsonDataArray = scriptOutput;

            if (typeof scriptOutput === 'string') {
                jsonDataArray = JSON.parse(scriptOutput);
            }
            if (Array.isArray(jsonDataArray)) {
                await insertTeamStatsIntoDatabase(jsonDataArray);
            } else {
                console.error('Error: Expected an array, but got:', typeof jsonDataArray);
            }
        } catch (error) {
            console.error('Error processing TEAM data:', error);
        }
    },
};
