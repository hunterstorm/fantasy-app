const express = require('express');
const router = express.Router();
const { execSync } = require('child_process');
const { QBLeaders, WRLeaders, RBLeaders, TELeaders, KLeaders } = require('../../../models/position-data/index');

const positions = [QBLeaders, WRLeaders, RBLeaders, TELeaders, KLeaders];
const commands = ['Rscript position_data.R', 'Rscript kicking_data.R'];

router.post('/', async (req, res) => {
    try {
        // Run 'position_data.R' script first
        const positionScriptOutput = await executeScript(commands[0]);
        console.log(`Script output for ${commands[0]}:`, positionScriptOutput);

        // Process script output for QB, WR, RB, TE leaders
        await processPositionData(positionScriptOutput);

        // Run 'kicking_data.R' script
        const kickingScriptOutput = await executeScript(commands[1]);
        console.log(`Script output for ${commands[1]}:`, kickingScriptOutput);

        // Process script output for Kicker leaders
        // await processKickingData(kickingScriptOutput);

        res.json({ success: true });
    } catch (error) {
        console.error('General error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

async function executeScript(command) {
    try {
        return await execSync(command, { encoding: 'utf-8' });
    } catch (scriptError) {
        console.error(`Error running script for ${command}:`, scriptError);
        throw scriptError;
    }
}

async function processPositionData(scriptOutput) {
    try {
        // Extract individual JSON arrays from the script output
        const jsonDataArrays = scriptOutput.match(/\[.*?\]/g);

        if (!jsonDataArrays) {
            console.error('No JSON arrays found in the script output');
            return;
        }

        // Concatenate arrays into a single array using accumulator
        const concatenatedData = jsonDataArrays.reduce((acc, jsonArray) => {
            try {
                const jsonDataArray = JSON.parse(jsonArray);
                return acc.concat(jsonDataArray);
            } catch (parseError) {
                console.error(`Error parsing JSON array: ${parseError}`);
                return acc;
            }
        }, []);

        // Insert data into the database for each item in the array
        const promises = concatenatedData.map(async (jsonData) => {
            try {
                if (jsonData && jsonData.player_id) {
                    const positionIndex = jsonData.position === 'QB' ? 0 :
                                          jsonData.position === 'WR' ? 1 :
                                          jsonData.position === 'RB' ? 2 :
                                          jsonData.position === 'TE' ? 3 : -1;

                    if (positionIndex !== -1) {
                        await positions[positionIndex].upsert(jsonData, { updateOnDuplicate: ['player_id'] });
                    } else {
                        console.error('Invalid position:', jsonData.position);
                    }
                } else {
                    console.error('Invalid JSON data:', jsonData);
                }
            } catch (error) {
                console.error('Error processing JSON data:', error);
            }
        });

        await Promise.all(promises);
    } catch (jsonError) {
        console.error('Error processing position data JSON:', jsonError);
        console.error('Script Output:', scriptOutput);
    }
}



// async function processKickingData(scriptOutput) {
//     try {
//         // Kicking data processing
//         const jsonDataArray = JSON.parse(scriptOutput);
//         await Promise.all(jsonDataArray.map(async (jsonData) => {
//             if (jsonData && jsonData.player_id) {
//                 await positions[4].upsert(jsonData, { updateOnDuplicate: ['player_id'] });
//             } else {
//                 console.error('Invalid JSON data:', jsonData);
//             }
//         }));
//     } catch (jsonError) {
//         console.error('Error processing kicking data JSON:', jsonError);
//         console.error('Script Output:', scriptOutput);
//     }
// }

module.exports = router;