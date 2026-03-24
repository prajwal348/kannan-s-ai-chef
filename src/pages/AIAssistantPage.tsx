import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, Send, User } from "lucide-react";
import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Namaste! 🙏 I'm your AI catering assistant. I can help you with:\n\n• **Order queries** — \"What's the cost for tomorrow's event?\"\n• **Inventory checks** — \"Do we have enough stock for this weekend?\"\n• **Procurement planning** — \"What should we procure today?\"\n• **Cost analysis** — \"Show me this month's expenses\"\n\nHow can I assist you today?",
  },
];

const mockResponses: Record<string, string> = {
  "cost": "📊 **Tomorrow's Event (ORD-002 — TechCorp)**\n\nEstimated cost breakdown:\n- Ingredients: ₹45,000\n- Workforce (8 staff): ₹24,000\n- Transport & fuel: ₹8,500\n- Equipment rental: ₹12,000\n\n**Total estimated cost: ₹89,500**\nBudgeted revenue: ₹1,85,000\nProjected margin: **51.6%** ✅",
  "stock": "📦 **Weekend Stock Check (Mar 28-30)**\n\nYou have 2 events: ORD-001 (Wedding, 500 PAX) and ORD-003 (Birthday, 80 PAX)\n\n⚠️ **Shortfalls detected:**\n- Toor Dal: Need 35kg, have 30kg → **Order 50kg**\n- Red Chilli: Need 5kg, have 3kg → **Order 10kg**\n- Coconut Oil: Need 18L, have 15L → **Order 20L**\n\n✅ Rice, Paneer, Ghee, Spices — sufficient stock available.\n\nShall I generate a procurement order?",
  "procure": "🛒 **Today's Procurement Priorities**\n\nBased on upcoming orders and current inventory:\n\n1. **Toor Dal** — 50kg from Sri Krishna Stores (₹5,500) 🔴 Urgent\n2. **Red Chilli Powder** — 10kg from Spice World (₹3,200) 🔴 Urgent\n3. **Coconut Oil** — 20L from Kerala Traders (₹4,000) 🟡 Medium\n\n**Total: ₹12,700**\n\nRecommendation: Place orders before 2 PM for next-day delivery.",
  "default": "I've analyzed your current operations. Here's a quick summary:\n\n📋 **Active Orders:** 4 (2 weddings, 1 corporate, 1 birthday)\n💰 **Revenue Pipeline:** ₹13.22L\n📦 **Low Stock Items:** 3 items need restocking\n👥 **Staff needed this week:** 37 across all events\n\nWould you like me to dive deeper into any of these areas?",
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const lower = input.toLowerCase();
      let responseKey = "default";
      if (lower.includes("cost") || lower.includes("expense") || lower.includes("tomorrow")) responseKey = "cost";
      else if (lower.includes("stock") || lower.includes("enough") || lower.includes("weekend")) responseKey = "stock";
      else if (lower.includes("procure") || lower.includes("order") || lower.includes("buy") || lower.includes("today")) responseKey = "procure";

      setMessages((prev) => [...prev, { role: "assistant", content: mockResponses[responseKey] }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] animate-fade-in">
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-display font-semibold">AI Assistant</h1>
        <p className="text-muted-foreground text-sm mt-1">Your intelligent catering operations co-pilot</p>
      </div>

      <Card className="flex-1 flex flex-col shadow-luxury border-border/50 overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="p-2 rounded-lg gradient-gold h-fit shrink-0">
                  <Bot className="h-4 w-4 text-accent-foreground" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-xl p-3.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted/50 border border-border/50"
              }`}>
                <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                  __html: msg.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br/>')
                }} />
              </div>
              {msg.role === "user" && (
                <div className="p-2 rounded-lg bg-accent h-fit shrink-0">
                  <User className="h-4 w-4 text-accent-foreground" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="p-2 rounded-lg gradient-gold h-fit shrink-0">
                <Bot className="h-4 w-4 text-accent-foreground" />
              </div>
              <div className="bg-muted/50 border border-border/50 rounded-xl p-3.5 text-sm text-muted-foreground">
                Thinking...
              </div>
            </div>
          )}
        </CardContent>

        <div className="p-4 border-t border-border/50">
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything about your operations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} className="gradient-gold text-accent-foreground" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {["What's the cost for tomorrow's event?", "Do we have enough stock?", "What should we procure today?"].map((q) => (
              <button
                key={q}
                onClick={() => { setInput(q); }}
                className="text-xs px-2.5 py-1 rounded-md border border-border bg-card hover:bg-muted transition-colors text-muted-foreground"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
