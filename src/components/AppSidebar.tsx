import { LayoutDashboard, ClipboardList, IndianRupee, Package, ShoppingCart, Bot, Bell } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Orders", url: "/orders", icon: ClipboardList },
  { title: "Costs", url: "/costs", icon: IndianRupee },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Procurement", url: "/procurement", icon: ShoppingCart },
  { title: "AI Assistant", url: "/ai-assistant", icon: Bot },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        {!collapsed ? (
          <div className="space-y-1">
            <h2 className="font-display text-lg font-semibold text-sidebar-primary-foreground leading-tight">
              Kannan Sharangapani
            </h2>
            <p className="text-xs text-sidebar-foreground/60">Catering Services</p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="font-display text-xl font-bold text-sidebar-primary">KS</span>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent/50 transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
            <Bell className="h-3.5 w-3.5" />
            <span>3 alerts</span>
            <Badge variant="destructive" className="ml-auto text-[10px] h-4 px-1.5">New</Badge>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
