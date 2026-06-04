import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { procurementList } from "@/data/dummy";
import { ShoppingCart, Download, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const urgencyStyle = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-success/10 text-success border-success/20",
};

export interface CartItem {
  id: string;
  item: string;
  vendor: string;
  qty: number;
  unit: string;
  price: number;
  urgency: "High" | "Medium" | "Low";
  forOrder: string;
}

// Simple global cart store
let globalCart: CartItem[] = [];
export const getCart = () => globalCart;
export const clearCart = () => { globalCart = []; };

export default function ProcurementPage() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<typeof procurementList[0] | null>(null);
  const [editQty, setEditQty] = useState(0);
  const [editPrice, setEditPrice] = useState(0);
  const [cart, setCart] = useState<CartItem[]>(globalCart);

  const totalCost = procurementList.reduce((s, p) => s + p.estimatedCost, 0);

  const openItem = (item: typeof procurementList[0]) => {
    setSelectedItem(item);
    setEditQty(item.qty);
    setEditPrice(item.estimatedCost);
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;
    const cartItem: CartItem = {
      id: selectedItem.id,
      item: selectedItem.item,
      vendor: selectedItem.vendor,
      qty: editQty,
      unit: selectedItem.unit,
      price: editPrice,
      urgency: selectedItem.urgency,
      forOrder: selectedItem.forOrder,
    };
    const exists = globalCart.findIndex(c => c.id === cartItem.id);
    if (exists >= 0) {
      globalCart[exists] = cartItem;
    } else {
      globalCart.push(cartItem);
    }
    setCart([...globalCart]);
    setSelectedItem(null);
    toast.success(`${cartItem.item} added to cart`);
  };

  const handleProcured = () => {
    if (!selectedItem) return;
    toast.success(`${selectedItem.item} marked as procured`);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-semibold">Procurement</h1>
          <p className="text-muted-foreground text-sm mt-1">Auto-generated purchase plan based on orders & inventory</p>
        </div>
        <div className="flex gap-2">
          {cart.length > 0 && (
            <Button variant="outline" className="gap-2 border-primary/30" onClick={() => navigate("/cart")}>
              <ShoppingCart className="h-4 w-4" />
              Cart ({cart.length})
              <Badge className="ml-1 bg-primary text-primary-foreground text-[10px]">
                ₹{cart.reduce((s, c) => s + c.price, 0).toLocaleString()}
              </Badge>
            </Button>
          )}
          <Button className="gradient-gold text-accent-foreground gap-2">
            <Download className="h-4 w-4" /> Export List
          </Button>
        </div>
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
                  <tr
                    key={item.id}
                    className="border-t border-border/30 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => openItem(item)}
                  >
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



      {/* Item Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">{selectedItem?.item}</DialogTitle>
            <DialogDescription>Review and edit procurement details</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Vendor</p>
                  <p className="font-medium">{selectedItem.vendor}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">For Order</p>
                  <p className="font-medium">{selectedItem.forOrder}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Urgency</p>
                  <Badge variant="outline" className={urgencyStyle[selectedItem.urgency]}>{selectedItem.urgency}</Badge>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Unit</p>
                  <p className="font-medium">{selectedItem.unit}</p>
                </div>
              </div>
              <div className="space-y-3 pt-2 border-t border-border/50">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Quantity ({selectedItem.unit})</label>
                  <Input
                    type="number"
                    value={editQty}
                    onChange={(e) => setEditQty(Number(e.target.value))}
                    min={0}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Estimated Price (₹)</label>
                  <Input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    min={0}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={handleProcured} className="border-success/30 text-success hover:bg-success/10">
              ✓ Procured
            </Button>
            <Button onClick={handleAddToCart} className="gradient-gold text-accent-foreground gap-1">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
