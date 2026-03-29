/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; 
import {
  Shield, User, Mail, Star, Loader2,
  MoreVertical, CheckCircle2, Ban, ChevronDown,
  UsersIcon
} from "lucide-react";
import { toast } from "sonner";
import { getAllUsers, updateUserStatus } from "@/actions/adminAction";

export default function ManageUser() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      if (res.success) {
        setUsers(res.data.users || []);
      } else {
        toast.error(res.message || "Failed to fetch users");
      }
    } catch (err) {
      toast.error("An error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const handleStatusChange = async (userId: string, newStatus: string) => {
    setUpdatingId(userId);
    try {
      const response = await updateUserStatus(userId, newStatus);
      if (response.success) {
        
        setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
        toast.success(`User status updated to ${newStatus.toLowerCase()}`);
      } else {
        toast.error(response.message || "Failed to update user status");
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-zinc-500 gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        <p className="text-sm font-medium">Fetching users...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center bg-zinc-900/30 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
        <div>
          <h2 className="text-3xl font-black uppercase text-white tracking-tight flex items-center gap-3">
            <UsersIcon className="text-emerald-500" /> Manage <span className="text-emerald-500">Users</span>
          </h2>
          <p className="text-zinc-500 mt-1 font-medium">Manage Your User Account And Status.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-[0.2em] mb-1">Total Members</p>
          <p className="text-3xl font-black text-emerald-500 leading-none">{users.length}</p>
        </div>
      </div>

      
      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-zinc-400 text-[10px] uppercase tracking-[0.2em]">
                <th className="px-6 py-5 font-bold">Profile</th>
                <th className="px-6 py-5 font-bold">Role & Type</th>
                <th className="px-6 py-5 font-bold text-center">Status</th>
                <th className="px-6 py-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-all group">
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full border-2 border-zinc-800 p-0.5 overflow-hidden flex-shrink-0">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-800 flex items-center justify-center rounded-full text-zinc-600">
                            <User size={20} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-white truncate">{user.name}</p>
                          {user.isPremium && (
                            <span className="bg-yellow-500/10 text-yellow-500 p-0.5 rounded shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                              <Star size={12} fill="currentColor" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 truncate flex items-center gap-1">
                          <Mail size={10} /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <span className={`inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded text-[10px] font-bold border ${user.role === "ADMIN"
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}>
                        {user.role === "ADMIN" ? <Shield size={10} /> : <User size={10} />}
                        {user.role}
                      </span>
                      {user.isPremium && (
                        <span className="text-[9px] font-bold text-yellow-600 tracking-wider uppercase">
                          Premium Member
                        </span>
                      )}
                    </div>
                  </td>

                  
                  <td className="px-6 py-4 text-center">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${user.status === "ACTIVE"
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${user.status === "ACTIVE" ? "bg-emerald-500" : "bg-red-500"}`} />
                      {user.status}
                    </div>
                  </td>

                  
                  <td className="px-6 py-4 text-right">
                    <div className="inline-block relative">
                      <select
                        disabled={updatingId === user.id}
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        className="appearance-none bg-zinc-800 text-zinc-300 text-[11px] font-bold py-2 pl-4 pr-10 rounded-xl border border-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 hover:bg-zinc-700 transition-all disabled:opacity-50"
                      >
                        <option value="ACTIVE">Mark Active</option>
                        <option value="BLOCKED">Block User</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-zinc-500">
                        {updatingId === user.id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}