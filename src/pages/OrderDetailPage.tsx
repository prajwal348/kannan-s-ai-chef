import { useParams, useNavigate } from "react-router-dom";
import { orders } from "@/data/dummy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, MapPin, Phone, ChefHat, Sparkles } from "lucide-react";

const statusColor = {
  "Confirmed": "bg-info/10 text-info border-info/20",
  "In Progress": "bg-warning/10 text-warning border-warning/20",
  "Completed": "bg-success/10 text-success border-success/20",
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = orders.find((o) => o.id === id);

  if (!order) return <div className="p-6">Order not found.</div>;

  const menuSections = [
    { title: "Starters", items: order.menu.starters },
    { title: "Main Course", items: order.menu.mainCourse },
    { title: "Desserts", items: order.menu.desserts },
    { title: "Beverages", items: order.menu.beverages },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/orders")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-display font-semibold">{order.clientName}</h1>
          <p className="text-sm text-muted-foreground">{order.id}</p>
        </div>
        <Badge variant="outline" className={`ml-auto ${statusColor[order.status]}`}>{order.status}</Badge>
      </div>

      {/* Order Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Clock, label: "Date & Time", value: `${new Date(order.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · ${order.eventTime}` },
          { icon: Users, label: "PAX", value: `${order.pax} guests` },
          { icon: MapPin, label: "Venue", value: order.venue },
          { icon: Phone, label: "Contact", value: order.phone },
        ].map((info) => (
          <Card key={info.label} className="shadow-luxury border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <info.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{info.label}</p>
                <p className="text-sm font-medium">{info.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Menu */}
      <Card className="shadow-luxury border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display flex items-center gap-2"><ChefHat className="h-4 w-4" /> Menu Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuSections.map((section) => (
              <div key={section.title}>
                <p className="text-sm font-medium text-gold mb-2">{section.title}</p>
                <div className="space-y-1.5">
                  {section.items.map((item) => (
                    <div key={item.name} className="flex justify-between text-sm py-1 border-b border-border/30 last:border-0">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground">{item.qty} pcs</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customizations */}
      {(order.customizations.dietary.length > 0 || order.customizations.liveCounters.length > 0 || order.customizations.addOns.length > 0) && (
        <Card className="shadow-luxury border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Customizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {order.customizations.dietary.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gold mb-2">Dietary Requests</p>
                  {order.customizations.dietary.map((d) => <p key={d} className="text-sm text-muted-foreground">• {d}</p>)}
                </div>
              )}
              {order.customizations.liveCounters.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gold mb-2">Live Counters</p>
                  {order.customizations.liveCounters.map((c) => <Badge key={c} variant="secondary" className="mr-1 mb-1">{c}</Badge>)}
                </div>
              )}
              {order.customizations.addOns.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gold mb-2">Add-Ons</p>
                  {order.customizations.addOns.map((a) => <Badge key={a} variant="secondary" className="mr-1 mb-1">{a}</Badge>)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}



      <div className="flex justify-end">
        <p className="text-lg font-display font-semibold">Total: <span className="text-gold">₹{order.totalCost.toLocaleString()}</span></p>
      </div>
    </div>
  );
}
