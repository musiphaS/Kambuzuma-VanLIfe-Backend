const express = require('express');
const router = express.Router();
const vanService = require('../services/vanServices'); // Correct import for service
const upload = require('../multerConfig'); // Multer config for image uploads

// POST create a new van with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const vanData = req.body;
    const imagePath = req.file ? req.file.path : null; // Get the image path from the file upload
    const newVan = await vanService.createVan({ ...vanData, image: imagePath }); // Include image in van data
    res.status(201).json(newVan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating van', error: error.message });
  }
});

// PUT update van with new image
router.put('/:id/image', upload.single('image'), async (req, res) => {
  try {
    const vanId = req.params.id;
    const imagePath = req.file ? req.file.path : null; // Get the new image path
    const updatedVan = await vanService.updateVan(vanId, { image: imagePath });
    if (updatedVan) {
      res.status(200).json(updatedVan);
    } else {
      res.status(404).json({ message: 'Van not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating van image', error: error.message });
  }
});

module.exports = router;
