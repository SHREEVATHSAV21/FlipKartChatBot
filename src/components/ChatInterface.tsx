"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import LanguageSelector from "./LanguageSelector";

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

const getBotResponseText = (userMessage: string, lang: string) => {
  const baseMessage = "I'm a simple bot. For advanced features like language handling, emotion understanding, problem-solving, and memory, I'd need a backend AI service.";
  switch (lang) {
    case "hi":
      return `नमस्ते! आपने कहा: "${userMessage}" हिंदी में। मैं एक साधारण बॉट हूँ। भाषा प्रबंधन, भावना को समझना, समस्या-समाधान और स्मृति जैसी उन्नत सुविधाओं के लिए, मुझे एक बैकएंड एआई सेवा की आवश्यकता होगी।`;
    case "te":
      return `నమస్కారం! మీరు తెలుగులో ఇలా అన్నారు: "${userMessage}". నేను ఒక సాధారణ బాట్ని. భాషా నిర్వహణ, భావోద్వేగాలను అర్థం చేసుకోవడం, సమస్య పరిష్కారం మరియు జ్ఞాపకశక్తి వంటి అధునాతన లక్షణాల కోసం, నాకు బ్యాకెండ్ AI సేవ అవసరం.`;
    case "es":
      return `¡Hola! Dijiste: "${userMessage}" en español. Soy un bot simple. Para funciones avanzadas como el manejo de idiomas, la comprensión de emociones, la resolución de problemas y la memoria, necesitaría un servicio de IA de backend.`;
    case "fr":
      return `Bonjour! Vous avez dit : "${userMessage}" en français. Je suis un simple bot. Pour des fonctionnalités avancées comme la gestion des langues, la compréhension des émotions, la résolution de problèmes et la mémoire, j'aurais besoin d'un service d'IA backend.`;
    case "en":
    default:
      return `Hello! You said: "${userMessage}" in ${lang}. ${baseMessage}`;
  }
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newUserMessage: Message = { id: Date.now().toString(), text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInput("");

      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponseText(newUserMessage.text, selectedLanguage),
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
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
        <CardTitle className="text-lg">Flipkart Query Bot</CardTitle>
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Start chatting with the bot!
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
          />
          <Button onClick={handleSendMessage} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;