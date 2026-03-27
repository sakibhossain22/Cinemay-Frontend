import { getMyReviews } from '@/actions/user.action';
import MyReviewsClient from '@/components/user/MyReviewsClient';
import { Star } from 'lucide-react';

async function MyReviews() {
  const response = await getMyReviews();
  const reviews = response?.data || [];

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl flex gap-2 items-center font-black uppercase tracking-tighter text-white"><Star size={32} className="inline-block fill-amber-400 mr-2" /> My  <span className="text-emerald-500">Reviews</span></h1>
          <p className="text-zinc-500 text-sm">Manage your ratings and thoughts on movies.</p>
        </header>
        
        <MyReviewsClient initialReviews={reviews} />
      </div>
    </div>
  );
}

export default MyReviews;