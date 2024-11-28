import { API_PATH } from "constants/api_path";
import { CommonResponse, IDiabetesRequest } from "models/data";
import api from "utils/axios";
import useStorage from "utils/functions/useStorage";

const { DIABETES_API } = API_PATH;
const { getStorage } = useStorage;
const createDiabetesAPI = async <T>(insertData: T) => {
  const { data } = await api.post<CommonResponse>(
    `${DIABETES_API}`,
    insertData
  );
  return data;
};

const deleteDiabetesAPI = async (diabetesId: string) => {
  const { data } = await api.delete<CommonResponse>(
    `${DIABETES_API}/${diabetesId}`
  );
  return data;
};

const updateDiabetesAPI = async ({
  diabetesId,
  diabetesData
}: {
  diabetesId: string;
  diabetesData: IDiabetesRequest;
}) => {
  console.log({ diabetesId, diabetesData });
  const { data } = await api.patch<CommonResponse>(
    `${DIABETES_API}/${diabetesId}`,
    diabetesData
  );
  return data;
};

const getDiabetesAPI = async (userId: string | null) => {
  const token = getStorage("accessToken");

  if (!userId) return;
  const { data } = await api.get(`${DIABETES_API}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

const getDiabetesFindByIdAPI = async (id: string | null) => {
  const token = getStorage("accessToken");

  if (!id) return;
  const { data } = await api.get(`${DIABETES_API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export {
  getDiabetesAPI,
  getDiabetesFindByIdAPI,
  createDiabetesAPI,
  deleteDiabetesAPI,
  updateDiabetesAPI
};
