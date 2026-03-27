/* eslint-disable @typescript-eslint/no-explicit-any */
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

  // ফর্ম ডাটা থেকে ভ্যালুগুলো নেওয়া
  const reviewId = formData.get("reviewId") as string;
  const content = formData.get("content") as string;
  const customId = formData.get("customId") as string;
  const parentId = formData.get("parentId") as string | null; // নেস্টেড কমেন্টের জন্য
  console.log(reviewId, content, customId, parentId)
  // ভ্যালিডেশন
  if (!reviewId || !content) {
    return { success: false, error: "Content is required" };
  }

  try {
    // আপনার ব্যাকএন্ড এপিআই-তে ডাটা পাঠানো
    const response = await fetch(`${process.env.API_URL}/comments/add-comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString(), // অথেনটিকেশন সেশন পাঠানোর জন্য
      },
      body: JSON.stringify({
        content,
        reviewId,
        parentId: parentId || null // যদি parentId থাকে তবেই পাঠাবে
      }),
    });

    const res = await response.json();

    if (response.ok) {
      // পেজ রিvalidation যাতে নতুন কমেন্ট সাথে সাথে দেখা যায়
      revalidatePath(`/movies/details/${customId}`);
      return { success: true, ok: res.ok };
    }

    return { success: false, error: res.message || "Failed to post comment" };
  } catch (error) {
    console.error("ADD_COMMENT_ERROR", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function toggleWatchlist(movieId: string) {
  try {
    // আপনার backend API কল করুন
    const cookieStore = await cookies();
    const response = await fetch(`${process.env.API_URL}/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString()
      },
      body: JSON.stringify({ movieId }),
    });
    const res = await response.json();
    if (response.ok) {
      // revalidatePath(`/movies/${movieId}`);
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    return { success: false };
  }
}


export async function getWatchListByUser(userId: string) {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${process.env.API_URL}/watchlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString()
      },
    });
    const res = await response.json();
    if (response.ok) {
      return { success: true, data: res.data };
    }
    return { success: false, data: [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function getTheMovieDB(id: number, type : string) {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${process.env.API_URL}/admin/tmdb-movie/${id}/${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString()
      }
    });
    const res = await response.json();
    
    if (res.ok) {
      return { success: true, ok: res.ok, data: res.data };
    }
    return { success: false, data: [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}


export async function addMovie(movie: any) {
  const cookieStore = await cookies();

  try {
    const response = await fetch(`${process.env.API_URL}/media/add-media`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString(), // অথেনটিকেশন সেশন পাঠানোর জন্য
      },
      body: JSON.stringify(movie),
    });

    const res = await response.json();

    if (response.ok) {

      return { success: true, ok: res.ok, data: res.data };
    }
    return { success: false, error: res.message || "Failed to post comment" };
  } catch (error) {
    console.error("ADD_MOVIE_ERROR", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function getCategory() {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${process.env.API_URL}/admin/all-categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString()
      },
    });

    const res = await response.json();
    if (response.ok) {
      return { success: true, data: res.data };
    }
    return { success: false, data: [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function addCategory(name: string) {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${process.env.API_URL}/admin/add-category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString()
      },
      body: JSON.stringify({ name }),
    });
    const res = await response.json();

    if (res.ok) {
      revalidatePath(`/admin/dashboard/manage-categories`);
      return { success: true, ok: res.ok, data: res.data };
    }
    return { success: false, data: null, error: res.error || "Failed to add category" };
  }
  catch (error) {
    console.error("ADD_CATEGORY_ERROR", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function updateCategory(id: string, name: string) {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${process.env.API_URL}/admin/update-category/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString()
      },
      body: JSON.stringify({ name })
    })
    const res = await response.json();

    if (res.ok) {
      revalidatePath(`/admin/dashboard/manage-categories`);
      return { success: true, ok: res.ok };
    }
    return { success: false, data: null, error: res.error || "Failed to update category" };
  }
  catch (error) {
    console.error("UPDATE_CATEGORY_ERROR", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function deleteCategory(id: string) {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${process.env.API_URL}/admin/delete-category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString()
      },
    })
    const res = await response.json();
    console.log(res)
    if (res.ok) {
      revalidatePath(`/admin/dashboard/manage-categories`);
      return { success: true, ok: res.ok }
    }
    return { success: false, data: null, error: res.error || "Failed to delete category" }
  }
  catch (error) {
    console.error("DELETE_CATEGORY_ERROR", error);
    return { success: false, error: "Internal server error" }

  }
}
