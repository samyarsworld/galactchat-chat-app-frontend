# Project Title: Real-time Chat Application

### To use the application, head to https://galactchat.netlify.app/ and register. Welcome to the Galact Chat.


## Index
1. [About](#about)
2. [Demo](#demo)
3. [Technologies](#tech)
4. [Usage](#usage)
    * [Installation](#installation)
    * [In the Webapp](#webapp)
5. [Developer Features](#dev)
6. [Future Improvements](#future)
    * [Frontend](#front)
    * [Backend](#back)
7. [Credits](#credits) 
8. [License](#license)
 

<a name="about"></a>
## About

This is a real-time chat application made using React and Redux as frontend, and Node.js, MongoDB Atlas as backend. Socket.io library is used for real-time data exchange. The project includes an authentication page with registry that in addition to normal register and login info, it has a section to create AI-made pictures for your profile picture using Open AI DallE. Also, files are stored in Cloudinary cloud storage. The chat includes all chat functionality like real-time typing, notifications, messages, image message, emojis, last seen, seen, or delivered notification, and media storage for each chat.


<a name="demo"></a>
## Demo

| Authentication Page  |
|:----------------------|
|<img src="https://drive.google.com/uc?export=view&id=1_9MeqzsRwzAMEfgVG6DYsn7ZKMYtwS0h" width="100%" height="100%"/> |

| Main Chat Desktop View |
|:----------------------|
<img src="https://drive.google.com/uc?export=view&id=1-QtIt1Bsb4WhgOXa9ATvRelik_WMAO0d" width="100%" height="100%"/> |



| Main Chat Mobile View Contacts  | &nbsp;&nbsp;&nbsp; |  Main Chat Mobile View Chat  |
|:--------:|:-------------:|:--------:|
|<img src="https://drive.google.com/uc?export=view&id=1-dIbadCR_qVwcq-nw0t0WhULuGN1t3a5" style="margin-right: 10px" width="500" height="100%"/> | &nbsp;&nbsp;&nbsp; | <img src="https://drive.google.com/uc?export=view&id=1uCXv37W7XtssM-y5RsmXpsv-VnbMzxmR" width="500" height="100%"/> |


<a name="tech"></a>
## Technologies
- React.js
- Redux
- Node.js
- MongoDB Atlas
- Socket.io
- Open AI DallE
- Cloudinary


<a name="usage"></a>
### Usage

To use the application, head to https://galactchat.netlify.app/ and register. To use it locally follow the next section.

<a name="installation"></a>
### Installation

To install Galactic Social Network on your local computer, you need to:

1. Clone the repository to your local machine.

   ```
   git clone https://github.com/<username>/real-time-chat-app.git
   ```

2. Navigate to the project directory.

   ```
   cd real-time-chat-app
   ```

3. Install the dependencies for both frontend and backend using the following command in separate terminal windows:

   ```
   npm install
   ```

4. Create a `.env` file in the root of the project and add the following environment variables:

   ```
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   ```

5. Run the project using the following command in separate terminal windows:

   ```
   npm start
   ```

   This will start the frontend and backend servers.


### In the Webapp
<a name="webapp"></a>


<a name="dev"></a>
## Developer Features

- User authentication and authorization with registration and login pages.
- AI-made profile picture generation using Open AI DallE.
- Real-time chat functionality with typing indicators, notifications, and media storage.
- Emoji support.
- Last seen, seen, or delivered notifications.
- File storage using Cloudinary cloud storage.


## Credits

- SAMYAR FARJAM (https://github.com/samyarsworld)

If you'd like to contribute to GalacticChat, please feel free to submit a pull request or open an issue on our [GitHub repository](https://github.com/samyarsworld/galactchat-chat-app-backend). We welcome all contributions and feedback.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for details.
