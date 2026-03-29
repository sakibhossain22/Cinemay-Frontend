import { getCategory } from '@/actions/movieAction';
import React from 'react';
import { Layers, PenBoxIcon } from 'lucide-react';
import CategoryList from '@/components/admin/CategoryList';

async function ManageCategories() {
  const response = await getCategory();
  const categories = response.success ? response.data : [];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        
        <div className="flex justify-between items-center border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl flex items-center gap-3 font-black uppercase tracking-tighter ">
              <PenBoxIcon /> Manage <span className="text-emerald-500">Categories</span>
            </h1>

          </div>
          
          <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-2 rounded-xl border border-white/5">
             <Layers size={14} className="text-emerald-500" />
             <span className="text-lg font-black">{categories.length} TOTAL</span>
          </div>
        </div>

        
        <CategoryList initialCategories={categories} />

      </div>
    </div>
  );
}

export default ManageCategories;