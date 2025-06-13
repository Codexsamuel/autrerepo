import { 
  LayoutDashboard, 
  Video, 
  Users, 
  BarChart, 
  Settings, 
  Building2,
  Box
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard
  },
  {
    title: "CRM Vidéo",
    href: "/video-crm",
    icon: Video
  },
  {
    title: "Intégrations CRM",
    href: "/crm-integrations",
    icon: Users
  },
  {
    title: "Intégrations Sectorielles",
    href: "/sector-integrations",
    icon: Building2
  },
  {
    title: "DL Solutions Hub",
    href: "/dlsolutions-hub",
    icon: Box
  },
  {
    title: "Projets",
    href: "/projects",
    icon: BarChart
  },
  {
    title: "Paramètres",
    href: "/settings",
    icon: Settings
  }
]; 