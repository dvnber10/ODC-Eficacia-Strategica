import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, BarChart, Code2, ChevronDown, Database, Activity, ClipboardList, CheckCircle2 } from 'lucide-react';
import Papa from 'papaparse';
import { BarChart as ReBar, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import SlideNav from '../components/SlideNav';

export default function Slide9({ onNext, onPrev, onHome }) {
  const [logs, setLogs] = useState(["[SISTEMA]: Kernel listo."]); 
  const [output, setOutput] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRecipes, setShowRecipes] = useState(false);
  const [code, setCode] = useState("# Escribe tu código aquí\ndf = dataset.filter(d => d.Department === 'Sales')\nplot(df, x='JobRole', y='MonthlyIncome', color='#00f2ff')");

  const metrics = [
    { name: "MonthlyIncome", label: "Salario", icon: "💰" },
    { name: "Age", label: "Edad", icon: "👤" },
    { name: "DistanceFromHome", label: "Distancia", icon: "🏠" },
    { name: "YearsAtCompany", label: "Años Empresa", icon: "⏳" },
    { name: "JobSatisfaction", label: "Satisfacción", icon: "😊" },
    { name: "PercentSalaryHike", label: "Aumento %", icon: "📈" },
    { name: "TotalWorkingYears", label: "Exp. Total", icon: "💼" }
  ];

  const recipes = [
    { title: "Fuga de Talento", code: `# Filtro Atrición\ndf = dataset.filter(d => d.Attrition === "Yes")\nplot(df, x="Department", y="YearsAtCompany", color="#ff4444")` },
    { title: "Salarios/Género", code: `# Brecha Salarial\ndf = dataset\nplot(df, x="Gender", y="MonthlyIncome", color="#10b981")` }
  ];

  const addLog = (msg) => setLogs(prev => [...prev.slice(-4), `> ${msg}`]);

  const runPythonSim = async () => {
    setIsProcessing(true);
    setLogs(["[SISTEMA]: Iniciando proceso..."]);
    try {
      const response = await fetch('/dataset/WA_Fn-UseC_-HR-Employee-Attrition.csv');
      const csvText = await response.text();
      const results = Papa.parse(csvText, { header: true, dynamicTyping: true });
      let data = results.data.filter(d => d.Age);

      const filterMatch = code.match(/d\.(\w+)\s*===\s*["']([^"']+)["']/);
      if (filterMatch) {
        const [_, key, value] = filterMatch;
        data = data.filter(d => String(d[key]) === value);
        addLog(`Filtrado por: ${key}`);
      }

      const plotMatch = code.match(/plot\(.*x=["'](\w+)["'],\s*y=["'](\w+)["'],\s*color=["']([^"']+)["']\)/);
      if (plotMatch) {
        const [_, xKey, yKey, color] = plotMatch;
        const grouped = data.reduce((acc, curr) => {
          const groupVal = curr[xKey] || "Otros";
          if(!acc[groupVal]) acc[groupVal] = { name: groupVal, total: 0, count: 0 };
          acc[groupVal].total += Number(curr[yKey]) || 0;
          acc[groupVal].count += 1;
          return acc;
        }, {});
        setChartData(Object.values(grouped).map(g => ({
          name: g.name, value: Math.round(g.total / g.count), color: color
        })));
        addLog(`Gráfico generado exitosamente.`);
      }
    } catch (e) { addLog("ERROR DE EJECUCIÓN."); }
    setIsProcessing(false);
  };

  return (
    // Incrementamos h-[85vh] a h-[92vh] para ganar esos píxeles hacia abajo
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl w-full flex flex-col h-150 text-slate-200 overflow-hidden pb-4">
      
      {/* HEADER */}
      <div className="flex gap-4 items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-700  z-50">
        <div className="relative">
          <button onClick={() => setShowRecipes(!showRecipes)} className="bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-xl flex items-center gap-2 border border-slate-600 text-sm font-bold transition-all">
            <Code2 size={16} className="text-secondary" /> Recetas de Código
            <ChevronDown size={14} />
          </button>
          <AnimatePresence>
            {showRecipes && (
              <>
                <div className="fixed inset-0 z-[-1]" onClick={() => setShowRecipes(false)} />
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute top-full left-0 mt-2 w-64 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl overflow-hidden z-[100]">
                  {recipes.map((r, i) => (
                    <button key={i} onClick={() => { setCode(r.code); setShowRecipes(false); }} className="w-full text-left p-4 text-xs hover:bg-secondary hover:text-primary font-bold border-b border-slate-700 last:border-0 transition-colors">{r.title}</button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <button onClick={runPythonSim} className="bg-green-600 hover:bg-green-500 px-8 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 ml-auto shadow-lg active:scale-95 transition-all">
          <Play size={16} fill="white" /> EJECUTAR SCRIPT
        </button>
      </div>

      {/* CUERPO PRINCIPAL: Ajustado para ocupar el espacio extra */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 ">
        
        {/* PANEL MÉTRICAS */}
        <div className="lg:col-span-3 bg-slate-900/40 border border-slate-700 rounded-3xl p-5 flex flex-col overflow-hidden">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Database size={14}/> Dataset Index</h3>
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-2 custom-scrollbar">
            {metrics.map((m) => (
              <div key={m.name} onClick={() => setCode(prev => prev + `\n# Variable: ${m.name}`)} className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-secondary cursor-pointer transition-all group">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1"><span>{m.label}</span><span>{m.icon}</span></div>
                <code className="text-xs text-blue-400 font-mono block truncate">{m.name}</code>
              </div>
            ))}
          </div>
        </div>

        {/* EDITOR DE CÓDIGO */}
        <div className="lg:col-span-5 bg-[#080808] rounded-3xl border border-slate-700 flex flex-col overflow-hidden shadow-2xl">
          <div className="bg-slate-800/50 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
             <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/40"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"/></div>
             <span className="text-[10px] font-mono text-slate-500 uppercase ml-2">main_script.py</span>
          </div>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} className="flex-1 p-6 bg-transparent text-emerald-400 font-mono text-sm outline-none resize-none leading-relaxed" spellCheck="false" />
        </div>

        {/* RESULTADOS Y CONSOLA */}
        <div className="lg:col-span-4 flex flex-col gap-4 min-h-0">
          <div className="flex-[4] bg-slate-900/90 rounded-3xl border border-slate-700 p-6 flex flex-col min-h-0 shadow-inner">
            <h3 className="text-[10px] font-bold text-slate-500 mb-4 uppercase flex items-center gap-2"><BarChart size={14} /> Output Visual</h3>
            <div className="flex-1">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ReBar data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                    <XAxis dataKey="name" stroke="#718096" fontSize={9} tickLine={false} axisLine={false} />
                    <YAxis stroke="#718096" fontSize={9} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '12px'}} />
                    <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                      {chartData.map((e, i) => <Cell key={i} fill={e.color || '#00f2ff'} />)}
                    </Bar>
                  </ReBar>
                </ResponsiveContainer>
              ) : <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-40 italic text-xs text-center"><Activity size={32} className="mb-2" />Escribe el código y<br/>presiona EJECUTAR</div>}
            </div>
          </div>
          
          <div className="flex-[2] bg-black rounded-3xl border border-slate-800 p-5 font-mono text-[10px] overflow-y-auto">
             <div className="text-secondary font-bold mb-2 flex items-center gap-2"><CheckCircle2 size={12}/> KERNEL OUTPUT:</div>
             <div className="space-y-1">{logs.map((log, i) => <div key={i} className="text-slate-500">{log}</div>)}</div>
             {output && <pre className="mt-3 text-green-400 bg-green-900/10 p-2 rounded border border-green-800/30">{JSON.stringify(output, null, 2)}</pre>}
          </div>
        </div>
      </div>

      {/* NAVEGACIÓN (SlideNav ahora tiene espacio de sobra) */}
      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}