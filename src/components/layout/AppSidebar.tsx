import closeFriendsLogoTransparent from '@/assets/close-friends-logo-sem-fundo.png';
import { LayoutDashboard, Wallet, TrendingUp, FileText, Settings, HelpCircle } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  {
    title: "Dashboard",
    url: "/portfolio",
    icon: LayoutDashboard,
  },
  {
    title: "Carteira",
    url: "/portfolio",
    icon: Wallet,
  },
  {
    title: "Carteira Recomendada",
    url: "/carteira-recomendada",
    icon: FileText,
  },
  {
    title: "Análises",
    url: "#",
    icon: TrendingUp,
  },
];

const footerItems = [
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
  {
    title: "Ajuda",
    url: "#",
    icon: HelpCircle,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r bg-sidebar">
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b bg-sidebar">
          <img
            src={closeFriendsLogoTransparent}
            alt="Close Friends Pro"
            className="w-[100px] h-[100px] object-contain"
          />
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Footer Items */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {footerItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t p-4 bg-sidebar">
        <div className="flex items-center gap-2 text-xs text-sidebar-foreground">
          {open && <span>© 2025 Close Friends Pro</span>}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
