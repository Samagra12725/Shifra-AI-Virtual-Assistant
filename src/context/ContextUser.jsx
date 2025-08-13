import React, { createContext, useState } from "react";
import main from "../gemini.js"; //  Import Gemini logic

export const datacontext = createContext();

function ContextUser({ children }) {
  let [speaking,setSpeaking] = useState(false)
  let [prompt,setPrompt] = useState("listening...")
  let [response,setResponse] = useState(false)
  

  //  Speech synthesis
  function speak(text, lang = "hi-IN", volume = 1, rate = 1, pitch = 1) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.volume = volume;
    utterance.rate = rate;
    utterance.pitch = pitch;
    window.speechSynthesis.speak(utterance);
  }

  //  AI response + speak
  async function aiResponse(prompt) {
    const reply = await main(prompt);
    const newReply = reply
  .replace(/\*\*/g, "") // remove all double asterisks
  .replace(/\*/g, "")   // remove all single asterisks
  .replace(/google/gi, "Samagra Jaiswal"); 
    setPrompt(newReply)
    speak(newReply);
    setResponse(true)
    setTimeout(()=>{
       setSpeaking(false)
    },10000)
   
   return reply;
  }

  //  Speech recognition setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = async (e) => {
    const transcript = e.results[e.resultIndex][0].transcript;
    setPrompt(transcript)
    takeCommand(transcript.toLowerCase())
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    speak("Speech recognition failed. Please try again.");
  };
  

  // Some websites opening command
  function takeCommand(command){
    if(command.includes("open")&& command.includes("youtube")){
      window.open("https://www.youtube.com/","_blank")
      speak("opening youtube")
      setResponse(true)
      setPrompt("opening youtube...")
      setTimeout(()=>{
       setSpeaking(false)
    },5000)
    }else if(command.includes("open")&& command.includes("google")){
      window.open("https://www.google.com/","_blank")
      speak("opening google")
      setResponse(true)
      setPrompt("opening google...")
      setTimeout(()=>{
       setSpeaking(false)
    },5000)
    
     }else if(command.includes("open")&& command.includes("instagram")){
      window.open("https://www.instagram.com/","_blank")
      speak("opening instagram")
      setResponse(true)
      setPrompt("opening instagram...")
      setTimeout(()=>{
       setSpeaking(false)
    },5000)
    }
     else if(command.includes("open")&& command.includes("facebook")){
      window.open("https://www.facebook.com/","_blank")
      speak("opening facebook")
      setResponse(true)
      setPrompt("opening facebook...")
      setTimeout(()=>{
       setSpeaking(false)
    },5000)
    }
     else if(command.includes("open")&& command.includes("linkedin")){
      window.open("https://www.linkedin.com/","_blank")
      speak("opening linkedin")
      setResponse(true)
      setPrompt("opening linkedin...")
      setTimeout(()=>{
       setSpeaking(false)
    },5000)
    }
     else if(command.includes("open")&& command.includes("whatsapp")){
      window.open("https://www.whatsapp.com/","_blank")
      speak("opening whatsapp")
      setResponse(true)
      setPrompt("opening whatsapp...")
      setTimeout(()=>{
       setSpeaking(false)
    },5000)
    }
     else if(command.includes("open")&& command.includes("netflix")){
      window.open("https://www.netflix.com/","_blank")
      speak("opening netflix")
      setResponse(true)
      setPrompt("opening netflix...")
      setTimeout(()=>{
       setSpeaking(false)
    },5000)
    }
     else if(command.includes("time")){
     let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
      speak(time)
      setPrompt(time)
      setResponse(true)
      setTimeout(()=>{
       setSpeaking(false)
    },5000)
    }
     else if(command.includes("date")){
     let date = new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
      speak(date)
      setPrompt(date)
      setTimeout(()=>{
       setSpeaking(false)
    },5000)
    }
    else{
      aiResponse(command)
    }
  }

  //  Context value
  const value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse
  };

  return (
    <datacontext.Provider value={value}>
      {children}
    </datacontext.Provider>
  );
}

export default ContextUser;



