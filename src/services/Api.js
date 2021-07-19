import axios from "axios";
import { currentDate } from "../context/Auth";

const apiEndpoint = "https://app-web-03-bck-rd-hmg.azurewebsites.net";

export const api = axios.create({
  baseURL: apiEndpoint,
  headers: { "Content-type": "application/json" },
});

export const createAuth = async () => {
  const authKey = await api.get("/5estrelasfrt/auth/createAuthorizationKey");
  const data = await authKey.data;

  return data;
};

export const createAccess = async (authId) => {
  const token = await api.post("/5estrelasfrt/auth/createAccessKey", {
    authorizationKey: authId,
    client: "12345678901234",
    revalidate: true,
  });

  return token;
};

export const getAccessKey = async (id) => {
  const accessKey = await api.get(`/5estrelasfrt/auth/getAccessKey/${id}`);

  return accessKey.data;
};

export const getReport = async (accessToken) => {
  const finalDate = currentDate();
  const report = await api.get(
    `/5estrelasfrt/reports/score?initialDate=2021-01-01&finalDate=${finalDate}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return report;
};
