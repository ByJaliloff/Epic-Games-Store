import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log("BASE_URL:", BASE_URL); 

const getAllGame = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/games`);
    return res.data;
  } catch (err) {
    console.error(err.message || 'fetch emeliyyatinda xeta bas verdi')
  }
}

const getAllDlc = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/dlc&add-onns`);
    return res.data;
  } catch (err) {
    console.error(err.message || 'fetch emeliyyatinda xeta bas verdi')
  }
}

const getAllAchievement = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/achievements`);
    return res.data;
  } catch (err) {
    console.error(err.message || 'fetch emeliyyatinda xeta bas verdi')
  }
}

const getAllSlide = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/slider`);
    return res.data;
  } catch (err) {
    console.error(err.message || 'fetch emeliyyatinda xeta bas verdi')
  }
}

export {
    getAllGame, getAllDlc, getAllAchievement, getAllSlide
}