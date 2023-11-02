export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user || false;
};

export const logout = () => {
  localStorage.removeItem("user");
};
