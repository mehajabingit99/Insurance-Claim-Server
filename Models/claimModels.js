const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const Schema = mongoose.Schema;

const claimSchema = Schema(
    {
      claimId:{
        type: ObjectId,
        ref: 'userModel',
        required: true
      },
      descr:{
        type: String,
        required: true
      },
      phoneNo:{
        type: String,
        required:true
      },
      issueType: {
        type: String,
        required: true
      },
      createdAt:{
        type:Date,
        default: Date.now,
        required: false
      },
      updatedAt:{
        type:Date,
        default: Date.now,
        required: false
      }
    },{timestamp:true});

const claimModel = mongoose.model("claimModel",claimSchema);

module.exports = claimModel;