const { QBLeaders, WRLeaders, RBLeaders, TELeaders } = require('../../../models/position-data/index');

const positions = [QBLeaders, WRLeaders, RBLeaders, TELeaders];
const extractJsonArrays = (scriptOutput) => {
    return scriptOutput.match(/\[.*?\]/g);
};

const concatenateJsonArrays = (jsonDataArrays) => {
    return jsonDataArrays.reduce((acc, jsonArray) => {
        try {
            const jsonDataArray = JSON.parse(jsonArray);
            return acc.concat(jsonDataArray);
        } catch (parseError) {
            console.error(`Error parsing JSON array: ${parseError}`);
            return acc;
        }
    }, []);
};

const insertDataIntoDatabase = async (concatenatedData) => {
    const promises = concatenatedData.map(async (jsonData) => {
        try {
            if (jsonData && jsonData.player_id) {
                const positionIndex = getPositionIndex(jsonData.position);

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
};

const getPositionIndex = (position) => {
    switch (position) {
        case 'QB':
            return 0;
        case 'WR':
            return 1;
        case 'RB':
            return 2;
        case 'TE':
            return 3;
        default:
            return -1;
    }
};

module.exports = {
    processPositionData: async (scriptOutput) => {
        const jsonDataArrays = extractJsonArrays(scriptOutput);

        if (!jsonDataArrays) {
            console.error('No JSON arrays found in the script output');
            return;
        }

        const concatenatedData = concatenateJsonArrays(jsonDataArrays);

        await insertDataIntoDatabase(concatenatedData);
    },
};
