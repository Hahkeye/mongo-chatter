const { Schema, model } = require("mongoose");
const { reactionSchema } = require("./Reaction");
// const {Reaction,reactionSchema} = require("./Reaction");
// const ObjectId = Schema.ObjectId;


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxLenght: 280,
        minLenght: 1    
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required:true
    },
    reactions: {
        type: [reactionSchema]
    }
},
{ id : false });

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});
thoughtSchema.set('toJSON', { getters: true, virtuals: true });

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;