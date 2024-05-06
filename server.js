const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const seedUsers = require('./models/userSeedData');
const seedYear = require('./models/yearSeedData');
const asyncHndler = require('express-async-handler');
const multer = require('multer');
const pdfs = require('./models/academicYear')
const { v4: uuidv4 } = require('uuid');
const apifeatures = require("./apiFeatures");

//connecting with mongoose
//mongoose.connect("mongodb://localhost:27017/project")
mongoose.connect("mongodb://127.0.0.1:27017/Elearning-system")
    .then(() => {
        console.log('Connected to MongoDB');

        // Seed sample users into the database
        /*seedUsers(); */
        // seeding academic year data
        //seedYear();
    })
    .catch(err => console.log("can not connected:", err))



const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

// Multer storage configuration
/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, "")); // Unique file name
    }
});*/
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/pdfs'); // Destination folder for uploads
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const filename = `category~${uuidv4()}~${Date.now()}.${ext}`;
        cb(null, filename);
    },
});
const upload = multer({ storage: multerStorage });

// Route to handle file uploads
app.post('/api/upload/', upload.any(), async function (req, res) {
    try {
        if (req.files) {
            req.body.path = "http://localhost:3000/pdfs/" + req.files[0].filename;
        }
        console.log(req.files[0]);
        let pdf = await new pdfs(req.body).save();
        res.status(200).send(pdf);

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while uploading and saving the file.');
    }
});

// Route to handle PDF deletion
app.delete('/api/delete-pdf/:id', async (req, res) => {
    try {
            const { id } = req.params;
            const document = await pdfs.findByIdAndDelete(id);
              res.status(204).send();
        }
    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the PDF.');
    }
});

/*an API route in your Node.js back end that takes a request specifying the academic year
, specialization, semester, subject, and section, and responds with the list of PDFs User routes
*/
app.get('/api/get-pdfs/', async (req, res) => {
    try {

        //const pdfs = await pdfs.find();
        const apiFeatures = new apifeatures(pdfs.find(), req.query) //build and easy chain these methods
            //.paginate(documentsCounts)
            .search("") //in product modelNname contains value
            .limitfields()
            .filter()
            .sort();

        const { mongooseQuery } = apiFeatures; // those in propery in class change at previous method(sort....)
        const documents = await mongooseQuery;
        res
            .status(200)
            .json({ results: documents.length, data: documents });

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the PDFs.');
    }

});
app.use('/users', userRoutes);


//establishing server on the port
const port = 3000;
app.listen(port, function () {
    console.log(`server estaplished successfully on port ${port}`);
})