// import { apiFetch } from './client.ts';
// import {
//   usersContract,
//   type UserGetByIdResponse,
//   type UserGetByIdParams,
//   type UserCreateRequest,
//   type UserCreateResponse,
// } from '@my-app/shared';

// export async function userGetById(params: UserGetByIdParams): Promise<UserGetByIdResponse> {
//   const route = usersContract.routes.getById;
//   const json = await apiFetch<unknown>(
//     route.build(params.id),
//     method: route.method,
//   );

//   return route.response.parse(json);
// }

// export async function userCreate(body: UserCreateRequest): Promise<UserCreateResponse> {
//   const route = usersContract.routes.create;
//   const parsedBody = route.request.body.parse(body);

//   const json = await apiFetch<unknown, UserCreateRequest>(
//     route.build(),
//     method: route.method,
//     body: parsedBody,
//   );

//   return route.response.parse(json);
// }
