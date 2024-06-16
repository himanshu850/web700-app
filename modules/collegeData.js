const fs = require('fs').promises;

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

async function initialize() {
    try {
        const studentsData = await fs.readFile('../data/students.json', 'utf-8');
        const coursesData = await fs.readFile('../data/courses.json', 'utf-8');

        const students = JSON.parse(studentsData);
        const courses = JSON.parse(coursesData);

        dataCollection = new Data(students, courses);

        return Promise.resolve();
    } catch (error) {
        return Promise.reject("Unable to read data files");
    }
}

function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.students.length > 0) {
            resolve(dataCollection.students);
        } else {
            reject("No results returned");
        }
    });
}

function getTAs() {
    return new Promise((resolve, reject) => {
        if (dataCollection) {
            const TAs = dataCollection.students.filter(student => student.TA);
            if (TAs.length > 0) {
                resolve(TAs);
            } else {
                reject("No results returned");
            }
        } else {
            reject("Data not initialized");
        }
    });
}

function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.courses.length > 0) {
            resolve(dataCollection.courses);
        } else {
            reject("No results returned");
        }
    });
}

module.exports = { initialize, getAllStudents, getTAs, getCourses };
