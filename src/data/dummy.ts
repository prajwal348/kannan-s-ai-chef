export interface Order {
  id: string;
  clientName: string;
  eventDate: string;
  eventTime: string;
  pax: number;
  eventType: "Wedding" | "Corporate" | "Private" | "Birthday" | "Festival";
  cuisineType: string;
  status: "Confirmed" | "In Progress" | "Completed";
  venue: string;
  phone: string;
  menu: {
    starters: { name: string; qty: number }[];
    mainCourse: { name: string; qty: number }[];
    desserts: { name: string; qty: number }[];
    beverages: { name: string; qty: number }[];
  };
  customizations: {
    dietary: string[];
    liveCounters: string[];
    addOns: string[];
  };
  totalCost: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: "Vegetables" | "Dairy" | "Spices" | "Grains" | "Oils" | "Beverages" | "Dry Fruits";
  quantity: number;
  unit: string;
  status: "Low Stock" | "Optimal" | "Overstock";
  reorderLevel: number;
  lastUpdated: string;
}

export interface CostEntry {
  month: string;
  inventory: number;
  workforce: number;
  fuel: number;
  misc: number;
}

export const orders: Order[] = [
  {
    id: "ORD-001",
    clientName: "Ravi & Priya Sharma",
    eventDate: "2026-03-28",
    eventTime: "12:00 PM",
    pax: 500,
    eventType: "Wedding",
    cuisineType: "South Indian",
    status: "Confirmed",
    venue: "Grand Palace Hall, Chennai",
    phone: "+91 98765 43210",
    menu: {
      starters: [{ name: "Medu Vada", qty: 600 }, { name: "Paneer Tikka", qty: 500 }, { name: "Gobi 65", qty: 400 }],
      mainCourse: [{ name: "Sambar Rice", qty: 500 }, { name: "Curd Rice", qty: 500 }, { name: "Biryani", qty: 600 }, { name: "Rasam", qty: 500 }],
      desserts: [{ name: "Gulab Jamun", qty: 600 }, { name: "Payasam", qty: 500 }],
      beverages: [{ name: "Filter Coffee", qty: 700 }, { name: "Buttermilk", qty: 500 }],
    },
    customizations: { dietary: ["Jain option for 50 guests", "No onion/garlic for 30 guests"], liveCounters: ["Dosa Counter", "Chaat Counter"], addOns: ["Ice Cream Stall", "Paan Counter"] },
    totalCost: 425000,
  },
  {
    id: "ORD-002",
    clientName: "TechCorp India Pvt Ltd",
    eventDate: "2026-03-26",
    eventTime: "7:00 PM",
    pax: 150,
    eventType: "Corporate",
    cuisineType: "Multi-cuisine",
    status: "In Progress",
    venue: "The Leela Palace, Bangalore",
    phone: "+91 99887 76655",
    menu: {
      starters: [{ name: "Spring Rolls", qty: 200 }, { name: "Chicken Satay", qty: 150 }],
      mainCourse: [{ name: "Butter Chicken", qty: 150 }, { name: "Dal Makhani", qty: 150 }, { name: "Fried Rice", qty: 150 }],
      desserts: [{ name: "Tiramisu", qty: 160 }, { name: "Fruit Platter", qty: 150 }],
      beverages: [{ name: "Mocktails", qty: 200 }, { name: "Soft Drinks", qty: 200 }],
    },
    customizations: { dietary: ["Vegan options for 20 guests"], liveCounters: ["Pasta Counter"], addOns: ["Cocktail Bar"] },
    totalCost: 185000,
  },
  {
    id: "ORD-003",
    clientName: "Anand Family",
    eventDate: "2026-03-30",
    eventTime: "11:00 AM",
    pax: 80,
    eventType: "Birthday",
    cuisineType: "North Indian",
    status: "Confirmed",
    venue: "Residence, Adyar",
    phone: "+91 97654 32100",
    menu: {
      starters: [{ name: "Tandoori Paneer", qty: 100 }, { name: "Aloo Tikki", qty: 80 }],
      mainCourse: [{ name: "Paneer Butter Masala", qty: 80 }, { name: "Naan", qty: 200 }, { name: "Jeera Rice", qty: 80 }],
      desserts: [{ name: "Rasgulla", qty: 100 }, { name: "Jalebi", qty: 80 }],
      beverages: [{ name: "Masala Chai", qty: 100 }, { name: "Lassi", qty: 80 }],
    },
    customizations: { dietary: [], liveCounters: ["Tandoor Counter"], addOns: ["Cake Arrangement"] },
    totalCost: 72000,
  },
  {
    id: "ORD-004",
    clientName: "Sundaram Wedding House",
    eventDate: "2026-04-05",
    eventTime: "6:00 PM",
    pax: 800,
    eventType: "Wedding",
    cuisineType: "South Indian",
    status: "Confirmed",
    venue: "Kalyana Mandapam, Mylapore",
    phone: "+91 98123 45678",
    menu: {
      starters: [{ name: "Bajji", qty: 900 }, { name: "Murukku", qty: 800 }],
      mainCourse: [{ name: "Sambar Rice", qty: 800 }, { name: "Pongal", qty: 800 }, { name: "Variety Rice", qty: 800 }],
      desserts: [{ name: "Mysore Pak", qty: 900 }, { name: "Kesari", qty: 800 }],
      beverages: [{ name: "Filter Coffee", qty: 1000 }, { name: "Jigarthanda", qty: 800 }],
    },
    customizations: { dietary: ["Pure vegetarian"], liveCounters: ["Dosa Counter", "Juice Counter"], addOns: ["Banana Leaf Dining Setup"] },
    totalCost: 640000,
  },
  {
    id: "ORD-005",
    clientName: "GlobalTech Summit",
    eventDate: "2026-03-25",
    eventTime: "1:00 PM",
    pax: 300,
    eventType: "Corporate",
    cuisineType: "Multi-cuisine",
    status: "Completed",
    venue: "ITC Grand Chola, Chennai",
    phone: "+91 98765 11223",
    menu: {
      starters: [{ name: "Bruschetta", qty: 350 }, { name: "Samosa", qty: 300 }],
      mainCourse: [{ name: "Pasta Alfredo", qty: 300 }, { name: "Paneer Tikka Masala", qty: 300 }],
      desserts: [{ name: "Chocolate Mousse", qty: 300 }],
      beverages: [{ name: "Iced Tea", qty: 400 }, { name: "Coffee", qty: 350 }],
    },
    customizations: { dietary: ["Gluten-free for 15"], liveCounters: [], addOns: ["Branded Napkins"] },
    totalCost: 295000,
  },
];

export const inventory: InventoryItem[] = [
  { id: "INV-001", name: "Basmati Rice", category: "Grains", quantity: 120, unit: "kg", status: "Optimal", reorderLevel: 50, lastUpdated: "2026-03-23" },
  { id: "INV-002", name: "Toor Dal", category: "Grains", quantity: 30, unit: "kg", status: "Low Stock", reorderLevel: 40, lastUpdated: "2026-03-23" },
  { id: "INV-003", name: "Paneer", category: "Dairy", quantity: 45, unit: "kg", status: "Optimal", reorderLevel: 20, lastUpdated: "2026-03-24" },
  { id: "INV-004", name: "Ghee", category: "Dairy", quantity: 60, unit: "liters", status: "Overstock", reorderLevel: 25, lastUpdated: "2026-03-22" },
  { id: "INV-005", name: "Turmeric Powder", category: "Spices", quantity: 8, unit: "kg", status: "Optimal", reorderLevel: 5, lastUpdated: "2026-03-23" },
  { id: "INV-006", name: "Red Chilli Powder", category: "Spices", quantity: 3, unit: "kg", status: "Low Stock", reorderLevel: 5, lastUpdated: "2026-03-24" },
  { id: "INV-007", name: "Onions", category: "Vegetables", quantity: 200, unit: "kg", status: "Overstock", reorderLevel: 80, lastUpdated: "2026-03-24" },
  { id: "INV-008", name: "Tomatoes", category: "Vegetables", quantity: 50, unit: "kg", status: "Optimal", reorderLevel: 30, lastUpdated: "2026-03-24" },
  { id: "INV-009", name: "Coconut Oil", category: "Oils", quantity: 15, unit: "liters", status: "Low Stock", reorderLevel: 20, lastUpdated: "2026-03-23" },
  { id: "INV-010", name: "Cashews", category: "Dry Fruits", quantity: 10, unit: "kg", status: "Optimal", reorderLevel: 5, lastUpdated: "2026-03-22" },
  { id: "INV-011", name: "Milk", category: "Dairy", quantity: 80, unit: "liters", status: "Optimal", reorderLevel: 40, lastUpdated: "2026-03-24" },
  { id: "INV-012", name: "Sugar", category: "Grains", quantity: 90, unit: "kg", status: "Optimal", reorderLevel: 30, lastUpdated: "2026-03-23" },
];

export const monthlyCosts: CostEntry[] = [
  { month: "Oct", inventory: 180000, workforce: 120000, fuel: 25000, misc: 15000 },
  { month: "Nov", inventory: 220000, workforce: 140000, fuel: 30000, misc: 18000 },
  { month: "Dec", inventory: 350000, workforce: 200000, fuel: 45000, misc: 28000 },
  { month: "Jan", inventory: 190000, workforce: 130000, fuel: 22000, misc: 14000 },
  { month: "Feb", inventory: 250000, workforce: 150000, fuel: 35000, misc: 20000 },
  { month: "Mar", inventory: 310000, workforce: 180000, fuel: 40000, misc: 25000 },
];

export const procurementList = [
  { id: "PRC-001", item: "Toor Dal", vendor: "Sri Krishna Stores", qty: 50, unit: "kg", estimatedCost: 5500, urgency: "High" as const, forOrder: "ORD-001" },
  { id: "PRC-002", item: "Red Chilli Powder", vendor: "Spice World", qty: 10, unit: "kg", estimatedCost: 3200, urgency: "High" as const, forOrder: "ORD-001" },
  { id: "PRC-003", item: "Coconut Oil", vendor: "Kerala Traders", qty: 20, unit: "liters", estimatedCost: 4000, urgency: "Medium" as const, forOrder: "ORD-001" },
  { id: "PRC-004", item: "Paneer", vendor: "Amul Distributors", qty: 30, unit: "kg", estimatedCost: 9000, urgency: "Medium" as const, forOrder: "ORD-003" },
  { id: "PRC-005", item: "Cream", vendor: "Amul Distributors", qty: 15, unit: "liters", estimatedCost: 3750, urgency: "Low" as const, forOrder: "ORD-004" },
  { id: "PRC-006", item: "Saffron", vendor: "Kashmir Spice Co", qty: 0.5, unit: "kg", estimatedCost: 15000, urgency: "Medium" as const, forOrder: "ORD-004" },
];
