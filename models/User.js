const { Schema, model } = require("mongoose");
const Thought = require("./Thought");
const thoughtsSchema = require("./Thought");
const emailT = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");


function validateEmail(email){
    console.log(emailT.test(email));
    return emailT.test(email);
}

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
        
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        validate: [validateEmail, 'Please enter a valid email.']
    },
    thoughts: {
        type: [Thought._id]
    },
    friends: {
        type: [this]
    }
});

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;