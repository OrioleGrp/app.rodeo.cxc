"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Profile } from "@/types/database";

type SortColumn = keyof Profile | null;
type SortDirection = "asc" | "desc";

interface TeamMembersTableProps {
  profiles: Profile[];
}

export function TeamMembersTable({ profiles }: TeamMembersTableProps) {
  const router = useRouter();
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (column: keyof Profile) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedProfiles = useMemo(() => {
    if (!sortColumn) return profiles;

    return [...profiles].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === null) return 1;
      if (bValue === null) return -1;
      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [profiles, sortColumn, sortDirection]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (profiles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No team members found</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("title")}
            >
              Title {sortColumn === "title" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("first_name")}
            >
              First Name {sortColumn === "first_name" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("last_name")}
            >
              Last Name {sortColumn === "last_name" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("team")}
            >
              Team {sortColumn === "team" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("phone_number")}
            >
              Phone Number {sortColumn === "phone_number" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("email")}
            >
              Email {sortColumn === "email" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("shiftboard_id")}
            >
              Shiftboard ID {sortColumn === "shiftboard_id" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("hlsr_scheduling_id")}
            >
              HLSR Scheduling ID {sortColumn === "hlsr_scheduling_id" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("last_updated")}
            >
              Last Updated {sortColumn === "last_updated" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProfiles.map((profile) => (
            <TableRow
              key={profile.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => router.push(`/profile/${profile.id}`)}
            >
              <TableCell>{profile.title || "-"}</TableCell>
              <TableCell>{profile.first_name || "-"}</TableCell>
              <TableCell>{profile.last_name || "-"}</TableCell>
              <TableCell>{profile.team || "-"}</TableCell>
              <TableCell>{profile.phone_number || "-"}</TableCell>
              <TableCell>{profile.email}</TableCell>
              <TableCell>{profile.shiftboard_id || "-"}</TableCell>
              <TableCell>{profile.hlsr_scheduling_id || "-"}</TableCell>
              <TableCell>{formatDate(profile.last_updated)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
