

# Project Title: Real-time Chat Application

This is a real-time chat application made using React and Redux as frontend, and Node.js, MongoDB Atlas as backend. Socket.io library is used for real-time data exchange. The project includes an authentication page with registry that in addition to normal register and login info, it has a section to create AI-made pictures for your profile picture using Open AI DallE. Also, files are stored in Cloudinary cloud storage. The chat includes all chat functionality like real-time typing, notifications, messages, image message, emojis, last seen, seen, or delivered notification, and media storage for each chat.

<a name="demo"></a>
## Demo
| Human vs Human   | Human vs AI (AI is controlling black)  |
|:----------------------|:------------------|
|<img src="https://drive.google.com/file/d/1_9MeqzsRwzAMEfgVG6DYsn7ZKMYtwS0h/view?usp=share_link" width="420" /> | <img src="https://drive.google.com/file/d/1-QtIt1Bsb4WhgOXa9ATvRelik_WMAO0d/view?usp=share_link" width="420" /> |

| Human vs Human   | Human vs AI (AI is controlling black)  |
|:----------------------|:------------------|
|<img src="https://drive.google.com/file/d/1-dIbadCR_qVwcq-nw0t0WhULuGN1t3a5/view?usp=share_link" width="420"   /> | <img src="[https://media.giphy.com/media/YNZ1U9FB1VM9KDmdsG/giphy.gif](https://drive.google.com/file/d/1uCXv37W7XtssM-y5RsmXpsv-VnbMzxmR/view?usp=share_link)" width="420" /> |

## Installation

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

## Features

- User authentication and authorization with registration and login pages.
- AI-made profile picture generation using Open AI DallE.
- Real-time chat functionality with typing indicators, notifications, and media storage.
- Emoji support.
- Last seen, seen, or delivered notifications.
- File storage using Cloudinary cloud storage.

## Technologies

- React.js
- Redux
- Node.js
- MongoDB Atlas
- Socket.io
- Open AI DallE
- Cloudinary

## Contributors

- SAMYAR FARJAM (https://github.com/samyarsworld)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for details.
