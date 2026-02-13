import HomepageFeed from "@/src/components/feed/HomepageFeed";
import HomePostCard from "@/src/components/post/HomePostCard";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <HomePostCard />
      <HomepageFeed />
    </div>
  );
}
