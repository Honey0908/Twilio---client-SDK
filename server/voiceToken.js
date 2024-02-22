
import twilio from "twilio";
import config from "./config.js";

const token = (request, response) => {
    const accountSid = config.accountSid;
    const apiKey = config.apiKey;
    const apiSecret = config.apiSecret;
    const appSid = config.outgoingApplicationSid;
    const AccessToken = twilio.jwt.AccessToken;
    const VoiceGrant = AccessToken.VoiceGrant;
    const identity = config.callerId
    const voiceGrant = new VoiceGrant({
        outgoingApplicationSid: appSid,
        incomingAllow: true,
    });
    const accessToken = new AccessToken(accountSid, apiKey, apiSecret, {
        identity,
    });

    accessToken.addGrant(voiceGrant);
    response.json({ token: accessToken.toJwt() });
};
export default token;