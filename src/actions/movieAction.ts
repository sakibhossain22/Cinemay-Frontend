"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
// ১. মুভিতে লাইক দেওয়া বা রিমুভ করা
export async function toggleLike(reviewId: string, userId: string, customid: string) {
  const cookieStore = await cookies();

  console.log(customid, reviewId)
  const likeStatus = await fetch(`${process.env.API_URL}/review/like-review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString()
    },
    body: JSON.stringify({ reviewId, userId })
  });
  const res = await likeStatus.json();
  console.log("Like Action Response", res);
  if (!res.success) {
    throw new Error("Failed to update like status");
  }
  if (res.success) {
    revalidatePath(`/movies/details/${customid}`);
    return {
      success: res.success,
      ok: res.ok,
      isLiked: res.data.liked
    };
  }

}

// ২. রিভিউ সাবমিট করা
export async function submitReview(formData: FormData) {
  const cookieStore = await cookies();

  const movieId = formData.get("movieId") as string;
  const rating = Number(formData.get("rating"));
  const content = formData.get("content") as string;
  const customid = formData.get("customId") as string;
  const userId = formData.get("userId") as string;
  const isSpoiler = formData.get("hasSpoiler") === "on";
  if (!movieId || !userId || !content) {
    throw new Error("Missing required fields");
  }
  // console.log(customid)
  const reviewData = {
    movieId,
    content,
    rating,
    hasSpoiler: isSpoiler,
  };
  // console.log(reviewData)
  const response = await fetch(`${process.env.API_URL}/review/add-review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString()
    },
    body: JSON.stringify(reviewData)
  });
  const res = await response.json();
  if (!res.success) {
    throw new Error(res.error || "Failed to add review");
  }
  if (res.success) {
    revalidatePath(`/movies/details/${customid}`);
    return {
      success: res.success,
      ok: res.ok
    };
  }

}


export async function addComment(formData: FormData) {
  const cookieStore = await cookies();

  const reviewId = formData.get("reviewId") as string;
  const content = formData.get("content") as string;
  const customId = formData.get("customId") as string; // revalidate করার জন্য

  if (!reviewId || !content) {
    return { success: false, error: "Comment content is required" };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/comments/add-comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString(),
      },
      body: JSON.stringify({ reviewId, content }),
    });

    const res = await response.json();

    if (res.ok) {
      revalidatePath(`/movies/details/${customId}`);
      return { success: true };
    }
    return { success: false, error: res.message };
  } catch (error) {
    return { success: false, error: "Failed to post comment" };
  }
}