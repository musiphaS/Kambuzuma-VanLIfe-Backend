const express = require('express');
const router = express.Router();
const vanService = require('../services/vanServices'); // Correct import for service
const upload = require('../multerConfig');
 // Multer config for image uploads

const fs = require('fs');

// POST create a new van with image upload

router.post('/', upload.single("image"), async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Received file:', req.file);

    const vanData = req.body;
    if (req.file) {
      vanData.image = req.file.path;
    }

    console.log('Attempting to create van with data:', vanData);

    const newVan = await vanService.createVan(vanData);
    
    console.log('Van created successfully:', newVan);
    res.status(201).json(newVan);
  } catch (error) {
    console.error('Error in van creation route:', error);
    // If there was a file upload, but an error occurred later, we should delete the uploaded file
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

// Update Van
router.patch('/:id', async (req, res) => {
  try {
    const vanId = req.params.id;
    const updates = req.body;
    const updatedVan = await vanService.updateVan(vanId, updates);
    if (updatedVan) {
      res.status(200).json(updatedVan);
    } else {
      res.status(404).json({ message: 'Van not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating van', error: error.message });
  }
});

// Delete Van
router.delete('/:id', async (req, res) => {
  try {
    const vanId = req.params.id;
    await vanService.deleteVan(vanId);
    res.status(200).json({ message: 'Van deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting van', error: error.message });
  }
});

// Get All Vans
router.get('/', async (req, res) => {
  try {
    const vans = await vanService.getVans();
    res.status(200).json(vans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vans', error: error.message });
  }
});

// Get Van by ID
router.get('/:id', async (req, res) => {
  try {
    const vanId = req.params.id;
    const van = await vanService.getVan(vanId);
    if (van) {
      res.status(200).json(van);
    } else {
      res.status(404).json({ message: 'Van not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching van', error: error.message });
  }
});
  
//http://localhost:5000/vans/66fb22c3fa7d35f53cf03ba4  update
// http://localhost:5000/vans post
// http://localhost:5000/vans get
//http://localhost:5000/vans/66fb22c3fa7d35f53cf03ba4  delete
module.exports = router;
