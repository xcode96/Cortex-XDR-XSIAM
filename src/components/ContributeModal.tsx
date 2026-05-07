import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Search, Code, Shield, User, Github, Tag, Terminal, Download, Globe, AlertCircle, Copy, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TACTICS, MITRE_MAPPINGS } from '../data';
import { Severity } from '../types';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LOG_SOURCES = [
  'All Log Sources',
  'Cortex XDR Agent',
  'Network Logs',
  'Windows Event Logs',
  'Firewall Logs',
  'Cloud Audit Logs',
  'DNS Logs',
  'Authentication Logs',
  'VPN Logs',
  'Active Directory Logs',
  'File Logs',
  'PowerShell Logs',
  'XDR Identity',
  'Proxy Logs',
  'System Logs'
];

export default function ContributeModal({ isOpen, onClose, onSuccess }: ContributeModalProps) {
  const [step, setStep] = useState(1);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    author: '',
    github: '',
    severity: 'Informational' as Severity,
    logSources: [] as string[],
    tags: [] as string[],
    query: '',
    selectedTactics: [] as string[],
    selectedTechniques: [] as string[]
  });
  const [tagInput, setTagInput] = useState('');
  const [techniqueSearch, setTechniqueSearch] = useState('');
  const [customLogSources, setCustomLogSources] = useState<string[]>([]);
  const [customLogSourceInput, setCustomLogSourceInput] = useState('');

  const SEVERITIES: Severity[] = ['Informational', 'Low', 'Medium', 'High', 'Critical'];

  const toggleLogSource = (source: string) => {
    setFormData(prev => ({
      ...prev,
      logSources: prev.logSources.includes(source)
        ? prev.logSources.filter(s => s !== source)
        : [...prev.logSources, source]
    }));
  };

  const handleAddCustomLogSource = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (customLogSourceInput.trim()) {
      const source = customLogSourceInput.trim();
      if (!LOG_SOURCES.includes(source) && !customLogSources.includes(source)) {
        setCustomLogSources(prev => [...prev, source]);
      }
      if (!formData.logSources.includes(source)) {
        toggleLogSource(source);
      }
      setCustomLogSourceInput('');
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const toggleTactic = (id: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTactics: prev.selectedTactics.includes(id)
        ? prev.selectedTactics.filter(t => t !== id)
        : [...prev.selectedTactics, id]
    }));
  };

  const toggleTechnique = (id: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTechniques: prev.selectedTechniques.includes(id)
        ? prev.selectedTechniques.filter(t => t !== id)
        : [...prev.selectedTechniques, id]
    }));
  };

  const filteredTechniques = Object.entries(MITRE_MAPPINGS).filter(([id, tech]) => {
    const matchesSearch = id.toLowerCase().includes(techniqueSearch.toLowerCase()) || 
                         tech.name.toLowerCase().includes(techniqueSearch.toLowerCase());
    const matchesTactic = formData.selectedTactics.length === 0 || 
                         tech.tactic_ids.some(tid => formData.selectedTactics.includes(tid));
    return matchesSearch && matchesTactic;
  });

  const handleDownload = async () => {
    try {
      const data = JSON.stringify(formData, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formData.name.toLowerCase().replace(/\s+/g, '_') || 'query'}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsDownloaded(true);
    } catch (error) {
      console.error('Failed to download query:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const newEntry = {
        id: `${formData.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.yaml`,
        name: formData.name,
        description: formData.description,
        author: formData.author,
        github: formData.github,
        severity: formData.severity,
        content_type: 'bioc' as const, // Defaulting to bioc if not specified
        tags: formData.tags,
        mitre_ids: formData.selectedTechniques,
        log_sources: formData.logSources,
        query: formData.query,
        created: new Date().toISOString()
      };

      // Save to localStorage
      const savedQueriesRaw = localStorage.getItem('xql-hub-user-queries');
      let userQueries = [];
      if (savedQueriesRaw) {
        userQueries = JSON.parse(savedQueriesRaw);
      }
      userQueries.push(newEntry);
      localStorage.setItem('xql-hub-user-queries', JSON.stringify(userQueries));

      setIsSubmitted(true);
      onSuccess();
    } catch (error) {
      console.error('Failed to save query:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = formData.name && formData.description && formData.author && formData.logSources.length > 0;
  const isStep2Valid = formData.query && formData.selectedTechniques.length > 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-900">
            <div>
              <h2 className="text-xl font-bold text-white">
                {step === 1 ? 'Enter the details' : step === 2 ? 'XQL Query & MITRE ATT&CK Mapping' : 'Review & Submit'}
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                {step === 1 
                  ? 'Fill in the required information for your contribution.' 
                  : step === 2 
                  ? 'Enter your XQL query and map it to relevant MITRE ATT&CK techniques.'
                  : 'Review your contribution before submitting.'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-zinc-900 rounded-full transition-colors text-zinc-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper */}
          <div className="flex px-6 pt-4 gap-4">
            <div className="flex-1 h-1 rounded-full bg-zinc-900 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-zinc-100"
                initial={{ width: '0%' }}
                animate={{ width: step >= 1 ? '100%' : '0%' }}
              />
            </div>
            <div className="flex-1 h-1 rounded-full bg-zinc-900 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-zinc-100"
                initial={{ width: '0%' }}
                animate={{ width: step >= 2 ? '100%' : '0%' }}
              />
            </div>
            <div className="flex-1 h-1 rounded-full bg-zinc-900 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-zinc-100"
                initial={{ width: '0%' }}
                animate={{ width: step >= 3 ? '100%' : '0%' }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {step === 1 ? (
              <div className="space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Name *</label>
                    <input 
                      type="text"
                      placeholder="e.g., Suspicious PowerShell Execution Detection"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-white"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    />
                    <p className="text-[10px] text-zinc-600">A clear, descriptive name for your query</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Author Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                      <input 
                        type="text"
                        placeholder="Your name or handle"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-white"
                        value={formData.author}
                        onChange={e => setFormData(p => ({ ...p, author: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Description *</label>
                  <textarea 
                    rows={3}
                    placeholder="Describe what this query detects and why it's useful..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-white resize-none"
                    value={formData.description}
                    onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                  />
                  <p className="text-[10px] text-zinc-600">Explain the purpose and use case of this query</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">GitHub Username (optional)</label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                      <input 
                        type="text"
                        placeholder="@username"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-white"
                        value={formData.github}
                        onChange={e => setFormData(p => ({ ...p, github: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Tags</label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                      <input 
                        type="text"
                        placeholder="Type and press Enter to add tags"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-white"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-600">Add relevant tags to help others find your query</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-zinc-800 rounded text-[10px] text-zinc-300 font-medium">
                          {tag}
                          <button onClick={() => removeTag(tag)} className="hover:text-white"><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Severity */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Severity *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {SEVERITIES.map(sev => (
                      <button
                        key={sev}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, severity: sev }))}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                          formData.severity === sev
                            ? 'bg-zinc-100 border-zinc-100 text-zinc-950'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest">{sev}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Log Sources */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Log Sources *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {[...LOG_SOURCES, ...customLogSources].map(source => (
                      <button
                        key={source}
                        type="button"
                        onClick={() => toggleLogSource(source)}
                        className={`flex items-center gap-2 p-3 rounded-lg border text-xs font-medium transition-all ${
                          formData.logSources.includes(source)
                            ? 'bg-zinc-100 border-zinc-100 text-zinc-900'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          formData.logSources.includes(source) ? 'bg-zinc-950 border-zinc-950' : 'border-zinc-700'
                        }`}>
                          {formData.logSources.includes(source) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        {source}
                      </button>
                    ))}
                    <div className="col-span-2">
                       <div className="relative">
                        <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input 
                          type="text"
                          placeholder="Add new log source..."
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 pl-10 pr-16 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-white"
                          value={customLogSourceInput}
                          onChange={e => setCustomLogSourceInput(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleAddCustomLogSource()}
                        />
                        <button 
                          type="button"
                          onClick={() => handleAddCustomLogSource()}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-[10px] font-bold transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : step === 2 ? (
              <div className="space-y-8">
                {/* Query */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">XQL Query *</label>
                    <div className="flex gap-2">
                      <button className="text-[10px] font-bold text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-zinc-900 transition-colors">Format</button>
                      <button className="text-[10px] font-bold text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-zinc-900 transition-colors">Validate</button>
                    </div>
                  </div>
                  <div className="relative">
                    <Terminal className="absolute left-3 top-3 w-4 h-4 text-zinc-700" />
                    <textarea 
                      rows={6}
                      placeholder="dataset = xdr_data | filter event_type = PROCESS..."
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 pl-10 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-blue-400 placeholder:text-zinc-700 leading-relaxed"
                      value={formData.query}
                      onChange={e => setFormData(p => ({ ...p, query: e.target.value }))}
                    />
                  </div>
                </div>

                {/* MITRE Mapping */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-zinc-500" />
                    <h3 className="text-sm font-bold text-white">MITRE ATT&CK Mapping</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Tactics */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Tactics</label>
                      <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {TACTICS.map(tactic => (
                          <button
                            key={tactic.id}
                            onClick={() => toggleTactic(tactic.id)}
                            className={`flex items-center justify-between p-3 rounded-lg border text-xs font-medium transition-all ${
                              formData.selectedTactics.includes(tactic.id)
                                ? 'bg-zinc-100 border-zinc-100 text-zinc-900'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                            }`}
                          >
                            <div className="flex flex-col items-start">
                              <span className="text-[9px] font-bold opacity-50">{tactic.id}</span>
                              <span>{tactic.name}</span>
                            </div>
                            {formData.selectedTactics.includes(tactic.id) && <Check className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Techniques */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Techniques</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input 
                          type="text"
                          placeholder="Search techniques..."
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-zinc-300"
                          value={techniqueSearch}
                          onChange={e => setTechniqueSearch(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                        {filteredTechniques.map(([id, tech]) => (
                          <button
                            key={id}
                            onClick={() => toggleTechnique(id)}
                            className={`flex items-center justify-between p-3 rounded-lg border text-xs font-medium transition-all ${
                              formData.selectedTechniques.includes(id)
                                ? 'bg-zinc-100 border-zinc-100 text-zinc-900'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                            }`}
                          >
                            <div className="flex flex-col items-start pr-4">
                              <span className="text-[9px] font-bold opacity-50">{id}</span>
                              <span className="truncate max-w-[200px]">{tech.name}</span>
                            </div>
                            {formData.selectedTechniques.includes(id) && <Check className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 pb-8">
                {/* Visual Summary Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors" />
                    
                    <div className="flex items-center gap-2 mb-6">
                      <div className="px-2 py-1 bg-zinc-800 rounded text-[10px] font-bold text-zinc-400 tracking-tighter">WIDGET</div>
                      <div className="h-1 w-1 rounded-full bg-zinc-800" />
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{formData.author}</div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{formData.name || 'Untitled Query'}</h3>
                    <p className="text-zinc-400 text-sm line-clamp-2 mb-6">{formData.description}</p>

                    <div className="flex flex-wrap gap-2">
                       {formData.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-zinc-900/50 border border-zinc-800 rounded text-[10px] text-zinc-500 font-medium">#{tag}</span>
                       ))}
                       {formData.tags.length > 3 && <span className="text-[10px] text-zinc-600 self-center">+{formData.tags.length - 3} more</span>}
                    </div>
                  </div>

                  <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">MAPPINGS</div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-500">Tactics</span>
                          <span className="text-xs font-bold text-white">{formData.selectedTactics.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-500">Techniques</span>
                          <span className="text-xs font-bold text-white">{formData.selectedTechniques.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-500">Log Sources</span>
                          <span className="text-xs font-bold text-white">{formData.logSources.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-500">Severity</span>
                          <span className={`text-xs font-bold ${
                            formData.severity === 'Critical' ? 'text-red-500' :
                            formData.severity === 'High' ? 'text-orange-500' :
                            formData.severity === 'Medium' ? 'text-yellow-500' :
                            formData.severity === 'Low' ? 'text-blue-500' :
                            'text-zinc-400'
                          }`}>{formData.severity}</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-zinc-800/50">
                      <div className="flex items-center gap-2 text-blue-500">
                        <Shield className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Verified Format</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Query Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">
                    <span>XQL Sneak Peek</span>
                    <button className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1">
                      <Copy className="w-3 h-3" />
                      Copy Code
                    </button>
                  </div>
                  <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 font-mono text-sm leading-relaxed overflow-hidden relative">
                    <div className="text-blue-400/80 line-clamp-3">
                      {formData.query || 'dataset = xdr_data | filter event_type = PROCESS...'}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
                  </div>
                </div>

                {/* Contribution Options */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-500" />
                    How would you like to contribute?
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {!isSubmitted ? (
                      <button 
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="group p-6 rounded-2xl border transition-all text-left bg-blue-600/10 border-blue-500/30 hover:bg-blue-600/20 hover:border-blue-500/50"
                      >
                         <div className="flex items-start gap-4">
                           <div className="p-4 rounded-xl bg-blue-600 text-white">
                             {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Shield className="w-6 h-6" />}
                           </div>
                           <div className="flex-1">
                             <h4 className="font-bold mb-1 text-white">Save Locally</h4>
                             <p className="text-xs text-zinc-500 leading-relaxed max-w-md">
                               Save this contribution to your browser's local storage. You can then download the full dataset for permanent backup.
                             </p>
                           </div>
                           <ChevronRight className="w-5 h-5 text-zinc-700 mt-1" />
                         </div>
                      </button>
                    ) : (
                      <div className="p-6 rounded-2xl border bg-emerald-500/10 border-emerald-500/30 flex items-start gap-4">
                         <div className="p-4 rounded-xl bg-emerald-500 text-white">
                           <Check className="w-6 h-6" />
                         </div>
                         <div>
                           <h4 className="font-bold mb-1 text-emerald-400">Successfully committed</h4>
                           <p className="text-xs text-zinc-500 leading-relaxed">
                             Your contribution has been saved to the permanent record. You can now download the full updated dataset.
                           </p>
                         </div>
                      </div>
                    )}

                    <button 
                      onClick={handleDownload}
                      className={`group p-6 rounded-2xl border transition-all text-left relative overflow-hidden ${
                        isDownloaded 
                        ? 'bg-zinc-900/50 border-emerald-500/30' 
                        : 'bg-zinc-900/20 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-xl transition-colors ${
                          isDownloaded ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-400 group-hover:text-white'
                        }`}>
                          {isDownloaded ? <Check className="w-6 h-6" /> : <Download className="w-6 h-6" />}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold mb-1 ${isDownloaded ? 'text-emerald-400' : 'text-white'}`}>
                            {isDownloaded ? 'Query Downloaded' : 'Download This Query'}
                          </h4>
                          <p className="text-xs text-zinc-500 leading-relaxed max-w-md">
                            Download just this individual query as a JSON file for your records.
                          </p>
                        </div>
                        {!isDownloaded && <ChevronRight className="w-5 h-5 text-zinc-700 mt-1" />}
                      </div>
                    </button>

                    {isDownloaded && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6"
                      >
                         <div className="space-y-4">
                            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                               <AlertCircle className="w-4 h-4" />
                               Final Steps
                            </div>
                            <ul className="space-y-3">
                               {[
                                 'Contribution saved to Local Storage',
                                 'Export all queries from the sidebar for backup',
                                 'Share the JSON file with others'
                               ].map((step, i) => (
                                 <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                                   <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                                     {i + 1}
                                   </div>
                                   {step}
                                 </li>
                               ))}
                            </ul>
                            <button className="w-full mt-4 bg-zinc-100 text-zinc-950 py-3 rounded-xl font-bold text-sm hover:bg-white transition-colors flex items-center justify-center gap-2">
                              Go to GitHub
                              <Github className="w-4 h-4" />
                            </button>
                         </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-zinc-900 bg-zinc-950/50 flex items-center justify-between">
            <button 
              onClick={() => step > 1 ? setStep(step - 1) : onClose()}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-semibold"
            >
              {step > 1 ? <ChevronLeft className="w-4 h-4" /> : null}
              {step > 1 ? 'Previous' : 'Cancel'}
            </button>
            <div className="flex gap-4">
              {step < 3 ? (
                <button 
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                  className="flex items-center gap-2 bg-zinc-100 text-zinc-950 px-6 py-2.5 rounded-xl font-bold hover:bg-white transition-all text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={onClose}
                  className="flex items-center gap-2 bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-500 transition-all text-sm shadow-lg shadow-blue-500/20"
                >
                  Done
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
