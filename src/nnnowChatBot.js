import React, { useEffect, useState, useRef } from "react";
import { AiOutlineClose, AiOutlineMessage } from "react-icons/ai";
import { PaperClip, SentSVGComponent } from "./svg";

// const apiUrl = "http://localhost:7100";
const apiUrl = "https://victor.fixall.ai";

const Return_reason_options = [
  {
    id: 111,
    reason: "Wrong item received",
  },
  {
    id: 112,
    reason: "Wrong size: Too large",
  },
  {
    id: 113,
    reason: "Wrong size: Too small",
  },
  {
    id: 114,
    reason: "Defective item",
  },
  {
    id: 115,
    reason: "Damaged in transit",
  },
  {
    id: 116,
    reason: "Late delivery",
  },
  {
    id: 117,
    reason: "Better price elsewhere",
  },
  {
    id: 118,
    reason: "Doesn’t fit well",
  },
  {
    id: 119,
    reason: "Material not suitable",
  },
  {
    id: 120,
    reason: "Other",
  },
  {
    id: 124,
    reason: "Expiry Product received",
  },
  {
    id: 194,
    reason: "marketplace_cancellation_return",
  },
  {
    id: 195,
    reason: "Different colour recieved",
  },
];

const endChat = {};

const NnnowChatBot = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [return_reasonId, setReturn_reasonId] = useState("");
  // const [itemsDetails, setItemsDetails
  const [raiseTicketBy, setRaiseTicketBy] = useState("");
  const [orderItemsDetails, setOrderItemsDetails] = useState([]);
  const [imageUploadUrl, setImageUploadUrl] = useState("");
  const [imageUploadFile, setImageUploadFile] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reasonForReturn, setReasonForReturn] = useState("");
  const [selectedKaptureItem, setSelectedKaptureItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [textAreaInput, setTextAreaInput] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState("");
  const [pincode, setPincode] = useState("");
  const [brandName, setBrandName] = useState("Arrow");

  const brandNameRef = useRef();

  useEffect(() => {
    if (brandName) {
      brandNameRef.current = brandName;
      // console.log("brandNamebrandName",brandNameRef.current)
    }
  }, [brandName]);

  console.log("brandNamebrandName", brandNameRef.current);

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLoading(false);
        getPinCodeByLatLng(latitude, longitude).then((data) => {
          if(data?.pincode){

          setPincode(data?.pincode);
          // console.log("1231@# 1231@#", data?.pincode);
          setMessages((prev) => [
            ...prev,
            {
              sender: "user",
              text: (
                <div
                  style={{
                    padding: "0px 12px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    gap: "5px",
                  }}
                >
                  <LocationSvg size="30px" /> Fetched successfully
                </div>
              ),
              type: "text",
            },
            {
              sender: "bot",
              text: (
                <div
                  style={{
                    background: "#FFFFFF",
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    // maxWidth: "350px",
                    width: "100%",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "14px",
                      // fontWeight: "600",
                      color: "#333",
                      marginBottom: "8px",
                    }}
                  >
                    Locate Store
                  </h2>

                  <select
                    onChange={(e) => setBrandName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      outline: "none",
                      fontSize: "12px",
                    }}
                  >
                    <option>Arrow</option>
                    <option>Calvin Klein</option>
                    <option>Flying Machine</option>
                    <option>Tommy Hilfiger</option>
                    <option>U.S. Polo Assn.</option>
                  </select>

                  {data?.pincode && (
                    <div
                      style={{
                        marginTop: "8px",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      Pincode: {data.pincode}
                    </div>
                  )}

                  <button
                    onClick={() =>
                      StoreByPincodeHandler(data.pincode, brandNameRef.current)
                    }
                    style={{
                      marginTop: "12px",
                      width: "100%",
                      backgroundColor: "#007BFF",
                      color: "#FFF",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "500",
                      transition: "background 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#0056b3")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#007BFF")
                    }
                  >
                    Find Now
                  </button>
                </div>
              ),
              type: "text",
            },
          ]);
        }

        }); // Added missing closing parenthesis for .then
      },
      (err) => {
        // Fixed error callback syntax
        setError(err.message);
        setLoading(false);
      }
    );
  };
  console.log("brandName", brandName);

  // console.log("textAreaInput", textAreaInput);
  const RaiseTicket = () => {};

  const Dropdown = () => {
    return (
      <select>
        <option value="">Select Order</option>
        <option value="">Select Order</option>
        <option value="">Select Order</option>
        {/* {orderDetails.map((order) => (
          <option key={order.orderId} value={order.orderId}>
            Order #{order.orderId}
          </option>
        ))} */}
      </select>
    );
  };
  // const [selectedOrder, setSelectedOrder] = useState("");
  console.log("raiseTicketBy => ", raiseTicketBy);
  const [userDetails, setUserDetails] = useState("");
  function getDecodedToken(token) {
    // const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No accessToken found in local storage.");
      return null;
    }

    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      setUserDetails(decodedPayload);
      return decodedPayload;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  console.log("userDetails", userDetails);

  const FLOW_CONFIG = {
    main_flow: {
      // ----------------------------------------------------------------
      something_went_wrong : {
        message:"something went wrong",
        options: [
          { text: "End the chat", next: "end_the_chat" },
          { text: "Talk to a live agent", next: "talk_to_a_live_agent" },
          { text: "Back to main menu", next: "greeting" },
        ],
      },

      end_of_chat: {
        options: [
          { text: "End the chat", next: "end_the_chat" },
          { text: "Talk to a live agent", next: "talk_to_a_live_agent" },
          { text: "Back to main menu", next: "greeting" },
        ],
      },
      end_the_chat: {
        message:
          "Thank you for getting in touch with us and we genuinely hope your experience with our service has been a positive one. Please share your feedback on the chat interaction with our chat assistant (scale - from 1 to 5)",
      },
      talk_to_a_live_agent: {
        message:
          "We will connect you with one of our live chat agents who can assist you further. Average waiting time getting connecting to a live agent is - minutes. (if query from 9 to 6) Your query will be fowarded to our live agent ( if beyond working hours). You will get a response within next - hours",
      },

      choose_image_options: {
        message:
          "Do you want to send your concern with a picture or without a picture?",
        options: [
          { text: "With Picture", next: "with_picture" },
          { text: "Without Picture", next: "without_picture" },
        ],
      },
      with_picture: {},
      without_picture: {},

      // ----------------------------------------------------------------
      
      login: {
        message:
          "Hi there! 👋 Welcome to NNNOW Chat Support. I am there to assist you with orders, tracking, returns, and more. Let us know how we can help!",
        options: [
          { text: "Login with Password", next: "login_with_password" },
          { text: "Login with OTP", next: "login_with_otp" },
        ],
        isInline: true,
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
          { text: "Order related issue", next: "order_issues" },
          { text: "Payment queries or issues", next: "payment_related" },
          { text: "Policy & conditions", next: "policy_related" },
          // { text: "Pin code serviceability", next: "pin_code_serviceability" },
          { text: "Offline store", next: "offline_store" },
          { text: "Customer feedback", next: "customer_feedback" },
          { text: "Ticket status", next: "ticket_status" },
          { text: "Issue not listed", next: "issue_not_listed" },
          // { text: "End of chat", next: "end_of_chat" },
        ],
      },
      order_issues: {},
      ticket_status: {},
      selected_order: {
        message: "What issue are you facing with your order?",
        options: [
          { text: "Return related", next: "return_related" },
          { text: "Refund related", next: "refund_related" },
          { text: "Order delivery related", next: "order_delivery_related" },
          { text: "Product related", next: "product_related" },
          {
            text: "Issue not listed",
            next: "issue_not_listed",
          },
        ],
      },

      // --------------- Order delivery related ----------------

      order_delivery_related: {
        options: [
          {
            text: "Where is my order ?",
            next: "where_is_my_order",
          },
          {
            text: "Order is delayed",
            next: "order_is_delayed",
          },
          {
            text: "Order delivery not successful",
            next: "order_delivery_not_successful",
          },
          {
            text: "Cancel my order",
            next: "cancel_my_order",
          },
          {
            text: "Order status not displayed/incorrect",
            next: "order_status_not_displayed",
          },
          {
            text: "Partial order recieved",
            next: "partial_order_recieved",
          },
          {
            text: "Delivery Instructions",
            next: "delivery_instructions",
          },
          {
            text: "Order cancelled without consent",
            next: "order_cancelled_without_consent",
          },
          {
            text: "Change delivery address",
            next: "change_delivery_address",
          },
          {
            text: "Change mobile number",
            next: "change_mobile_number",
          },
          {
            text: "Invoice/ Proof of delivery",
            next: "invoice_proof_of_delivery",
          },
        ],
      },

      // ----------- Change mobile number -------------------

      change_mobile_number: {},
      order_shipped_change_mobile_number: {
        message:
          "Unfortunately. once an order has been shipped. we are unable to change the mobile number",
      },
      order_not_shipped_change_mobile_number: {
        message:
          "You can provide the mobile number when placing the order. If you need to change the mobile number after order is placed, please raise a ticket with us.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_change_mobile_number",
          },
        ],
      },
      raise_a_ticket_change_mobile_number: {},

      // ----------- Invoice/ Proof of delivery -------------------
      invoice_proof_of_delivery: {},
      order_delivered_invoice_proof_of_delivery: {
        message: "Order invoice shared",
      },
      order_not_delivered_invoice_proof_of_delivery: {
        message:
          "Please note that the order invoice and proof of delivery can only be provided once your order has been successfully delivered",
      },

      where_is_my_order: {},

      // Order is delayed
      order_is_delayed: {},
      underdelayedOrder24Hours: {
        message:
          "We understand the inconvenience this may cause and want to assure you that your order will be delivered within the next 24 hours",
      },
      delayedOrderBeyond24Hours: {
        message:
          "If your order is delayed beyond 24 hours of the estimated delivery day. please raise a ticket. and we will raise the issue with our delivery partner to arrange for an early delivery.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_order_is_delayed",
          },
        ],
      },
      raise_a_ticket_order_is_delayed: {},
      // --------------------------------------------------------------
      order_delivery_not_successful: {
        message:
          "In case your order delivery is unsuccessful, please raise a ticket, and we will promptly reinitiate the delivery process for you.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_order_delivery_not_successful",
          },
        ],
      },
      raise_a_ticket_order_delivery_not_successful: {},
      order_status_not_displayed: {
        message:
          "If the status of your order is not displayed even after 24 hours of placing it, or incorrect status is displayed, please raise a ticket. We will investigate the issue and provide you with an update as soon as possible.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_order_status_not_displayed",
          },
        ],
      },
      cancel_my_order: {},

      productShipped: {
        message:
          "Once the rpoduct has been shipped, we are unable to cancel the delivery. Please reject the order when it arrives at your doorstep. We apologize for any inconvenience this may cause",
      },
      product_not_shipped: {
        message:
          "Please select the reason for cancellation from dropdown menu, and we will initiate the cancellation for you.",
      },
      partial_order_recieved: {
        message:
          "Different products in an order can sometimes be delivered separately due to various factors like stock availability or shipping methods. Rest assured, the remaining items will reach you soon.",
        options: [
          {
            text: "Accept the judgement",
            next: "accept_the_judgement_partial_order_recieved",
          },
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_partial_order_recieved",
          },
        ],
      },
      raise_a_ticket_partial_order_recieved: {},
      raise_a_ticket_order_status_not_displayed: {},

      // delivery_instructions

      delivery_instructions: {
        message:
          "We can provide specific instructions to our delivery partner such as delivery to a neighbor or security. Please raise a ticket and we will pass the information to our delivery partner.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_delivery_instructions",
          },
        ],
      },
      raise_a_ticket_delivery_instructions: {},

      order_cancelled_without_consent: {
        message:
          "Your order was canceled without consent due to unforeseen circumstances, such as item damage during transit or unavailability. Please place the order again.",
        options: [{ text: "end of chat", next: "end_of_chat" }],
      },

      // ===============================================

      change_delivery_address: {},
      order_not_shipped_change_delivery_address: {
        message:
          "You can provide the address when placing the order. If you need to change the address after order is placed, please raise a ticket with us.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_change_delivery_address",
          },
        ],
      },
      raise_a_ticket_change_delivery_address: {},
      // --------------- Product related ----------------
      product_related: {
        options: [
          { text: "Alter my product ", next: "alter_my_product" },
          { text: "Wrong product received ", next: "wrong_product_received" },
          {
            text: "Wrong size/color received ",
            next: "wrong_size_color_product_received",
          },
          { text: "Product quality issue", next: "product_quality_issue" },
          { text: "Packaging not good", next: "packaging_not_good" },
          { text: "Brand tags not attached", next: "brand_tags_not_attached" },
          // {
          //   text: "Gift with purchase not received",
          //   next: "gift_with_purchase_not_received",
          // },
        ],
      },
      alter_my_product: {
        message:
          "You can get your products ordered online altered at any offline store free of cost.Please visit the nearest store with a copy of your bill.",
      },
      wrong_product_received: {
        message:
          "Please raise a ticket and share images of the product received, including the packaging and tag. We will promptly initiate the return process for you.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_wrong_product_received",
          },
        ],
      },
      raise_a_ticket_wrong_product_received: {},

      wrong_size_color_product_received: {
        message:
          "We kindly request you to place a new order for the correct size/color and raise a ticket to initiate the return process for the existing product.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_wrong_size_color_product_received",
          },
        ],
      },
      raise_a_ticket_wrong_size_color_product_received: {},

      product_quality_issue: {
        message:
          "Please raise a ticket and share images of the product received, including the packaging and tag. We will promptly initiate the return process for you.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_product_quality_issue",
          },
        ],
      },
      raise_a_ticket_product_quality_issue: {},
      packaging_not_good: {
        message:
          "We apologize for the poor packaging of your product. Please rest assured that we will look into this to prevent it from happening in the future.",
      },
      brand_tags_not_attached: {
        message:
          "Please raise a ticket and share images of the product received, including the packaging and tag. We will promptly initiate the return process for you.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_brand_tags_not_attached",
          },
        ],
      },
      raise_a_ticket_brand_tags_not_attached: {},
      // push_the_raised_ticket_to_backend: {},
      pin_code_serviceability: {
        message: "Check the availability of delivery at a particular pincode",
      },
      offline_store: {},
      customer_feedback: {
        message: "",
        options: [
          { text: "Product feedback", next: "customer_feedback_order_issues" },
          {
            text: "Delivery feedback",
            next: "customer_feedback_delivery_feedback",
          },
          {
            text: "Delivery complaints",
            next: "customer_feedback_delivery_complaints",
          },
        ],
      },
      customer_feedback_order_issues: {},
      customer_feedback_delivery_feedback: {},
      customer_feedback_delivery_complaints: {
        options: [
          {
            text: "Delivery person was rude",
            next: "delivery_person_was_rude",
          },
          { text: "Asked for extra tip", next: "asked_for_extra_tip" },
          {
            text: "No change with delivery person",
            next: "no_change_with_delivery_person",
          },
          { text: "Other complaints", next: "other_complaints" },
        ],
      },
      delivery_person_was_rude: {
        message:
          "We sincerely apologize for the experience you had with the delivery agent. Please raise a ticket with details of the incident, and we will address the matter with our delivery partner.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_delivery_person_was_rude",
          },
        ],
      },
      raise_a_ticket_delivery_person_was_rude: {},
      asked_for_extra_tip: {
        message:
          "We sincerely apologize for the experience you had with the delivery agent. We will address this matter with our delivery partner.",
      },
      no_change_with_delivery_person: {
        message:
          "We sincerely apologize for the experience you had with the delivery agent. We will address this matter with our delivery partner.",
      },
      other_complaints: {
        message:
          "If an official NNNOW coupon is not applying within its validity period, please raise a ticket, and we'll address the issue promptly.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_other_complaints",
          },
        ],
      },
      raise_a_ticket_other_complaints: {},
      issue_not_listed: {
        // message: "Please type out your query",
        options: [
          { text: "Type out your query", next: "type_out_your_query" },
          { text: "Talk to a Live Agent", next: "talk_to_a_live_agent" },
          { text: "Request a callback", next: "request_a_callback" },
          { text: "Contact us", next: "contact_us" },
        ],
      },
      show_item_details: {},
      type_out_your_query: {
        message: "Please type out your query",
      },
      request_a_callback: {},
      contact_us: {
        message: (
          <div>
            <div>Please contact us with our contact number</div>
            <div>
              <b>Mob. :</b> +91-8147493085
            </div>
            <div>
              <b>Email :</b> care@nnnow.com.
            </div>
            <strong>We are 24X7 available</strong>
          </div>
        ),
      },
      return_related: {
        options: [
          { text: "Return my Product", next: "return_my_product" },
          { text: "Status of my pickup", next: "status_of_my_pickup" },
          {
            text: "Pickup status not displayed/incorrect",
            next: "pickup_status_not_displayed_incorrect",
          },
          { text: "Pickup not done", next: "pickup_not_done" },
          { text: "Pickup not successful", next: "pickup_not_successful" },
          { text: "Return rejected", next: "return_rejected" },
          { text: "Pickup instructions", next: "pickup_instructions" },
          { text: "Change my mobile number", next: "change_my_mobile_number" },
          {
            text: "Change my pickup address",
            next: "change_my_pickup_address",
          },
          { text: "Pincode not serviceable", next: "pincode_not_serviceable" },
        ],
      },

      // -mobile number return related----
      change_my_mobile_number: {},

      if_return_not_out_for_pickup_change_my_mobile_number: {},
      if_return_out_for_pickup_change_my_mobile_number: {
        message:
          "Unfortunately. once an order is out for pickup. we are unable to change the mobile number",
      },
      status_of_my_pickup: {},

      pickup_status_not_displayed_incorrect: {
        message:
          "In case your return is incorrect or does not match the actual issue status, please raise a ticket",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_pickup_status_not_displayed_incorrect",
          },
        ],
      },
      raise_a_ticket_pickup_status_not_displayed_incorrect: {},

      pickup_not_done: {
        message:
          "Your return pickup was expected to be completed by today but due to unforeseen circumstances,it will be picked up by tomorrow. We applogize for the delay.If you have any further queries,please raise a ticket",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_pickup_not_done",
          },
        ],
      },
      raise_a_ticket_pickup_not_done:{},
      return_my_product: {},
      reason_for_return: {},
      pickup_not_successful: {
        message:
          "To resolve this. please raise a ticket. and we will reinitaite return pickup for you.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_pickup_not_successful",
          },
        ],
      },
      raise_a_ticket_pickup_not_successful:{},
      return_rejected: {
        message:
          "Our company guidelines require that returned products be in new, unused condition and returned in orignal packaging along with tags. If you believe there has been an error in this judgment, please raise a ticket with us",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_return_rejected",
          },
          {
            text: "Accept the Judgement",
            next: "",
          },
        ],
      },
      raise_a_ticket_return_rejected: {},
      change_my_pickup_address: {
        options: [
          {
            text: "If return not out for pickup",
            next: "change_my_pickup_address_If_return_not_out_for_pickup",
          },
          {
            text: "If return out for pickup",
            next: "change_my_pickup_address_If_return_out_for_pickup",
          },
        ],
      },
      change_my_pickup_address_If_return_not_out_for_pickup: {
        message:
          "You can provide the return address when placing the return request. If you need to change the return address after the return request has been made, please raise a ticket with us.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_change_my_pickup_address_If_return_not_out_for_pickup",
          },
        ],
      },
      raise_a_ticket_change_my_pickup_address_If_return_not_out_for_pickup: {},
      change_my_pickup_address_If_return_out_for_pickup: {
        message:
          "You can provide the return address when placing the return request. Since return is out for pickup, the address cannot be changed now.",
      },
      pincode_not_serviceable: {
        message:
          "If the return for your items cannot be processed due to pincode inserviceability, please raise a ticket, and we will initiate the return process for your order.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_pincode_not_serviceable",
          },
        ],
      },
      raise_a_ticket_pincode_not_serviceable:{},
      refund_related: {
        options: [
          { text: "Status of my Refund", next: "status_of_my_refund" },
          { text: "Refund delayed", next: "refund_delayed" },
          { text: "Refund not initiated", next: "refund_not_initiated" },
          {
            text: "Refund not reflecting in bank account",
            next: "refund_not_reflecting_in_bank_account",
          },
          {
            text: "Full amount not refunded",
            next: "full_amount_not_refunded",
          },
          // { text: "Refund reference number", next: "refund_reference_number" },
        ],
      },
      status_of_my_refund: {
        message:
          "Currently. your refund is under — stage. It typically takes 5 to 7 working days for the refund to reflect in your bank account.",
      },
      refund_delayed: {},
      refund_not_initiated: {},
      refund_not_reflecting_in_bank_account: {
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_refund_not_reflecting_in_bank_account",
          },
        ],
      },
      full_amount_not_refunded: {
        message:
          "If the product was part of a promotional offer or had delivery charges included, the refund amount could be less than what was originally paid. If the promotion is no longer valid for the whole order, the total price refunded for the order is changed to reflect this.",
        options: [
          {
            text: "Accept the judgement",
            next: "full_amount_not_refunded_accept_the_judgement",
          },
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_full_amount_not_refunded",
          },
        ],
      },
      raise_a_ticket_refund_not_reflecting_in_bank_account: {},
      raise_a_ticket_full_amount_not_refunded: {},

      beyond7DaysFromRefund: {
        message:
          "We for the inconvenience, please raise a ticket and we will 100k into it",
        options: [
          { text: "Raise a ticket", next: "raise_a_ticket_refund_delayed" },
        ],
      },
      raise_a_ticket_refund_delayed: {},
      under7DaysFromRefund: {
        message:
          "Currently. your refund is under — stage. It typically takes 5 to 7 working days for the refund to reflect in your bank account.",
      },
      beyond24HoursFromRefund: {
        message:
          "If your refund hasn't been generated even after 24 hours of processing the return, please raise a ticket and we will initiate refund process for you",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_refund_not_initiated",
          },
        ],
      },
      raise_a_ticket_refund_not_initiated: {},
      under24HoursFromRefund: {
        message:
          "Refunds typically take up to 24 hours to initiated after your return is processed.",
      },

      // --------------- Payment related

      payment_related: {
        options: [
          {
            text: "Payment gateway not responding",
            next: "payment_gateway_not_responding",
          },
          {
            text: "Money deducted, order not confirmed",
            next: "money_deducted_order_not_confirmed",
          },
          {
            text: "Switching from COD to prepaid",
            next: "switching_from_COD_to_prepaid",
          },
          {
            text: "Particular payment method not accepted",
            next: "particular_payment_method_not_accepted",
          },
          {
            text: "Payment options & limit for cash on delivery orders",
            next: "payment_options_limit_for_cash_on_delivery_orders",
          },
          {
            text: "coupon not applicable",
            next: "coupon_not_applicable",
          },
        ],
      },
      payment_gateway_not_responding: {
        message:
          "If the payment gateway is not responding, it could be due to a server issue. Please try again after some time.",
      },
      money_deducted_order_not_confirmed: {
        message:
          "Please place a new order, and rest assured that the original amount will be refunded within 5 to 7 working days.If your refund hasn't been processed within this time frame, please raise a ticket with us.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_money_deducted_order_not_confirmed",
          },
        ],
      },
      raise_a_ticket_money_deducted_order_not_confirmed: {},
      // switching_from_COD_to_prepaid: { },
      switching_from_COD_to_prepaid: {
        message:
          "If you wish to switch from postpaid to prepaid delivery. please raise a ticket. and we will initiate the payment process for you.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_switching_from_COD_to_prepaid",
          },
        ],
      },
      raise_a_ticket_switching_from_COD_to_prepaid: {},
      particular_payment_method_not_accepted: {
        message:
          "We accept all regulated payment methods, including UPI, cards, internet banking, and wallets. If a particular payment method isn't working. it could be due to a server issue. Please try again after some time.",
      },
      payment_options_limit_for_cash_on_delivery_orders: {
        message:
          "For Cash on Delivery (COD) orders, we accept payments via UPI and cash only. Please note that an additional charge of is applied to Cash on Delivery (COD) orders. Please note that a limit of ₹10,000 is placed on Cash on Delive (COD) orders",
      },
      coupon_not_applicable: {
        message:
          "If an official NNNOW coupon is not applying within its validity period, please raise a ticket, and we'll address the issue promptly.",
        options: [
          {
            text: "Raise a ticket",
            next: "raise_a_ticket_coupon_not_applicable",
          },
        ],
      },
      raise_a_ticket_coupon_not_applicable: {},
      feedback: {},
      // --------------- Policy related ----------------
      policy_related: {
        options: [
          { text: "Return policy", next: "return_policy" },
          { text: "Refund Policy", next: "refund_policy" },
          { text: "Cancellation policy", next: "cancellation_policy" },
          { text: "Exchange", next: "exchange" },
          { text: "Promotions T & C", next: "promotionsT_C" },
          { text: "Product and Collection", next: "product_and_collection" },
        ],
      },
      // Return Policy -------------------------------------------------
      return_policy: {
        options: [
          {
            text: "Time period for return initiation",
            next: "time_period_for_return_initiation",
          },
          {
            text: "Categories not eligible for return",
            next: "categories_not_eligible_for_return",
          },
          {
            text: "Conditions for return initiation",
            next: "conditions_for_return_initiation",
          },
          {
            text: "Return a product with gift",
            next: "return_a_product_with_gift",
          },
          {
            text: "Return few of multiple products",
            next: "return_few_of_multiple_products",
          },
        ],
      },
      time_period_for_return_initiation: {
        message:
          "The return window for our products is 15 days from the date of delivery. If you need to return an item, please make sure to initiate the return within this timeframe..",
      },
      categories_not_eligible_for_return: {
        message:
          "Returns cannot be initiated for certain categories, including innerwear and items purchased on specific promotional discounts. These exclusions are in place due to hygiene and promotional policies.",
      },
      conditions_for_return_initiation: {
        message:
          "For a product to be eligible for return, it must be in new, unused condition and returned in its original packaging with all tags intact. This ensures that the item is in a resellable state.",
      },
      return_a_product_with_gift: {
        message:
          "If you are returning a product that came with a gift, please note that the gift must also be returned along with the product. If the gift is not returned, the value of the gift may be deducted from your refund amount.",
      },
      return_few_of_multiple_products: {
        message:
          "If you'd like to return only a few items from your order, please select the specific items on the return processing page. A separate return ID will be generated for each item, and these can be processed individually.",
      },
      // Refund Policy -------------------------------------------------
      refund_policy: {
        options: [
          { text: "Amount of refund", next: "amount_of_refund" },
          {
            text: "Time period for refund completion",
            next: "time_period_for_refund_completion",
          },
          {
            text: "Refund in cash on delivery orders",
            next: "refund_in_cash_on_delivery_orders",
          },
          {
            text: "Refund in prepaid orders",
            next: "refund_in_prepaid_orders",
          },
          {
            text: "Refund processed before or after pickup",
            next: "refund_processed_before_or_after_pickup",
          },
          { text: "Refund medium change", next: "refund_medium_change" },
        ],
      },
      amount_of_refund: {
        message:
          "If the product was part of a promotional offer or had delivery charges included, return amount could be less than what was originally paid. If the promotion is no longer valid for whole order. the total price refunded for order is changed to reflect this.",
      },
      time_period_for_refund_completion: {
        message:
          "Refunds are typically completed within 5 to 7 working days after they have been initiated.",
      },
      refund_in_cash_on_delivery_orders: {
        message:
          "For cash-on-delivery (COD) orders, the refund is processed via NEFT to the bank account provided during the return initiation. Refund is not processed through any other mode.",
      },
      refund_in_prepaid_orders: {
        message:
          "For prepaid orders, the refund is processed back to the original payment method. Refund medium of payment can be changed during return initiation rocess.",
      },
      refund_processed_before_or_after_pickup: {
        message:
          "Whether the refund is processed before or after pickup depends on seller. In most cases. refund is processed after the return pickup is completed.",
      },
      refund_medium_change: {
        message:
          "The refund medium can be changed before the refund is initiated during the refund initiation process.",
      },

      // Cancellation Policy -------------------------------------------------------
      cancellation_policy: {
        message:
          "Orders can be canceled before they are shipped. After shipping, you may refuse to accept the order when it arrives at your doorstep.",
      },
      // Exchange -------------------------------------------------------
      exchange: {
        message:
          "We do not have an exchange policy. You can return your current order within 15 days and place a new order again.",
      },
      // Promotions T & C -------------------------------------------------------
      promotionsT_C: {
        message:
          "Promotions T and C can be listed here or link can be provided to Promotions T and C page.",
      },
      // Product and Collection -------------------------------------------------------
      product_and_collection: {
        message:
          "Link to a page with new product collection can be provided here",
      },
    },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  const [currentState, setCurrentState] = useState("login");
  const [orders, setOrders] = useState("");
  // const [ordersList, setOrderDetails] = useState("");
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

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemDetails, setSelectedItemDetails] = useState("");

  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [botResponseLoading, setBotResponseLoading] = useState(false);
  // const apiUrl = "http://localhost:7100";
  const apiUrl = "https://victor.fixall.ai";

  console.log("orderDetails", orderDetails);
  console.log("selectedItemDetails", selectedItemDetails);

  // const handleStateTransition = (nextState) => {
  //   const stateConfig = FLOW_CONFIG.main_flow[nextState];
  //   if (!stateConfig) return;

  //   setCurrentState(nextState);

  //   const newMessages = [
  //     {
  //       sender: "bot",
  //       text: stateConfig.message,
  //     },
  //   ];

  //   if (stateConfig.options) {
  //     newMessages.push({
  //       sender: "bot",
  //       text: stateConfig.options.map((opt) => opt.text),
  //       type: "input",
  //     });
  //   }

  //   setMessages((prev) => [...prev, ...newMessages]);
  // };

  const [imageFeedbackFile, setImageFeedbackFile] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (currentState === "feedback") {
        setImageFeedbackFile(file);
      } else {
        setImageUploadFile(file);
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (currentState !== "feedback") {
          setImageUploadUrl(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onImageSubmitHandler = () => {
    if (imageUploadUrl) {
      console.log("Image submitted:", imageUploadUrl);
      // Add API call or further processing here
    }
  };

  const RaiseTicketByFinder = (text) => {
    return text
      .replace(/^raise_a_ticket_/, "") // Remove "raise_a_ticket_" prefix
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  useEffect(() => {
    if (imageUploadUrl) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          text: (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                position: "relative",
              }}
            >
              <img
                src={imageUploadUrl}
                alt="Uploaded"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          ),
        },
        {
          sender: "bot",
          text: "Image selected. Now enter your concern in the text box.",
        },
      ]);
      setCurrentState("push_the_raised_ticket_to_backend");
    }
  }, [imageUploadUrl]);

  const handleStateTransition = (nextState) => {
    const stateConfig = FLOW_CONFIG.main_flow[nextState];
    if (!stateConfig) return;

    setCurrentState(nextState);

    console.log(
      "nextState12",
      stateConfig.message ? stateConfig.message : "NULL"
    );

    let newMessages = [];

    stateConfig.message &&
      newMessages.push({
        sender: "bot",
        text: stateConfig.message,
      });

    console.log("nextState", nextState);
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
      // { sender: "bot", text: "", isLoading: true },
    ]);

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
      // { sender: "bot", text: "", isLoading: true },
    ]);

    try {
      const response = await fetch(`${apiUrl}/apis/account/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: mobileNumber, password }),
      });

      const result = await response.json();

      if (result.data) {
        setMessages((prev) => [
          ...prev,
          ...prev.filter((msg) => (msg.isLoading = false)),
        ]);
        handleStateTransition("greeting");
        setToken(result.data.access_token);
        getDecodedToken(result.data.access_token);
        setBotResponseLoading(false);
      } else {
        setMessages((prev) => [
          ...prev.filter((msg) => !msg.isLoading),
          {
            sender: "bot",
            text: "Invalid password. Please try again.",
            type: "text",
          },
        ]);
        setBotResponseLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setBotResponseLoading(false);

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
// request otp
const requestOTP = async () => {
  setMessages((prevMessages) => [
    ...prevMessages,
    { sender: "bot", text: "Requesting OTP...", isLoading: true },
  ]);
  setBotResponseLoading(true);

  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-GB,en-US;q=0.9,en;q=0.8");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Origin", "https://preprod.nnnow.com");
    myHeaders.append("Referer", "https://preprod.nnnow.com/");
    myHeaders.append("Sec-Fetch-Dest", "empty");
    myHeaders.append("Sec-Fetch-Mode", "cors");
    myHeaders.append("Sec-Fetch-Site", "cross-site");
    myHeaders.append("accept", "application/json");
    myHeaders.append("bbversion", "v2");
    myHeaders.append("clientSessionId", "1744601724291");
    myHeaders.append("correlationId", "2015c0fc-65ab-480e-b5c6-7c88fd607819");
    myHeaders.append("module", "odin");
    myHeaders.append("sec-ch-ua", "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", "\"macOS\"");

    const body = JSON.stringify({
      mobileNumber: mobileNumber, // make sure this variable is defined
      otpTemplateId: "591ec0f0bde6ce00083cdb45",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: body,
      redirect: "follow",
    };

    const response = await fetch(
      "https://api-preprod.ailiens.com/d/apiV2/otp/generateOtp/v3/flash",
      requestOptions
    );

    const result = await response.json();

    setMessages((prevMessages) => [
      ...prevMessages.filter((msg) => !msg.isLoading),
      {
        sender: "bot",
        text: result?.success
          ? "✅ OTP has been sent to your mobile number."
          : "❌ Failed to send OTP. Please try again.",
        type: "text",
      },
    ]);
  } catch (error) {
    console.error("Error:", error);
    setMessages((prevMessages) => [
      ...prevMessages.filter((msg) => !msg.isLoading),
      {
        sender: "bot",
        text: "😞 Sorry, we encountered an error. Please try again.",
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
      // { sender: "bot", text: "", isLoading: true },
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

  const handleTextAreaChange = (e) => {
    const { name, value } = e.target;
    setTextAreaInput((prev) => ({
      ...prev,
      [name]: value, // Update only the specific field
    }));
  };
  // console.log("textAreaInputtextAreaInputtextAreaInput =>>", textAreaInput);

  const feedBackSubmitHandler = async () =>
    // currentState,
    // userDetails,
    // mobileNumber,
    // handleImageChange
    {
      // console.log("textAreaInputtextAreaInputtextAreaInput", textAreaInput);
      try {
        const formData = new FormData();
        formData.append("description", textAreaInput.feedback);
        formData.append("title", currentState || "undefined");
        formData.append("customer_name", userDetails.firstName || "");
        formData.append("phone", mobileNumber || "");
        formData.append("email_id", userDetails.email_id || "");
        if (imageFeedbackFile) {
          formData.append("attachment", imageFeedbackFile); // Removed unnecessary path parameter
        }
        const response = await fetch(
          "https://victor.fixall.ai/apis/feedback/create",
          {
            method: "POST",
            body: formData,
          }
        );

        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }

        const data = await response.json();
        setTextAreaInput("");
        setImageFeedbackFile();

        return data;
      } catch (error) {
        console.error("Error submitting feedback:", error);
        // throw error;
        setTextAreaInput("");
        setImageFeedbackFile();
      }
    };

  useEffect(() => {
    if (
      (currentState === "switching_from_COD_to_prepaid" && token) ||
      (currentState === "customer_feedback_order_issues" && token)
    ) {
      FetchAllOrderDetails(
        token,
        setOrderDetails,
        setIsOrderLoading,
        setMessages,
        setSelectedOrder,
        handleStateTransition,
        styles,
        currentState,setBotResponseLoading,
        { NextHandler: "message_switching_from_COD_to_prepaid" }
      );
    } else if (currentState === "order_issues" && token) {
      FetchAllOrderDetails(
        token,
        setOrderDetails,
        setIsOrderLoading,
        setMessages,
        setSelectedOrder,
        handleStateTransition,
        styles,
        currentState,setBotResponseLoading,
        { NextHandler: "show_item_details" }
      );
    } else if (currentState === "show_item_details") {
      const NextHandler = "selected_order";
      setBotResponseLoading(true)
      fetchSingleOrderDetails(
        token,
        setMessages,
        handleStateTransition,
        styles,
        selectedOrder,
        setOrderItemsDetails,
        setSelectedItem,setBotResponseLoading
      ).then((data) => {
        console.log("datadatadatadata",data)
        if (data?.status) {
          setBotResponseLoading(false)
          setOrderItemsDetails(data);

          if (data.data && data.data?.consignments[0]?.items?.length > 0) {
            const itemsToShow = data.data.consignments[0].items.map((item) => ({
              id: item.itemId,
              image: item?.product?.image,
              brand: item?.product?.brand,
              addressId: data.data?.consignments[0]?.addressDetails?.addressId,
              price: `₹${item?.product?.mrp}`,
            }));
            setMessages((prev) => [
              ...prev,
              { sender: "bot", text: "Select a product:" },
              {
                sender: "bot",
                text: itemsToShow.map((order) => (
                  <div
                    key={order.id}
                    style={styles.orderCard}
                    onClick={() => {
                      setSelectedItemDetails(order);

                      setSelectedItem(order.id);
                      setMessages((prev) => [
                        ...prev,
                        {
                          sender: "user",
                          showAs: "object",
                          text: (
                            <div style={styles.orderCard}>
                              {/* Order Image */}
                              <img
                                src={order?.image}
                                alt="Order"
                                style={styles.orderImage}
                              />

                              {/* Order Details */}
                              <div style={styles.orderDetails}>
                                <span style={styles.orderAmount}>
                                  {order?.itemStatus?.statusToCustomer}
                                </span>
                                <span style={styles.orderAmount}>
                                  {order?.price}
                                </span>
                                <span style={styles.orderId}>
                                  ID: {order?.id}
                                </span>
                              </div>
                            </div>
                          ),
                        },
                      ]);
                      handleStateTransition(NextHandler);
                    }}
                  >
                    <img
                      src={order?.image}
                      alt="Order"
                      style={styles.orderImage}
                    />

                    {/* Order Details */}
                    <div style={styles.orderDetails}>
                      <span style={styles.orderAmount}>{order?.price}</span>
                      <span style={styles.orderId}>ID: {order?.id}</span>
                    </div>
                  </div>
                )),
                type: "input",
                showAs: "object",
              },
            ]);
          }
        }
        setBotResponseLoading(false)

      });
    } else if (currentState === "return_my_product" && token) {

      const NextHandler = "reason_for_return";
      handleStateTransition(NextHandler)
    //   fetchSingleOrderDetails(
    //     token,
    //     setMessages,
    //     handleStateTransition,
    //     styles,
    //     selectedOrder,
    //     setOrderItemsDetails,
    //     setSelectedItem
    //   ).then((data) => {
    //     if (data?.status) {
    //       setOrderItemsDetails(data);

    //       if (data.data && data.data?.consignments[0]?.items?.length > 0) {
    //         const itemsToShow = data.data.consignments[0].items.map((item) => ({
    //           id: item.itemId,
    //           image: item?.product?.image,
    //           brand: item?.product?.brand,
    //           addressId: data.data?.consignments[0]?.addressDetails?.addressId,
    //           price: `₹${item?.product?.mrp}`,
    //         }));
    //         setMessages((prev) => [
    //           ...prev,
    //           { sender: "bot", text: "Select a product:" },
    //           {
    //             sender: "bot",
    //             text: itemsToShow.map((order) => (
    //               <div
    //                 key={order.id}
    //                 style={styles.orderCard}
    //                 onClick={() => {
    //                   setSelectedItemDetails(order);

    //                   setSelectedItem(order.id);
    //                   // Fix: Use NextHandler directly since it's a string
    //                   if (NextHandler === "feedback") {
    //                     setCurrentState(NextHandler);
    //                   } else {
    //                     handleStateTransition(NextHandler);
    //                   }
    //                   console.log("NextHandler", NextHandler);
    //                   setMessages((prev) => [
    //                     ...prev,
    //                     {
    //                       sender: "user",
    //                       showAs: "object",
    //                       text: (
    //                         <div style={styles.orderCard}>
    //                           {/* Order Image */}
    //                           <img
    //                             src={order?.image}
    //                             alt="Order"
    //                             style={styles.orderImage}
    //                           />

    //                           {/* Order Details */}
    //                           <div style={styles.orderDetails}>
    //                             <span style={styles.orderAmount}>
    //                               {order?.price}
    //                             </span>
    //                             <span style={styles.orderId}>
    //                               ID: {order?.id}
    //                             </span>
    //                           </div>
    //                         </div>
    //                       ),
    //                     },
    //                   ]);
    //                 }}
    //               >
    //                 <img
    //                   src={order?.image}
    //                   alt="Order"
    //                   style={styles.orderImage}
    //                 />

    //                 {/* Order Details */}
    //                 <div style={styles.orderDetails}>
    //                   <span style={styles.orderAmount}>{order?.price}</span>
    //                   <span style={styles.orderId}>ID: {order?.id}</span>
    //                 </div>
    //               </div>
    //             )),
    //             type: "input",
    //             showAs: "object",
    //           },
    //         ]);
    //       }
    //     }
      // });
    } else if (currentState === "reason_for_return") {
      setBotResponseLoading(true)
      ReasonReturnList(token, selectedOrder?.orderId, selectedItem).then(
        (data) =>{
          setBotResponseLoading(false)
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "Please select a reason for returning your product",
              type: "text",
            },
            {
              sender: "bot",
              showAs: "object",
              text: (
                <select
                  style={styles.selectOptions}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const selectedReason = data?.returnReasons.find(
                      (item) => Number(item.id) === Number(selectedId)
                    );
                    console.log("selectedReason", selectedId, selectedReason);
                    setReturn_reasonId(selectedId);
                    setReasonForReturn(selectedReason);
                  }}
                >
                  <option value="">Select a reason</option>
                  {data?.returnReasons?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.reason}
                    </option>
                  ))}
                </select>
              ),
            },
          ])
        }
      );
    } else if (
      currentState === "raise_a_ticket_money_deducted_order_not_confirmed" ||
      currentState === "raise_a_ticket_switching_from_COD_to_prepaid" ||
      currentState === "raise_a_ticket_coupon_not_applicable" ||
      currentState === "raise_a_ticket_delivery_person_was_rude" ||
      currentState === "raise_a_ticket_other_complaints" ||
      currentState === "raise_a_ticket_return_rejected" ||
      currentState === "raise_a_ticket_pickup_not_successful" ||
      currentState === "raise_a_ticket_pickup_not_done" ||
      currentState === "raise_a_ticket_pickup_status_not_displayed_incorrect" ||
      currentState === "raise_a_ticket_full_amount_not_refunded" ||
      currentState === "raise_a_ticket_refund_not_reflecting_in_bank_account" ||
      currentState === "raise_a_ticket_refund_not_initiated" ||
      currentState === "raise_a_ticket_refund_delayed" ||
      currentState === "raise_a_ticket_order_status_not_displayed" ||
      currentState === "raise_a_ticket_order_is_delayed" ||
      currentState === "raise_a_ticket_order_delivery_not_successful" ||
      currentState === "raise_a_ticket_wrong_product_received" ||
      currentState === "raise_a_ticket_partial_order_recieved" ||
      currentState === "raise_a_ticket_delivery_instructions" ||
      currentState === "raise_a_ticket_product_quality_issue" ||
      currentState === "raise_a_ticket_wrong_size_color_product_received" ||
      currentState === "raise_a_ticket_brand_tags_not_attached" ||
      currentState === "raise_a_ticket_change_delivery_address" ||
      currentState === "raise_a_ticket_change_mobile_number" ||
      currentState === "raise_a_ticket_pincode_not_serviceable" ||
      currentState ===
        "raise_a_ticket_change_my_pickup_address_If_return_not_out_for_pickup"
    ) {
      // console.log("raise_a_ticket_switching_from_COD_to_prepaid");
      setRaiseTicketBy(RaiseTicketByFinder(currentState));
      handleStateTransition("choose_image_options");
    } else if (currentState === "with_picture") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: <div>choose an image</div>,
          type: "imageUpload",
        },
        {
          sender: "bot",
          text: (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                borderRadius: "8px",
              }}
            >
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  borderRadius: "8px",
                  width: "100%",
                  cursor: "pointer",
                }}
              />
            </div>
          ),
        },
      ]);
    } else if (currentState === "without_picture") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "enter your concern in the text box.",
          type: "text",
        },
      ]);
      setCurrentState("push_the_raised_ticket_to_backend");
    } else if (currentState === "feedback") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: (
            <div>
              <p>
                Please share your feedback about this product. Your opinion
                helps us improve our services.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <textarea
                  rows={5}
                  name="feedback" // Unique name for this input
                  onChange={handleTextAreaChange}
                  value={textAreaInput.feedback}
                  style={{
                    border: "1px solid #ff0057",
                    padding: "7px",
                    borderRadius: "10px",
                    height: "auto", // Ensures height adjusts to rows
                    resize: "vertical", // Optional: allows vertical resizing, prevents overriding rows
                  }}
                />
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  style={{
                    border: "1px solid #ccc",
                    padding: "4px 2px",
                    paddingLeft: 7,
                    borderRadius: "8px",
                    width: "100%",
                    cursor: "pointer",
                  }}
                />
                <button
                  style={styles.submitbutton}
                  onClick={feedBackSubmitHandler}
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          ),
          type: "text",
        },
      ]);
    } else if (currentState === "customer_feedback_delivery_feedback") {
      const NextHandler = "feedback"; // This is a string
      fetchSingleOrderDetails(
        token,
        setMessages,
        handleStateTransition,
        styles,
        selectedOrder,
        setOrderItemsDetails,
        setSelectedItem,
        setCurrentState,setBotResponseLoading 
      ).then((data) => {
        setBotResponseLoading(false)

        if (data.status) {
          setOrderItemsDetails(data);

          if (data.data && data.data?.consignments[0]?.items?.length > 0) {
            const itemsToShow = data.data.consignments[0].items.map((item) => ({
              id: item.itemId,
              image: item?.product?.image,
              brand: item?.product?.brand,
              price: `₹${item?.product?.mrp}`,
            }));

            setMessages((prev) => [
              ...prev,
              { sender: "bot", text: "Select a product:" },
              {
                sender: "bot",
                text: itemsToShow.map((order) => (
                  <div
                    key={order.id}
                    style={styles.orderCard}
                    onClick={() => {
                      setSelectedItem(order.id);
                      // Fix: Use NextHandler directly since it's a string
                      if (NextHandler === "feedback") {
                        setCurrentState(NextHandler);
                      } else {
                        handleStateTransition(NextHandler);
                      }
                      console.log("NextHandler", NextHandler);
                      setMessages((prev) => [
                        ...prev,
                        {
                          sender: "user",
                          showAs: "object",
                          text: (
                            <div style={styles.orderCard}>
                              {/* Order Image */}
                              <img
                                src={order?.image}
                                alt="Order"
                                style={styles.orderImage}
                              />

                              {/* Order Details */}
                              <div style={styles.orderDetails}>
                                <span style={styles.orderAmount}>
                                  {order?.price}
                                </span>
                                <span style={styles.orderId}>
                                  ID: {order?.id}
                                </span>
                              </div>
                            </div>
                          ),
                        },
                      ]);
                    }}
                  >
                    <img
                      src={order?.image}
                      alt="Order"
                      style={styles.orderImage}
                    />

                    {/* Order Details */}
                    <div style={styles.orderDetails}>
                      <span style={styles.orderAmount}>{order?.price}</span>
                      <span style={styles.orderId}>ID: {order?.id}</span>
                    </div>
                  </div>
                )),
                type: "input",
                showAs: "object",
              },
            ]);
          }
        }
      });
    } else if (currentState === "offline_store") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: (
            <div>
              <button
                onClick={getLocation}
                disabled={loading}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: loading ? "not-allowed" : "pointer",
                  // backgroundColor: loading ? "#ccc" : "#007bff",
                  // color: "white",
                  border: "none",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  gap: "5px",
                }}
              >
                <LocationSvg size="30px" /> Tab for fetch current location
              </button>
            </div>
          ),
          type: "text",
        },
      ]);
    } else if (currentState === "request_a_callback") {
      RequestCall(setMessages, userDetails, mobileNumber).then((data) => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Request for a callback has been initiated. An agent will call you shortly.",
          },
        ]);
      })
    } else if (currentState === "ticket_status") {
      fetchKaptureList(
        handleStateTransition,
        setMessages,
        setSelectedImage,
        setIsModalOpen
      );
    } else if (currentState === "status_of_my_pickup") {
      fetchSingleOrderDetails(
        token,
        setMessages,
        handleStateTransition,
        styles,
        selectedOrder,
        setOrderItemsDetails,
        setSelectedItem,

        setCurrentState,setBotResponseLoading 
      ).then((data) => {
        setBotResponseLoading(false)

        if (data.status) {
          setOrderItemsDetails(data);

          if (data.data && data.data?.consignments[0]?.items?.length > 0) {
            const itemsToShow = data.data.consignments[0].items.map((item) => ({
              id: item.itemId,
              image: item?.product?.image,
              brand: item?.product?.brand,
              price: `₹${item?.product?.mrp}`,
            }));

            // const NextHandler = "reason_for_return";
            setMessages((prev) => [
              ...prev,
              // { sender: "bot", text: "Select a product:" },
              {
                sender: "bot",
                text: itemsToShow.map((order) => (
                  <div key={order.id} style={styles.orderCard}>
                    <img
                      src={order?.image}
                      alt="Order"
                      style={styles.orderImage}
                    />

                    {/* Order Details */}
                    <div style={styles.orderDetails}>
                      {/* <span style={styles.orderStatus}>{order?.orderStatus}</span> */}
                      <span style={styles.orderId}>
                        {order?.itemStatus?.name}
                      </span>
                      <span style={styles.orderAmount}>₹{order?.price}</span>
                      {/* <span style={styles.orderDa te}>Date: {order?.orderDate}</span> */}
                      <span style={styles.orderId}>ID: {order?.id}</span>
                    </div>
                  </div>
                )),
                type: "input",
                showAs: "object",
              },
            ]);
          }
        }
      });
    } else if (
      currentState === "refund_related" ||
      currentState === "order_delivery_related"
    ) {
      // console.log("orderDetails?.orderId", selectedOrder);
      OrderDetailsbyOrderId(token, mobileNumber, selectedOrder?.orderId).then(
        (data) => {
          setSelectedOrderDetails(data);
        }
      );
    }
    // else if(currentState === "status_of_my_refund"){
    //   setMessages((prev) => [
    //     ...prev,
    //     {
    //       sender: "bot",
    //       text: "Currently. your refund is under — stage. It typically takes S to 7 working days for the refund to reflect in your bank account.",
    //     },
    //   ]);
    // }
    else if (currentState === "refund_delayed") {
      const ItemLog =
        selectedOrderDetails &&
        selectedOrderDetails?.items.find((t) => t.itemId === selectedItem);
        console.log("ItemLog",ItemLog)
      if (ItemLog?.isBeyond7DaysFromRefund) {
        handleStateTransition("beyond7DaysFromRefund");
      } else {
        handleStateTransition("under7DaysFromRefund");
      }
    } else if (currentState === "refund_not_initiated") {
      const ItemLog = selectedOrderDetails 
    ? selectedOrderDetails.items.find((t) => t.itemId === selectedItem) 
    : null;

      if (ItemLog.isBeyond24HoursFromRefund) {
        handleStateTransition("beyond24HoursFromRefund");
      } else {
        handleStateTransition("under24HoursFromRefund");
      }
    } else if (currentState === "where_is_my_order") {
      const newmessage = `The current status of your order is that it is under ${selectedOrderDetails?.orderStatus}. It is expected to reach you by [Refund Amount: ₹2199 (Add NEFT details to initiate refund).]. Tracking id for your order is 14224221308636 delivered by courier`;

      setMessages((prev) => [
        ...prev,
        // { sender: "bot", text: "Select a product:" },
        {
          sender: "bot",
          text: newmessage,
          type: "text",
        },
      ]);
    } else if (currentState === "order_is_delayed") {
      if (selectedOrderDetails?.isDelayedBeyond24Hours) {
        handleStateTransition("delayedOrderBeyond24Hours");
      } else {
        handleStateTransition("underdelayedOrder24Hours");
      }
    } else if (currentState === "change_delivery_address") {
      if (selectedOrderDetails?.orderStatus === "Delivered") {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Unfortunately, once an order has been shipped, we are unable to change the delivery address.",
            type: "text",
          },
        ]);
      } else {
        handleStateTransition("order_not_shipped_change_delivery_address");
      }
    } else if (currentState === "change_mobile_number") {
      if (selectedOrderDetails?.orderStatus === "Delivered") {
        handleStateTransition("order_shipped_change_mobile_number");
      } else {
        handleStateTransition("order_not_shipped_change_mobile_number");
      }
    } else if (currentState === "invoice_proof_of_delivery") {
      if (selectedOrderDetails?.orderStatus === "Delivered") {
        handleStateTransition("order_delivered_invoice_proof_of_delivery");
      } else {
        handleStateTransition("order_not_delivered_invoice_proof_of_delivery");
      }
    } else if (currentState === "change_my_mobile_number") {
      const ItemLog =
        selectedOrderDetails &&
        selectedOrderDetails?.items.find((t) => t.itemId === selectedItem);
      console.log("ItemLog", ItemLog);
      if (!ItemLog?.returnPickUpStatus) {
        handleStateTransition(
          "if_return_not_out_for_pickup_change_my_mobile_number"
        );
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Please enter your new mobile number",
            type: "input",
          },
        ]);
      } else {
        handleStateTransition(
          "if_return_out_for_pickup_change_my_mobile_number"
        );
      }
    }
  }, [currentState, token]);

  console.log(
    "selectedOrderDetails",
    selectedOrderDetails
    // selectedOrderDetails.items?.find((t) => t.itemId === selectedItem)
  );
  useEffect(() => {
    if (
      currentState === "customer_feedback_order_issues" ||
      currentState === "customer_feedback_delivery_feedback"
    ) {
      let NextHandler = "";

      if (
        currentState === "customer_feedback_order_issues" ||
        currentState === "customer_feedback_delivery_feedback"
      ) {
        NextHandler = "feedback";
      } else if (currentState === "show_item_details") {
        NextHandler = "selected_order";
      }
      // This is a string
      fetchSingleOrderDetails(
        token,
        setMessages,
        handleStateTransition,
        styles,
        selectedOrder,
        setOrderItemsDetails,
        setSelectedItem,
        setCurrentState,setBotResponseLoading 
      ).then((data) => {
        setBotResponseLoading(false)

        if (data.status) {
          setOrderItemsDetails(data);

          if (data.data && data.data?.consignments[0]?.items?.length > 0) {
            const itemsToShow = data.data.consignments[0].items.map((item) => ({
              id: item.itemId,
              image: item?.product?.image,
              brand: item?.product?.brand,
              price: `₹${item?.product?.mrp}`,
            }));

            setMessages((prev) => [
              ...prev,
              { sender: "bot", text: "Select a product:" },
              {
                sender: "bot",
                text: itemsToShow.map((order) => (
                  <div
                    key={order.id}
                    style={styles.orderCard}
                    onClick={() => {
                      setSelectedItem(order.id);
                      // Fix: Use NextHandler directly since it's a string
                      if (NextHandler === "feedback") {
                        setCurrentState(NextHandler);
                      } else {
                        handleStateTransition(NextHandler);
                      }
                      console.log("NextHandler", NextHandler);
                      setMessages((prev) => [
                        ...prev,
                        {
                          sender: "user",
                          showAs: "object",
                          text: (
                            <div style={styles.orderCard}>
                              {/* Order Image */}
                              <img
                                src={order?.image}
                                alt="Order"
                                style={styles.orderImage}
                              />

                              {/* Order Details */}
                              <div style={styles.orderDetails}>
                                <span style={styles.orderAmount}>
                                  {order?.price}
                                </span>
                                <span style={styles.orderId}>
                                  ID: {order?.id}
                                </span>
                              </div>
                            </div>
                          ),
                        },
                      ]);
                    }}
                  >
                    <img
                      src={order?.image}
                      alt="Order"
                      style={styles.orderImage}
                    />

                    {/* Order Details */}
                    <div style={styles.orderDetails}>
                      <span style={styles.orderAmount}>{order?.price}</span>
                      <span style={styles.orderId}>ID: {order?.id}</span>
                    </div>
                  </div>
                )),
                type: "input",
                showAs: "object",
              },
            ]);
          }
        }
      });
    }
  }, [selectedOrder]);

  // useEffect(() => {
  //   if(currentState === "customer_feedback_order_issues"){
  //     setCurrentState("feedback");
  //   }
  // }, [selectedItem]);

  console.log("selectedOrder", selectedOrder);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setBotResponseLoading(true);

    if (!userInput.trim()) return;

    const currentConfig = FLOW_CONFIG.main_flow[currentState];

    if (
      currentState === "login_with_password" ||
      currentState === "login_with_otp"
    ) {
      const input = userInput;
      setUserInput("");

      const isUserValid = await verifyPhoneNumber(input);
      if (isUserValid) {
        if (currentState === "login_with_password") {
    setBotResponseLoading(false);

          setMessages((prev) => [
            ...prev.filter((msg) => !msg.isLoading),
            { sender: "bot", text: "Please enter your password", type: "text" },
          ]);
          setCurrentState("enter_password");
        } else {
          await requestOTP();
    setBotResponseLoading(false);

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
      setBotResponseLoading(true);

      const password = userInput;
      setUserInput("");
      await handlePasswordLogin(password);
    } else if (currentState === "enter_otp") {
      await verifyOTP(userInput);
    } else if (currentConfig?.options) {
      const selectedOption = currentConfig.options.find(
        (opt) => opt.text === userInput
      );
      if (selectedOption) {
        handleStateTransition(selectedOption.next);
      }
    } else if (currentState === "with_picture") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          text: userInput,
        },
      ]);
    } else if (currentState === "push_the_raised_ticket_to_backend") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          text: userInput,
          type: "text",
        },
      ]);

      PushTheRaisedTicketToBackend({
        userDetails,
        mobileNumber,
        imageUploadFile,
        ticket_title: raiseTicketBy,
        ticket_details: userInput,
        handleStateTransition,
      });
    } else if (currentState === "type_out_your_query") {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: userInput, type: "text" },
      ]);
      createAgent(
        userInput,
        userDetails.firstName,
        mobileNumber,
        userDetails.email,
        setMessages
      );
    } else if (currentState === "return_reason_POST") {
      ReasonReturnSend(
        token,
        selectedItemDetails,
        return_reasonId,
        userInput
      ).then((data) => {
        setMessages((prev) => [
          ...prev,
          { sender: "user", text: userInput, type: "text" },
          { sender: "bot", text: "Return initiated", type: "text" },
        ]);
        handleStateTransition("end_of_chat");
      });
    } else if (
      currentState === "if_return_not_out_for_pickup_change_my_mobile_number"
    ) {
  setBotResponseLoading(true);

      changeMyPhoneNumber(userInput)
        .then(async (response) => {

          const data = JSON.parse(response); // Parse the text response if needed
          console.log("data21312321", data);
          if (data.meta && data.meta.success) {
  setBotResponseLoading(false);

            setMessages((prev) => [
              ...prev,
              {
                sender: "user",
                text: userInput,
                type: "text",
              },
              {
                sender: "bot",
                text: "Your phone number has been updated successfully.",
                type: "text",
              },
            ]);
          } else {
  setBotResponseLoading(false);

            setMessages((prev) => [
              ...prev,
              {
                sender: "user",
                text: "Phone number update failed",
                type: "text",
              }
            ])
       
          }
        })
        .catch((error) => {
          console.error("Error changing phone number:", error);
          setMessages((prev) => [
            ...prev,
            {
              sender: "system",
              text: "Sorry, there was an error updating your phone number.",
              type: "text",
            },
          ]);
        });
    }

    setUserInput("");
  };

  console.log("reasonForReturn", reasonForReturn);

  useEffect(() => {
    if (return_reasonId) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          text: <div>{reasonForReturn.reason}</div>,
          type: "text",
        },
        {
          sender: "bot",
          text: "Please add any additional comments:",
          type: "text",
        },
      ]);
      setCurrentState("return_reason_POST");
      // ReasonReturnSend(token, selectedItem, return_reasonId, userInput);
    }
  }, [return_reasonId]);

  console.log("currentState", currentState);

  const StoreByPincodeHandler = (pincode, brandName) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: (
          <span style={{ color: "#fff", fontWeight: "600" }}>{brandName}</span>
        ),

        type: "text",
      },
    ]);

    getAllStoreFromPincode(pincode, brandName)
      .then((data) => {
        console.log("stores=> ", data.stores);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "coding part is not done...",
            type: "text",
          },
        ]);
      })
      .catch((error) => console.error("Failed to fetch stores:", error));
  };

  console.log("123421", pincode, brandName);

  const getAllStoreFromPincode = async (pincode, brandName) => {
    console.log("DEBUG - Pincode Check: 1231@# =>", pincode, brandName);
    try {
      const response = await fetch(
        "https://victor.fixall.ai/apis/store/offlineStore",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ brandName, pinCode: pincode }),
          redirect: "follow",
        }
      );

      if (!response.ok) {
        // throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching store data:", error);
      // throw error;
    }
  };

  // useEffect(() => {
  //   if (currentState === "order_issues") {
  //     FetchOrders(token, setOrderDetails);
  //   }
  // }, [currentState]);

  // const selectInputOption = (option) => {
  //   const currentConfig = FLOW_CONFIG.main_flow[currentState];
  //   const selectedOption = currentConfig?.options?.find(
  //     (opt) => opt.text === option
  //   );

  //   if (selectedOption) {
  //     setMessages((prev) => [...prev, { sender: "user", text: option }]);
  //     handleStateTransition(selectedOption.next);
  //   }
  // };

  const selectInputOption = (option) => {
    let currentConfig;
    if (option === "Raise a ticket") {
      currentConfig = FLOW_CONFIG.main_flow[currentState];
    } else {
      currentConfig = Object.values(FLOW_CONFIG.main_flow).find((i) =>
        i.options?.some((t) => t.text === option)
      );
    }
    const selectedOption = currentConfig?.options?.find(
      (opt) => opt.text === option
    );
    // console.log(
    //   "Current Input => ",
    //   option,
    //   "=>",
    //   currentConfig,
    //   "=>",
    //   selectedOption
    // );
    if (selectedOption) {
      setMessages((prev) => [...prev, { sender: "user", text: option }]);
      handleStateTransition(selectedOption.next);
    }
  };


  const BotImage = ()=>(
    
      <img
        src="/image.png"
        alt="Bot"
        style={{ height: 50, borderRadius: "50%" }}
      />
  
  )

  const [concernType, setConcernType] = useState("with_picture");

  console.log("message1234",messages)
  // console.log("selectedOrder", selectedOrder);
  const renderMessage = (message, index) => {
    const isBot = message.sender === "bot";
    const isUser = message.sender === "user";
  console.log(   "message?.isInline",message)
    return (
      (isBot || isUser) && (
        <>
        
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "flex-end",
            flexDirection: isBot ? "row" : "row-reverse",
            gap: "10px",
          }}
        >
          {isBot && !Array.isArray(message.text) ? <BotImage /> : isBot &&<div style={{width:"40px", height:"10px"}}></div>} 
          
  
          <div
            style={{
              width: "75%",
              display: "flex",
              flexDirection: "column",
              // background:"red",
              // alignItems:"center"
              alignItems:Array.isArray(message.text) ? "center": isBot ? "flex-start" : "flex-end",
            }}
          >
            {isBot && !Array.isArray(message.text) && (
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
  
            {message.image ? (
              <img
                src={message.image}
                alt="Order Product"
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  borderRadius: "10px",
                }}
              />
            ) : Array.isArray(message.text) ? (
              message.text.map((text, i) => (
                <div
                  key={`${index}-${i}`}
                  style={{
                    ...styles.message,
                    ...(message?.showAs === "object"
                      ? { padding: 3, borderRadius: "20px" }
                      : { padding: 13 }),
                    ...(message?.type === "input" ? { cursor: "pointer" } : {}),
                    ...(isBot ? styles.arrayBotMessage : styles.userMessage),
                  }}
                  onClick={() =>
                    message?.type === "input" ? selectInputOption(text) : null
                  }
                >
                  {/* {text} */}
               
              {text}
                 
                </div>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: isBot ? "flex-start" : "flex-end",
                }}
              >
                {/* {botResponseLoading && isUser && index + 1 === messages.length && (
                  <div
                    style={{
                      background: "red",
                      width: "20px",
                      marginRight: "10px",
                    }}
                  >
                    <Loader />
                  </div>
                )} */}
                <div
                  style={{
                    ...styles.message,
                    ...(message?.showAs === "object"
                      ? { padding: 3, borderRadius: "20px" }
                      : { padding: 13 }),
                    ...(message?.type === "input" ? { cursor: "pointer" } : {}),
                    ...(isBot ? styles.botMessage : styles.userMessage),
                  }}
                  onClick={() =>
                    message?.type === "input"
                      ? selectInputOption(message.text)
                      : null
                  }
                >
                  {message?.showAs === "object" ? <div style={{display:"flex", justifyContent:"center",TextAlign:"center", color:"red"}}>{"=>"}{message.text}</div>:message.text}

                {/* <div >  {message.text}</div> */}
                </div>
              </div>
            )}

          </div>
        </div>
        {botResponseLoading && isUser && index + 1 === messages.length && (
          <div style={{display:"flex", gap:3, }}>
                    <BotImage />

                  <div
                  
                  >
                    <Loader />
                  </div>
                </div>
                )}
        </>
      )
    );
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
      bottom: isOpen ? "90px" : "-1000px",
      right: "10px",
      width:"95%",
      height:"80%",
      // minWidth: "300px",
      // minHeight: "500px",
      // maxWidth: "70%",
      // maxHeight: "90%",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(255, 0, 255, 0.3)",
      overflow: "hidden",
      transition: "all 0.4s ease-in-out",
      fontFamily: "Arial, sans-serif",
      color: "#000",  // Changed to black for visibility (or choose any contrasting color)
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
      // padding: "13px",
      borderRadius: "25px",
      marginBottom: 2,
      // maxWidth: "70%",
      fontSize: 12,
      position: "relative",
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
    arrayBotMessage: {
      // backgroundColor: "#f4f5f6",
      color: "#b94286",
      maxWidth:"70%",
      minWidth:"70%",
      textAlign:"center",
      // alignSelf: "flex-start",
      transition: "all 0.7s ease-in-out",
      border: "2px solid #ff017f",

      // maxWidth: "75%",
      // width: "90%",
      ":hover": {
    backgroundColor: "#ffebf5", // Light pink background on hover
    color: "#ff017f",            // More vivid text color
    transform: "scale(1.05)",    // Slight zoom effect
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
    cursor: "pointer"
  }
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
    submitbutton: {
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
    loaderContainer: {
      display: "flex",
      gap: 3,
      alignItems: "center",
    },
    loader: {
      width: "0.5rem", // Equivalent to w-2 (assuming default Tailwind config)
      height: "0.5rem", // Equivalent to h-2 (assuming default Tailwind config)
      backgroundColor: "#d3d3d3", // Equivalent to bg-gray-300
      borderRadius: "9999px", // Equivalent to rounded-full
      animation: "bounce 1s infinite", // Mimicking animate-bounce
    },

    // order
    orderCard: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      background: "white",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: 18,
      padding: 10,
      border: "1px solid #e5e7eb",
      transition: "transform 0.2s ease-in-out",
    },
    orderImage: {
      // width: "48px",
      height: "48px",
      borderRadius: "8px",
      objectFit: "cover",
    },
    orderDetails: {
      display: "flex",
      flexDirection: "column",
    },
    orderStatus: {
      color: "#374151",
      fontWeight: "500",
    },
    orderAmount: {
      color: "#111827",
      fontWeight: "600",
      fontSize: "1rem",
    },
    orderDate: {
      color: "#6b7280",
      fontSize: "0.875rem",
    },
    orderId: {
      color: "#9ca3af",
      fontSize: "0.75rem",
    },
    selectOptons: {
      // color: "#9ca3af",
      background: "transparent",
      fontSize: "0.75rem",
      border: "none",
    },
  };

  const toggleChatbot = () => setIsOpen(!isOpen);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={styles.mainContainer}>
      {isModalOpen && (
        <ImageModal
          setIsModalOpen={setIsModalOpen}
          selectedImage={selectedImage}
        />
      )}
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <span>Chat with us</span>
          </div>
          <span style={styles.closeButton} onClick={toggleChatbot}>
            <AiOutlineClose size={20} />
          </span>
        </div>
        {messages && (
          <div style={styles.chatBody} ref={chatContainerRef}>
            {messages.map(renderMessage)}
          </div>
        )}

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
            <button
              onSubmit="submit"
              style={{ background: "transparent", border: "none" }}
            >
              <SentSVGComponent />
            </button>
            {/* </button> */}
          </div>
        </form>
      </div>
      <button style={styles.toggleButton} onClick={toggleChatbot} type="Submit">
        <AiOutlineMessage />
      </button>
    </div>
  );
};

const LoadingIndicator = ({ styles }) => (
  <div style={styles.loaderContainer}>
    <div style={{ animationDelay: "0s", ...styles.loader }}></div>
    <div style={{ animationDelay: "0.2s", ...styles.loader }}></div>
    <div style={{ animationDelay: "0.4s", ...styles.loader }}></div>
  </div>
);

const fetchSingleOrderDetails = async (
  token,
  setMessages,
  handleStateTransition,
  styles,
  orderDetails,
  setOrderItemsDetails,
  setSelectedItem,
  NextHandler,
  setCurrentState,
  // setBotResponseLoading
) => {
  try {
    // setBotResponseLoading(true)
    if (!orderDetails?.orderId) {
      console.error("Order ID is missing.");
      return;
    }

    const myHeaders = new Headers({
      accept: "application/json",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    });

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(
      `https://api-preprod.nnnow.com/d/apiV2/orderDetailsv2/${orderDetails.orderId}`,
      requestOptions
    );

    if (!response.ok) {
      // throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setOrderItemsDetails(data);
    return data;
  } catch (error) {
    console.error("Error fetching order details:", error);
  }
};

const FetchAllOrderDetails = async (
  token,
  setOrderDetails,
  setIsOrderLoading,
  setMessages,
  setSelectedOrder,
  handleStateTransition,
  styles,
  currentState,setBotResponseLoading,
  { NextHandler }
) => {
  // console.log("FetchAllOrderDetails FetchAllOrderDetails")
  setBotResponseLoading(true);
  try {
    const myHeaders = new Headers({
      accept: "application/json",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      bbversion: "v2",
      clientsessionid: "1742983379818",
      "content-type": "application/json",
      correlationid: "2a336d49-4e2b-4a04-aaf7-b66063f19259",
      authorization: `Bearer ${token}`,
      module: "odin",
      origin: "https://www.nnnow.com",
      referer: "https://www.nnnow.com/",
      "sec-ch-ua":
        '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    });

    const response = await fetch(
      "https://api-preprod.ailiens.com/d/mobapi/orderDetails/v3",
      { method: "GET", headers: myHeaders, redirect: "follow" }
    );

    if (!response.ok) {
      console.error("HTTP error! Status: ", response?.status);
      // throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.log("rresultesult", result);
    if (result?.status) {
      setOrderDetails(result.data?.ordersList);
      setBotResponseLoading(false);

      if (result.data?.ordersList && result.data?.ordersList.length > 0) {
        const ordersToShow = result.data.ordersList.slice(0, 4); // Get the first 2 orders

        // const NextHandler =
        //   currentState === "order_issues"
        //     ? "selected_order"
        //     : currentState === "switching_from_COD_to_prepaid"
        //     ? "message_switching_from_COD_to_prepaid"
        //     : "";
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Here are your orders:" },
          {
            sender: "bot",
            text: ordersToShow.map((order) => (
              <div
                key={order.orderId}
                style={styles.orderCard}
                onClick={() => {
                  setMessages((prev) => [
                    ...prev,
                    {
                      sender: "user",
                      showAs: "object",
                      text: (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            padding: "16px",
                            backgroundColor: "#ffffff",
                            borderRadius: "16px",
                            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
                            border: "1px solid #E5E7EB",
                            transition: "all 0.3s ease-in-out",
                            cursor: "pointer",
                            hover: {
                              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                              transform: "scale(1.02)",
                            },
                          }}
                        >
                          {/* Order Image */}
                          <img
                            src={order?.imagesList?.[0]}
                            alt="Order"
                            style={{
                              width: "90px",
                              height: "90px",
                              objectFit: "cover",
                              borderRadius: "12px",
                              border: "2px solid #E5E7EB",
                            }}
                          />

                          {/* Order Details */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#374151",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              Status:
                              <span
                                style={{
                                  color:
                                    order?.orderStatus === "Delivered"
                                      ? "#10B981"
                                      : order?.orderStatus === "Pending"
                                      ? "#F59E0B"
                                      : "#EF4444",
                                  fontWeight: "700",
                                }}
                              >
                                {order?.orderStatus}
                              </span>
                            </span>
                            <span
                              style={{
                                fontSize: "20px",
                                fontWeight: "700",
                                color: "#111827",
                                letterSpacing: "0.5px",
                              }}
                            >
                              ₹{order?.totalAmount}
                            </span>
                            <span
                              style={{ fontSize: "12px", color: "#6B7280" }}
                            >
                              📅 Date: {order?.orderDate}
                            </span>
                            <span
                              style={{ fontSize: "12px", color: "#6B7280" }}
                            >
                              🆔 ID: {order?.orderId}
                            </span>
                          </div>
                        </div>
                      ),
                    },
                  ]);
                  setSelectedOrder(order);
                  handleStateTransition(NextHandler);
                }}
              >
                <img
                  src={order?.imagesList?.[0]}
                  alt="Order"
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    border: "2px solid #E5E7EB",
                  }}
                />
                {/* Order Details */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#374151",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Status:
                    <span
                      style={{
                        color:
                          order?.orderStatus === "Delivered"
                            ? "#10B981"
                            : order?.orderStatus === "Pending"
                            ? "#F59E0B"
                            : "#EF4444",
                        fontWeight: "700",
                      }}
                    >
                      {order?.orderStatus}
                    </span>
                  </span>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#111827",
                      letterSpacing: "0.5px",
                    }}
                  >
                    ₹{order?.totalAmount}
                  </span>
                  <span style={{ fontSize: "12px", color: "#6B7280" }}>
                    📅 Date: {order?.orderDate}
                  </span>
                  <span style={{ fontSize: "12px", color: "#6B7280" }}>
                    🆔 ID: {order?.orderId}
                  </span>
                </div>
              </div>
            )),
            type: "input",
            showAs: "object",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "No orders found for your account." },
        ]);
      }
    } else {
      setBotResponseLoading(false)
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong!" },
      ]);
    }

    return result;
  } catch (error) {
    console.error("FetchOrders Error:", error);
    setBotResponseLoading(false);
    return null;
  }
};

const PushTheRaisedTicketToBackend = ({
  userDetails,
  mobileNumber,
  imageUploadFile,
  ticket_title,
  ticket_details,
  handleStateTransition,
}) => {
  console.log("imageUploadFile", imageUploadFile);

  const formdata = new FormData();
  formdata.append("title", ticket_title);
  formdata.append("ticket_details", ticket_details);
  formdata.append("customer_name", userDetails?.firstName);
  formdata.append("phone", mobileNumber);
  formdata.append("email_id", userDetails?.email_id);

  // Handle imageUploadFile correctly
  if (imageUploadFile) {
    // If it's a FileList (e.g., from <input type="file">), take the first file
    const file = imageUploadFile instanceof FileList ? imageUploadFile[0] : imageUploadFile;
    if (file instanceof Blob) { // Ensure it's a Blob or File
      formdata.append("attachment", file); // Filename is optional, handled by the File object
    } else {
      console.error("imageUploadFile is not a valid file:", file);
    }
  }

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${apiUrl}/apis/kapture/raiseaticket`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      handleStateTransition("end_of_chat");
    })
    .catch((error) => console.error(error));
};

const LocationSvg = ({ size }) => (
  <svg
    fill="#b60099"
    height={size}
    width={size}
    version="1.1"
    id="Capa_1"
    viewBox="0 0 297 297"
    stroke="#b60099"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <g>
        {" "}
        <path d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645 c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645 C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892 c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z"></path>{" "}
        <path d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614 c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901 c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104 C179.265,127.948,165.464,141.901,148.5,141.901z"></path>{" "}
      </g>{" "}
    </g>
  </svg>
);

const RequestCall = async (setMessages, userDetails, mobileNumber) => {
  try {
    // Validate required parameters first
    if (!userDetails?.firstName || !mobileNumber) {
      // throw new Error("Missing required parameters: username or phone number");
    }

    // Construct URL with proper encoding
    const baseUrl = "https://victor.fixall.ai/apis/agent/callaAgent";
    const params = new URLSearchParams({
      username: userDetails.firstName,
      phone: mobileNumber,
    }).toString();
    const url = `${baseUrl}?${params}`;

    // Make the API call
    const fetchResponse = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // Added Accept header
      },
    });

    // Check response status
    if (!fetchResponse.ok) {
      const errorText = await fetchResponse.text();
      // throw new Error(
      //   `HTTP error! status: ${fetchResponse?.status} - ${errorText}`
      // );
    }

    // Parse JSON response
    const data = await fetchResponse.json();
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "Request for a callback has been initiated. An agent will call you shortly.",
      },
    ]);
    return data
  } catch (err) {
    // Ensure err is an Error object and provide fallback
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred while calling the agent";

    // setError(errorMessage);

    // Optional: Log error for debugging
    console.error("Callback request failed:", err);
  }
};

const createAgent = async (query, customerName, phone, email, setMessages) => {
  console.log(
    "query, customerName, phone, email, setMessages",
    query,
    customerName,
    phone,
    email,
    setMessages
  );
  try {
    const response = await fetch("https://victor.fixall.ai/apis/agent/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if required (like authorization)
      },
      body: JSON.stringify({
        query: query,
        customer_name: customerName,
        phone: phone,
        email_id: email,
      }),
    });

    if (!response.ok) {
      console.error("Network response was not ok");
    }

    const data = await response.json();
    if (data) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Thank you for your query. Our team will get back to you soon.",
        },
      ]);
    }
    return data;
  } catch (error) {
    console.error("Error creating agent:", error);
  }
};

// const getLocations = async (latitude, longitude) => {
//   try {
//     const url = "https://victor.fixall.ai/apis/location/getLocations";
//     const payload = {
//       latitude: latitude.toString(),
//       longitude: longitude.toString(),
//     };

//     const response = await fetch(`${url}?${new URLSearchParams(payload)}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     // setLocations(data);
//     return data;
//   } catch (err) {
//     // setError(err.message);
//     // throw err;
//     console.log(err.message);
//   } finally {
//     // setLoading(false);
//   }
// };

const fetchKaptureList = async (
  handleStateTransition,
  setMessages,
  setSelectedImage,
  setIsModalOpen
) => {
  try {
    const response = await fetch("https://victor.fixall.ai/apis/kapture/list");
    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: data.data.map((item, index) => {
          const renderCard = (item) => {
            return (
              <>
                <p>
                  <strong>Customer Name:</strong> {item.customer_name}
                </p>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <p>
                  <strong>Email:</strong> {item.email_id}
                </p>
                <p>
                  <strong>Phone:</strong> {item.phone}
                </p>
                <p>
                  <strong>Ticket ID:</strong> {item.ticket_id}
                </p>
                <p>
                  <strong>Title:</strong> {item.title}
                </p>
                {item.ticket_page_info && (
                  <div>
                    <strong>Ticket Page Info:</strong>
                    {item.ticket_page_info.map((page, pageIndex) => (
                      <div key={page._id || pageIndex}>
                        {page.attachment && (
                          <div>
                            <p>
                              <strong>Attachment:</strong>
                            </p>
                            <img
                              src={page.attachment}
                              alt={`Attachment for ticket ${item.ticket_id}`}
                              style={{
                                maxWidth: "200px",
                                margin: "10px 0",
                                cursor: "pointer",
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "fallback-image-url.jpg";
                              }}
                              onClick={(e) => {
                                e.stopPropagation(); // Prevents the parent div's onClick from firing
                                setSelectedImage(page.attachment);
                                setIsModalOpen(true);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            );
          };
          return (
            <div
              key={item._id || index}
              // onClick={() => handleStateTransition("end_of_chat")}
            >
              {renderCard(item)}
            </div>
          );
        }),
        type: "input",
      },
    ]);
    handleStateTransition("end_of_chat");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const ImageModal = ({ setIsModalOpen, selectedImage }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
    onClick={() => setIsModalOpen(false)}
  >
    <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
      <img
        src={selectedImage}
        alt="Full size view"
        style={{ maxWidth: "90vw", maxHeight: "90vh" }}
      />
      <button
        onClick={() => setIsModalOpen(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "5px 10px",
          background: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  </div>
);

const ReasonReturnList = async (token, orderId, itemId) => {
  try {
    const myHeaders = new Headers({
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
      authorization: `Bearer ${token}`,
      bbversion: "v2",
      clientSessionId: "1745109689845",
      correlationId: "dd3a14cb-0480-4f0e-82a5-b5ea2b56db36",
      module: "odin",
      "sec-ch-ua":
        '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        orderId,
        itemId,
      }),
      redirect: "follow",
    };

    const response = await fetch(
      "https://api-preprod.ailiens.com/d/api/returns/v2",
      requestOptions
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in ReasonReturnList:", error);
    // throw error;
  }
};

const ReasonReturnSend = async (
  token,
  selectedItemDetails,
  reasonId,
  comment
) => {
  try {
    const myHeaders = new Headers({
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
      authorization: `Bearer ${token}`,
      bbversion: "v2",
      clientSessionId: "1745109689845",
      correlationId: "93fb250e-ffb0-4e7c-93b9-72f5685d5683",
      module: "odin",
      "sec-ch-ua":
        '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
    });

    const requestBody = {
      itemId: selectedItemDetails?.id,
      reasonId: reasonId,
      comment: comment,
      returnMode: "REVERSEPICKUP",
      address: {
        addressId: selectedItemDetails?.addressId,
      },
    };

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(requestBody),
      redirect: "follow",
    };

    const response = await fetch(
      "https://api-preprod.ailiens.com/d/api/returnInitiate",
      requestOptions
    );
    const result = await response.text();
    return result;
  } catch (error) {
    console.error("Error in ReasonReturnSend:", error);
    // throw error; // Re-throw the error to be handled by the caller if needed
  }
};

const OrderDetailsbyOrderId = async (token, phone, orderId) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      orderId: orderId,
      phone: phone,
      token: token, // Removed template literal as it's not needed
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `${apiUrl}/apis/order/status`,
      requestOptions
    );
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    console.error("Error fetching order details:", error);
    // throw error;
    // setMessages((prev) => [
    //   ...prev,
    //   { sender: "bot", text: "Something went wrong!" },
    // ]);
  }
};

const getPinCodeByLatLng = async (latitude, longitude) => {
  try {
    const response = await fetch(
      "https://victor.fixall.ai/apis/location/getLocations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: latitude,
          longitude: longitude,
        }),
      }
    );

    if (!response.ok) {
      // throw new Error(`HTTP error! Status: ${response?.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching pin code:", error);
    return null;
  }
};

const changeMyPhoneNumber = async (phoneNumber) => {
  try {
    const date = new Date().toISOString().split("T")[0]; // Formats date as YYYY-MM-DD
    const myHeaders = new Headers({
      accept: "application/json",
      "content-type": "application/json",
    });

    const raw = JSON.stringify({
      action: "INITIATE_RTO",
      waybill: "ARVINDTEST001",
      cp_id: 4,
      account_code: "Delhivery-Express",
      phone_number: phoneNumber,
      preferred_date: date,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://www.clickpost.in/api/v2/ndr-update-api?username=arvind&key=c47c947b-9274-47ec-a434-a62714ff3248",
      requestOptions
    );

    const result = await response.text();
    return result;
  } catch (error) {
    console.error("Error updating phone number:", error);
    // throw error; // Re-throw the error so it can be handled by the caller
  }
};
export default NnnowChatBot;



const Loader = () => {
  return(
  <div style={{width:52}}>

    <svg  viewBox="0 0 200 200"><circle fill="#E60065" stroke="#E60065" stroke-width="12" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#E60065" stroke="#E60065" stroke-width="12" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#E60065" stroke="#E60065" stroke-width="12" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
  </div>
  )
}