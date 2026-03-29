import { getAllReviews } from '@/actions/review.admin.action';
import React from 'react';
import { MessageSquare, StarIcon } from 'lucide-react';
import ReviewList from '@/components/admin/ReviewList';

async function ManageReviews() {
  const response = await getAllReviews();
  const reviews = response.success ? response.data.reviews : [];
  const totalReviews = response.data?.totalReviews || 0;

  return (
    <div className="min-h-screen  bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-4xl flex gap-2 md:gap-3 items-center font-black tracking-tighter uppercase">
              <StarIcon 
                size={32} 
                fill='#FFD700' 
                className="inline-block text-yellow-500" 
              />
              User <span className="text-emerald-500">Reviews</span>
            </h1>
            <p className="text-[9px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] ml-1">
              Moderation Queue & Feedback Control
            </p>
          </div>
          
          <div className="flex items-center self-end sm:self-center">
             <div className="bg-zinc-900/30 backdrop-blur-md px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl border border-white/5 flex items-center gap-2 md:gap-3 group hover:border-emerald-500/30 transition-all">
                <MessageSquare size={14} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                <div className="flex items-center gap-2 lg:flex-col leading-none">
                   <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter mb-0.5 md:mb-1">Total</span>
                   <span className="text-sm md:text-xl font-black italic text-white">{totalReviews}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="w-full">
          <ReviewList initialReviews={reviews} />
        </div>

      </div>
    </div>
  );
}

export default ManageReviews;