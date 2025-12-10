
import React from 'react';
import { ViewState, User } from '../types';
import { Bell, QrCode, Users, AlertTriangle, TrendingUp, ShieldCheck } from 'lucide-react';

interface DashboardProps {
  setView: (view: ViewState) => void;
  currentUser: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });


    return (
      <div className="space-y-8 pb-24 md:pb-8">
         <div className="flex justify-between items-end">
          <div>
             <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{currentDate}</div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
          </div>
          <button className="relative p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:shadow-md transition-all">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* Admin Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Users size={24} /></div>
              <div>
                 <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Occupancy</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
                <div className="text-4xl font-bold text-slate-900 tracking-tight">94%</div>
                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">+2%</div>
            </div>
            <div className="mt-2 text-sm text-slate-500 font-medium">142 / 150 Units Occupied</div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl"><QrCode size={24} /></div>
              <div>
                 <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Active Passes</span>
              </div>
            </div>
             <div className="flex items-baseline gap-2">
                <div className="text-4xl font-bold text-slate-900 tracking-tight">28</div>
                <div className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">Valid</div>
            </div>
            <div className="mt-2 text-sm text-slate-500 font-medium">Currently active visitor codes</div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><AlertTriangle size={24} /></div>
              <div>
                 <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Alerts</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
                <div className="text-4xl font-bold text-slate-900 tracking-tight">3</div>
                <div className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">New</div>
            </div>
            <div className="mt-2 text-sm text-slate-500 font-medium">Open maintenance requests</div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-2 gap-6">
           <button 
             onClick={() => setView(ViewState.ACCESS)}
             className="group relative overflow-hidden bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col items-start justify-between min-h-[160px] hover:scale-[1.02] transition-transform duration-300"
           >
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-32 blur-3xl group-hover:bg-white/10 transition-colors"></div>
             
             <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-4 border border-white/10">
               <ShieldCheck size={28} />
             </div>
             <div className="text-left relative z-10">
               <span className="block font-bold text-xl mb-1">Security Log</span>
               <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Monitor all gate activity</span>
             </div>
           </button>

           <button 
             onClick={() => setView(ViewState.UTILITIES)}
             className="group bg-white text-slate-900 border border-slate-200 p-8 rounded-3xl shadow-sm flex flex-col items-start justify-between min-h-40 hover:shadow-xl hover:border-slate-300 transition-all duration-300"
           >
             <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
               <TrendingUp size={28} />
             </div>
             <div className="text-left">
               <span className="block font-bold text-xl mb-1">Billing Reports</span>
               <span className="text-sm text-slate-500">Manage unit utilities</span>
             </div>
           </button>
        </div>

        {/* {currentUser.role === 'superadmin' && (
          <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 hover:shadow-2xl transition-shadow">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-32 blur-3xl"></div>
            <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-6">
              <div>
                <h3 className="font-bold text-2xl mb-2">User Management System</h3>
                <p className="text-violet-100 text-sm max-w-md">Add new residents, manage staff permissions, and update role configurations securely.</p>
              </div>
              <button onClick={() => setView(ViewState.USERS)} className="w-full md:w-auto px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg">
                Manage Users
              </button>
            </div>
          </div>
        )} */}
      </div>
    );
  
  // Resident Dashboard
  // return (
  //   <div className="space-y-8 pb-24 md:pb-8">
  //     {/* Header with Greeting */}
  //     <div className="flex justify-between items-end">
  //       <div>
  //         <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{currentDate}</div>
  //         <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Hello, {currentUser.name.split(' ')[0]} 👋</h1>
  //       </div>
  //       <button className="relative p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:shadow-md transition-all">
  //         <Bell size={22} />
  //         <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></span>
  //       </button>
  //     </div>

  //     {/* Quick Actions Grid */}
  //     <div className="grid grid-cols-2 gap-6">
  //       <button 
  //         onClick={() => setView(ViewState.ACCESS)}
  //         className="group relative overflow-hidden bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-indigo-200 flex flex-col items-start justify-between min-h-[180px] hover:scale-[1.02] transition-transform duration-300"
  //       >
  //         <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
  //         <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl"></div>
          
  //         <div className="p-3.5 bg-white/20 backdrop-blur-md rounded-2xl border border-white/10 group-hover:bg-white/30 transition-colors shadow-lg">
  //           <QrCode size={28} />
  //         </div>
  //         <div className="text-left relative z-10">
  //            <span className="block text-2xl font-bold mb-1">Visitor Pass</span>
  //            <span className="text-indigo-100 text-sm opacity-90 font-medium">Create entry codes</span>
  //         </div>
  //       </button>

  //       <button 
  //          onClick={() => setView(ViewState.UTILITIES)}
  //          className="group bg-white text-slate-800 border border-slate-200 p-6 md:p-8 rounded-[2rem] shadow-sm flex flex-col items-start justify-between min-h-[180px] hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
  //       >
  //         <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl group-hover:scale-110 transition-transform">
  //           <Zap size={28} />
  //         </div>
  //         <div className="text-left w-full">
  //            <div className="flex justify-between items-end w-full">
  //               <span className="block text-2xl font-bold text-slate-900">Bills</span>
  //               <span className="text-xs font-bold bg-rose-50 text-rose-500 px-2 py-1 rounded-lg mb-1 border border-rose-100">1 Pending</span>
  //            </div>
  //           <span className="text-sm text-slate-500 font-medium mt-1 block">Due: ₦45,000.00</span>
  //         </div>
  //       </button>
  //     </div>

  //     {/* Recent Activity / Announcements */}
  //     <div>
  //       <div className="flex justify-between items-center mb-5">
  //         <h2 className="text-xl font-bold text-slate-900">Latest Updates</h2>
  //         <button onClick={() => setView(ViewState.FORUM)} className="text-sm text-indigo-600 font-bold hover:text-indigo-800 transition-colors">See All</button>
  //       </div>
        
  //       <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
  //         <div className="p-5 hover:bg-slate-50 transition-colors rounded-2xl cursor-pointer group" onClick={() => setView(ViewState.FORUM)}>
  //           <div className="flex justify-between items-start mb-2">
  //             <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">ADMIN</span>
  //             <span className="text-xs text-slate-400 font-medium">2h ago</span>
  //           </div>
  //           <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">Elevator Maintenance</h3>
  //           <p className="text-sm text-slate-500 line-clamp-1 leading-relaxed">Scheduled maintenance for Tower A elevator tomorrow at 10 AM. Please use the service elevator.</p>
  //         </div>
          
  //         <div className="w-full h-px bg-slate-50 my-1"></div>

  //         <div className="p-5 hover:bg-slate-50 transition-colors rounded-2xl cursor-pointer group" onClick={() => setView(ViewState.EVENTS)}>
  //           <div className="flex justify-between items-start mb-2">
  //             <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">EVENT</span>
  //             <span className="text-xs text-slate-400 font-medium">Tomorrow</span>
  //           </div>
  //           <h3 className="font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">Sunday BBQ</h3>
  //           <p className="text-sm text-slate-500 line-clamp-1 leading-relaxed">Don't forget to RSVP for the community BBQ. Burgers and drinks provided!</p>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Access Status Card */}
  //     <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl shadow-slate-200">
  //        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-10 -mt-20 blur-3xl"></div>
        
  //       <div className="flex items-center justify-between mb-8 relative z-10">
  //         <div className="flex items-center gap-3">
  //            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
  //                <ShieldCheck size={20} className="text-emerald-400" />
  //            </div>
  //            <div>
  //               <h3 className="font-bold text-lg leading-tight">Active Pass</h3>
  //               <p className="text-slate-400 text-xs font-medium">Uber Eats Delivery</p>
  //            </div>
  //         </div>
  //         <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
  //           ACTIVE
  //         </div>
  //       </div>
        
  //       <div className="flex items-center justify-between relative z-10">
  //           <div className="font-mono text-4xl font-bold tracking-[0.2em] text-white">8842</div>
  //           <button onClick={() => setView(ViewState.ACCESS)} className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-slate-200 transition-colors shadow-lg">
  //               <ArrowRight size={24} />
  //           </button>
  //       </div>
  //     </div>
  //   </div>
  // );
};
