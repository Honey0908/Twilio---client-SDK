
import { useEffect, useRef, useState } from "react";
import { Call, Device } from "@twilio/voice-sdk";
import { PhoneNumber } from "twilio/lib/interfaces";
import Timer from "./components/Timer";

//Types
enum USER_STATE {
    CONNECTING = "Connecting",
    READY = "Ready",
    ON_CALL = "On call",
    OFFLINE = "Offline",
}

const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, "+", 0, "<<"];

const Phone = ({ token }: { token: string }) => {
    const [userState, setUserState] = useState(USER_STATE.OFFLINE);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [callDevice, setDevice] = useState<undefined | Device>();
    const callRef = useRef<Call | null>(null);
    const [incomingCall, setIncomingCall] = useState<Call | null>(null);


    useEffect(() => {
        if (token) {
            try {
                const device: any = new Device(token, {
                    edge: "ashburn",
                    // logLevel: 1 // debug twilio actions
                });
                device.register();
                setDevice(device);
                setUserState(USER_STATE.READY);

                device.on("incoming", handleIncomingCall);

                device.on("connect", () => {
                    console.log("connected device");
                })

                // add more eventListeners like on disconnect, on error

                return () => {
                    device.destroy();
                    setDevice(undefined);
                    setUserState(USER_STATE.OFFLINE);
                };
            } catch (error) {
                console.log("Error", error);
            }
        }
    }, [token]);

    const handleCall = async () => {
        const params: { To: PhoneNumber } = { To: phoneNumber };
        const call: any = await callDevice?.connect({ params });
        if (call) {
            callRef.current = call;

            call.on("accept", () => {
                setUserState(USER_STATE.ON_CALL);
                console.log("call accepted");
            });

            call.on("disconnect", () => {
                console.log("disconnected");
                setUserState(USER_STATE.READY);
                callRef.current = null;
            });

            call.on("cancel", () => {
                console.log("The call was rejected.");
            });
        }
    };

    const endCall = () => {
        if (callRef.current) {
            callRef.current.disconnect();
        }
    };

    const handleIncomingCall = (call: Call) => {
        console.log("incoming call");
        setIncomingCall(call);
    };

    const answerIncomingCall = () => {
        if (incomingCall) {
            incomingCall.accept();
            setUserState(USER_STATE.ON_CALL);
        }
    };

    const rejectIncomingCall = () => {
        if (incomingCall) {
            incomingCall.reject();
            setUserState(USER_STATE.READY);
            setIncomingCall(null);
        }
    };

    const handleNumberClick = (value: string | number) => {
        if (value === '<<') {
            setPhoneNumber((prevNumber) => prevNumber.slice(0, -1));
        } else {
            setPhoneNumber((prevNumber) => prevNumber + value);
        }
    };

    return (
        <div className="phone">
            <div className="user-state">{`Status - > ${userState}`}</div>
            {userState === USER_STATE.ON_CALL ? (
                <Timer />
            ) : (
                <>
                    <input
                        className="number-input"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                    <div className="gird">
                        {numberList.map((value) => (
                            <div key={value} className="number" onClick={() => handleNumberClick(value)}>
                                {value}
                            </div>
                        ))}
                    </div>
                </>
            )}
            {incomingCall && (
                <div className="incoming-call">
                    <div>{`Incoming call from: ${incomingCall?.parameters?.From}`}</div>
                    <button className="button bg-success" onClick={answerIncomingCall}>Answer</button>
                    <button className="button bg-danger" onClick={rejectIncomingCall}>Reject</button>
                </div>
            )}
            {!incomingCall &&
                <div className={`${userState === USER_STATE.ON_CALL ? "bg-danger" : "bg-success"} button`} onClick={() => (userState === USER_STATE.ON_CALL ? endCall() : handleCall())}>
                    {userState === USER_STATE.ON_CALL ? "call_end" : "call"}
                </div>
            }
        </div>
    );
};

export default Phone;
