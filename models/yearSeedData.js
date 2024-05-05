const material = require('../models/academicYear');

const academicYearData = {
    name: "Third Year", // Academic year name
    specializations: [
        {
            name: 'Information System - General',
            semesters: [
                {
                    name: 'Semester 1',
                    subjects: [
                        {
                            name: 'Network',
                            sections: [
                                {
                                    name: 'Lectures',
                                    pdfs: [
                                        {
                                            name: 'Lecture 1',
                                            url: 'https://example.com/lecture1.pdf'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                    
                }
            ]
            
        }

    ]
    
}
//Function to seed Data
async function seedYear() {
    try {

        // Insert the academic year data
        await material.create(academicYearData);
        console.log('Academic year data seeded successfully');
    } catch (error) {
        console.error('Error seeding academic year data:', error);
    }
}
module.exports = seedYear;
