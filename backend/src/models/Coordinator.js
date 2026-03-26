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

/**
 * @swagger
 * components:
 *   schemas:
 *     CoordinatorRegister:
 *       allOf:
 *       - $ref: '#/components/schemas/UserBase'
 *       - $ref: '#/components/schemas/UserProcessedBase'
 *       - $ref: '#/components/schemas/UserRegister'
 *     CoordinatorSanitized:
 *       type: object
 *       required: [accessToken, user]
 *       properties:
 *         accessToken: { type: string, example: "aDASDadDS2e23423ADASD" }
 *         user:
 *           type: object
 *           required: []
 *           allOf:
 *             - $ref: '#/components/schemas/UserBase'
 *   examples:
 *     CoordinatorRegister:
 *       value: { role: coordinator, email: supevisor@examplee.com, password: password123, passwordAgain: password123, firstName: Jin-Woo, lastName: Sung }
 *     CoordinatorSanitized:
 *       value: { role: coordinator, email: supevisor@examplee.com, firstName: Jin-Woo, lastName: Sung, id : "238945789237457817" }
 */