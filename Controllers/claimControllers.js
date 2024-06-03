const Claim = require('../Models/claimModels');

const createClaim = async (req, res) => {
    try {
        const { claimId, issueType, phoneNo, descr} = req.body;

        //validation
        if (!claimId || !issueType || !phoneNo || !descr) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const newClaim = new Claim({ claimId, issueType, phoneNo, descr });
        const resp = await newClaim.save(); //store in database
        console.log(resp);
        res.status(201).json({
            message: "Claim Submitted Successfully", resp
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error occured..."
        })
    }
}

module.exports = createClaim;