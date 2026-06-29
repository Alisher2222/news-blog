"use server";

import { incrementViews } from "@/db/post";

export async function registerView(id: string) {
  await incrementViews(id);
}
