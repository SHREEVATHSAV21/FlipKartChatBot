"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this a fully functional application?",
    answer: "No, this is a rough interface (prototype) and not a fully functional application.",
  },
  {
    question: "Why is the application not fully functional?",
    answer: "The development could not be completed because the free version of Replit has limited credits (1,000 credits), which were exhausted during development.",
  },
  {
    question: "What limitations were faced using Replit’s free version?",
    answer: "The free version of Replit has restrictions on compute credits, performance, and long-running backend services, which limit the ability to build and deploy a fully functional website.",
  },
  {
    question: "What parts of the project are completed?",
    answer: "The user interface design and basic structure of the application are completed to demonstrate the concept and workflow.",
  },
  {
    question: "What parts are incomplete?",
    answer: "Backend logic, database integration, authentication, and advanced functionalities could not be fully implemented.",
  },
  {
    question: "Can this project be completed in the future?",
    answer: "Yes, the project can be completed by migrating to an alternative platform with fewer limitations or by using paid resources.",
  },
  {
    question: "What alternative platforms can be used?",
    answer: "Possible alternatives include GitHub Pages (frontend), Vercel, Netlify, Firebase, Supabase, or a locally hosted development environment.",
  },
  {
    question: "Why was Replit chosen initially?",
    answer: "Replit was chosen for its ease of use, quick setup, and suitability for rapid prototyping.",
  },
  {
    question: "Does this prototype still demonstrate the project idea?",
    answer: "Yes, the prototype effectively demonstrates the core concept, design approach, and intended functionality of the project.",
  },
  {
    question: "What is the next step for this project?",
    answer: "The next step is to migrate the project to a more suitable platform and implement the remaining backend and functional features.",
  },
];

const FAQSection = () => {
  return (
    <div className="w-full max-w-2xl mt-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-lg font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-700 dark:text-gray-300">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;