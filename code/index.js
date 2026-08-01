// Smart WhatsApp Notification Router
// Made by me for hackathon

console.log("Message router initialized");

function routeMessage(text, forwardedCount, businessReports) {
  
  // make text safe and lowercase
  text = (text || "").toLowerCase();

  // scam detection - lottery, prize and suspicious links
  if ((text.includes("lottery") || text.includes("prize") || text.includes("http") || text.includes("click here") || text.includes("click on this link") || text.includes("www.")) && forwardedCount > 2) {
    return {
      action: "mute",
      message_type: "scam",
      reason: "Highly forwarded message with suspicious link or lottery",
      confidence: 0.95
    };
  }

  // spam business detection
  if (businessReports > 10) {
    return {
      action: "mute",
      message_type: "spam",
      reason: "Business flagged by many users",
      confidence: 0.9
    };
  }

  // urgent messages
  if (text.includes("urgent") || text.includes("emergency") || text.includes("payment due")) {
    return {
      action: "notify",
      message_type: "urgent",
      reason: "Requires immediate attention",
      confidence: 0.85
    };
  }

  // promotional messages
  if (text.includes("offer") || text.includes("sale") || text.includes("discount")) {
    return {
      action: "digest",
      message_type: "promotion",
      reason: "Non-urgent promotional content",
      confidence: 0.75
    };
  }

  // default case
  return {
    action: "digest",
    message_type: "general",
    reason: "Normal message",
    confidence: 0.6
  };
}
