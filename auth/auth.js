function Auth() {
  let user = localStorage.getItem("token");
  if (!user) {
    return false;
  }
  return true;
}
export default Auth;
