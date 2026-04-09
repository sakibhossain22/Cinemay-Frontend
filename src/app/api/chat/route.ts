/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllMovies } from "@/services/movieService";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt, history } = await req.json();

    // ১. ডেটাবেজ থেকে মুভিগুলো ফেচ করা (কনটেক্সট দেওয়ার জন্য)
    const movies = await getAllMovies();
    console.log(movies)
    // ২. মুভি ডেটাকে একটি টেক্সট ফরম্যাটে সাজানো
    const movieDataString = movies
      .map((m: any) => `Title: ${m.title}, Genre: ${m.genre}, Category: ${m.category}. Description: ${m.description}`)
      .join("\n");

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      // এখানে আমরা সিস্টেম ইন্সট্রাকশন সেট করছি
      systemInstruction: `তুমি Cinemay মুভি সাইটের একজন এক্সপার্ট অ্যাসিস্ট্যান্ট। 
      আমাদের সাইটে বর্তমানে নিচের মুভিগুলো আছে:
      ${movieDataString}

      তোমার দায়িত্ব হলো:
      - ইউজারকে তাদের পছন্দ বা মুড অনুযায়ী আমাদের এই লিস্ট থেকে মুভি সাজেস্ট করা।
      - লিস্টের বাইরে কোনো মুভি সম্পর্কে জিজ্ঞাসা করলে নম্রভাবে বলো যে সেটি আপাতত আমাদের সংগ্রহে নেই।
      - টিকিট বুকিং বা মুভি রিলেটেড তথ্য সংক্ষেপে এবং বন্ধুসুলভ বাংলায় দাও।`
    });

    // ৩. চ্যাট সেশন শুরু করা
    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7, // একটু ক্রিয়েটিভ উত্তরের জন্য ০.৭ ভালো
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "AI রেসপন্স পেতে সমস্যা হয়েছে" }, { status: 500 });
  }
}