import { GoogleGenAI } from "@google/genai";

// Actual API key
const apiKey = "your api key";

// Initialize Gemini with API key
const ai = new GoogleGenAI({
  apiKey: apiKey,
});

// Main function to get Gemini response
async function main(prompt) {
  try {
    // Normalize prompt for name detection
    const lowerPrompt = prompt.toLowerCase();

    //  Always respond with name "Shifra" if asked
    if (
      lowerPrompt.includes("your name") ||
      lowerPrompt.includes("who are you") ||
      lowerPrompt.includes("what is your name") ||
      lowerPrompt.includes("tell me your name") 
    ) {
      return "My name is Darvis, your advanced virtual assistant.";
    }
    //  Generate Gemini response
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      maxOutputTokens: 200, // Allow enough tokens for full response
    });

    //  Trim response to 100 words max
    const fullText = response.text?.trim() || "Sorry, I couldn't generate a response.";
    const trimmedText = fullText.split(/\s+/).slice(0, 100).join(" ");

    console.log("Gemini Response:", trimmedText);
    return trimmedText;
  } catch (error) {
    console.log("Gemini API Error:", error);
    return "There was an error processing your request.";
  }
}

export default main;
