import { currentActionReq } from "../Features/currentActionSlice";

export const currentActionState = (currentTitle, mainMenu, subMenu) => async (dispatch) => {
  try {
    dispatch(currentActionReq({ currentTitle, mainMenu, subMenu }));
  } catch (error) {
    console.error(error);
  }
};
