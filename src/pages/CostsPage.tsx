import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyCosts } from "@/data/dummy";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area } from "recharts";
import { IndianRupee, TrendingDown, TrendingUp, Sparkles } from "lucide-react";

export default function CostsPage() {
  const latest = monthlyCosts[monthlyCosts.length - 1];
  const prev = monthlyCosts[monthlyCosts.length - 2];
  const totalLatest = latest.inventory + latest.workforce + latest.fuel + latest.misc;
  const totalPrev = prev.inventory + prev.workforce + prev.fuel + prev.misc;
  const change = ((totalLatest - totalPrev) / totalPrev * 100).toFixed(1);

  const breakdownData = [
    { name: "Inventory", value: latest.inventory, color: "hsl(36,38%,61%)" },
    { name: "Workforce", value: latest.workforce, color: "hsl(20,55%,15%)" },
    { name: "Fuel/Gas", value: latest.fuel, color: "hsl(30,20%,60%)" },
    { name: "Misc", value: latest.misc, color: "hsl(142,50%,40%)" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Cost Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Track expenses and optimize spending</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {breakdownData.map((item) => (
          <Card key={item.name} className="shadow-luxury border-border/50">
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.name}</p>
              <p className="text-xl font-semibold mt-1">₹{(item.value / 1000).toFixed(0)}K</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="shadow-luxury border-border/50">
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Monthly Cost</p>
            <p className="text-2xl font-semibold mt-1">₹{(totalLatest / 1000).toFixed(0)}K</p>
            <div className={`flex items-center gap-1 mt-1 text-xs ${Number(change) > 0 ? "text-destructive" : "text-success"}`}>
              {Number(change) > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {change}% vs last month
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-luxury border-border/50">
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Est. Profit Margin</p>
            <p className="text-2xl font-semibold mt-1 text-success">32.4%</p>
            <p className="text-xs text-muted-foreground mt-1">Based on current pipeline</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-luxury border-border/50">
          <CardHeader className="pb-2"><CardTitle className="text-base font-display">Cost Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyCosts}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,20%,88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v / 1000}K`} />
                <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
                <Area type="monotone" dataKey="inventory" stackId="1" fill="hsl(36,38%,61%)" stroke="hsl(36,38%,61%)" fillOpacity={0.6} />
                <Area type="monotone" dataKey="workforce" stackId="1" fill="hsl(20,55%,15%)" stroke="hsl(20,55%,15%)" fillOpacity={0.6} />
                <Area type="monotone" dataKey="fuel" stackId="1" fill="hsl(30,20%,60%)" stroke="hsl(30,20%,60%)" fillOpacity={0.6} />
                <Area type="monotone" dataKey="misc" stackId="1" fill="hsl(142,50%,40%)" stroke="hsl(142,50%,40%)" fillOpacity={0.6} />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-luxury border-border/50">
          <CardHeader className="pb-2"><CardTitle className="text-base font-display">Cost per Category</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={breakdownData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,20%,88%)" />
                <XAxis type="number" tickFormatter={(v) => `₹${v / 1000}K`} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
                <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
                <Bar dataKey="value" fill="hsl(36,38%,61%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
