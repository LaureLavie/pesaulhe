import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteLayout } from "@/components/layout/SiteLayout";
import Index from "./pages/Index.tsx";
import Chambres from "./pages/Chambres.tsx";
import RoomDetail from "./pages/RoomDetail.tsx";
import Lieu from "./pages/Lieu.tsx";
import APropos from "./pages/APropos.tsx";
import Contact from "./pages/Contact.tsx";
import Reserver from "./pages/Reserver.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/chambres", element: <Chambres /> },
      { path: "/chambres/:slug", element: <RoomDetail /> },
      { path: "/lieu", element: <Lieu /> },
      { path: "/a-propos", element: <APropos /> },
      { path: "/contact", element: <Contact /> },
      { path: "/reserver", element: <Reserver /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
