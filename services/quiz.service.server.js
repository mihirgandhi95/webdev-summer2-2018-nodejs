module.exports = app => {

    const quizModel = require('../models/quizzes/quiz.model.server');
    const submissionModel = require('../models/quizzes/submission.model.server');
    const userModel = require('../models/user/user.model.server');

    createQuiz = (req, res) => {
        quizModel.createQuiz(req.body)
            .then(quiz => res.send(quiz))
    }

    findAllQuizzes = (req, res) => {
        quizModel.findAllQuizzes()
            .then(quizzes => res.send(quizzes))
    }

    findQuizById = (req, res) => {
        quizModel.findQuizById(req.params.qid)
            .then(quiz => res.send(quiz))
    }

    updateQuiz = (req, res) => {
        quizModel.updateQuiz(req.params.qid, req.body)
            .then(status => res.send(status))
    }

    deleteQuiz = (req, res) => {
        quizModel.deleteQuiz(req.params.qid)
            .then(status => res.send(status))
    }

    addQuestion = (req, res) => {
        quizModel
            .addQuestion(req.params.qid, req.params.questionId)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    }

    submitQuiz = (req, res) => {
         console.log('inside submit quiz*****************************' );
         var submission = req.body;//////////////////*****************************check
        // console.log('submission is:' + submission);
        console.log(submission);
        //
         var quizId =req.params.qid;
         console.log('submitQuiz' + quizId);
        // var quiz = quizModel.findQuizById(quizId);
         var usercred = req.session['currentUser'];
        //
        // var user = userModel.findUserById(usercred._id).then(function(usercred) {
        //     res.json(usercred);
        // });
        //
        //
         submissionModel.submitQuiz(submission,quizId,usercred._id).then((submission) => {
             console.log(submission + '*************************this is mihirs submission');
             // return submission;
             res.json(submission);
         });

        //res.json(req.body)
    }



    // findSubmissionsForQuiz = (req,res) => {
    //
    //         var quizId = req.params.quizId;
    //         submissionModel.findSubmissionsForQuiz(quizId).then(function(submissions) {
    //
    //             var names = [];
    //
    //              // var userNew = userModel.findUserById(submissions.student);
    //              // if(userNew.username != null && userNew.username!= '') {
    //              //     names.push(userNew.username);
    //              // }
    //                 res.json(submissions);
    //         });
    // }


    findSubmissionsForQuiz = (req,res) => {

        console.log('body is **************************' + req.body);
        var quizId =req.params.qid;
        //var usercred = req.session['currentUser'];

        console.log('quiz id is: '+ quizId);
        submissionModel.findSubmissionsForQuiz(quizId).then(function(submissions) {



            // var userNew = userModel.findUserById(submissions.student);
            // if(userNew.username != null && userNew.username!= '') {
            //     names.push(userNew.username);
            // }
            // return submissions;
             res.json(submissions);
            console.log('submissions inside findSubmissionsForQuiz are:' + submissions  );
        });
    }


    findSubmissionbyId = (req,res) => {
        console.log( ' findSubmissionById body is: ' + req.body);
        var quizId =req.params.qid;
        var submissionId =req.params.submissionId;
        submissionModel.findSubmissionById(submissionId).then(function(submission) {



            // var userNew = userModel.findUserById(submissions.student);
            // if(userNew.username != null && userNew.username!= '') {
            //     names.push(userNew.username);
            // }
            // return submissions;
            res.json(submission);
            console.log('submissions inside findSubmissionBYId is:' + submission  );
        });

    }


/*    findSubmissionsForUser = (req,res) => {
        var quizId = req.params.quizId;
        var usercred1 = req.session['currentUser'];

        submissionModel.findSubmissionsForUser(usercred1._id).then(function(submissions) {



            // var userNew = userModel.findUserById(submissions.student);
            // if(userNew.username != null && userNew.username!= '') {
            //     names.push(userNew.username);
            // }
            res.json(submissions);
            console.log('submissions inside findSubmissionsForUser are:' + submissions  );
        });
    }*/


    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qid', findQuizById);
    app.put('/api/quiz/:qid', updateQuiz);
    app.delete('/api/quiz/:qid', deleteQuiz);
    app.put('/api/quiz/:qid/question/:questionId', addQuestion);
    app.post('/api/quiz/:qid/submission', submitQuiz);
    app.get('/api/quiz/:qid/submissions',findSubmissionsForQuiz);
    app.get('/api/quiz/:qid/submission/:submissionId', findSubmissionbyId);
    // app.get('/api/quiz/:qid/submissions/user', findSubmissionsForUser)


}