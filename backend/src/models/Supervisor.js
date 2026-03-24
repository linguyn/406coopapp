/**
 * @swagger
 * components:
 *   schemas:
 *     SupervisorRegister:
 *       required: [company]
 *       allOf:
 *       - $ref: '#/components/schemas/UserBase'
 *       - $ref: '#/components/schemas/UserRegister'
 *       - type: object
 *         properties:
 *           company: { type: string, example: Palantir }
 *           jobTitle: { type: string, example: Ballistic Missiles Engineer }
 *           location: { type: string, example: New York }
 *     SupervisorSanitized:
 *       required: [id, interns, status]
 *       allOf:
 *       - $ref: '#/components/schemas/UserBase'
 *       - type: object
 *         properties:
 *           id: { type: string, example: 238945789237457817 }
 *           interns: { type: DNE, example: DNE }
 *           status: { type: string, example: active}
 *   examples:
 *     SupervisorRegister:
 *       value: { role: supervisor, email: jinwoo@thegreatest.com, password: password123, passwordAgain: password123, firstName: Jin-Woo, lastName: Sung, company: Palantir, jobTitle: poopy, location: Idaho }
 *     SupervisorSanitized:
 *       value: { role: supervisor, email: jinwoo@thegreatest.com, firstName: Jin-Woo, lastName: Sung, company: Palantir, jobTitle: ploopy, location: Idaho, status: active, interns : DNE, id : "238945789237457817" }
 */