/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import { User, Role } from '../types';
import { db } from '../services/database';
import { Search, Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filter, setFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    // New User Form
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newUnit, setNewUnit] = useState('');
    const [newRole, setNewRole] = useState<Role>('resident');
    const [error, setError] = useState<string | null>(null);

    const loadUsers = () => {
        setUsers(db.getAllUsers());
    };

    useEffect(() => {
       const loadAllUsers = () =>{
        setUsers(db.getAllUsers());
       };

       loadAllUsers()
    }, []);

    

    const handleAddUser = () => {
        try {
            if (!newName || !newEmail || !newPassword) {
                setError("Please fill in all required fields.");
                return;
            }

            db.addUser({
                name: newName,
                email: newEmail,
                password: newPassword,
                unit: newUnit,
                role: newRole,
            });

            loadUsers();
            setShowModal(false);
            resetForm();
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleDeleteUser = (id: string) => {
        if(window.confirm("Are you sure you want to delete this user? This cannot be undone.")) {
            db.deleteUser(id);
            loadUsers();
        }
    };

    const resetForm = () => {
        setNewName('');
        setNewEmail('');
        setNewPassword('');
        setNewUnit('');
        setNewRole('resident');
        setError(null);
    };

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(filter.toLowerCase()) || 
        u.unit.toLowerCase().includes(filter.toLowerCase()) ||
        (u.email && u.email.toLowerCase().includes(filter.toLowerCase()))
    );

    const getRoleBadge = (role: Role) => {
        switch(role) {
            case 'superadmin': return <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-bold uppercase border border-purple-200">Superadmin</span>;
            case 'admin': return <span className="px-2 py-1 rounded bg-sky-100 text-sky-700 text-xs font-bold uppercase border border-sky-200">Admin</span>;
            default: return <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs font-bold uppercase border border-emerald-200">Resident</span>;
        }
    };

    return (
        <div className="space-y-6 pb-20 md:pb-0">
             <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
                    <p className="text-sm text-slate-500">Manage system access and roles</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-200 flex items-center gap-2 hover:bg-indigo-700 transition-colors"
                >
                    <Plus size={18} /> Add User
                </button>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name, email, or unit..." 
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" 
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Unit / Loc</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={user.avatar} alt="" className="w-9 h-9 rounded-full bg-slate-200 object-cover" />
                                            <div>
                                                <div className="font-semibold text-slate-900">{user.name}</div>
                                                <div className="text-xs text-slate-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getRoleBadge(user.role)}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">
                                        {user.unit}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-slate-400">
                                            <button className="p-1.5 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDeleteUser(user.id)} className="p-1.5 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-400">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-60 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-scale-up">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">Create New User</h2>
                            <button onClick={() => { setShowModal(false); resetForm(); }} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        {error && (
                            <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm font-bold mb-4 border border-rose-100">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                             <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                                <input type="text" value={newName} onChange={e => setNewName(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Sarah Smith" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                                    <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="email@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Min 6 chars" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Unit / Location</label>
                                    <input type="text" value={newUnit} onChange={e => setNewUnit(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. 402 or Office" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Role</label>
                                    <select value={newRole} onChange={e => setNewRole(e.target.value as Role)} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                                        <option value="resident">Resident</option>
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Superadmin</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button 
                                    onClick={handleAddUser}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex justify-center items-center gap-2"
                                >
                                    <Check size={18} /> Create Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
