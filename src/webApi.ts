import axios from 'axios';

export const URL = 'http://localhost:8080';

export const BASE_URL = 'http://localhost:8080/api/v1';

export const getVideoList = async () => {
  try {
    return await axios.get(`${BASE_URL}/video/videolist`).then((res: any) => res.data.videoList);
  } catch (error) {
    console.log(error);
  }
}

export const getVideoInfo = async (videoId: string) => {
  try {
    return await axios.get(`${BASE_URL}/video/getvideolink/${videoId}`).then((res: any) => {return res.data.response.VideoBase})
  } catch (error) {
    console.log(error);
  }
}

export const getVideoCardInfo = async () => {
  const infoList = (
    await axios
      .get(`${BASE_URL}/video/videolist`)
      .then((res: any) => res.data.videoList)
      .catch((error) => console.log(error))
  );
  const idList = infoList.map((info: any) => info._id);
  let urlList = [];

  for (let i = 0; i < idList.length; i++) {
    const url = (
      await axios
        .get(`${BASE_URL}/video/getvideolink/${idList[i]}`)
        .then((res: any) => {return res.data.response.VideoBase.CoverURL})
        .catch((error) => console.log(error))
    );
    urlList.push(url);
  }

  for (let i = 0; i < urlList.length; i++) {
    infoList[i].coverURL = urlList[i]
  }

  return infoList;
}

export const login = async (email: any, password: any) => {
  return await axios.post(`${BASE_URL}/user/logins`, {
    email, password
  }).then((response) => {return response.data})
    .catch((error) => error)
}

export const auth = async (token: string) => {
  return await axios.get(`${BASE_URL}/user/auth`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }).then((response) => response)
}