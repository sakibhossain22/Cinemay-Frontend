import { getAllReviews } from '@/actions/review.admin.action';
import React from 'react';
import { MessageSquare, ShieldCheck, StarIcon } from 'lucide-react';
import ReviewList from '@/components/admin/ReviewList';
import { Separator } from 'radix-ui';

async function ManageReviews() {
  const response = await getAllReviews();
  const reviews = response.success ? response.data.reviews : [];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center border-b border-white/5 pb-6">
          <div>
            <h1 className="text-2xl flex gap-2 items-center font-black tracking-tighter uppercase">
              <StarIcon size={30} fill='#FFD700' className="inline-block  -translate-y-1" />
              User <span className="text-emerald-500">Reviews</span>
            </h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
              Moderation Queue
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="bg-zinc-900/50 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                <MessageSquare size={14} className="text-emerald-500" />
                <span className="text-xs font-black italic">{response.data.totalReviews} TOTAL</span>
             </div>
          </div>
        </div>
        {/* Client Side List */}
        <ReviewList initialReviews={reviews} />

      </div>
    </div>
  );
}

export default ManageReviews;