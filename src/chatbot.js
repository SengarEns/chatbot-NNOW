import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMessage } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa6";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState("phone");
  const [loginMethod, setLoginMethod] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(value);
    setShowLoginOptions(value.length === 10);
  };

  const handleLoginClick = (method) => {
    setLoginMethod(method);
    setStep(method);
    if (method === "otp") {
      triggerOpt();
    }
  };

  const triggerOpt = async () => {
    let data = JSON.stringify({
      mobileNumber: phoneNumber,
      otpTemplateId: "591ec0f0bde6ce00083cdb45",
    });

    let config = {
      method: "POST",
      headers: {
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        Connection: "keep-alive",
        "Content-Type": "application/json",
        Origin: "https://preprod.nnnow.com",
        Referer: "https://preprod.nnnow.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        accept: "application/json",
        bbversion: "v2",
        clientSessionId: "1744601724291",
        correlationId: "2015c0fc-65ab-480e-b5c6-7c88fd607819",
        module: "odin",
        "sec-ch-ua":
          '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
      },
      body: data,
    };

    try {
      const response = await fetch(
        "https://api-preprod.ailiens.com/d/apiV2/otp/generateOtp/v3/flash",
        config
      );
      const responseData = await response.json();
      console.log(JSON.stringify(responseData));
      if (responseData.data.status !== false) {
        // setIsLoggedIn(true);
        // setStep("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOtp = async () => {
    let data = JSON.stringify({
      otpDetails: {
        sessionID: "67938f50d592f10009b05b27",
        passPhrase: "881401",
      },
      mobileNumber: {
        countryCallingCode: "+91",
        mobileNumber: phoneNumber,
      },
      grant_type: "otp",
    });

    let config = {
      method: "POST",
      headers: {
        Host: "api-preprod.nnnow.com",
        correlationId: "19241A48-6062-4B53-9177-BBF705633E54",
        Accept: "*/*",
        appversion: "2.4.9",
        "Accept-Language": "en-IN;q=1.0, kn-IN;q=0.9",
        APIVersion: "0",
        module: "ios",
        platform: "ios",
        package: "com.nnnow.ios",
        "User-Agent":
          "NNNOW/2.4.9 (com.nnnow.ios; build:23; iOS 16.6.0) Alamofire/2.4.9",
        Connection: "keep-alive",
        BuildNo: "23",
        "X-Channel": "ios",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: data,
    };

    try {
      const response = await fetch(
        "https://api-preprod.nnnow.com/bb/users/end-user/v3/token",
        config
      );
      const responseData = await response.json();
      console.log(JSON.stringify(responseData));
      if (responseData.data.status !== false) {
        setIsLoggedIn(true);
        setStep("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyPassword = async () => {
    try {
      let data = JSON.stringify({
        grant_type: "password",
        username: phoneNumber,
        password: password,
        countryCallingCode: "+91",
      });

      let config = {
        method: "POST",
        headers: {
          "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
          Connection: "keep-alive",
          "Content-Type": "application/json",
          Origin: "https://preprod.nnnow.com",
          Referer: "https://preprod.nnnow.com/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          "X-Channel": "odin",
          accept: "application/json",
          bbversion: "v2",
          clientSessionId: "1745672127101",
          correlationId: "cf30578c-bddf-4236-bfb1-35f2146a5006",
          module: "odin",
          "sec-ch-ua":
            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
        },
        body: data,
      };

      const response = await fetch(
        "https://api-preprod.ailiens.com/login/users/end-user/v3/token",
        config
      );
      const responseData = await response.json();
      console.log(JSON.stringify(responseData));
      if (responseData.data) {
        setIsLoggedIn(true);
        setStep("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const styles = {
    mainContainer: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 1000,
    },
    container: {
      position: "fixed",
      bottom: isOpen ? "80px" : "-800px",
      right: "20px",
      width: "450px", // Default width for larger screens
      height: "700px", // Default height for larger screens
      backgroundColor: "#f8f9fa",
      borderRadius: "20px",
      boxShadow: "0 12px 28px rgba(0, 0, 0, 0.12)",
      overflow: "hidden",
      transition: "all 0.4s ease-in-out",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    },
    header: {
      background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
      color: "#fff",
      padding: "18px 24px",
      fontSize: "20px",
      fontWeight: "600",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    closeButton: {
      cursor: "pointer",
      padding: "8px",
      borderRadius: "50%",
      transition: "background-color 0.3s",
      ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    },
    body: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 24px",
      height: "calc(100% - 70px)",
      backgroundColor: "#ffffff",
    },
    welcomeText: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "12px",
    },
    subText: {
      fontSize: "16px",
      color: "#666",
      marginBottom: "32px",
      textAlign: "center",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      width: "100%",
      maxWidth: "280px",
      opacity: showLoginOptions ? 1 : 0,
      transform: showLoginOptions ? "translateY(0)" : "translateY(-10px)",
      transition: "all 0.3s ease",
    },
    button: {
      padding: "14px 24px",
      border: "none",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
    },
    primaryButton: {
      backgroundColor: "#4CAF50",
      color: "#fff",
      boxShadow: "0 4px 12px rgba(76, 175, 80, 0.2)",
    },
    secondaryButton: {
      backgroundColor: "#ffffff",
      color: "#4CAF50",
      border: "2px solid #4CAF50",
    },
    input: {
      width: "100%",
      maxWidth: "280px",
      padding: "16px",
      fontSize: "16px",
      border: "2px solid #e0e0e0",
      borderRadius: "12px",
      transition: "all 0.3s ease",
      outline: "none",
      backgroundColor: "#f8f9fa",
      textAlign: "left",
      marginBottom: "20px",
    },
    phoneContainer: {
      marginBottom: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    phoneDisplay: {
      fontSize: "16px",
      color: "#4CAF50",
      fontWeight: "600",
      padding: "8px 16px",
      backgroundColor: "#f0f9f0",
      borderRadius: "8px",
    },
    changePhoneNumber: {
      fontSize: "14px",
      color: "#00a6d2",
      borderBottom: "1px solid #00a6d2",
      cursor: "pointer",
    },
    toggleButton: {
      background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
      color: "#fff",
      fontSize: "24px",
      border: "none",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
      cursor: "pointer",
      transition: "transform 0.3s ease",
    },

    // Media Queries for Responsiveness
    "@media screen and (max-width: 1024px)": {
      container: {
        width: "90%", // Reduced width for tablet and below
        height: "500px", // Adjust height for smaller screens
      },
      buttonContainer: {
        maxWidth: "100%",
      },
      input: {
        maxWidth: "100%",
      },
      phoneContainer: {
        marginBottom: "16px", // Less space for smaller screens
      },
      toggleButton: {
        width: "50px",
        height: "50px",
        fontSize: "20px",
      },
    },

    "@media screen and (max-width: 768px)": {
      container: {
        width: "90%",
        height: "400px", // Adjusting for mobile screens
        bottom: isOpen ? "60px" : "-700px", // Adjust bottom positioning
      },
      header: {
        padding: "12px 16px", // Smaller padding for mobile screens
        fontSize: "18px",
      },
      welcomeText: {
        fontSize: "20px", // Smaller font size
      },
      subText: {
        fontSize: "14px", // Smaller font size
      },
      button: {
        fontSize: "14px", // Smaller button text
      },
      input: {
        padding: "12px",
        fontSize: "14px", // Smaller input text
      },
      toggleButton: {
        width: "45px",
        height: "45px",
        fontSize: "20px",
      },
    },

    "@media screen and (max-width: 480px)": {
      container: {
        width: "95%", // Adjust width for smaller mobile screens
        height: "350px", // Adjust height for very small screens
        bottom: isOpen ? "50px" : "-600px",
      },
      buttonContainer: {
        maxWidth: "100%",
      },
      phoneContainer: {
        marginBottom: "12px", // Even less space for smaller screens
      },
      toggleButton: {
        width: "40px",
        height: "40px",
        fontSize: "18px",
      },
    },
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span>Chat Support</span>
          <span style={styles.closeButton} onClick={toggleChatbot}>
            <AiOutlineClose size={20} />
          </span>
        </div>
        <div style={styles.body}>
          {step === "phone" && (
            <>
              <h2 style={styles.welcomeText}>Welcome! 👋</h2>
              <p style={styles.subText}>
                Please enter your phone number to get started
              </p>
              <input
                type="tel"
                placeholder="Enter 10 digit phone number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                style={styles.input}
              />
              <div style={styles.buttonContainer}>
                <button
                  style={{ ...styles.button, ...styles.primaryButton }}
                  onClick={() => handleLoginClick("otp")}
                >
                  Login with OTP
                </button>
                <button
                  style={{ ...styles.button, ...styles.secondaryButton }}
                  onClick={() => handleLoginClick("password")}
                >
                  Login with Password
                </button>
              </div>
            </>
          )}

          {step === "otp" && (
            <>
              <h2 style={styles.welcomeText}>Verify OTP</h2>
              <div style={styles.phoneContainer}>
                <div style={styles.phoneDisplay}>
                  <span>📱 {phoneNumber}</span>
                </div>
                <div
                  style={styles.changePhoneNumber}
                  onClick={() => {
                    setStep("phone");
                    setPhoneNumber("");
                    setShowLoginOptions(false);
                  }}
                >
                  Change
                </div>
              </div>
              <p style={styles.subText}>Enter the code we sent to your phone</p>
              <input
                type="text"
                placeholder="Enter verification code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={styles.input}
              />
              <div style={styles.buttonContainer}>
                <button
                  style={{ ...styles.button, ...styles.primaryButton }}
                  onClick={handleVerifyOtp}
                >
                  Verify & Continue
                </button>
              </div>
            </>
          )}

          {step === "password" && (
            <>
              <h2 style={styles.welcomeText}>Enter Password</h2>
              <div style={styles.phoneContainer}>
                <div style={styles.phoneDisplay}>
                  <span>📱 {phoneNumber}</span>
                </div>
                <div
                  style={styles.changePhoneNumber}
                  onClick={() => {
                    setStep("phone");
                    setPhoneNumber("");
                    setShowLoginOptions(false);
                  }}
                >
                  Change
                </div>
              </div>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <div style={styles.buttonContainer}>
                <button
                  style={{ ...styles.button, ...styles.primaryButton }}
                  onClick={handleVerifyPassword}
                >
                  Login
                </button>
              </div>
            </>
          )}

          {isLoggedIn && (
            <>
              <h2 style={styles.welcomeText}>Welcome Back! 🎉</h2>
              <p style={styles.subText}>
                You're now logged in and ready to chat with us.
              </p>
            </>
          )}
        </div>
      </div>

      <button style={styles.toggleButton} onClick={toggleChatbot}>
        {!isOpen ? <AiOutlineMessage /> : <FaAngleDown />}
      </button>
    </div>
  );
};

export default Chatbot;
