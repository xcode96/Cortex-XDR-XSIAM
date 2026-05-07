/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Plus, Trash2, Shield, AlertCircle, Copy, Check, ExternalLink, Filter, ChevronDown, ChevronRight, User, Loader2, Menu, X as CloseIcon, Download, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TACTICS, MITRE_MAPPINGS, QUERIES } from './data';
import { Query, Severity, ContentType } from './types';
import ContributeModal from './components/ContributeModal';

export default function App() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contentType, setContentType] = useState<ContentType | 'all'>('all');
  const [logSource, setLogSource] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [selectedMitre, setSelectedMitre] = useState<Set<string>>(new Set());
  const [expandedTactics, setExpandedTactics] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hoveredQueryId, setHoveredQueryId] = useState<string | null>(null);
  const [hoveredTechniqueId, setHoveredTechniqueId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const [editingQuery, setEditingQuery] = useState<Query | undefined>(undefined);

  const isAdmin = searchQuery.toLowerCase() === 'dqadm';

  useEffect(() => {
    fetchQueries();
  }, []);

  // Close sidebar on navigate/resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchQueries = async () => {
    try {
      setIsLoading(true);
      // First, check localStorage for any user contribution/overrides
      const savedQueries = localStorage.getItem('xql-hub-user-queries');
      let combinedQueries = [...QUERIES];
      
      if (savedQueries) {
        try {
          const userQueries = JSON.parse(savedQueries) as Query[];
          // Map user queries by ID for easy lookup and override
          const userQueriesMap = new Map(userQueries.map(q => [q.id, q]));
          
          // Start with default queries, replacing any that have user overrides
          combinedQueries = QUERIES.map(q => userQueriesMap.get(q.id) || q);
          
          // Add any user queries that are entirely new (not in QUERIES)
          const defaultIds = new Set(QUERIES.map(q => q.id));
          userQueries.forEach(uq => {
            if (!defaultIds.has(uq.id)) {
              combinedQueries.push(uq);
            }
          });
        } catch (e) {
          console.error('Failed to parse saved queries', e);
        }
      }
      
      setQueries(combinedQueries);
    } catch (error) {
      console.error('Failed to fetch queries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(queries, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xql-queries-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedQueries = JSON.parse(content) as Query[];
        
        if (Array.isArray(importedQueries)) {
          // Merge with existing user queries in localStorage
          const savedQueriesRaw = localStorage.getItem('xql-hub-user-queries');
          let currentUserQueries: Query[] = [];
          if (savedQueriesRaw) {
            currentUserQueries = JSON.parse(savedQueriesRaw);
          }
          
          // Add new ones
          const existingIds = new Set(currentUserQueries.map(q => q.id));
          importedQueries.forEach(iq => {
            if (!existingIds.has(iq.id)) {
              currentUserQueries.push(iq);
            }
          });

          localStorage.setItem('xql-hub-user-queries', JSON.stringify(currentUserQueries));
          fetchQueries();
          alert('Import successful!');
        }
      } catch (error) {
        console.error('Failed to import queries:', error);
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleExportDataTs = () => {
    const fileContent = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Query, Tactic, MitreTechnique } from './types';

export const TACTICS: Tactic[] = ${JSON.stringify(TACTICS, null, 2)};

export const MITRE_MAPPINGS: Record<string, MitreTechnique> = ${JSON.stringify(MITRE_MAPPINGS, null, 2)};

export const QUERIES: Query[] = ${JSON.stringify(queries, null, 2)};
`;

    const blob = new Blob([fileContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this query?')) return;
    
    // Remote from state
    setQueries(prev => prev.filter(q => q.id !== id));
    
    // Remove from localStorage if it was a user query
    const savedQueriesRaw = localStorage.getItem('xql-hub-user-queries');
    if (savedQueriesRaw) {
      const userQueries = JSON.parse(savedQueriesRaw) as Query[];
      const updatedUserQueries = userQueries.filter(q => q.id !== id);
      localStorage.setItem('xql-hub-user-queries', JSON.stringify(updatedUserQueries));
    }
  };

  const handleEdit = (query: Query) => {
    setEditingQuery(query);
    setIsContributeModalOpen(true);
  };

  const logSources = useMemo(() => {
    const sources = new Set<string>();
    queries.forEach(q => q.log_sources.forEach(s => sources.add(s)));
    return Array.from(sources);
  }, [queries]);

  const filteredQueries = useMemo(() => {
    return queries.filter(query => {
      const isSearchAdmin = searchQuery.toLowerCase() === 'dqadm';
      const matchesSearch = searchQuery === '' || 
        isSearchAdmin || 
        query.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        query.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        query.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesContentType = contentType === 'all' || query.content_type === contentType;
      const matchesLogSource = logSource === 'all' || query.log_sources.includes(logSource);
      
      const matchesMitre = selectedMitre.size === 0 || 
        query.mitre_ids.some(mid => {
          const baseId = mid.split('.')[0];
          return selectedMitre.has(baseId) || selectedMitre.has(mid);
        });

      return matchesSearch && matchesContentType && matchesLogSource && matchesMitre;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'severity') {
        const order: Record<Severity, number> = { Critical: 0, High: 1, Medium: 2, Low: 3, Informational: 4 };
        return order[a.severity] - order[b.severity];
      }
      if (sortBy === 'newest') {
        const dateA = new Date(a.created || 0).getTime();
        const dateB = new Date(b.created || 0).getTime();
        return dateB - dateA;
      }
      return 0;
    });
  }, [queries, searchQuery, contentType, logSource, sortBy, selectedMitre]);

  const stats = useMemo(() => {
    const uniqueTechniques = new Set<string>();
    filteredQueries.forEach(q => q.mitre_ids.forEach(id => uniqueTechniques.add(id.split('.')[0])));
    
    const activeTactics = new Set<string>();
    uniqueTechniques.forEach(tid => {
       const mapping = MITRE_MAPPINGS[tid];
       if (mapping) mapping.tactic_ids.forEach(t => activeTactics.add(t));
    });

    return {
      total: filteredQueries.length,
      tactics: activeTactics.size,
      techniques: uniqueTechniques.size
    };
  }, [filteredQueries]);

  const toggleMitre = (id: string) => {
    const next = new Set(selectedMitre);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedMitre(next);
  };

  const toggleTactic = (id: string) => {
    const next = new Set(expandedTactics);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedTactics(next);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setContentType('all');
    setLogSource('all');
    setSelectedMitre(new Set());
    setExpandedTactics(new Set());
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 font-sans">
      {/* Header */}
      <header className="h-16 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4 h-full">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
          >
            {isSidebarOpen ? <CloseIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <a href="/" className="text-lg lg:text-xl font-bold tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-white leading-none">XQL</span>
            <span className="text-zinc-500 leading-none lg:inline hidden">(XDR Query Language)</span>
            <span className="text-zinc-500 leading-none lg:hidden inline">(XQL)</span>
          </a>
        </div>
        
        <div className="flex items-center gap-2 lg:gap-4 h-full">
          <div className="relative w-40 sm:w-64 xl:w-96 flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsContributeModalOpen(true)}
            className="flex items-center gap-2 bg-zinc-100 text-zinc-950 px-3 lg:px-4 py-2 rounded-lg font-semibold hover:bg-white transition-colors text-xs lg:text-sm shadow-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Contribute</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar backdrop for mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-16 left-0 z-40
          w-64 lg:w-72 h-[calc(100vh-64px)] 
          flex-shrink-0 border-r border-zinc-900 bg-zinc-950 
          px-6 py-8 flex flex-col gap-10 overflow-y-auto custom-scrollbar 
          transition-transform duration-300 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Filters</h4>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-1 text-zinc-500 hover:text-white"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-zinc-400 block">Content Type</label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-zinc-300"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value as any)}
                  >
                    <option value="all">All Types</option>
                    <option value="bioc">BIOC</option>
                    <option value="correlation">Correlation Rule</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-bold text-zinc-400 block">Log Source</label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-zinc-300"
                    value={logSource}
                    onChange={(e) => setLogSource(e.target.value)}
                  >
                    <option value="all">All Log Sources</option>
                    {logSources.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-bold text-zinc-400 block">Sort By</label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-zinc-300"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newly Added</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="severity">Severity (High first)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <button 
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 w-full py-2.5 border border-zinc-800 rounded-lg text-xs font-semibold hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-zinc-200"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All Filters
            </button>

            <div className="pt-4 border-t border-zinc-900 space-y-3">
              {isAdmin && (
                <button 
                  onClick={handleExportDataTs}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 border border-blue-500 rounded-lg text-xs font-bold hover:bg-blue-500 transition-colors text-white shadow-lg shadow-blue-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download data.ts
                </button>
              )}
              
              <button 
                onClick={handleExport}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-semibold hover:bg-zinc-800 transition-colors text-zinc-300"
              >
                <Download className="w-3.5 h-3.5" />
                Download JSON
              </button>
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-semibold hover:bg-zinc-800 transition-colors text-zinc-300"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload JSON
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImport} 
                className="hidden" 
                accept=".json"
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 bg-zinc-950 p-4 lg:p-8 flex flex-col gap-8 custom-scrollbar">
          {/* MITRE Matrix Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-6">
                <h3 className="text-lg font-bold whitespace-nowrap">MITRE ATT&CK Matrix</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-bold text-zinc-400 uppercase tracking-tight whitespace-nowrap">
                    <span className="text-blue-400 mr-1">{stats.total}</span> Queries
                  </span>
                  <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-bold text-zinc-400 uppercase tracking-tight whitespace-nowrap">
                    <span className="text-blue-400 mr-1">{stats.tactics}</span> Tactics
                  </span>
                  <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-bold text-zinc-400 uppercase tracking-tight whitespace-nowrap">
                    <span className="text-blue-400 mr-1">{stats.techniques}</span> Techniques
                  </span>
                </div>
              </div>
            </div>

            {/* Matrix Grid */}
            <div className="flex gap-1 overflow-x-auto pb-4 custom-scrollbar select-none min-h-[300px]">
              {TACTICS.map(tactic => {
                const techniquesInTactic = Object.entries(MITRE_MAPPINGS)
                  .filter(([_, tech]) => tech.tactic_ids.includes(tactic.id))
                  .map(([id, tech]) => ({ id, ...tech }));
                
                const queryCount = techniquesInTactic.reduce((sum, tech) => sum + queries.filter(q => q.mitre_ids.some(mid => mid.startsWith(tech.id))).length, 0);
                const hasQueries = queryCount > 0;
                const isExpanded = expandedTactics.has(tactic.id);

                return (
                  <div key={tactic.id} className="flex-shrink-0 w-44 flex flex-col gap-1">
                    <button 
                      onClick={() => hasQueries && toggleTactic(tactic.id)}
                      className={`text-left p-3 rounded-t-lg transition-all border border-transparent flex flex-col gap-1 group ${
                        hasQueries 
                          ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 cursor-pointer' 
                          : 'bg-zinc-950/30 border-zinc-900 cursor-default grayscale opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${hasQueries ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-600'}`}>
                          {queryCount}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-600">{tactic.id}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-zinc-300 leading-tight pr-2">{tactic.shortname}</span>
                        {hasQueries && (
                          <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </button>

                    <div className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                      {techniquesInTactic.map(tech => {
                        const tc = queries.filter(q => q.mitre_ids.some(mid => mid.startsWith(tech.id))).length;
                        const isSelected = selectedMitre.has(tech.id);
                        
                        // Highlight if associated with the hovered query
                        const isAssociatedWithHoveredQuery = hoveredQueryId && queries.find(q => q.id === hoveredQueryId)?.mitre_ids.some(mid => mid.startsWith(tech.id));
                        
                        if (tc === 0) return null;

                        return (
                          <div 
                            key={tech.id}
                            onClick={() => toggleMitre(tech.id)}
                            onMouseEnter={() => setHoveredTechniqueId(tech.id)}
                            onMouseLeave={() => setHoveredTechniqueId(null)}
                            className={`p-2 rounded-md border text-[10px] cursor-pointer transition-all relative ${
                              isSelected 
                                ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20' 
                                : isAssociatedWithHoveredQuery
                                ? 'bg-blue-900/50 border-blue-500/50 text-blue-100'
                                : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600 text-zinc-400'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-semibold leading-tight line-clamp-2 pr-1">{tech.name}</span>
                              <span className={`text-[9px] font-bold ${isSelected || isAssociatedWithHoveredQuery ? 'text-blue-100' : 'text-zinc-500'}`}>{tc}</span>
                            </div>
                            <div className={`text-[8px] font-mono ${isSelected || isAssociatedWithHoveredQuery ? 'text-blue-200' : 'text-zinc-600'}`}>{tech.id}</div>

                            {/* Tooltip */}
                            <AnimatePresence>
                              {hoveredTechniqueId === tech.id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-2xl z-[100] pointer-events-none"
                                >
                                  <div className="text-zinc-100 font-bold mb-2 flex items-center justify-between">
                                    <span>{tech.name}</span>
                                    <span className="text-[10px] font-mono text-zinc-500">{tech.id}</span>
                                  </div>
                                  <p className="text-zinc-400 text-[10px] leading-relaxed italic">
                                    {tech.description || "No description available for this technique."}
                                  </p>
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900 border-r border-b border-zinc-800 rotate-45 -mt-1.5" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedMitre.size > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-900">
                <span className="text-xs text-zinc-500 font-medium">Active Filters:</span>
                {[...selectedMitre].map((mid: string) => (
                  <button 
                    key={mid}
                    onClick={() => toggleMitre(mid)}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-400 hover:bg-blue-600/30 transition-colors"
                  >
                    {MITRE_MAPPINGS[mid]?.name || mid}
                    <span className="text-blue-500 text-sm leading-none">&times;</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12">
            <AnimatePresence mode="popLayout">
              {filteredQueries.map(query => (
                <motion.div
                  key={query.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredQueryId(query.id)}
                  onMouseLeave={() => setHoveredQueryId(null)}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-6 hover:border-zinc-700 transition-all group"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                          query.content_type === 'bioc' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-500'
                        }`}>
                          {query.content_type}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                          query.severity === 'Critical' ? 'bg-red-500/20 text-red-500' :
                          query.severity === 'High' ? 'bg-amber-500/20 text-amber-500' :
                          query.severity === 'Medium' ? 'bg-blue-500/20 text-blue-500' :
                          query.severity === 'Low' ? 'bg-emerald-500/20 text-emerald-500' :
                          'bg-zinc-500/20 text-zinc-500'
                        }`}>
                          <div className={`w-1 h-1 rounded-full ${
                            query.severity === 'Critical' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' :
                            query.severity === 'High' ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' :
                            'bg-current'
                          }`} />
                          {query.severity}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        {isAdmin && (
                          <div className="flex items-center gap-1.5 mr-2">
                            <button 
                              onClick={() => handleEdit(query)}
                              className="p-1 px-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded transition-colors text-[10px] font-bold"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(query.id)}
                              className="p-1 px-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors text-[10px] font-bold"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                        <User className="w-3 h-3" />
                        {query.author}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{query.name}</h2>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {query.mitre_ids.map(mid => (
                          <a 
                            key={mid}
                            href={`https://attack.mitre.org/techniques/${mid.replace('.', '/')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 px-2 py-0.5 rounded text-[10px] font-mono transition-colors flex items-center gap-1"
                          >
                            🎯 {mid}
                          </a>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                      {query.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                       {query.log_sources.map(s => (
                         <span key={s} className="px-2 py-0.5 rounded-full border border-zinc-800 text-[10px] font-medium text-zinc-500">
                           📋 {s}
                         </span>
                       ))}
                       {query.tags.map(tag => (
                         <span 
                           key={tag} 
                           onClick={() => setSearchQuery(tag)}
                           className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-medium text-zinc-600 hover:text-zinc-300 cursor-pointer transition-colors"
                         >
                           #{tag}
                         </span>
                       ))}
                    </div>
                  </div>

                  <div className="relative group/code">
                    <div className="absolute top-3 right-3 flex gap-2 z-10">
                      <button 
                        onClick={() => copyToClipboard(query.query, query.id)}
                        className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-md text-zinc-400 transition-colors shadow-lg"
                        title="Copy to clipboard"
                      >
                        {copiedId === query.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <pre className="custom-scrollbar overflow-x-auto bg-black text-zinc-300 p-4 rounded-xl text-xs font-mono leading-relaxed border border-zinc-800/50">
                      <code>{query.query}</code>
                    </pre>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredQueries.length === 0 && (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="bg-zinc-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="w-8 h-8 text-zinc-700" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">No queries found</h3>
                  <p className="text-zinc-500 text-sm max-w-xs mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      <ContributeModal 
        isOpen={isContributeModalOpen} 
        onClose={() => {
          setIsContributeModalOpen(false);
          setEditingQuery(undefined);
        }} 
        onSuccess={fetchQueries}
        editingQuery={editingQuery}
      />
    </div>
  );
}
