import { createClient } from "@/utils/supabase/server";
import { Profile } from "@/types/database";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Profile not found</p>
          <Link
            href="/dashboard"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const profileData = profile as Profile;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">
              {profileData.first_name || ""} {profileData.last_name || ""}
            </h1>
            {profileData.title && (
              <p className="text-blue-100 mt-1">{profileData.title}</p>
            )}
          </div>

          <div className="px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900">{profileData.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <p className="mt-1 text-gray-900">
                      {profileData.phone_number || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                  Team Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Team
                    </label>
                    <p className="mt-1 text-gray-900">
                      {profileData.team || "Not assigned"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <p className="mt-1 text-gray-900">
                      {profileData.title || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                  System IDs
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Shiftboard ID
                    </label>
                    <p className="mt-1 text-gray-900">
                      {profileData.shiftboard_id || "Not set"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      HLSR Scheduling ID
                    </label>
                    <p className="mt-1 text-gray-900">
                      {profileData.hlsr_scheduling_id || "Not set"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                  Metadata
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Created At
                    </label>
                    <p className="mt-1 text-gray-900">
                      {formatDate(profileData.created_at)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Updated
                    </label>
                    <p className="mt-1 text-gray-900">
                      {formatDate(profileData.last_updated)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
