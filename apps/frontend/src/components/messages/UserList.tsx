import { Profile } from "@repo/shared-types";
import React from "react";
import { Spinner } from "../ui/spinner";
import { MessageCircleMore } from "lucide-react";
import { toast } from "sonner";
import { searchUsers } from "@/src/services/user.service";
import UserListItem from "./UserListItem";

interface Props {
  searchQuery: string;
}

export default function UserList({ searchQuery }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [users, setUsers] = React.useState<{ id: string; profile: Profile }[]>(
    [],
  );

  const fetchUsers = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await searchUsers(query);
      if (!response.success)
        throw new Error(response.message || "Failed to search users");
      setUsers(response.data);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (searchQuery.trim() === "") {
      setUsers([]);
      return;
    }
    const delayDebounce = setTimeout(() => {
      fetchUsers(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  if (searchQuery.trim() === "" && users.length === 0) {
    return (
      <div className="p-4 mt-4 text-center  flex flex-col items-center gap-2">
        <MessageCircleMore size={48} className="text-primary" />
        <h2 className="text-2xl font-bold ">Search User</h2>
        <p className="text-muted-foreground ">
          Search for a user to start a conversation
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner className="size-5" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">No results</div>
    );
  }
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </div>
  );
}
