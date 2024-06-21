export function getUser() {
  const USER = JSON.parse(localStorage.getItem("userId")) || [];
  return USER;
}
