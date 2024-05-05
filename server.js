const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const seedUsers = require('./models/userSeedData');
const seedYear = require('./models/yearSeedData');
const asyncHndler = require('express-async-handler');
const multer = require('multer');
const pdfs = require('./models/academicYear')
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

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, "")); // Unique file name
    }
});

const upload = multer({ storage: storage });

// Route to handle file uploads
app.post('/api/upload/', upload.any(), async function (req, res) {
    try {
        if (req.files) {
            req.body.path = "http://localhost:3000/uploads/" + req.files[0].filename;
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
app.delete('/api/delete-pdf', async (req, res) => {
    try {
        // Extract information from the request body
        const { academicYearId, specializationName, semesterName, subjectName, sectionName, pdfId } = req.body;

        // Find the academic year
        const year = await academicYear.findById(academicYearId);

        if (!year) {
            return res.status(404).send('Academic year not found.');
        }

        // Find the specialization
        const specialization = year.specializations.find(spec => spec.name === specializationName);

        if (!specialization) {
            return res.status(404).send('Specialization not found.');
        }

        // Find the semester
        const semester = specialization.semesters.find(sem => sem.name === semesterName);

        if (!semester) {
            return res.status(404).send('Semester not found.');
        }

        // Find the subject
        const subject = semester.subjects.find(sub => sub.name === subjectName);

        if (!subject) {
            return res.status(404).send('Subject not found.');
        }

        // Find the section
        const section = subject.sections.find(sec => sec.name === sectionName);

        if (!section) {
            return res.status(404).send('Section not found.');
        }

        // Find the index of the PDF in the section
        const pdfIndex = section.pdfs.findIndex(pdf => pdf._id.toString() === pdfId);

        if (pdfIndex === -1) {
            return res.status(404).send('PDF not found.');
        }

        // Get the PDF to be deleted
        const pdfToDelete = section.pdfs[pdfIndex];

        // Delete the PDF file from local storage
        fs.unlink(pdfToDelete.path, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${pdfToDelete.path}`);
            } else {
                console.log(`File deleted: ${pdfToDelete.path}`);
            }
        });

        // Remove the PDF from the section array
        section.pdfs.splice(pdfIndex, 1);

        // Save the academic year document
        await year.save();

        // Respond with success
        res.send('PDF deleted successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the PDF.');
    }
});

/*an API route in your Node.js back end that takes a request specifying the academic year
, specialization, semester, subject, and section, and responds with the list of PDFs User routes
*/
app.get('/api/get-pdfs/:subject', async (req, res) => {
    try {
        const subject = req.params.subject
        const pdfs = await PDF.find({ subjectname: subject });
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