const express = require('express');
const router = express.Router();
const vanService = require('../services/vanServices'); // Correct import for service
const upload = require('../multerConfig'); // Multer config for image uploads
const fs = require('fs');

// POST create a new van with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Validate if image was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Image upload failed or no image provided' });
    }

    console.log('Received request body:', req.body);
    console.log('Received file:', req.file);

    // Construct the van data, including image path
    const vanData = {
      ...req.body,
      image: `/uploads/${req.file.filename}` // Path used for accessing the image
    };

    console.log('Attempting to create van with data:', vanData);

    const newVan = await vanService.createVan(vanData);

    console.log('Van created successfully:', newVan);
    res.status(201).json(newVan);
  } catch (error) {
    console.error('Error in van creation route:', error);

    // Remove uploaded file if an error occurs after upload
    if (req.file) {
      fs.unlink(req.file.path, (unlinkError) => {
        if (unlinkError) {
          console.error('Error deleting file:', unlinkError);
        }
      });
    }

    res.status(500).json({ 
      message: 'Error creating van',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// PUT update van with a new image
router.put('/:id/image', upload.single('image'), async (req, res) => {
  try {
    const vanId = req.params.id;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Get the new image path

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

// Additional routes for getting, updating, and deleting vans can be added here...

module.exports = router;
