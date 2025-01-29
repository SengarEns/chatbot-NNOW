import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMessage } from "react-icons/ai";
import { PaperClip, SentSVGComponent } from "./svg";

// const apiUrl = "https://b071-103-206-131-194.ngrok-free.app";

const FLOW_CONFIG = {
  main_flow: {
    login: {
      message:
        "Welcome to NNNOW Chat! For a better experience, we request you to please login and relaunch chat.",
      options: [
        { text: "Login with Password", next: "login_with_password" },
        { text: "Login with OTP", next: "login_with_otp" },
      ],
    },
    login_with_password: {
      message: "Enter your phone number",
    },
    login_with_otp: {
      message: "Enter your phone number",
    },
    login_success: {
      message: "Login successful",
    },
    greeting: {
      message: "Hi! How can I help you?",
      options: [
        { text: "Order Related", next: "order_issues" },
        { text: "Payment Issues", next: "payment_issues" },
        { text: "Policy & Returns", next: "policy_related" },
      ],
    },
    order_issues: {
      message: "What issue are you facing with your order?",
      options: [
        { text: "Return", next: "return_policy" },
        { text: "Refund", next: "refund_policy" },
      ],
    },
  },
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentState, setCurrentState] = useState("login");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: FLOW_CONFIG.main_flow.login.message,
    },
    {
      sender: "bot",
      text: FLOW_CONFIG.main_flow.login.options.map((opt) => opt.text),
      type: "input",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [botResponseLoading, setBotResponseLoading] = useState(false);

  const apiUrl = "https://b071-103-206-131-194.ngrok-free.app";

  const handleStateTransition = (nextState) => {
    const stateConfig = FLOW_CONFIG.main_flow[nextState];
    if (!stateConfig) return;

    setCurrentState(nextState);

    const newMessages = [
      {
        sender: "bot",
        text: stateConfig.message,
      },
    ];

    if (stateConfig.options) {
      newMessages.push({
        sender: "bot",
        text: stateConfig.options.map((opt) => opt.text),
        type: "input",
      });
    }

    setMessages((prev) => [...prev, ...newMessages]);
  };

  const verifyPhoneNumber = async (number) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: number },
      { sender: "bot", text: "", isLoading: true },
    ]);
    setBotResponseLoading(true);

    try {
      const response = await fetch(`${apiUrl}/apis/account/usercheck`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber: number }),
      });

      const result = await response.json();
      const isNumberPresent = result.data?.mobileNumberPresent;

      if (!isNumberPresent) {
        setMessages((prev) => [
          ...prev.filter((msg) => !msg.isLoading),
          { sender: "bot", text: "User Profile Not Found", type: "text" },
          { sender: "bot", text: "Re-enter your mobile number", type: "input" },
        ]);
        return false;
      }

      setMobileNumber(number);
      return true;
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isLoading),
        {
          sender: "bot",
          text: "Sorry, we encountered an error. Please try again.",
          type: "text",
        },
      ]);
      return false;
    } finally {
      setBotResponseLoading(false);
    }
  };

  const handlePasswordLogin = async (password) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: "••••••" },
      { sender: "bot", text: "", isLoading: true },
    ]);
    setBotResponseLoading(true);

    try {
      const response = await fetch(`${apiUrl}/apis/account/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: mobileNumber, password }),
      });

      const result = await response.json();

      if (result.data) {
        handleStateTransition("greeting");
      } else {
        setMessages((prev) => [
          ...prev.filter((msg) => !msg.isLoading),
          {
            sender: "bot",
            text: "Invalid password. Please try again.",
            type: "text",
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isLoading),
        {
          sender: "bot",
          text: "Sorry, we encountered an error. Please try again.",
          type: "text",
        },
      ]);
    } finally {
      setBotResponseLoading(false);
    }
  };
  const requestOTP = async () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: "", isLoading: true },
    ]);
    setBotResponseLoading(true);

    try {
      const response = await fetch(`${apiUrl}/apis/account/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber: mobileNumber,
        }),
      });

      const result = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => !msg.isLoading),
        {
          sender: "bot",
          text: result.success
            ? "OTP has been sent to your mobile number"
            : "Failed to send OTP. Please try again.",
          type: "text",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => !msg.isLoading),
        {
          sender: "bot",
          text: "Sorry, we encountered an error. Please try again.",
          type: "text",
        },
      ]);
    } finally {
      setBotResponseLoading(false);
    }
  };

  const verifyOTP = async (otp) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: otp },
      { sender: "bot", text: "", isLoading: true },
    ]);
    setBotResponseLoading(true);

    try {
      const response = await fetch(`${apiUrl}/apis/account/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber: mobileNumber,
          otp: otp,
        }),
      });

      const result = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => !msg.isLoading),
        {
          sender: "bot",
          text: result.success
            ? "OTP verified successfully! How can I help you today?"
            : "Invalid OTP. Please try again.",
          type: "text",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => !msg.isLoading),
        {
          sender: "bot",
          text: "Sorry, we encountered an error. Please try again.",
          type: "text",
        },
      ]);
    } finally {
      setBotResponseLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const currentConfig = FLOW_CONFIG.main_flow[currentState];

    if (
      currentState === "login_with_password" ||
      currentState === "login_with_otp"
    ) {
      const isUserValid = await verifyPhoneNumber(userInput);
      if (isUserValid) {
        if (currentState === "login_with_password") {
          setMessages((prev) => [
            ...prev.filter((msg) => !msg.isLoading),
            { sender: "bot", text: "Please enter your password", type: "text" },
          ]);
          setCurrentState("enter_password");
        } else {
          await requestOTP();
          setMessages((prev) => [
            ...prev.filter((msg) => !msg.isLoading),
            {
              sender: "bot",
              text: "Please enter the OTP sent to your mobile",
              type: "text",
            },
          ]);
          setCurrentState("enter_otp");
        }
      }
    } else if (currentState === "enter_password") {
      await handlePasswordLogin(userInput);
    } else if (currentState === "enter_otp") {
      await verifyOTP(userInput);
    } else if (currentConfig?.options) {
      const selectedOption = currentConfig.options.find(
        (opt) => opt.text === userInput
      );
      if (selectedOption) {
        handleStateTransition(selectedOption.next);
      }
    }

    setUserInput("");
  };

  const selectInputOption = (option) => {
    const currentConfig = FLOW_CONFIG.main_flow[currentState];
    const selectedOption = currentConfig?.options?.find(
      (opt) => opt.text === option
    );

    if (selectedOption) {
      setMessages((prev) => [...prev, { sender: "user", text: option }]);
      handleStateTransition(selectedOption.next);
    }
  };

  const LoadingIndicator = () => (
    <div className="flex space-x-2">
      <div
        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  );

  const styles = {
    mainContainer: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 1000,
    },
    container: {
      position: "fixed",
      bottom: isOpen ? "90px" : "-1000px",
      right: "20px",
      width: "400px",
      height: "650px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(255, 0, 255, 0.3)",
      overflow: "hidden",
      transition: "all 0.4s ease-in-out",
      fontFamily: "Arial, sans-serif",
      color: "#fff",
    },
    header: {
      background: "linear-gradient(135deg, #9f009f 0%, #ff0080 100%)",
      color: "#fff",
      padding: "15px",
      fontSize: "18px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    chatBody: {
      padding: "16px",
      overflowY: "auto",
      height: "calc(100% - 150px)",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    message: {
      padding: "13px",
      borderRadius: "25px",
      marginBottom: 2,
      // maxWidth: "70%",
      fontSize: 14,
      // border: "1px solid #ff0080",
    },
    botMessage: {
      backgroundColor: "#f4f5f6",
      color: "#08080a",
      alignSelf: "flex-start",
      transition: "all 0.7s ease-in-out",

      // maxWidth: "75%",
      // width: "90%",
    },
    userMessage: {
      transition: "all 0.4s ease-in-out",
      backgroundColor: "#ff0076",
      // border: "1px solid #ff0080",
      color: "#fff",
      alignSelf: "flex-end",
      // maxWidth: "70%",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      // gap: "10px",
      // width: "100%",
      // borderRadius: "12px",
    },
    InputButton: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      padding: "7px",
      borderRadius: "150px",
      margin: "0 5px",
      border: "1px solid #ff0080",
    },
    input: {
      flex: 1,
      // padding: "10px",
      fontSize: "16px",
      outline: "none",
      textDecoration: "none",
      border: "none",
      // backgroundColor: "",
      color: "#000",
    },
    sendButton: {
      padding: "10px 16px",
      backgroundColor: "#ff0080",
      color: "#fff",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
    },
    toggleButton: {
      background: "linear-gradient(135deg, #9f009f 0%, #ff0080 100%)",
      color: "#fff",
      fontSize: "24px",
      border: "none",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 4px 12px rgba(255, 0, 255, 0.3)",
      cursor: "pointer",
      transition: "transform 0.3s ease",
    },
  };
  const toggleChatbot = () => setIsOpen(!isOpen);
  return (
    <div style={styles.mainContainer}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <span>Chat with us</span>
          </div>
          <span style={styles.closeButton} onClick={toggleChatbot}>
            <AiOutlineClose size={20} />
          </span>
        </div>
        <div style={styles.chatBody}>
          {messages.map((message, index) => {
            const isBot = message.sender === "bot";
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  flexDirection: isBot ? "row" : "row-reverse",
                  gap: "10px",
                }}
              >
                {isBot && (
                  <img
                    src="/image.png"
                    alt="Bot"
                    style={{ height: 50, borderRadius: "50%" }}
                  />
                )}
                <div
                  style={{
                    maxWidth: "70%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isBot ? "flex-start" : "flex-end",
                  }}
                >
                  {isBot && (
                    <span
                      style={{
                        color: "#ff0080",
                        fontSize: 10,
                        marginLeft: "10px",
                      }}
                    >
                      NORO
                    </span>
                  )}
                  {message.isLoading ? (
                    <div style={{ ...styles.message, ...styles.botMessage }}>
                      <LoadingIndicator />
                    </div>
                  ) : Array.isArray(message.text) ? (
                    message.text.map((text, i) => (
                      <div
                        key={`${index}-${i}`}
                        style={{
                          ...styles.message,
                          ...(message?.type === "input"
                            ? { cursor: "pointer" }
                            : {}),
                          ...(isBot ? styles.botMessage : styles.userMessage),
                        }}
                        onClick={() =>
                          message?.type === "input"
                            ? selectInputOption(text)
                            : null
                        }
                      >
                        {text}
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        ...styles.message,
                        ...(message?.type === "input"
                          ? { cursor: "pointer" }
                          : {}),
                        ...(isBot ? styles.botMessage : styles.userMessage),
                      }}
                      onClick={() =>
                        message?.type === "input"
                          ? selectInputOption(message.text)
                          : null
                      }
                    >
                      {message.text}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <form style={styles.footer} onSubmit={handleSendMessage}>
          <div
            style={{
              height: 50,
              width: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PaperClip />
          </div>
          <div style={styles.InputButton}>
            <input
              type="text"
              placeholder="Type a message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              style={styles.input}
            />
            {/* <button style={styles.sendButton}> */}
            <SentSVGComponent />
            {/* </button> */}
          </div>
        </form>
      </div>
      <button style={styles.toggleButton} onClick={toggleChatbot}>
        <AiOutlineMessage />
      </button>
    </div>
  );
};

export default ChatBot;
