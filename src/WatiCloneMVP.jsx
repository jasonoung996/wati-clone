/* 
WATI-Clone-MVP (single-file React component)

How to use:
- This is a single-file React component (default export) built with Tailwind utility classes.
- Designed as an MVP admin panel for a WhatsApp bot product (connect provider, build bot flows, manage leads, templates, logs).
*/

import React, {useState, useEffect, useMemo} from 'react';
import { motion } from 'framer-motion';
import { Plus, Bell } from 'lucide-react';

// Mock data helpers
const mockLeads = [
  { id: 'L-001', name: 'Ahmad', phone: '+60123456789', budget: 600000, area: 'KL', score: 82, status: 'HOT' },
  { id: 'L-002', name: 'Siti', phone: '+60129876543', budget: 420000, area: 'PJ', score: 55, status: 'WARM' },
  { id: 'L-003', name: 'Gopin', phone: '+60121234567', budget: 300000, area: 'Cheras', score: 30, status: 'COLD' }
];

const mockTemplates = [
  { id: 'T-1', name: 'Welcome Template', content: 'Hi! 👋 This is Jason’s property assistant. Reply 1 to continue.' },
  { id: 'T-2', name: 'Appointment Confirm', content: 'Appointment confirmed!' }
];

const mockFlows = [
  {
    id: 'F-1',
    name: 'Buyer Qualification Flow',
    steps: [
      { id:'s1', type:'message', text:'Hi! What is your budget (MYR)?' },
      { id:'s2', type:'message', text:'Is this for own stay or investment? (A/B/C)' }
    ]
  }
];

export default function WatiCloneMVP() {
  const [route, setRoute] = useState('dashboard');
  const [leads, setLeads] = useState(mockLeads);
  const [templates, setTemplates] = useState(mockTemplates);
  const [flows, setFlows] = useState(mockFlows);
  const [search, setSearch] = useState('');

  const filteredLeads = useMemo(() => {
    if (!search) return leads;
    return leads.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search));
  }, [leads, search]);

  function addTemplate() {
    const id = 'T-' + (templates.length + 1);
    setTemplates([...templates, { id, name: 'New Template', content: 'Hello from Jason!' }]);
  }

  function createFlow() {
    const id = 'F-' + (flows.length + 1);
    setFlows([...flows, { id, name: 'New Flow', steps: [] }]);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">

          {/* Sidebar */}
          <aside className="col-span-3">
            <div className="sticky top-6 space-y-6">
              <div className="p-4 bg-white rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    J
                  </div>
                  <div>
                    <div className="font-semibold">Jason Oung</div>
                    <div className="text-sm text-slate-500">KL · Real Estate</div>
                  </div>
                </div>

                <div className="mt-4">
                  <button onClick={() => setRoute('dashboard')} className="w-full mb-2 bg-indigo-600 text-white rounded-xl p-2">Dashboard</button>
                  <button onClick={() => setRoute('botbuilder')} className="w-full mb-2 bg-white border rounded-xl p-2">Bot Builder</button>
                  <button onClick={() => setRoute('templates')} className="w-full mb-2 bg-white border rounded-xl p-2">Templates</button>
                  <button onClick={() => setRoute('leads')} className="w-full mb-2 bg-white border rounded-xl p-2">Leads</button>
                  <button onClick={() => setRoute('settings')} className="w-full bg-white border rounded-xl p-2">Settings</button>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl shadow-sm">
                <div className="font-semibold mb-2">Quick Actions</div>
                <button onClick={createFlow} className="w-full bg-indigo-600 text-white rounded-xl p-2 mb-2 flex items-center justify-center">
                  <Plus size={16} />&nbsp;Create Flow
                </button>
                <button onClick={addTemplate} className="w-full bg-white border rounded-xl p-2">+ New Template</button>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="col-span-9">
            <motion.div initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={{duration:0.25}}>

              <header className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">
                    {route === 'dashboard' ? 'Dashboard' : 
                     route === 'botbuilder' ? 'Bot Builder' : 
                     route === 'templates' ? 'Templates' : 
                     route === 'leads' ? 'Leads' : 'Settings'}
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    placeholder="Search leads or phone" 
                    value={search} 
                    onChange={(e)=>setSearch(e.target.value)} 
                    className="border rounded-xl p-2"
                  />
                  <button className="p-2"><Bell size={18} /></button>
                </div>
              </header>

              {route === 'dashboard' && (
                <div>
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="p-4 bg-white rounded-xl shadow">
                      <div className="text-lg font-bold">{leads.length}</div>
                      <div className="text-sm text-slate-500">Incoming Leads</div>
                    </div>

                    <div className="p-4 bg-white rounded-xl shadow">
                      <div className="text-lg font-bold">
                        {leads.filter(l => l.status === 'HOT').length}
                      </div>
                      <div className="text-sm text-slate-500">Hot Leads</div>
                    </div>

                    <div className="p-4 bg-white rounded-xl shadow">
                      <div className="text-lg font-bold">{templates.length}</div>
                      <div className="text-sm text-slate-500">Templates</div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl shadow">
                    <div className="font-semibold mb-3">Recent Leads</div>
                    <table className="w-full text-left">
                      <thead className="text-sm text-slate-500">
                        <tr>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Budget</th>
                          <th>Area</th>
                          <th>Score</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map(l => (
                          <tr key={l.id} className="border-t">
                            <td className="py-2">{l.name}</td>
                            <td>{l.phone}</td>
                            <td>RM{l.budget.toLocaleString()}</td>
                            <td>{l.area}</td>
                            <td>{l.score}</td>
                            <td className={l.status === 'HOT' ? 'text-red-600' : l.status === 'WARM' ? 'text-orange-500' : 'text-slate-500'}>
                              {l.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
