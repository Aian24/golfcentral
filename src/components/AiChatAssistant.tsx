"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, BookOpen, ArrowRight, CornerDownLeft } from "lucide-react";
import { SITE_INFO, STAFF_MEMBERS, EXACT_ISSUES, ADVERTISING_PACKAGES, ARTICLES } from "@/data/editorialData";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  quickAction?: {
    label: string;
    actionType: "issue" | "article" | "tab";
    param?: string | number;
  };
}

interface AiChatAssistantProps {
  onOpenIssue: (issueNum: number) => void;
  onNavigateTab: (tab: string) => void;
  onReadArticle: (slug: string) => void;
}

export const AiChatAssistant: React.FC<AiChatAssistantProps> = ({
  onOpenIssue,
  onNavigateTab,
  onReadArticle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "Hello! I'm your Golf Central AI Concierge. I can guide you through Volume 27, Florida championship courses, turfgrass agronomy, staff contacts, and advertising opportunities. What would you like to explore?",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const quickPrompts = [
    "What's in Volume 27 Issue 6?",
    "Best Florida ocean golf resorts?",
    "How to nominate a superintendent?",
    "Advertising rates and media kit?",
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: "Now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const q = query.toLowerCase();
      let reply = "";
      let action: Message["quickAction"] = undefined;

      if (q.includes("volume 27") || q.includes("issue 6") || q.includes("current issue") || q.includes("cover")) {
        reply = "Volume 27 Issue 6 is our Summer Luxury Edition! It features 'The Architecture of Whispering Pines' by Rees Jones, an inside look at Augusta's agronomy protocol for Florida superintendents, Baha Mar Royal Blue luxury retreats, and Civilion Brand modern apparel.";
        action = { label: "Open Volume 27 Issue 6 Flipbook", actionType: "issue", param: 6 };
      } else if (q.includes("resort") || q.includes("ocean") || q.includes("hammock") || q.includes("travel") || q.includes("vacation")) {
        reply = "Top Florida coastal recommendations include Hammock Beach Resort in Palm Coast featuring Jack Nicklaus's Ocean Course 'Bear Claw', and Royal Blue at Baha Mar in Nassau. Both feature oceanside fairways and five-star clubhouse hospitality.";
        action = { label: "Read Hammock Beach & Baha Mar Feature", actionType: "article", param: "oceans-edge-hammock-beach-baha-mar-renaissance" };
      } else if (q.includes("nominate") || q.includes("nomination") || q.includes("award")) {
        reply = "You can nominate outstanding golf course superintendents, premier Florida resorts, junior phenoms, and military charity invitationals through our official Community Nomination Desk.";
        action = { label: "Go to Nomination Desk", actionType: "tab", param: "nomination" };
      } else if (q.includes("ad") || q.includes("advertise") || q.includes("rate") || q.includes("media kit") || q.includes("sponsor")) {
        reply = "Advertising in Golf Central reaches over 35,000 discerning golfers, private club members, and GCSAA superintendents across Florida. Our process is simple: 1. Contact, 2. Pay, 3. Publish. We offer Full Page Spreads, Two-Page Spreads, and 1/2 Page placements.";
        action = { label: "View Advertising & Ad Specs", actionType: "tab", param: "advertising" };
      } else if (q.includes("turf") || q.includes("agronomy") || q.includes("grass") || q.includes("superintendent") || q.includes("gcsaa")) {
        reply = "Agronomy is at the very heart of Golf Central Magazine. Led by Agronomy Editor Joel D. Jackson, CGCS Retired (20-year Disney superintendent and Florida GCSA Executive Director), we cover Bermudagrass, Zoysia, sub-air root oxygenation, and water stewardship.";
        action = { label: "Read Masters Agronomy Protocol", actionType: "article", param: "masters-protocol-superintendents-agronomy" };
      } else if (q.includes("contact") || q.includes("phone") || q.includes("terrie") || q.includes("address") || q.includes("email") || q.includes("lake wales")) {
        reply = `Our headquarters is located at ${SITE_INFO.location}. You can call our editorial office directly at ${SITE_INFO.phone} or email ${SITE_INFO.email}. Publisher Terrie Purdum reviews inquiries daily.`;
        action = { label: "Go to Contact Desk", actionType: "tab", param: "contact" };
      } else if (q.includes("military") || q.includes("charity") || q.includes("veteran") || q.includes("hope") || q.includes("pga")) {
        reply = "For 25+ years, Golf Central has honored military veterans through our coverage of PGA HOPE (Helping Our Patriots Everywhere), Folds of Honor, and annual Florida charity invitationals that change veterans' lives.";
        action = { label: "Read Military Honors Story", actionType: "article", param: "honor-on-the-links-florida-military-charity" };
      } else {
        reply = "Golf Central Magazine has been Florida's authoritative golf publication since 1999. Would you like to read our current issue, explore course architecture, inspect ad specs, or learn about our editorial staff?";
        action = { label: "Browse All Archive Issues", actionType: "tab", param: "archive" };
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: reply,
        timestamp: "Just now",
        quickAction: action,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const handleActionClick = (action: NonNullable<Message["quickAction"]>) => {
    if (action.actionType === "issue" && typeof action.param === "number") {
      onOpenIssue(action.param);
      setIsOpen(false);
    } else if (action.actionType === "tab" && typeof action.param === "string") {
      onNavigateTab(action.param);
      setIsOpen(false);
    } else if (action.actionType === "article" && typeof action.param === "string") {
      onReadArticle(action.param);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-2.5 px-4 py-3 bg-[#0A251A] hover:bg-[#174B37] text-white rounded-full shadow-2xl border border-[#BFA054]/40 transition-all transform hover:scale-105 group"
            title="Ask Golf Central AI Concierge"
          >
            <div className="relative">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BFA054] absolute -top-0.5 -right-0.5 animate-ping"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#BFA054] absolute -top-0.5 -right-0.5"></span>
              <Bot className="w-5 h-5 text-[#D4B568]" />
            </div>
            <span className="text-xs font-bold tracking-wide">Golf Central AI</span>
          </button>
        )}
      </div>

      {/* Floating Modern Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[560px] max-h-[85vh] bg-[#0A1F18] text-white rounded-2xl shadow-2xl border border-[#BFA054]/40 flex flex-col justify-between overflow-hidden animate-fadeIn font-sans">
          {/* Header (Matching Flipbook Modal Top Bar) */}
          <div className="bg-[#06150F] border-b border-[#BFA054]/30 p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-white/10 text-[#BFA054]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-[#D4B568] uppercase tracking-wider font-semibold">
                  GOLF CENTRAL AI CONCIERGE // 24/7 ASSIST
                </div>
                <h3 className="text-sm font-bold text-white leading-none">
                  Golf Central AI Intelligence
                </h3>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0A1F18] text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#BFA054] text-[#0A1F18] font-semibold rounded-br-none shadow-md"
                      : "bg-[#06150F] text-white/90 border border-[#BFA054]/30 shadow-md rounded-bl-none"
                  }`}
                >
                  <p>{m.text}</p>

                  {m.quickAction && (
                    <button
                      onClick={() => handleActionClick(m.quickAction!)}
                      className="mt-2.5 px-3 py-1.5 bg-[#BFA054] text-[#0A1F18] font-bold text-[11px] rounded-lg flex items-center space-x-1 hover:bg-[#9E7F3D] transition-colors shadow-sm"
                    >
                      <span>{m.quickAction.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-white/40 mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-1.5 p-3 bg-[#06150F] border border-[#BFA054]/30 rounded-2xl rounded-bl-none w-20 text-[#D4B568]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BFA054] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#BFA054] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#BFA054] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-[#06150F] border-t border-[#BFA054]/20 flex items-center space-x-2 overflow-x-auto text-[11px] scrollbar-none shrink-0">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-[#0A1F18] hover:bg-[#BFA054] hover:text-[#0A1F18] border border-[#BFA054]/30 text-[#D4B568] transition-colors font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#06150F] border-t border-[#BFA054]/30 flex items-center space-x-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Golf Central AI a question..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#BFA054]/40 hover:border-[#BFA054] focus:border-[#D4B568] focus:ring-2 focus:ring-[#BFA054]/30 text-xs text-[#111827] placeholder-gray-400 outline-none transition-all font-medium shadow-xs"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-[#BFA054] text-[#0A1F18] hover:bg-[#9E7F3D] disabled:opacity-40 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
