import React from "react";
import {
  FaPlusCircle,
  FaFileImage,
  FaGift,
  FaPaperPlane,
} from "react-icons/fa";

const SendMessage = ({
  newMessage,
  newMessageHandler,
  sendMessage,
  sendEmoji,
  sendImage,
}) => {
  const emojis = [
    "😀",
    "😄",
    "😁",
    "😆",
    "😂",
    "🤣",
    "😊",
    "🙂",
    "🙃",
    "😉",
    "😍",
    "😝",
    "😜",
    "🧐",
    "🤓",
    "😎",
    "😕",
    "🤑",
    "🥴",
    "😱",
  ];
  function handleInputKeyPress(event) {
    if (event.key === "Enter") {
      sendMessage(event);
    }
  }
  return (
    <div className="message-send-section">
      <input type="checkbox" id="emoji" />
      <div className="file hover-attachment">
        <div className="add-attachment">Add attachment</div>
        <FaPlusCircle />
      </div>

      <div className="file hover-image">
        <div className="add-image">Add image</div>
        <input
          onChange={sendImage}
          type="file"
          id="pic"
          className="form-control"
        />
        <label htmlFor="pic">
          <FaFileImage />
        </label>
      </div>

      <div className="file hover-gift">
        <div className="add-gift">Add gift</div>
        <FaGift />
      </div>

      <div className="message-type">
        <input
          type="text"
          name="message"
          onChange={newMessageHandler}
          value={newMessage}
          id="message"
          placeholder="Aa"
          className="form-control"
          onKeyPress={handleInputKeyPress}
        />

        <div className="file hover-gift">
          <label htmlFor="emoji">❤</label>
        </div>
      </div>

      <div onClick={sendMessage} className="file">
        <FaPaperPlane />
      </div>

      <div className="emoji-section">
        <div className="emoji">
          {emojis.map((e) => (
            <span key={e} onClick={() => sendEmoji(e)}>
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
