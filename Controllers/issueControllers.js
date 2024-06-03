const Issue = require('../Models/issueModels');

const createIssue = async (req, res) => {
    try {
        // Extract issue data from request body
        const {title, descr, status, } = req.body;

        // Validate input
        if (!title || !descr || !status) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Create new Issue instance
        const newIssue = new Issue({ title, descr, status});

        // Save issue to database
        const savedIssue = await newIssue.save();

        console.log('Received claim issue:');
        // console.log('Claim Number:', claimId);
        console.log('Description:', descr);
        console.log('title:', title);
        console.log('status:', status);
        // console.log('Phone No:', PhoneNo);
        // Return success response
        res.status(201).json({
            message: 'Issue created successfully', savedIssue
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error occurred..."
        })
    }
}


module.exports = createIssue;