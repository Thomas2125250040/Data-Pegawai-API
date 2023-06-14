const mongoose =  require('mongoose')
const db = mongoose.connection

const getMk = () => {
    db.find();
}