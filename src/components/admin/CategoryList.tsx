/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { addCategory, updateCategory, deleteCategory } from '@/actions/movieAction'; 

export default function CategoryList({ initialCategories }: { initialCategories: any[] }) {
    const [categories, setCategories] = useState(initialCategories);
    const [isAdding, setIsAdding] = useState(false);
    const [newCatName, setNewCatName] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        if (!newCatName.trim()) return toast.error("Name is required");
        
        setLoading(true);
        try {
            const res = await addCategory(newCatName.toUpperCase());
            if (res.success && res.data) {
                setCategories([...categories, res.data]);
                toast.success("Category added successfully");
                setIsAdding(false);
                setNewCatName("");
            } else {
                toast.error(res.error || "Failed to add category");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id: string) => {
        if (!editName.trim()) return setEditingId(null);
        const original = categories.find(c => c.id === id);
        if (original?.name === editName) return setEditingId(null);

        try {
            const res = await updateCategory(id, editName.toUpperCase());
            if (res.success) {
                setCategories(categories.map(c => 
                    c.id === id ? { ...c, name: editName.toUpperCase() } : c
                ));
                setEditingId(null);
                toast.success("Updated successfully");
            } else {
                toast.error(res.error || "Update failed");
            }
        } catch (error) {
            toast.error("Failed to update");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            const res = await deleteCategory(id);
            if (res.success) {
                setCategories(categories.filter(c => c.id !== id));
                toast.success("Category removed");
            } else {
                toast.error(res.error || "Delete failed");
            }
        } catch (error) {
            toast.error("Could not delete");
        }
    };

    return (
        <div className="space-y-4 max-w-full overflow-hidden">
            
            {isAdding ? (
                <div className="flex flex-col sm:flex-row gap-2 animate-in fade-in slide-in-from-top-1">
                    <input
                        className="flex-1 bg-zinc-900 border border-emerald-500/30 rounded-lg px-4 py-2 text-sm outline-none focus:border-emerald-500"
                        placeholder="New category name..."
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        autoFocus
                    />
                    <div className="flex gap-2 justify-end">
                        <button 
                            disabled={loading}
                            onClick={handleAdd} 
                            className="bg-emerald-600 p-2 rounded-lg hover:bg-emerald-500 disabled:opacity-50 flex-1 sm:flex-none flex justify-center"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                        </button>
                        <button onClick={() => setIsAdding(false)} className="bg-zinc-800 p-2 rounded-lg text-zinc-400 flex-1 sm:flex-none flex justify-center">
                            <X size={18} />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    className="w-full py-3 border border-dashed border-white/10 rounded-xl text-sm md:text-md font-black uppercase tracking-widest text-white/70 hover:border-emerald-500/50 hover:text-emerald-500 transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={14} /> Add New Category
                </button>
            )}

            <div className="bg-zinc-900/20 border border-white/5 rounded-2xl overflow-hidden">
                {/* Table Header - Hidden on very small screens or adjusted */}
                <div className="flex bg-zinc-900/50 px-4 md:px-6 py-3 text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-600 border-b border-white/5">
                    <div className="w-8 md:w-12">#</div>
                    <div className="flex-1">Category Name</div>
                    <div className="w-20 text-right">Actions</div>
                </div>

                <div className="divide-y divide-white/5">
                    {categories.map((cat, index) => (
                        <div key={cat.id} className="flex px-4 md:px-6 py-4 items-center group hover:bg-white/[0.01] transition-all">
                            <div className="w-8 md:w-12 text-xs md:text-sm font-mono text-zinc-500">
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            <div className="flex-1 min-w-0 pr-2">
                                {editingId === cat.id ? (
                                    <div className="flex items-center gap-2 w-full">
                                        <input
                                            className="bg-black border border-emerald-500/50 rounded px-2 md:px-3 py-1 text-xs md:text-sm outline-none w-full max-w-[200px] text-emerald-400"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleUpdate(cat.id)}
                                            autoFocus
                                        />
                                        <div className="flex gap-1">
                                            <button onClick={() => handleUpdate(cat.id)} className="text-emerald-500 p-1"><Check size={16}/></button>
                                            <button onClick={() => setEditingId(null)} className="text-zinc-500 p-1"><X size={16}/></button>
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-xs md:text-sm font-bold uppercase tracking-tight text-zinc-300 group-hover:text-white transition-colors truncate block">
                                        {cat.name}
                                    </span>
                                )}
                            </div>

                            <div className="w-20 flex justify-end gap-1">
                                <button
                                    onClick={() => { setEditingId(cat.id); setEditName(cat.name); }}
                                    className="p-1.5 md:p-2 rounded-lg text-white/60 hover:text-emerald-500 hover:bg-emerald-500/5 transition-all"
                                >
                                    <Pencil size={14} />
                                </button>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="p-1.5 md:p-2 rounded-lg text-white/60 hover:text-rose-500 hover:bg-rose-500/5 transition-all"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}