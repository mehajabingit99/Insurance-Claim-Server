const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        username:{
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        pass: {
            type: String,
            required: true
        }
    }
)

//create model
const userModel = mongoose.model("userModel",userSchema);
    //                            model name schema name

module.exports = userModel;