


var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials, {username: 1});
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function updateUser(user){

        userModel.findByIdAndUpdate(user._id,
            {
                $set: {username: user.username, password: user.password, firstName: user.firstName, lastName: user.lastName, email: user.email }
            },
            {
                new: true
            },
            function(err, updatedUser)
            {
                if(err){

                }
                else{

                }
            }
            )

}

function addSectionInStudent(studentId, sectionId){
    return userModel.findByIdAndUpdate(studentId,
        {
            $push: {sections: sectionId}
        })

}


function deleteSectionInStudent(studentId, sectionId){
    return userModel.findByIdAndUpdate(studentId,
        {
            $pull: {sections: sectionId}
        })

}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    addSectionInStudent: addSectionInStudent,
    deleteSectionInStudent: deleteSectionInStudent
};

module.exports = api;