// Position Data db controller functions

//imports
const express = require('express');
const router = express.Router();
const { QBLeaders, WRLeaders, RBLeaders, TELeaders, KLeaders } = require('../../models/position-data/index');


const modelMap= {
    QB: QBLeaders,
    WR: WRLeaders,
    RB: RBLeaders,
    TE: TELeaders,
    K: KLeaders
}
//functions

//get all Players
router.get('/all', async (req, res) => {
    try {
        const positions = req.query.positions ? req.query.positions.split(',') : ["QB", "WR", "RB", "TE", "K"];



        const promises = positions.map(position =>
            modelMap[position].findAll({
                where: { position: position },
                order: [['total_ppr', 'DESC']]
            })
        );

        const results = await Promise.all(promises);

        const allPlayers = results.reduce((acc, players) => acc.concat(players), []);

        res.setHeader('Content-type', 'application/json');
        res.status(200).json(allPlayers);

    } catch (error) {
        console.error('Error fetching players', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//getOne
router.get('/position/:position/id/:id', async (req, res) => {
    const { position, id } = req.params;


    const PositionModel = modelMap[position]
    
    const positionData = await PositionModel.findAll();
    

    if(!PositionModel) {
        return res.status(400).json({ error: 'Invalid position'});
    }

    const sortKeys = ["total_ppr", "total_rec_yards", "total_rec", "total_targets", "total_rec_tds", "total_yac", "avg_target_share", "avg_rec_epa", "total_carries", "total_rush_yds", "total_rush_tds", "avg_rush_epa", "total_rec_yds", "total_tds", "total_touches", "total_pass_yds", "total_completions", "comp_rate", "total_attempts", "total_pass_tds", "total_ints", "td_int_rate", "avg_passing_epa"  ]

    try {
        const player = await PositionModel.findByPk(id);

        if(!player) {
            return res.status(404)({error: "Player Not Found"});
        }

        const rankings = {};
        sortKeys.forEach((key) => {

            // Create a copy of positionData to sort independently for each key
            const sortedData = [...positionData].sort((a, b) => b[key] - a[key]);
        
            // Calculate the rank of the player based on the sorted data
            const rank = sortedData.findIndex(p => p.player_id === player.player_id) + 1;
            
            rankings[key] = rank;
        });


        res.status(200).json({ player, rankings});
    }catch (err) {
        console.error(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

module.exports = router;
