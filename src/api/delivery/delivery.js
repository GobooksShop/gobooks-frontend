import {httpClient} from '../httpClient';

const saveDelivery = async (requestData) => {
  return await httpClient.post('/delivery/create', requestData);
}

export {saveDelivery};