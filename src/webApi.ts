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
    return await axios.get(`${BASE_URL}/video/video/${videoId}`).then((res: any) => {return res.data.response})
  } catch (error) {
    console.log(error);
  }
}

export const getChannel =  async (userId: string) => {
  try {
    return await axios.get(`${BASE_URL}/user/getuser/${userId}`).then((res: any) => {return res.data.response})
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
  return await axios.get(`${BASE_URL}/video/collect/${videoId}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }).then(res => res).catch((error) => error);
}

export const subscribe = async (channelId: string) => {
  const token = localStorage.getItem('token');
  return await axios.get(`${BASE_URL}/user/subscribe/${channelId}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }).then(res => res).catch((error) => error);
}

export const unsubscribe = async (channelId: string) => {
  const token = localStorage.getItem('token');
  return await axios.get(`${BASE_URL}/user/unsubscribe/${channelId}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }).then(res => res).catch((error) => error);
}

export const getVideoCommentList = async (VideoId: string) => {
  return await axios.get(`${BASE_URL}/video/commentlist/${VideoId}`)
    .then(res => res.data).catch((error) => error);
}

export const postVideoComment = async (VideoId: string, content: string) => {
  const token = localStorage.getItem('token');
  return await axios.post(`${BASE_URL}/video/comment/${VideoId}`, {
    'content': content
  },   {
    headers: {
      'authorization': `Bearer ${token}`
    }
  })
    .then(res => res.data).catch((error) => error);
}

export const getSubscribeChannel = async (userId: string) => {
  const token = localStorage.getItem('token');
  return await axios.get(`${BASE_URL}/user/getsubscribe/${userId}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }).then(res => res.data.subscribeList).catch((error) => error);
}

export const getLikeVideoList = async () => {
  const token = localStorage.getItem('token');
  const likeVideoInfo =  await axios.get(`${BASE_URL}/video/likelist`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }).then(res => { return res.data.likeInfo }).catch((error) => error);

  for (let i = 0;i < likeVideoInfo.length; i++) {
    const videoAuthor =  await axios
      .get(`${BASE_URL}/user/getuser/${likeVideoInfo[i].video.user}`)
      .then((res: any) => {return res.data.username})
      .catch((error) => console.log(error));
    likeVideoInfo[i].video.username = videoAuthor;
  }

  const likeVideoIdList = likeVideoInfo.map((info: any) => info.video._id);
  let urlList = [];

  for (let i = 0; i < likeVideoIdList.length; i++) {
    const url = (
      await axios
        .get(`${BASE_URL}/video/getvideolink/${likeVideoIdList[i]}`)
        .then((res: any) => {return res.data.response.VideoBase.CoverURL})
        .catch((error) => console.log(error))
    );
    urlList.push(url);
  }

  for (let i = 0; i < urlList.length; i++) {
    likeVideoInfo[i].coverURL = urlList[i]
  }

  return likeVideoInfo;
}

export const getSaveVideoList = async () => {
  const token = localStorage.getItem('token');
  const saveVideoInfo =  await axios.get(`${BASE_URL}/video/collectlist`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }).then(res => { return res.data.collectList }).catch((error) => error);

  for (let i = 0;i < saveVideoInfo.length; i++) {
    const videoAuthor =  await axios
      .get(`${BASE_URL}/user/getuser/${saveVideoInfo[i].video.user}`)
      .then((res: any) => {return res.data.username})
      .catch((error) => console.log(error));
      saveVideoInfo[i].video.username = videoAuthor;
  }

  const saveVideoIdList = saveVideoInfo.map((info: any) => info.video._id);
  let urlList = [];

  for (let i = 0; i < saveVideoIdList.length; i++) {
    const url = (
      await axios
        .get(`${BASE_URL}/video/getvideolink/${saveVideoIdList[i]}`)
        .then((res: any) => {return res.data.response.VideoBase.CoverURL})
        .catch((error) => console.log(error))
    );
    urlList.push(url);
  }

  for (let i = 0; i < urlList.length; i++) {
    saveVideoInfo[i].coverURL = urlList[i]
  }

  return saveVideoInfo;
}
