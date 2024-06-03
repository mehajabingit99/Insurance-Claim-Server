const mongoose = require('mongoose')
// const {ObjectId} = mongoose.Schema.Types

const Schema = mongoose.Schema;

const issueSchema = Schema(
    {
      title:{
        type: String,
        required: true
      },
      descr:{
        type: String,
        required: true
      },
      status:{
        type: String,
        required:true
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

const issueModel = mongoose.model("issueModel",issueSchema);

module.exports = issueModel;