// CRUD
const Jobs = require('../models/job');

const getJournals = async (req, res) => {
    try {
        const jobs = await Jobs.find({createdBy: req.user.userId})
        res.status(200).json({ noOfJobs: jobs.length, jobs})
    } catch (error) {
        console.log(error)
        res.json({ error })
    }
}



const getJournal = async (req, res) => {
    //const { journalId } = req.params;
    const {user: {userId}, params: {journalId},} =req
    try {
    //   const job = await Jobs.findOne({ _id: journalId})
    const job =  await Jobs.findOne({createdBy: userId, _id: journalId})
    if (!job) {
        return res.status(404).json({ success: false, message: `Job with the ${journalId} not found`})
    }
      res.status(201).json({success: true, job})
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

const createJournal = async (req, res) => {
    // company, position, createdBy
    const { company, position} = req.body
    req.body.createdBy = req.user.userId
    if (!company || !position) {
        return res.status(400).json({ success: false, message: 'Please provide necessary information' })
    }
    try {
        const job = await Jobs.create(req.body)
        res.status(201).json({ success: true, job })
    } catch (error) {
        console.log(error)
        res.json({ error })
    }
}

const updateJournal = async (req, res) => {
    const {user: {userId}, params: {journalId},} =req
    try {
  
      const job = await Jobs.findOneAndUpdate({createdBy: userId, _id: journalId }, req.body, {
          new: true,
          runValidators: true
      });
      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  
}

const deleteJournal = async (req, res) => {
    const {user: {userId}, params: {journalId},} =req
    try {
      const job = await Jobs.findOneAndDelete({createdBy: userId, _id: journalId})
      res.status(200).json({
          success: true,
          msg: "Deleted",
          job
      })
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  
}

module.exports = { getJournals, getJournal, createJournal, updateJournal, deleteJournal}