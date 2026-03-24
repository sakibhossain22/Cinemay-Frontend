import { MessageSquare, Users } from "lucide-react";
import { toast } from "sonner";

// কম্পোনেন্টের ভেতরে এই ফাংশনটি যোগ করুন
 const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    toast.error("Section not found!");
  }
};

// রিটার্ন স্টেটমেন্টে বাটনগুলো এভাবে দিন:
<div className="flex items-center gap-6 py-4">
  {/* Watchlist Button ... */}

  {/* Cast Button */}
  <button 
    onClick={() => scrollToSection("cast-section")}
    className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors"
  >
    <Users className="w-6 h-6" />
    <span className="text-sm font-medium">Cast</span>
  </button>

  {/* Review Button */}
  <button 
    onClick={() => scrollToSection("review-section")}
    className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors"
  >
    <MessageSquare className="w-6 h-6" />
    <span className="text-sm font-medium">Reviews</span>
  </button>

  {/* Share Button ... */}
</div>