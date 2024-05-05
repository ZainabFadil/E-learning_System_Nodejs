const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
});

const sectionSchema = new mongoose.Schema({
    name: String,
    pdfs: [pdfSchema],
    //lecs, summararies
});

const subjectSchema = new mongoose.Schema({
    name: String,
    sections: [sectionSchema],  // Array of sections
});

const semesterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subjects: [subjectSchema], //Array of subject object
});

const specializationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    semesters: [semesterSchema]
});

const academicYearSchema = new mongoose.Schema({
    name: String,
    specializations: [specializationSchema],
});

const academicYear = mongoose.model('academicYear', academicYearSchema);
module.exports = academicYear;
