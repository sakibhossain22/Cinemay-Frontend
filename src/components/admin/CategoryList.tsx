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

    // --- Add Category ---
    const handleAdd = async () => {
        if (!newCatName.trim()) return toast.error("Name is required");
        
        setLoading(true);
        try {
            const res = await addCategory(newCatName.toUpperCase());
            
            if (res.success && res.data) {
                // সার্ভার থেকে আসা আসল ডাটা (ID সহ) স্টেটে সেট করুন
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

    // --- Update Category ---
    const handleUpdate = async (id: string) => {
        if (!editName.trim()) return setEditingId(null);
        
        // যদি নাম পরিবর্তন না হয় তবে শুধু ক্লোজ করে দিন
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

    // --- Delete Category ---
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
        <div className="space-y-4">
            
            {isAdding ? (
                <div className="flex gap-2 animate-in fade-in slide-in-from-top-1">
                    <input
                        className="flex-1 bg-zinc-900 border border-emerald-500/30 rounded-lg px-4 py-2 text-sm outline-none focus:border-emerald-500"
                        placeholder="New category name..."
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        autoFocus
                    />
                    <button 
                        disabled={loading}
                        onClick={handleAdd} 
                        className="bg-emerald-600 p-2 rounded-lg hover:bg-emerald-500 disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                    </button>
                    <button onClick={() => setIsAdding(false)} className="bg-zinc-800 p-2 rounded-lg text-zinc-400">
                        <X size={18} />
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    className="w-full py-3 border border-dashed border-white/10 rounded-xl text-md font-black uppercase tracking-widest text-white/70 hover:border-emerald-500/50 hover:text-emerald-500 transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={14} /> Add New Category
                </button>
            )}

            
            <div className="bg-zinc-900/20 border border-white/5 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-12 bg-zinc-900/50 px-6 py-3 text-md font-black uppercase tracking-widest text-zinc-600">
                    <div className="col-span-1">#</div>
                    <div className="col-span-8">Category Name</div>
                    <div className="col-span-3 text-right">Actions</div>
                </div>

                <div className="divide-y divide-white/5">
                    {categories.map((cat, index) => (
                        <div key={cat.id} className="grid grid-cols-12 px-6 py-4 items-center group hover:bg-white/[0.01] transition-all">
                            <div className="col-span-1 text-md font-mono text-white ">
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            <div className="col-span-8">
                                {editingId === cat.id ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            className="bg-black border border-emerald-500/50 rounded px-3 py-1 text-sm outline-none w-full max-w-[250px] text-emerald-400"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleUpdate(cat.id)}
                                            autoFocus
                                        />
                                        <button onClick={() => handleUpdate(cat.id)} className="text-emerald-500"><Check size={16}/></button>
                                        <button onClick={() => setEditingId(null)} className="text-zinc-500"><X size={16}/></button>
                                    </div>
                                ) : (
                                    <span className="text-sm font-bold uppercase tracking-tight text-zinc-300 group-hover:text-white transition-colors">
                                        {cat.name}
                                    </span>
                                )}
                            </div>

                            <div className="col-span-3 flex justify-end gap-1">
                                <button
                                    onClick={() => { setEditingId(cat.id); setEditName(cat.name); }}
                                    className="p-2 rounded-lg text-white/80 hover:text-emerald-500 hover:bg-emerald-500/5 transition-all"
                                >
                                    <Pencil size={14} />
                                </button>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="p-2 rounded-lg text-white/80 hover:text-rose-500 hover:bg-rose-500/5 transition-all"
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