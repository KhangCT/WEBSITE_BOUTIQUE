import { redirect } from "react-router-dom";
import { removeUserLogin } from "./Until/auth";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import store from "../store";

// funtion action để logout
export function logoutAction() {
  // set trạng thái login là false trong redux
  store.dispatch(authActions.ON_LOGOUT());
  // và chuyển về trang home
  return redirect("/");
}
