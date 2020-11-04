import axios from 'axios';

const API_URL = 'https://spreadsheets.google.com/feeds/list/1MWJoFP_0PFBYEDybGp6I-D1XWEBXk1PK35k74nzWytA/o65fh5j/public/full?alt=json';

const getTableDetail = async (filter) => {
  const { data } = await axios.get(API_URL, {
    params: {
      q: filter,
    },
  });
  return data;
};

export default getTableDetail;
