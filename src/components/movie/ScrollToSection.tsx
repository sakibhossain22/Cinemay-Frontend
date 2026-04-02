import { MessageSquare, Users } from "lucide-react";
import { toast } from "sonner";

 const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    toast.error("Section not found!");
  }
};

<div className="flex items-center gap-6 py-4">
  

  
  <button 
    onClick={() => scrollToSection("cast-section")}
    className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors"
  >
    <Users className="w-6 h-6" />
    <span className="text-sm font-medium">Cast</span>
  </button>

  
  <button 
    onClick={() => scrollToSection("review-section")}
    className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors"
  >
    <MessageSquare className="w-6 h-6" />
    <span className="text-sm font-medium">Reviews</span>
  </button>

  
</div>