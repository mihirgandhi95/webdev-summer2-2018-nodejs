var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);



function findSectionById(sectionId){
    return sectionModel.findById(sectionId);
}



function createSection(section) {
    return sectionModel.create(section);
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId});
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: -1}
    });
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: +1}
    });
}


function deleteSection(sectionId){
    sectionModel.findByIdAndRemove(sectionId, function(err,deleteSection){
        if(err){

        }
        else{

        }
    });
}

function updateSection(section) {
    sectionModel.findByIdAndUpdate(section._id,{
        $set: {name: section.name, seats: section.seats}
    },
        {
            new: true,

        },
        function(err, updateSection){
        if(err){

        }
        else
        {

        }
        })
}

function addStudentInSection(studentId, sectionId){
        return sectionModel.findByIdAndUpdate(sectionId,
            {
                $push: {students: studentId}
            })
}


function deleteStudentInSection(studentId, sectionId){
    return sectionModel.findByIdAndUpdate(sectionId,
        {
            $pull: {students: studentId}
        })
}


module.exports = {
    createSection: createSection,
    findSectionsForCourse: findSectionsForCourse,
    decrementSectionSeats: decrementSectionSeats,
    incrementSectionSeats: incrementSectionSeats,
    deleteSection: deleteSection,
    updateSection:updateSection,
    findSectionById: findSectionById,
    addStudentInSection:addStudentInSection,
    deleteStudentInSection:deleteStudentInSection


};