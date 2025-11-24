import { createClient } from "@/utils/supabase/server";
import { TeamMembersTable } from "@/components/team-members-table";
import { Profile } from "@/types/database";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("last_name", { ascending: true });

  if (error) {
    console.error("Error fetching profiles:", error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">Error loading team members</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <TeamMembersTable profiles={(profiles as Profile[]) || []} />
    </div>
  );
}
