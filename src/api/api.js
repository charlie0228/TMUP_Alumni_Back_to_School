import axios from 'axios';

const API_URL = 'https://spreadsheets.google.com/feeds/list/1u4Q_CkwUuj-eBkhMopDoN8xzzM8q1D5FdiSSAWB2T7M/osiahpt/public/full?alt=json';

const getTableDetail = async (filter) => {
  const { data } = await axios.get(API_URL, {
    params: {
      q: filter,
    },
  });
  return data;
};

export default getTableDetail;
