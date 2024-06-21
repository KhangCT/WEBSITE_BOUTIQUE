import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import classes from "./LiveChat.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import openSocket from "socket.io-client";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },

  content: {
    width: "400px",
    height: "400px",
    top: "auto",
    left: "auto",
    right: "0%",
    bottom: "0%",
    marginRight: "-10%",
    marginBottom: "-5%",
    border: "none",
    padding: "0",
    transform: "translate(-50%, -50%)",
    borderRadius: "15px",
    boxShadow: "2px 2px 20px 1px #5b5b5b",
  },
};
function LiveChat() {
  // state mở modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // lấy username người dùng đang đăng nhập
  const username = useSelector((state) => state.auth.userLogin);
  const [userChat, setUserChat] = useState("");
  const roomId = localStorage.getItem("roomChat");
  const userId = localStorage.getItem("userId");
  const [chatData, setChatData] = useState([]);
  const socket = openSocket("https://boutiquebe-60a72a49dd20.herokuapp.com/", {
    transports: ["websocket"],
  });

  // func tắt modal
  function closeModal() {
    setModalIsOpen(false);
  }
  // func mở modal
  function openModal() {
    setModalIsOpen(true);
  }
  // func tạo phòng chat
  const createRoomChat = async () => {
    if (!roomId) {
      const response = await axios.post(
        "https://boutiquebe-60a72a49dd20.herokuapp.com/chat/create"
      );
      localStorage.setItem("roomChat", response.data.chatId);
    }
  };
  // fn lấy dữ liệu chat
  const getChat = async () => {
    const response = await axios.get(
      `https://boutiquebe-60a72a49dd20.herokuapp.com/chat/${roomId}`
    );
    setChatData(response.data);
  };
  // fn submit chat
  const sendHandler = () => {
    // nếu nhập /end thì xóa roomchat
    if (userChat.toLowerCase() == "/end") {
      localStorage.removeItem("roomChat");
      setChatData("");
    } else {
      axios.put(
        `https://boutiquebe-60a72a49dd20.herokuapp.com/chat/${roomId}`,
        {
          userChat: userChat,
          role: "user",
        }
      );
    }
    setUserChat("");
    setTimeout(() => {
      getChat();
    }, 1000);
  };

  useEffect(() => {
    // tạo room chat
    createRoomChat();
    getChat();
    socket.on("chat", (data) => {
      if (data.action == "create") {
        setChatData(data.chatRoom);
      }
    });
  }, []);

  return (
    <div>
      <button onClick={openModal} className={classes["btn__live_chat"]}>
        <i className="fa-brands fa-facebook-messenger" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className={classes["live_chat"]}>
          <div className="border-bottom">
            <p className="fw-bold px-4 py-3 m-0">Customer Support</p>
          </div>
          <div className={classes.chatContent}>
            <ul>
              {chatData.chat &&
                chatData.chat.map((chat) =>
                  chat.role == "tele" ? (
                    <li className={classes["support_chat"]}>
                      <div className={classes.icon}>
                        <i className="fa-solid fa-headset" />
                      </div>
                      <div className={classes.chat}>{chat.text}</div>
                    </li>
                  ) : (
                    <li className={classes["user_chat"]}>
                      <div className={classes.userChat}>{chat.text}</div>
                      <div className={classes.icon}>
                        <i className="fa-solid fa-user"></i>
                      </div>
                    </li>
                  )
                )}
            </ul>
          </div>
          <div className="border-top py-2 bg-light d-flex flex-row align-items-center">
            <div className={classes.icon}>
              {username ? (
                <h6> {username.charAt(0).toUpperCase()}</h6>
              ) : (
                <i className="fa-solid fa-user"></i>
              )}
            </div>
            <input
              className="w-100 border-0 bg-lighter fw-bold"
              placeholder="Enter Messenger!"
              value={userChat}
              onChange={(e) => setUserChat(e.target.value)}
            ></input>
            <div className="mx-2 d-flex ">
              <i class="fa-solid fa-paperclip text-secondary mx-1"></i>
              <i class="fa-solid fa-face-smile text-secondary mx-1"></i>
              <i
                onClick={sendHandler}
                class="fa-solid fa-paper-plane text-primary mx-1"
              ></i>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LiveChat;
