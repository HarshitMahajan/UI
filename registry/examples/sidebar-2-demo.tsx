"use client";

import { Calendar, ChartColumn, FileText, House, MessageSquare, Settings, ShoppingCart, Users } from "lucide-react";
import { useState } from "react";

import {
  Sidebar2,
  Sidebar2Brand,
  Sidebar2Item,
  Sidebar2Person,
  Sidebar2Section,
  Sidebar2User,
} from "@/components/kit/sidebar-2";

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=64&h=64&fit=crop&crop=faces`;

const pages = [
  { name: "Dashboard", icon: <House /> },
  { name: "Analytics", icon: <ChartColumn /> },
  { name: "Team", icon: <Users /> },
  { name: "Messages", icon: <MessageSquare /> },
  { name: "Documents", icon: <FileText /> },
  { name: "Calendar", icon: <Calendar /> },
  { name: "Settings", icon: <Settings /> },
];

const team = [
  { name: "Sarah Kim", role: "Design", id: "1494790108377-be9c29b29330", online: true },
  { name: "John Doe", role: "Engineering", id: "1507003211169-0a1dd7228f2d", online: true },
  { name: "Mike Taylor", role: "Engineering", id: "1500648767791-00dcc994a43e", online: false },
  { name: "Lisa Park", role: "Product", id: "1438761681033-6461ffad8d80", online: true },
  { name: "Ravi Singh", role: "Data", id: "1534528741775-53994a69daeb", online: false },
];

export function Sidebar2Demo() {
  const [page, setPage] = useState("Dashboard");

  return (
    <div className="flex h-180 w-full justify-center bg-background">
      <Sidebar2 aria-label="Main" className="border-s">
        <Sidebar2Brand logo={<ShoppingCart aria-hidden="true" />} title="Acme Store" />
        {pages.map(({ name, icon }) => (
          <Sidebar2Item key={name} icon={icon} active={page === name} onClick={() => setPage(name)}>
            {name}
          </Sidebar2Item>
        ))}
        <Sidebar2Section label="Your team">
          {team.map(({ name, role, id, online }) => (
            <Sidebar2Person key={name} name={name} role={role} avatar={photo(id)} online={online} />
          ))}
        </Sidebar2Section>
        <Sidebar2User name="Jordan Diaz" email="jordan@example.com" avatar={photo("1472099645785-5658abf4ff4e")} />
      </Sidebar2>
    </div>
  );
}
