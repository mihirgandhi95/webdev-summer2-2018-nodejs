const mongoose = require('mongoose')
const schema = require('./submission.schema.server')
const model = mongoose.model('SubmissionModel', schema)

createSubmission = submission =>
    mongoose.create(submission)

findAllSubmissions = () =>
    mongoose.find()

findAllSubmissionsForStudent = studentId =>
    mongoose.find({student: studentId})

findAllSubmissionsForQuiz = quizId =>
    mongoose.find({quiz: quizId})


submitQuiz = (submission, quizId, userId) =>  {
    console.log('inside submit quiz +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    return model.create({
        quiz: quizId,
        student: userId,
        answers: submission.questions,
        submissionTime: submission.submissionTime
    }).then((response) => {
        console.log('abc is : ' + JSON.stringify(response))
        return response;
    });
    //return abc;
}

findSubmissionsForQuiz = (quizId) => {
    console.log('Quiz  id inside submission model server is : ---------- ' + quizId);
    return model.find({quiz: quizId});
}

findSubmissionsForUser = (userId) => {
    console.log('inside findSubmissionsForUser jrrjrjrjrjrjrjr ')
    console.log('userId is:' + userId);
    return model.find({student: userId});
}


findSubmissionById = (submissionId) => {
    return model.find({"_id"  : submissionId});
}



module.exports = {
    createSubmission, findAllSubmissions,
    findAllSubmissionsForStudent,
    findAllSubmissionsForQuiz,
    submitQuiz,
    findSubmissionsForQuiz,
    findSubmissionsForUser,
    findSubmissionById,

}