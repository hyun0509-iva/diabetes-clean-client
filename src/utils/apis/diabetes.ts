import { API_PATH } from "constants/api_path";
import { CommonResponse, IDiabetesRequest } from "models/data";
import api from "utils/axios";

const { DIABETES_API } = API_PATH;

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
  if (!userId) return;
  const { data } = await api.get(`${DIABETES_API}/users/${userId}`);
  return data;
};

const getDiabetesFindByIdAPI = async (id: string | null) => {
  if (!id) return;
  const { data } = await api.get(`${DIABETES_API}/${id}`);
  return data;
};

export {
  getDiabetesAPI,
  getDiabetesFindByIdAPI,
  createDiabetesAPI,
  deleteDiabetesAPI,
  updateDiabetesAPI
};
