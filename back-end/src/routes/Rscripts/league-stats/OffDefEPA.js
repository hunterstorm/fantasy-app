const express = require('express');
const router = express.Router();
const path = require('path');
const { exec } = require('child_process');

const scriptDirectory = path.join(__dirname, '../../../../../scripts');
process.chdir(scriptDirectory);

const generateImage = async () => {
  return new Promise((resolve, reject) => {
    exec('Rscript off_def_epa.R', (error, stdout, stderr) => {
      if (error) {
        console.error('Error running R script', error);
        console.error('Script stderr:', stderr.toString());
        reject(error);
      } else {
        console.log('Script ran successfully');
        console.log('Script stdout:', stdout.toString());
        resolve();
      }
    });
  });
};

router.get('/', async (req, res) => {
  try {
    // Run the R script to generate the plot and save as an image
    await generateImage();

    // Provide the static image URL as the response
    const imageUrl = 'graphics/off_def_epa.jpeg';
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error processing R script', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
