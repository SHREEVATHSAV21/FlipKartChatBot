"use client";

import React from "react";
import ChatInterface from "@/components/ChatInterface";
import { MadeWithDyad } from "@/components/made-with-dyad";

const ChatBot = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <ChatInterface />
      <MadeWithDyad />
    </div>
  );
};

export default ChatBot;