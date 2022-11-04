const { Schema, model} = require("mongoose");



const reactionSchema = new Schema({
    reactionId: {
        type: Schema.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Reaction = model("Reaction", reactionSchema);
//virtual to format date better

module.exports = {Reaction, reactionSchema};