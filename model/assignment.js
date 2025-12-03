let mongoose = require('mongoose');




var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;


let AssignmentSchema = new Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});


AssignmentSchema.plugin(aggregatePaginate);

// Use this to force the collection name "assignments"
module.exports = mongoose.model('Assignment', AssignmentSchema, 'assignments');
