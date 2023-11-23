import axios from "axios";
import prisma from "db";
export const getUser = async () => {
  const response = await axios.get("/api/user-list/1");
  return response.data;
};

export const getUserIds = async () => {
  const response = await axios.get("/api/user-list/id-list");
  return response.data;
};

export const addUser = async (userData) => {
  const newUser = await prisma.User.create({
    data: userData
  });
  return newUser;
};

export const createUser = async (userData) => {
  const response = await axios.post("/api/user-list", userData);
  return response.data;
};

export default {
  getUser,
  getUserIds,
  createUser
};
