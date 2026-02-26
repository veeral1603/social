import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import UserPosts from "../post/UserPosts";
import UserReplies from "../post/UserReplies";
interface Props {
  username: string;
}

export default function ProfileTabs({ username }: Props) {
  return (
    <Tabs defaultValue="posts" className="w-full mt-2 mx-0! gap-0">
      <TabsList
        variant="line"
        className="p-0! h-auto! border-b border-border w-full flex items-center justify-start! "
      >
        <TabsTrigger
          value="posts"
          className="py-3 px-2 hover:bg-muted/70 rounded-none! max-w-25! flex-auto!"
        >
          Posts
        </TabsTrigger>
        <TabsTrigger
          value="replies"
          className="py-3 px-2 hover:bg-muted/70 rounded-none! max-w-25! flex-auto!"
        >
          Replies
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="p-0!">
        <UserPosts username={username} />
      </TabsContent>
      <TabsContent value="replies" className="p-0!">
        <UserReplies username={username} />
      </TabsContent>
    </Tabs>
  );
}
