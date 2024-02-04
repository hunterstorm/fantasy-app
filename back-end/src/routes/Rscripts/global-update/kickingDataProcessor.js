// kickingDataProcessor.js

const { KLeaders } = require('../../../models/position-data/index');
const insertKickingDataIntoDatabase = async (jsonDataArray) => {
    const promises = jsonDataArray.map(async (jsonData) => {
        try {
            if (jsonData && jsonData.player_id) {
                await KLeaders.upsert(jsonData, { updateOnDuplicate: ['player_id'] });
            } else {
                console.error('Invalid JSON data:', jsonData);
            }
        } catch (error) {
            console.error('Error processing JSON data:', error);
        }
    });

    await Promise.all(promises);
};

module.exports = {
    processKickingData: async (scriptOutput, positions) => {
        try {
            const jsonDataArray = JSON.parse(scriptOutput);
            await insertKickingDataIntoDatabase(jsonDataArray, positions);
        } catch (error) {
            console.error('Error processing kicking data:', error);
        }
    },
};