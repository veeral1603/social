import UserPosts from "@/src/components/post/UserPosts";
import ProfileInfo from "@/src/components/profile/ProfileInfo";
import React from "react";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <div>
      <ProfileInfo username={username} />
      <UserPosts username={username} />
    </div>
  );
}
