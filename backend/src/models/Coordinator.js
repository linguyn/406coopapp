import mongoose from 'mongoose';

//Coop Coordinator Schema
const coorSchema = new mongoose.Schema ({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: true,
    }
},
{ tiemstamps: true});

//Create model for the coordinator.
const Coor = mongoose.model('Coordinator', coorSchema);



export default Coor;


