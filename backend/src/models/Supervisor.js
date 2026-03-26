/**
 * @swagger
 * components:
 *   schemas:
 *     SupervisorRegister:
 *       required: [company]
 *       allOf:
 *       - $ref: '#/components/schemas/UserBase'
 *       - $ref: '#/components/schemas/UserProcessedBase'
 *       - $ref: '#/components/schemas/UserRegister'
 *       - type: object
 *         properties:
 *           company: { type: string, example: Palantir }
 *           jobTitle: { type: string, example: Ballistic Missiles Engineer }
 *           location: { type: string, example: New York }
 *     SupervisorSanitized:
 *       type: object
 *       required: [interns, status]
 *       properties:
 *         accessToken: { type: string, example: "aDASDadDS2e23423ADASD" }
 *         user:
 *           type: object
 *           required: [interns, status]
 *           allOf:
 *             - $ref: '#/components/schemas/UserBase'
 *             - type: object
 *               properties:
 *                 interns: { type: DNE, example: DNE }
 *                 status: { type: string, example: active}
 *   examples:
 *     SupervisorRegisterEx:
 *       value: { role: supervisor, email: jinwoo@thegreatest.com, password: password123, passwordAgain: password123, firstName: Jin-Woo, lastName: Sung, company: Palantir, jobTitle: poopy, location: Idaho }
 *     SupervisorSanitizedEx:
 *       value: { role: supervisor, email: jinwoo@thegreatest.com, firstName: Jin-Woo, lastName: Sung, company: Palantir, jobTitle: ploopy, location: Idaho, status: active, interns : DNE, id : "238945789237457817" }
 */