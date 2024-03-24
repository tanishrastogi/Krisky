import twilio from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

let TWILIO_SERVICE_SID = "";

client.verify.v2.services
  .create({
    friendlyName: "My First Verify Service",
  })
  .then((service) => {
    TWILIO_SERVICE_SID = service.sid;
  })
  .catch((error) => {
    console.error("Error creating service:", error);
  });
export { client, TWILIO_SERVICE_SID };
