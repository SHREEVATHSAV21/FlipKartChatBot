"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Loader2 } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const placeholderTexts: Record<string, string> = {
  en: "Type your message...",
  hi: "अपना संदेश लिखें...",
  te: "మీ సందేశాన్ని టైప్ చేయండి...",
  es: "Escribe tu mensaje...",
  fr: "Tapez votre message...",
};

// Hardcoded URL for the deployed Edge Function
const GEMINI_CHAT_FUNCTION_URL = "https://ofhwpywyuwykvfxhwpoa.supabase.co/functions/v1/gemini-chat";

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const callGeminiFunction = async (userMessage: string, language: string) => {
    setIsLoading(true);
    try {
      // We use standard fetch here because we are calling a hardcoded URL, 
      // not using the supabase.functions.invoke() method which requires authentication setup.
      const response = await fetch(GEMINI_CHAT_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage, language }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error calling Gemini function:", error);
      showError("Failed to get response from AI. Check console for details.");
      return "Sorry, I encountered an error while trying to respond.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() && !isLoading) {
      const newUserMessage: Message = { id: Date.now().toString(), text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      const currentInput = input;
      setInput("");

      const botResponseText = await callGeminiFunction(currentInput, selectedLanguage);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    console.log("Selected language:", language);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="w-full max-w-md mx-auto flex flex-col h-[600px]">
      <CardHeader className="border-b flex flex-row items-center justify-between p-4">
        <CardTitle className="text-lg">Flipkart Query Bot (Gemini 2.5 Flash)</CardTitle>
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-center">
              Start chatting with the AI bot!
              <p className="mt-2 text-xs">
                (Remember to set the GEMINI_API_KEY secret in Supabase for this to work.)
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start mb-4 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg" alt="Bot" />
                    <AvatarFallback>Bot</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 ml-2">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start items-center mb-4">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback>Bot</AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg rounded-bl-none">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full space-x-2">
          <Input
            placeholder={placeholderTexts[selectedLanguage]}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;