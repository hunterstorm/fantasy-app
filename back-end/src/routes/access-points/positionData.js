// Position Data db controller functions

//imports
const express = require('express');
const router = express.Router();
const { QBLeaders, WRLeaders, RBLeaders, TELeaders, KLeaders } = require('../../models/position-data/index');

const positions = [QBLeaders, WRLeaders, RBLeaders, TELeaders, KLeaders];

//functions

//get all Players
router.get('/all', async(req,res)=>{

    try {
        const promises = positions.map(position => position.findAll({
            order: [['total_ppr', 'DESC']]
        }));

        const results = await Promise.all(promises);

        const allPlayers = results.reduce((acc, players) => acc.concat(players),[]);
    
        res.setHeader('Content-type','application/json');
        res.status(200).json(allPlayers)

    }catch (error) {
        console.error('Error fetching players', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

// Get QBs
router.get('/qbs', async (req, res) => {
    try {
        const qbs = await QBLeaders.findAll({
            order: [['total_ppr', 'DESC']]
        });
        res.set({
            'Content-type': 'application/json',
            'Cache-Control': 'public, max-age=3600'
        });
        res.status(200).json(qbs);
    } catch (error) {
        console.error('Error fetching QBs', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get WRs
router.get('/wrs', async (req, res) => {
    try {
        const wrs = await WRLeaders.findAll({
            order: [['total_ppr', 'DESC']]
        });
        res.set({
            'Content-type': 'application/json',
            'Cache-Control': 'public, max-age=3600'
        });
        res.status(200).json(wrs);
    } catch (error) {
        console.error('Error fetching WRs', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get RBs
router.get('/rbs', async (req, res) => {
    try {
        const rbs = await RBLeaders.findAll({
            order: [['total_ppr', 'DESC']]
        });
        res.set({
            'Content-type': 'application/json',
            'Cache-Control': 'public, max-age=3600'
        });
        res.status(200).json(rbs);
    } catch (error) {
        console.error('Error fetching RBs', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get TEs
router.get('/tes', async (req, res) => {
    try {
        const tes = await TELeaders.findAll({
            order:[['total_ppr', 'DESC']]
        });
        res.set({
            'Content-type': 'application/json',
            'Cache-Control': 'public, max-age=3600'
        });
        res.status(200).json(tes);
    } catch (error) {
        console.error('Error fetching RBs', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get Ks
router.get('/ks', async (req, res) => {
    try {
        const ks = await KLeaders.findAll({
            order:[['total_ppr', 'DESC']]
        });
        res.set({
            'Content-type': 'application/json',
            'Cache-Control': 'public, max-age=3600'
        });
        res.status(200).json(ks);
    } catch (error) {
        console.error('Error fetching Ks', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
