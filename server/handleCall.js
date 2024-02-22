import VoiceResponse from "twilio";
import config from "./config.js";


const handleCall = (request, response) => {
    const To = request.body.To;
    if (To == config.callerId) {
        // incoming call
        const twiml = new VoiceResponse.twiml.VoiceResponse();
        const dial = twiml.dial();
        dial.client(config.client_identity);

        response.set("Content-Type", "text/xml");
        response.send(twiml.toString());
        return;

    }
    // outgoing call
    const twiml = new VoiceResponse.twiml.VoiceResponse();
    twiml.say({ voice: "Polly.Aditi" }, "Hello Everyone I hope you are enjoying the session !");
    const dial = twiml.dial({ callerId: config.callerId });
    dial.number(To);

    response.set("Content-Type", "text/xml");
    response.send(twiml.toString());
};



const handleFallBackResponse = (req, res) => {
    const twiml = new VoiceResponse.twiml.VoiceResponse();
    twiml.say("Something went wrong, we will get back to you soon. Sorry for the inconvenience.");
    res.set("Content-Type", "text/xml");
    res.send(twiml.toString());

}

export { handleCall, handleFallBackResponse };