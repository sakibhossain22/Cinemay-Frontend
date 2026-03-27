/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import { Star, Edit2, Trash2, Film, Clock, CheckCircle2, XCircle, Loader2, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { deleteReview, updateReview } from '@/actions/user.action';
export default function MyReviewsClient({ initialReviews }: { initialReviews: any[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // এডিট স্টেটের জন্য
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // ডিলিট হ্যান্ডলার
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      setDeletingId(id);
      const res = await deleteReview(id);
      if (res?.success) {
        setReviews(reviews.filter(r => r.id !== id));
        toast.success("Review deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete review");
    } finally {
      setDeletingId(null);
    }
  };

  // এডিট শুরু করার হ্যান্ডলার
  const startEditing = (id: string, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  // আপডেট সেভ করার হ্যান্ডলার
  const handleSaveEdit = async (id: string) => {
    if (!editContent.trim()) return toast.error("Content cannot be empty");

    try {
      setIsUpdating(true);
      const res = await updateReview(id, { content: editContent });
      
      if (res?.success) {
        setReviews(reviews.map(r => r.id === id ? { ...r, content: editContent, isApproved: false } : r));
        toast.success("Review updated and sent for re-approval");
        setEditingId(null);
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (error) {
      toast.error("An error occurred during update");
    } finally {
      setIsUpdating(false);
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-20 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl">
        <Film className="mx-auto text-zinc-700 mb-4" size={48} />
        <p className="text-zinc-500">You havent reviewed any movies yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl hover:bg-zinc-900/60 transition-all group">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/10 rounded-lg">
                  <Film size={18} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100">{review.movie.title}</h3>
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">
                    {review.movie.releaseYear} • {review.movie.genre.join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {[...Array(10)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    className={`${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-800'}`} 
                  />
                ))}
                <span className="ml-2 text-xs font-bold text-amber-400">{review.rating}/10</span>
              </div>

              {/* Conditional Rendering for Edit Mode */}
              {editingId === review.id ? (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                  <textarea 
                    className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-sm text-zinc-200 focus:border-blue-500 outline-none min-h-[100px]"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleSaveEdit(review.id)}
                      disabled={isUpdating}
                      className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-500 disabled:opacity-50"
                    >
                      {isUpdating ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                      Save
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      className="flex items-center gap-1 px-4 py-2 bg-zinc-800 text-zinc-400 rounded-lg text-xs font-bold hover:bg-zinc-700"
                    >
                      <X size={14} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-zinc-400 text-sm italic leading-relaxed">
                  {review.content}
                </p>
              )}

              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-zinc-600">
                  <Clock size={12} />
                  <span className="text-[10px]">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${review.isApproved ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {review.isApproved ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  {review.isApproved ? 'Approved' : 'Pending Approval'}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
              <button 
                disabled={editingId === review.id}
                className="flex-1 md:flex-none p-3 bg-zinc-800 hover:bg-blue-600/20 hover:text-blue-400 rounded-2xl transition-all flex items-center justify-center gap-2 text-xs font-bold disabled:opacity-30"
                onClick={() => startEditing(review.id, review.content)}
              >
                <Edit2 size={16} />
                <span className="md:hidden lg:inline">Edit</span>
              </button>
              
              <button 
                disabled={deletingId === review.id}
                className="flex-1 md:flex-none p-3 bg-zinc-800 hover:bg-rose-600/20 hover:text-rose-400 rounded-2xl transition-all flex items-center justify-center gap-2 text-xs font-bold disabled:opacity-50"
                onClick={() => handleDelete(review.id)}
              >
                {deletingId === review.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                <span className="md:hidden lg:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}