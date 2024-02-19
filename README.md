# gma-video-frontend

The project is made with React in frontend, and Node.js, MongoDB in backend.

It's a simple video streaming platform that allow user to watch videos and communicate with different people. You can watch different videos on gma-video, leave a comment to support author or even share your ideas as a channel.

**Backend repository：https://github.com/gma201011/gma-video-backend**

***

### Tools

* Framework （React ecosystem）
  * Typescript
  * create-react-app
  * react hook
  * react-router-dom
* CSS, styles
  * MUI
  * styled-components
* Others
  * moment ( data format )
  * axios ( fetch api )
  * Aliplayer（video play）

***

### Functional Diagram

![image](https://github.com/gma201011/picture/blob/main/frontend.png)

***

### File structure

```
src
│  App.tsx
│  index.tsx
│  WebApi.ts
│  contexts.js
│  
├─components
│  ├─Navbar
│  │      index.tsx
│  │      NavList.tsx
│  │      
│  ├─SignInScreen
│  │      index.tsx
│  │      
│  ├─StyleLink
│  │      NoStyleLink.tsx
│  │      
│  ├─VideoCard
│         index.tsx        
│
├─pages
│  ├─Channel
│  │      index.tsx
│  │      UserVideoArea.js
│  │          
│  ├─Home
│  │      index.tsx
│  │         
│  ├─Like
│  │      index.tsx
│  │      SignInScreen.tsx
│  │          
│  ├─Login
│  │      index.tsx
│  │      SignInScreen.tsx
│  │
│  ├─Save
│  │      index.tsx
│  │      NoSaveScreen.tsx
│  │          
│  ├─Subscription
│  │      index.tsx
│  │      NoSubscribeScreen.tsx
│  │      UnsubscribeDialog.tsx
│  │
│  ├─Upload
│  │      index.tsx
│  │
│  ├─VideoPlay
│  │      index.tsx
│  │      CommentArea.tsx
│  │      LikeButtons.tsx
│  │      LoginAlert.tsx
│  │      Save.tsx
│  │      Subscribe.tsx
```
