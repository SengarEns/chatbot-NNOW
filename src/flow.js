{  
    "main_flow": {
    "login":{
      "message" : "Welcome to NNNOW Chat! For a better experience, we request you to please login and relaunch chat.",
      "options":[
       { "text": "Login with Password", "next": "login_with_password" },
       { "text": "Login with OTP", "next": "login_with_otp" }
        ]
    },
    "login_with_password" : {
      "message": "Enter your phone number",
    },
     "login_with_otp" : {
      "message": "Enter your phone number",
    },
    "login_success":{
      "message": "Login successful",
    }
    "greeting": {
      "message": "Hi! How can I help you?",
      "options": [
        { "text": "Order Related", "next": "order_issues" },
        { "text": "Payment Issues", "next": "payment_issues" },
        { "text": "Policy & Returns", "next": "policy_related" }
      ]
    },
    "order_issues": {
      "message": "What issue are you facing with your order?",
      "options": [
        { "text": "Return", "next": "return_policy" },
        { "text": "Refund", "next": "refund_policy" }
      ]
    }
  }
}
