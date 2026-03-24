import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { orders, monthlyCosts, inventory } from "@/data/dummy";
import { CalendarDays, Users, IndianRupee, Package, TrendingUp, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router-dom";

const statusColor = {
  "Confirmed": "bg-info/10 text-info border-info/20",
  "In Progress": "bg-warning/10 text-warning border-warning/20",
  "Completed": "bg-success/10 text-success border-success/20",
};

const eventTypeData = [
  { name: "Wedding", value: 2 },
  { name: "Corporate", value: 2 },
  { name: "Birthday", value: 1 },
];
const COLORS = ["hsl(36,38%,61%)", "hsl(20,55%,15%)", "hsl(30,20%,60%)"];

export default function DashboardPage() {
  const navigate = useNavigate();
  const upcomingOrders = orders.filter(o => o.status !== "Completed");
  const totalRevenue = orders.reduce((s, o) => s + o.totalCost, 0);
  const totalPax = orders.reduce((s, o) => s + o.pax, 0);
  const lowStockCount = inventory.filter(i => i.status === "Low Stock").length;
  const latestCosts = monthlyCosts[monthlyCosts.length - 1];
  const totalMonthlyCost = latestCosts.inventory + latestCosts.workforce + latestCosts.fuel + latestCosts.misc;

  const revenueData = monthlyCosts.map(c => ({
    month: c.month,
    cost: c.inventory + c.workforce + c.fuel + c.misc,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back. Here's your operations overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Orders", value: upcomingOrders.length, icon: CalendarDays, sub: "upcoming events" },
          { label: "Total PAX", value: totalPax.toLocaleString(), icon: Users, sub: "guests to serve" },
          { label: "Revenue Pipeline", value: `₹${(totalRevenue / 100000).toFixed(1)}L`, icon: IndianRupee, sub: "total bookings" },
          { label: "Low Stock Items", value: lowStockCount, icon: AlertTriangle, sub: "need attention", alert: lowStockCount > 0 },
        ].map((kpi) => (
          <Card key={kpi.label} className="shadow-luxury border-border/50">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{kpi.label}</p>
                  <p className="text-2xl font-semibold mt-1">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{kpi.sub}</p>
                </div>
                <div className={`p-2.5 rounded-lg ${kpi.alert ? "bg-destructive/10" : "gradient-gold"}`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.alert ? "text-destructive" : "text-accent-foreground"}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 shadow-luxury border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Monthly Cost Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,20%,88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v / 1000}K`} />
                <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
                <Bar dataKey="cost" fill="hsl(36,38%,61%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-luxury border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Events by Type</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={eventTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name }) => name}>
                  {eventTypeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Orders */}
      <Card className="shadow-luxury border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-display">Upcoming Orders</CardTitle>
            <button onClick={() => navigate("/orders")} className="text-xs text-gold hover:underline">View all →</button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-background hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border"
              >
                <div className="space-y-0.5">
                  <p className="font-medium text-sm">{order.clientName}</p>
                  <p className="text-xs text-muted-foreground">{order.eventType} · {order.cuisineType} · {order.pax} PAX</p>
                </div>
                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                  <span className="text-xs text-muted-foreground">{new Date(order.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  <Badge variant="outline" className={statusColor[order.status]}>{order.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="shadow-luxury border-gold/30 bg-gradient-to-r from-card to-secondary/30">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg gradient-gold shrink-0">
              <TrendingUp className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <p className="font-display font-medium text-sm">AI Insight</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Based on upcoming orders (ORD-001 & ORD-004), you'll need approximately 150kg of rice and 80kg of dal by March 28.
                Current stock of Toor Dal is critically low — consider placing an urgent order. Estimated procurement cost: ₹8,700.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
