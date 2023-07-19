const axios = require("axios");

let eventLost = {};

const sendEvent = async (serviceURL, event) => {
    try {
        await axios.post(serviceURL, event);
        if(eventLost[serviceURL] && eventLost[serviceURL].length > 0) await resendLostEvents(serviceURL);
    } catch (error) {
        handleEventFailure(serviceURL, event, error);
    }
};

const handleEventFailure = (serviceURL, event, error) => {
    if (!eventLost[serviceURL]) eventLost[serviceURL] = [];
    eventLost[serviceURL].push(event);
};

const resendLostEvents = async (serviceURL) => {
    const eventsForService = eventLost[serviceURL] || [];
    for(let i = 0; i < eventsForService.length; i++) {
        try {
            await axios.post(serviceURL, eventsForService[i]);
            eventsForService.splice(i, 1);
            i--; 
        } catch (error) {
            console.log(`Failed to resend lost event to service at ${serviceURL}:`, error.message);
            break;
        }
    }
};

module.exports = {
    sendEvent
};
