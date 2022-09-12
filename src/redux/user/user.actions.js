import { userActionsTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: userActionsTypes.SET_CURRENT_USER,
  payload: user,
});
