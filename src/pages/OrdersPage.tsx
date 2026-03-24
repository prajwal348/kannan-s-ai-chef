import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { orders } from "@/data/dummy";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const statusColor = {
  "Confirmed": "bg-info/10 text-info border-info/20",
  "In Progress": "bg-warning/10 text-warning border-warning/20",
  "Completed": "bg-success/10 text-success border-success/20",
};

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const navigate = useNavigate();

  const filtered = orders.filter(o => {
    const matchSearch = o.clientName.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage all catering orders</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {["All", "Confirmed", "In Progress", "Completed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${filter === s ? "bg-accent text-accent-foreground border-accent" : "bg-card border-border text-muted-foreground hover:bg-muted"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((order) => (
          <Card
            key={order.id}
            className="shadow-luxury border-border/50 hover:border-gold/30 cursor-pointer transition-all"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{order.clientName}</p>
                    <Badge variant="outline" className={statusColor[order.status]}>{order.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.eventType} · {order.cuisineType} · {order.venue}
                  </p>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium">{new Date(order.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">PAX</p>
                    <p className="font-medium">{order.pax}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Value</p>
                    <p className="font-medium text-gold">₹{(order.totalCost / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
