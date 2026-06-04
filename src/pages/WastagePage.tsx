import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

// Simulated wastage data from last 10 orders
const wastageData = [
  { order: "ORD-096", date: "Mar 10", rice: 8, dal: 3, paneer: 2, vegetables: 12, oil: 1 },
  { order: "ORD-097", date: "Mar 12", rice: 5, dal: 2, paneer: 4, vegetables: 8, oil: 0.5 },
  { order: "ORD-098", date: "Mar 14", rice: 12, dal: 5, paneer: 1, vegetables: 15, oil: 2 },
  { order: "ORD-099", date: "Mar 15", rice: 6, dal: 2, paneer: 3, vegetables: 10, oil: 1 },
  { order: "ORD-100", date: "Mar 17", rice: 9, dal: 4, paneer: 2, vegetables: 14, oil: 1.5 },
  { order: "ORD-001", date: "Mar 19", rice: 7, dal: 3, paneer: 5, vegetables: 11, oil: 1 },
  { order: "ORD-002", date: "Mar 20", rice: 4, dal: 1, paneer: 2, vegetables: 7, oil: 0.5 },
  { order: "ORD-003", date: "Mar 22", rice: 10, dal: 4, paneer: 3, vegetables: 13, oil: 2 },
  { order: "ORD-004", date: "Mar 23", rice: 6, dal: 2, paneer: 1, vegetables: 9, oil: 1 },
  { order: "ORD-005", date: "Mar 24", rice: 8, dal: 3, paneer: 2, vegetables: 11, oil: 1.5 },
];

const items = ["rice", "dal", "paneer", "vegetables", "oil"] as const;

const avgWastage = items.map((item) => {
  const values = wastageData.map((d) => d[item]);
  const avg = values.reduce((s, v) => s + v, 0) / values.length;
  const trend = values[values.length - 1] - values[0];
  return { item: item.charAt(0).toUpperCase() + item.slice(1), avg: Math.round(avg * 10) / 10, unit: item === "oil" ? "L" : "kg", trend, last: values[values.length - 1] };
});

const trendChartData = wastageData.map((d) => ({
  name: d.date,
  Rice: d.rice,
  Vegetables: d.vegetables,
  Dal: d.dal,
  Paneer: d.paneer,
}));


export default function WastagePage() {
  const totalAvgWastage = avgWastage.reduce((s, a) => s + a.avg, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Food Wastage & Market Intelligence</h1>
        <p className="text-muted-foreground text-sm mt-1">Progressive wastage tracking from last 10 orders & geopolitical impact alerts</p>
      </div>

      {/* Wastage KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-luxury border-border/50">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-destructive/10"><AlertTriangle className="h-5 w-5 text-destructive" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Total Wastage/Order</p>
              <p className="text-xl font-semibold">{totalAvgWastage.toFixed(1)} kg</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-luxury border-border/50">
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Most Wasted Item</p>
            <p className="text-xl font-semibold text-destructive">Vegetables</p>
            <p className="text-xs text-muted-foreground mt-1">Avg {avgWastage.find(a => a.item === "Vegetables")?.avg} kg/order</p>
          </CardContent>
        </Card>
        <Card className="shadow-luxury border-border/50">
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Estimated Monthly Loss</p>
            <p className="text-xl font-semibold text-gold">₹{(totalAvgWastage * 45 * 4).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Wastage Trend Chart */}
      <Card className="shadow-luxury border-border/50">
        <CardContent className="p-5">
          <p className="font-display font-medium text-sm mb-4">Wastage Trend — Last 10 Orders</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} unit=" kg" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="Vegetables" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Rice" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Dal" stroke="hsl(var(--warning))" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Paneer" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Per-Item Recommendations */}
      <Card className="shadow-luxury border-border/50">
        <CardContent className="p-5">
          <p className="font-display font-medium text-sm mb-4">Item-Level Wastage Analysis & Recommendations</p>
          <div className="space-y-3">
            {avgWastage.map((a) => (
              <div key={a.item} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xs font-semibold">
                    {a.item.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{a.item}</p>
                    <p className="text-xs text-muted-foreground">Avg wastage: {a.avg} {a.unit}/order</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <div className="flex items-center gap-1 text-xs">
                    {a.trend > 0 ? (
                      <span className="text-destructive flex items-center gap-0.5"><TrendingUp className="h-3 w-3" /> Rising</span>
                    ) : (
                      <span className="text-success flex items-center gap-0.5"><TrendingDown className="h-3 w-3" /> Improving</span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Reduce by {Math.max(1, Math.round(a.avg * 0.15))} {a.unit}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
