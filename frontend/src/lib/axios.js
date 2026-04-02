import axios from "axios";
//axios helps you talk to the server.
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
  withCredentials: true,
});

/*
{
    "fullName": "John Doe",
    "email": "john123@gmail.com",
    "password": "123456"
}
*/