"use server";

import { revalidatePath } from "next/cache";

// ১. মুভিতে লাইক দেওয়া বা রিমুভ করা
export async function toggleLike(movieId: string, userId: string) {
  // const existingLike = await prisma.like.findFirst({
  //   where: { movieId, userId },
  // });

  // if (existingLike) {
  //   await prisma.like.delete({ where: { id: existingLike.id } });
  // } else {
  //   await prisma.like.create({ data: { movieId, userId } });
  // }
  revalidatePath(`/watch/${movieId}`);
}

// ২. রিভিউ সাবমিট করা
export async function submitReview(formData: FormData) {
  const movieId = formData.get("movieId") as string;
  const userId = formData.get("userId") as string;
  const rating = Number(formData.get("rating"));
  const content = formData.get("content") as string;
  const isSpoiler = formData.get("isSpoiler") === "on";

console.log(movieId, userId, rating, content, isSpoiler)

  revalidatePath(`/watch/${movieId}`);
}