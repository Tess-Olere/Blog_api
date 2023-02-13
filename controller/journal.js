// CRUD

const getJournals = async (req, res) => {
    res.send('Get all Journals',)
}

const getJournal = async (req, res) => {
    res.send('Get Journal');
}

const createJournal = async (req, res) => {
    res.send('Create Journal');
}

const updateJournal = async (req, res) => {
    res.send('Update Journal');
}

const deleteJournal = async (req, res) => {
    res.send('Delete Journal');
}

module.exports = { getJournals, getJournal, createJournal, updateJournal, deleteJournal}