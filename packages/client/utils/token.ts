export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  if (token) return token;
  return "";
};
