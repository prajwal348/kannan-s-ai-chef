import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCart, clearCart, CartItem } from "@/pages/ProcurementPage";
import { ShoppingCart, Trash2, ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems([...getCart()]);
  }, []);

  const totalValue = items.reduce((s, i) => s + i.price, 0);

  const removeItem = (id: string) => {
    const cart = getCart();
    const idx = cart.findIndex(c => c.id === id);
    if (idx >= 0) cart.splice(idx, 1);
    setItems([...cart]);
  };

  const handlePlaceOrder = () => {
    toast.success("Procurement order placed successfully!");
    clearCart();
    setItems([]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/procurement")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-semibold">Procurement Cart</h1>
          <p className="text-muted-foreground text-sm mt-1">{items.length} items in cart</p>
        </div>
      </div>

      {items.length === 0 ? (
        <Card className="shadow-luxury border-border/50">
          <CardContent className="p-12 text-center">
            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate("/procurement")}>
              Browse Procurement List
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="shadow-luxury border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-medium text-muted-foreground">Item</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Vendor</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Qty</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Price</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Order</th>
                      <th className="text-center p-3 font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-t border-border/30">
                        <td className="p-3 font-medium">{item.item}</td>
                        <td className="p-3 text-muted-foreground">{item.vendor}</td>
                        <td className="p-3 text-right">{item.qty} {item.unit}</td>
                        <td className="p-3 text-right text-gold">₹{item.price.toLocaleString()}</td>
                        <td className="p-3 text-muted-foreground">{item.forOrder}</td>
                        <td className="p-3 text-center">
                          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-luxury border-primary/20">
            <CardContent className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Total Cart Value</p>
                <p className="text-2xl font-display font-semibold text-gold">₹{totalValue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">{items.length} items from {new Set(items.map(i => i.vendor)).size} vendors</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" /> Export
                </Button>
                <Button className="gradient-gold text-accent-foreground gap-2" onClick={handlePlaceOrder}>
                  Place Procurement Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
