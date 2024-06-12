import { httpClient } from "../httpClient";
const API_END_POINT = '/payment'
const complete_payment = async (imp_uid) => {
    return await httpClient.post(`${API_END_POINT}/completePayment`, imp_uid);
}

const preparePayment = async (prepareData) => {
    return await httpClient.post(`${API_END_POINT}/prepare`,prepareData);
}

export {complete_payment, preparePayment}