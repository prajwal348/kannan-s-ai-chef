import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { inventory } from "@/data/dummy";
import { Search, Package, AlertTriangle, Sparkles } from "lucide-react";
import { useState } from "react";

const statusStyle = {
  "Low Stock": "bg-destructive/10 text-destructive border-destructive/20",
  "Optimal": "bg-success/10 text-success border-success/20",
  "Overstock": "bg-warning/10 text-warning border-warning/20",
};

const categories = ["All", "Vegetables", "Dairy", "Spices", "Grains", "Oils", "Dry Fruits"];

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = inventory.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || i.category === category;
    return matchSearch && matchCat;
  });

  const lowStockItems = inventory.filter(i => i.status === "Low Stock");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Inventory</h1>
        <p className="text-muted-foreground text-sm mt-1">Track stock levels across all categories</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-luxury border-border/50">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="p-2.5 rounded-lg gradient-gold"><Package className="h-5 w-5 text-accent-foreground" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Total Items</p>
              <p className="text-xl font-semibold">{inventory.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-luxury border-border/50">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-destructive/10"><AlertTriangle className="h-5 w-5 text-destructive" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Low Stock Alerts</p>
              <p className="text-xl font-semibold text-destructive">{lowStockItems.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-luxury border-border/50">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-success/10"><Package className="h-5 w-5 text-success" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Optimal Items</p>
              <p className="text-xl font-semibold">{inventory.filter(i => i.status === "Optimal").length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search inventory..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${category === c ? "bg-accent text-accent-foreground border-accent" : "bg-card border-border text-muted-foreground hover:bg-muted"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="shadow-luxury border-border/50 overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium text-muted-foreground">Item</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Category</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Quantity</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Reorder Level</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-t border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3 text-muted-foreground">{item.category}</td>
                    <td className="p-3 text-right">{item.quantity} {item.unit}</td>
                    <td className="p-3 text-right text-muted-foreground">{item.reorderLevel} {item.unit}</td>
                    <td className="p-3 text-center">
                      <Badge variant="outline" className={statusStyle[item.status]}>{item.status}</Badge>
                    </td>
                    <td className="p-3 text-right text-muted-foreground">{new Date(item.lastUpdated).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
