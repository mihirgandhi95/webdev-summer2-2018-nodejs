module.exports = function (app) {

    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);


    app.get('/api/student/section/:sectionId', findStudentsForSection);

    app.delete('/api/section/:sectionId',deleteSection);

    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
    app.get('/api/student/section', findSectionsForStudent);



    app.get('/api/sectionData/:sectionId', section);


    app.put('/api/updateSection', updateSection);


    app.delete('/api/student/:sectionId/section/:userId/unenroll/:enrollmentId',unenrollStudentInSection);


    var sectionModel = require('../models/section/section.model.server');
    var userModel = require('../models/user/user.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function findSectionsForStudent(req, res) {
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        enrollmentModel
            .findSectionsForStudent(studentId)
            .then(function(enrollments) {
                res.json(enrollments);
            });
    }

    function enrollStudentInSection(req, res) {
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        };

        sectionModel
            .decrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .enrollStudentInSection(enrollment)
            }).then(function() {
                return sectionModel.addStudentInSection(studentId,sectionId)
        })
            .then(function() {
                return userModel.addSectionInStudent(studentId,sectionId)
        })
            .then(function (enrollment) {
                res.json(enrollment);
            })
    }




    function unenrollStudentInSection(req, res) {
        console.log("!!!!!!!!!!!!!!!!!!!!!! this is sparta !!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        var studentId = req.params.userId;
        console.log(studentId+"welcome to babylon");
        // var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        };
        //var enrollmentId = req.params.enrollmentId;
        sectionModel.
            incrementSectionSeats(sectionId) .then(function () {
                console.log("**************** inside unenrollment ****************");
                return enrollmentModel
                .unenrollStudentInSection(enrollment)
        }).then(function(){
            return sectionModel.deleteStudentInSection(studentId,sectionId)
        }).then(function(){
            return userModel.deleteSectionInStudent(studentId,sectionId)
        }).then(function(enrollment){
            res.json(enrollment);
        })
    }




    function findSectionsForCourse(req, res) {
        var courseId = req.params['courseId'];
        sectionModel
            .findSectionsForCourse(courseId)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function createSection(req, res) {
        var section = req.body;
        sectionModel
            .createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }


    function deleteSection(req,res) {
        var sectionId = req.params['sectionId'];
        sectionModel.deleteSection(sectionId);
    }


    function findStudentsForSection(req,res) {
        var sectionId = req.params.sectionId;
        enrollmentModel.findStudentsForSection(sectionId).then(function(enrollments) {
            res.json(enrollments);
        });
    }



    function section(req,res){
        var sectionId = req.params['sectionId'];
        sectionModel.findSectionById(sectionId).then(function
            (section){
            res.json(section);
        });
    }

    function updateSection(req,res) {
        var section = req.body;
        sectionModel.updateSection(section);
        res.send("section has been updated");
    }


};