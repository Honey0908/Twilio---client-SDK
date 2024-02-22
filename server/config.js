import dotenv from "dotenv";

dotenv.config();
export default {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET,
    outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
    agentId: process.env.AGENT_ID,
    callerId: process.env.TWILIO_NUMBER,
    client_identity: process.env.client_identity
};