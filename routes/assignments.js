let Assignment = require('../model/assignment');
let mongoose = require('mongoose');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    console.log("Server received page =", req.query.page);

    var aggregateQuery = Assignment.aggregate();
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    Assignment.aggregatePaginate(
        aggregateQuery, { page: page, limit: limit },
        (err, results) => {
            if(err){
                res.send(err);
            }
            res.json(results);
        }
    );
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send(err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    const assignmentId = req.params.id;

    // If the client passed a MongoDB ObjectId use it, otherwise try the numeric `id` field.
    const isObjectId = mongoose.Types.ObjectId.isValid(assignmentId);
    const query = isObjectId ? {_id: assignmentId} : {id: Number(assignmentId)};

    Assignment.findOneAndRemove(query, (err, assignment) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!assignment) {
            return res.status(404).json({message: 'Assignment not found'});
        }
        return res.json({message: `${assignment.nom} deleted`});
    });
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
