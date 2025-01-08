import multer from 'multer';
import path from 'path';

// Configure multer for storing images in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Name the file with a timestamp
  }
});

const upload = multer({ storage: storage });

export { upload };
