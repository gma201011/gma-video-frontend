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

export const getVideoPlayInfo = async (videoId: string) => {
  const link = await axios
    .get(`${BASE_URL}/video/getvideolink/${videoId}`)
    .then((res: any) => {return res.data.response.PlayInfoList.PlayInfo[0].PlayURL})
    .catch((error) => console.log(error));

  const videoInfo = await axios
    .get(`${BASE_URL}/video/video/${videoId}`)
    .then((res: any) => res.data)
    .catch((error) => console.log(error));

  videoInfo.playURL = link;
  return videoInfo;
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

export const getVideoOperateStatus = async (videoId: string) => {
  const token = localStorage.getItem('token');
  return await axios.get(`${BASE_URL}/video/videoOperation/${videoId}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }).then((response) => response.data.videoOperate).catch((error) => error);
}

export const videoLike = async (videoId: string) => {
  const token = localStorage.getItem('token');
  return await axios.get(`${BASE_URL}/video/like/${videoId}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }).catch((error) => error);
}

export const videoDislike = async (videoId: string) => {
  const token = localStorage.getItem('token');
  return await axios.get(`${BASE_URL}/video/dislike/${videoId}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }).catch((error) => error);
}

export const videoSave = async (videoId: string) => {
  const token = localStorage.getItem('token');
  return await axios.get(`${BASE_URL}/video/dislike/${videoId}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }).then(res => res).catch((error) => error);
}