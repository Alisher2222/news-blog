import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getUserById = unstable_cache(
  async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, surname: true },
    });
  },
  ["user-by-id"],
  { revalidate: 300 },
);
