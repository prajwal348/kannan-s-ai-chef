import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import CostsPage from "./pages/CostsPage";
import InventoryPage from "./pages/InventoryPage";
import ProcurementPage from "./pages/ProcurementPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import CartPage from "./pages/CartPage";
import WastagePage from "./pages/WastagePage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route path="/costs" element={<CostsPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/procurement" element={<ProcurementPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wastage" element={<WastagePage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
