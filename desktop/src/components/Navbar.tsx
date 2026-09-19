import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Globe, Plug, Tag, Eye, Activity, BarChart3, Shield, FileText } from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/sites", label: "Sites", icon: Globe },
  { path: "/integrations", label: "Integrations", icon: Plug },
  { path: "/tags", label: "Tags", icon: Tag },
  { path: "/pixels", label: "Pixels", icon: Eye },
  { path: "/events", label: "Events", icon: Activity },
  { path: "/seo", label: "SEO", icon: BarChart3 },
  { path: "/consent", label: "Consent", icon: Shield },
  { path: "/reports", label: "Reports", icon: FileText },
];

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="omh-sidebar">
      <div className="omh-logo">
        <span className="omh-logo-text">OpenMarketing Hub</span>
      </div>
      <ul className="omh-nav">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <li key={path}>
              <Link to={path} className={`omh-nav-item ${isActive ? "active" : ""}`}>
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};