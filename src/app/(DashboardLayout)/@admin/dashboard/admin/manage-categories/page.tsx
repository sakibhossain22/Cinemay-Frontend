import { getCategory } from '@/actions/movieAction';
import React from 'react';
import { Layers, PenBoxIcon } from 'lucide-react';
import CategoryList from '@/components/admin/CategoryList';

async function ManageCategories() {
  const response = await getCategory();
  const categories = response.success ? response.data : [];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-4xl flex items-center gap-2 md:gap-3 font-black uppercase tracking-tighter">
              <PenBoxIcon className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" />
              Manage <span className="text-emerald-500">Categories</span>
            </h1>
            <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] ml-1">
              Organize your content structure
            </p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900/30 self-start sm:self-center px-4 py-2 rounded-xl border border-white/5 backdrop-blur-sm">
            <Layers size={14} className="text-emerald-500" />
            <span className="text-sm md:text-lg font-black tracking-tighter italic">
              <span className="text-zinc-500 not-italic">TOTAL</span>{categories.length}
            </span>
          </div>
        </div>

        <div className="bg-zinc-900/10 rounded-3xl">
          <CategoryList initialCategories={categories} />
        </div>

      </div>
    </div>
  );
}

export default ManageCategories;