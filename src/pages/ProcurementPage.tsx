import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { procurementList } from "@/data/dummy";
import { ShoppingCart, Download, Sparkles } from "lucide-react";

const urgencyStyle = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-success/10 text-success border-success/20",
};

export default function ProcurementPage() {
  const totalCost = procurementList.reduce((s, p) => s + p.estimatedCost, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-semibold">Procurement</h1>
          <p className="text-muted-foreground text-sm mt-1">Auto-generated purchase plan based on orders & inventory</p>
        </div>
        <Button className="gradient-gold text-accent-foreground gap-2">
          <Download className="h-4 w-4" /> Export List
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-luxury border-border/50">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="p-2.5 rounded-lg gradient-gold"><ShoppingCart className="h-5 w-5 text-accent-foreground" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Items to Procure</p>
              <p className="text-xl font-semibold">{procurementList.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-luxury border-border/50">
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Estimated Total Cost</p>
            <p className="text-xl font-semibold text-gold">₹{totalCost.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="shadow-luxury border-border/50">
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Urgent Items</p>
            <p className="text-xl font-semibold text-destructive">{procurementList.filter(p => p.urgency === "High").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="shadow-luxury border-border/50 overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium text-muted-foreground">Item</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Vendor</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Quantity</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Est. Cost</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Urgency</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">For Order</th>
                </tr>
              </thead>
              <tbody>
                {procurementList.map((item) => (
                  <tr key={item.id} className="border-t border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium">{item.item}</td>
                    <td className="p-3 text-muted-foreground">{item.vendor}</td>
                    <td className="p-3 text-right">{item.qty} {item.unit}</td>
                    <td className="p-3 text-right text-gold">₹{item.estimatedCost.toLocaleString()}</td>
                    <td className="p-3 text-center">
                      <Badge variant="outline" className={urgencyStyle[item.urgency]}>{item.urgency}</Badge>
                    </td>
                    <td className="p-3 text-muted-foreground">{item.forOrder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="shadow-luxury border-gold/30 bg-gradient-to-r from-card to-secondary/30">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg gradient-gold shrink-0"><Sparkles className="h-4 w-4 text-accent-foreground" /></div>
            <div className="space-y-2">
              <p className="font-display font-medium text-sm">Smart Procurement Suggestions</p>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                <li>• <strong>Bulk buy opportunity:</strong> Dal prices are expected to rise 8% next week. Order 100kg now to save ₹4,400.</li>
                <li>• <strong>Vendor switch:</strong> Kerala Traders offers coconut oil at ₹180/L vs current ₹200/L. Annual savings: ₹4,800.</li>
                <li>• <strong>Combined delivery:</strong> Merge ORD-001 & ORD-003 paneer orders for 15% volume discount from Amul.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
