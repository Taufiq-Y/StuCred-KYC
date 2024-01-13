const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const dotenv = require('dotenv');
const multer = require('multer')
const { check, validationResult } = require('express-validator');
const { registerUser, loginUser, getUserBy } = require('./controllers/userController');
const { UploadImage } = require('./controllers/uploadController');
const { authenticateToken } = require ('./middleware/authRoute')
const {validateRegister, validateLogin } = require('./utils/apiSchema')


dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: '1024mb' })); 
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

mongoose
.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
})
.then(() => console.log("DB Connected..!"))
.catch(err => console.log(err))


app.post('/api/register', validateRegister,registerUser);

app.post('/api/login', validateLogin, loginUser);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
app.post('/api/upload',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), UploadImage);


app.get('/api/dashboard', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the dashboard, ' + req.user.email + '!' });
});

  
app.get('/api/users',  authenticateToken, getUserBy)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});