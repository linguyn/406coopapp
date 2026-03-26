/**
 * @swagger
 * components:
 *   schemas:
 *     UserBase:
 *       required: [role, email, firstName, lastName]
 *       type: object
 *       properties:
 *         role: { type: string, example: student }
 *         email: { type: string, example: jinwoo@thegreatest.com }
 *         firstName: { type: string, example: Jin-Woo }
 *         lastName: { type: string, example: Sung }
 *     UserProcessedBase:
 *       required: [id, dateCreated]
 *       type: object
 *       properties:
 *         id: { type: string, example: 238945789237457817 }
 *         dateCreated: { type: string, example: DNE }
 *     UserRegister:
 *       required: [password, passwordAgain]
 *       allOf:
 *         - $ref: '#components/schemas/UserBase'
 *         - type: object
 *           properties:
 *             password: { type: string, example: password123 }
 *             passwordAgain: { type: string, example: password123 }
 */