/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; 
import {
  Shield, User, Mail, Star, Loader2,
  ChevronDown, UsersIcon
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
        setUsers(res?.data?.users || []);
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
    <div className="space-y-4 md:space-y-6 p-2 md:p-0 transition-colors duration-300">
      
      {/* Header Stat Card */}
      <div className="flex justify-between items-center bg-white dark:bg-zinc-900/30 p-4 md:p-6 rounded-2xl border border-zinc-200 dark:border-white/5 backdrop-blur-md shadow-sm dark:shadow-none">
        <div>
          <h2 className="text-xl md:text-3xl font-black uppercase text-zinc-900 dark:text-white tracking-tight flex items-center gap-2 md:gap-3">
            <UsersIcon className="text-emerald-500 w-5 h-5 md:w-8 md:h-8" /> Manage <span className="text-emerald-500">Users</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-500 mt-0.5 font-medium text-[10px] md:text-sm uppercase tracking-tighter">Account control & status.</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[8px] md:text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-bold tracking-widest mb-0.5 md:mb-1">Total</p>
          <p className="text-xl md:text-3xl font-black text-emerald-600 dark:text-emerald-500 leading-none">{users.length}</p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl dark:shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-zinc-50 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 text-[9px] md:text-[10px] uppercase tracking-wider">
                <th className="px-4 md:px-6 py-4 font-black">User</th>
                <th className="px-4 md:px-6 py-4 font-black hidden md:table-cell">Role</th>
                <th className="px-4 md:px-6 py-4 font-black text-center">Status</th>
                <th className="px-4 md:px-6 py-4 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-all group">
                  
                  {/* User Profile Info */}
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <div className="flex items-center gap-2 md:gap-4">
                      <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full border border-zinc-100 dark:border-zinc-800 flex-shrink-0 shadow-sm">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center rounded-full text-zinc-400 dark:text-zinc-600">
                            <User size={14} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-xs md:text-sm font-bold text-zinc-900 dark:text-white truncate max-w-[80px] md:max-w-none">{user.name}</p>
                          {user.isPremium && (
                            <Star size={10} className="text-yellow-500 fill-yellow-500 shrink-0" />
                          )}
                        </div>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate hidden sm:flex items-center gap-1">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role Badge */}
                  <td className="px-4 md:px-6 py-3 md:py-4 hidden md:table-cell">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${user.role === "ADMIN"
                        ? "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20"
                        : "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20"
                      }`}>
                      {user.role === "ADMIN" ? <Shield size={10} /> : <User size={10} />}
                      {user.role}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 md:px-6 py-3 md:py-4 text-center">
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-black border ${user.status === "ACTIVE"
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-200 dark:border-emerald-500/20"
                        : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border-red-200 dark:border-red-500/20"
                      }`}>
                      <span className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${user.status === "ACTIVE" ? "bg-emerald-500" : "bg-red-500"}`} />
                      {user.status}
                    </div>
                  </td>

                  {/* Action Dropdown */}
                  <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                    <div className="inline-block relative">
                      <select
                        disabled={updatingId === user.id}
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        className="appearance-none bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[9px] md:text-[11px] font-bold py-1.5 md:py-2 pl-2 md:pl-4 pr-6 md:pr-10 rounded-lg md:rounded-xl border border-zinc-200 dark:border-white/5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500/30 disabled:opacity-50 transition-all"
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="BLOCKED">Block</option>
                      </select>
                      <div className="absolute inset-y-0 right-1.5 md:right-3 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
                        {updatingId === user.id ? (
                          <Loader2 size={10} className="animate-spin" />
                        ) : (
                          <ChevronDown size={12} />
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