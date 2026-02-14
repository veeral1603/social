import prisma from "../../lib/prisma";

async function searchUsers(query: string, currentUserId: string) {
  const users = await prisma.user.findMany({
    where: {
      id: { not: currentUserId },
      profile: {
        OR: [
          { username: { contains: query, mode: "insensitive" } },
          { name: { contains: query, mode: "insensitive" } },
        ],
      },
    },
    take: 10,
    select: { id: true, profile: true },
  });

  return users;
}

export default { searchUsers };
