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
 *     UserRes:
 *       required: [fullName]
 *       allOf:
 *         - $ref: '#/components/schemas/UserBase'
 *         - $ref: '#/components/schemas/UserProcessedBase'
 *         - type: object
 *           properties:
 *             fullName: { type: string, example: Bollocks McGee }
 *     Support:
 *       required: [facultyAdvisor, coordinators]
 *       type: object
 *       properties:
 *         facultyAdvisor: { type: string, example: Ayesha Shariffe }
 *         coordinators:
 *           type: array
 *           items:
 *             type: string
 *           example: [Michael, Louise, Jin-Woo]
 *   examples:
 *     UserResEx:
 *       value: { role: student, email: jinwoo@thegreatest.com, firstName: Jin-Woo, lastName: Sung, fullName: Jin-Woo Sung, dateCreated : "DNE", id : "238945789237457817" }
 */