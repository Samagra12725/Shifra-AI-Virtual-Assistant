import React, { useContext } from "react";
import "./App.css";
import { CiMicrophoneOn } from "react-icons/ci"; // Microphone icon for the button
import va from "./assets/ai.png"; // Static image of the assistant
import speakImg from "./assets/speak.gif"; // GIF shown while listening
import aigif from "./assets/aiVoice.gif"; // GIF shown while responding
import { datacontext } from "./context/ContextUser"; // Global context for voice and prompt state

function App() {
  // Destructuring context values for voice recognition and UI state
  const {
    recognition,      // SpeechRecognition instance
    speaking,         // Boolean: whether assistant is currently listening/responding
    setSpeaking,      // Function to toggle speaking state
    prompt,           // Current prompt or message being processed
    setPrompt,        // Function to update prompt
    response,         // Boolean: whether assistant has responded
    setResponse       // Function to toggle response state
  } = useContext(datacontext);

  return (
    <div className="main">
      {/* Assistant avatar */}
      <img src={va} alt="Virtual Assistant" id="Shifra" />

      {/* Static identity line */}
      <span>I'm Shifra, your advanced virtual assistant</span>

      {/* Conditional rendering based on speaking state */}
      {!speaking ? (
        // Button to start listening
        <button
          onClick={() => {
            setPrompt("listening...");     // Show listening status
            setSpeaking(true);             // Set speaking mode
            setResponse(false);            // Reset response state
            recognition.start();           // Start speech recognition
          }}
        >
          Click here <CiMicrophoneOn />
        </button>
      ) : (
        // UI shown while assistant is speaking/responding
        <div className="response">
          {!response ? (
            // Show listening animation
            <img src={speakImg} alt="Listening..." id="speak" />
          ) : (
            // Show AI response animation
            <img src={aigif} alt="Responding..." id="aigif" />
          )}

          {/* Display current prompt or response text */}
          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
}

export default App;
