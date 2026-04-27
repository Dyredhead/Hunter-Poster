// import { Router } from "express";
// import { usersContract } from "@my-app/shared";
// import { validateBody } from "../middleware/validateBody.js";
// import { findUserById } from "../repositories/users.js";

// const router = Router();

// router.get(usersContract.routes.getById.pattern, async (req, res, next) => {
//     const route = usersContract.routes.getById;
//     try {
//         const user = await findUserById(1);

//         const response = route.response.parse({ user });
//         res.json(response);
//     } catch (error) {
//         next(error);
//     }
// });

// router.post(
//     usersContract.routes.create.pattern,
//     validateBody(usersContract.routes.create.request.body),
//     async (req, res, next) => {
//         const route = usersContract.routes.create;
//         try {
//             const body = route.request.body.parse(req.body);

//             const response = route.response.parse({
//                 user: {
//                     id: 123,
//                     email: body.email,
//                 },
//             });

//             res.status(201).json(response);
//         } catch (error) {
//             next(error);
//         }
//     },
// );

// export default router;
