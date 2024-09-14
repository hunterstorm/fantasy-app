const express = require('express');
const router = express.Router();
const TeamStats = require('../../models/TeamStats');


router.get('/all', async (req, res) => {
    try {

        const { team_id, posteam, leaders} = req.query;

        let where = {};
        if(team_id) {
            where.team_id = team_id
        }
        if(posteam) {
            where.posteam = posteam
        }

        let order = [];
        if(leaders) {
            order.push([leaders, "DESC"])
        }
            

        const teamStats = await TeamStats.findAll({
            where: where,
            order: order.length > 0 && order
        })

        res.json(teamStats)
    } catch (err) {
        console.error('Error fetching team stats:', err);
        res.status(500).json({ error: 'An error occurred while fetching team stats' });
    }
})

router.get('/leaders', async (req, res) => {
    try {
        const leaders = {};

        const stats = [
            'total_yards',
            'total_run_yards',
            'total_pass_yards',
            'total_fg_made',
            'fg_rate',
            'run_rate',
            'pass_rate'
        ];

        for (const stat of stats) {
            const topLeaders = await TeamStats.findAll({
                limit: 5,  // Limit the results to top 5
                order: [[stat, 'DESC']]
            });
            if (topLeaders.length > 0) {
                leaders[stat] = topLeaders;
            }
        }

        res.json(leaders);
    } catch (err) {
        console.error('Error fetching team leaders:', err);
        res.status(500).json({ error: 'An error occurred while fetching team leaders' });
    }
});

module.exports = router;