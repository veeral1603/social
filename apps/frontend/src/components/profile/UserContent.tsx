import React from "react";

import ProfileTabs from "./ProfileTabs";

interface Props {
  username: string;
}

export default function UserContent({ username }: Props) {
  return (
    <div>
      <ProfileTabs username={username} />
    </div>
  );
}
