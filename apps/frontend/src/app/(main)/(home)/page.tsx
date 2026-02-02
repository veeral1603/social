import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <Link href="/profile/rdj6969">Valid Profile</Link>
      <Link href="/profile/rdj69asdasdad69">InValid Profile</Link>
    </div>
  );
}
