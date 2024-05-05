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
    subjectName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['lectures', 'sections', 'tasks', 'exams', 'summaries']
    }
});

// const sectionSchema = new mongoose.Schema({
//     name: String,
//     pdfs: [pdfSchema],
//     //lecs, summararies
// });

// const subjectSchema = new mongoose.Schema({
//     name: String,
//     semester: number,
//     specialization: String,
// });

// const semesterSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     subjects: [subjectSchema], //Array of subject object
// });

// const specializationSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     semesters: [semesterSchema]
// });

// const academicYearSchema = new mongoose.Schema({
//     name: String,
//     specializations: [specializationSchema],
// });

const pdf = mongoose.model('pdfSchema', pdfSchema);
module.exports = pdf;

