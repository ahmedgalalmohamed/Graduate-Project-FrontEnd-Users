import { createStore } from "vuex";
function Auth() {
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  if (ca[0]=='') {
    return false;
  }
  return true;
}
export default Auth;
