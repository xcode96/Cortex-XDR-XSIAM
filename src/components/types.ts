export type ContentType = 'bioc' | 'correlation' | 'all';
export type Severity = 'Low' | 'Medium' | 'High' | 'Critical' | 'Informational';

export interface Query {
  id: string;
  name: string;
  description: string;
  author: string;
  content_type: ContentType;
  severity: Severity;
  log_sources: string[];
  mitre_ids: string[];
  query: string;
  tags: string[];
  bioc_category?: string;
  category?: string;
  github?: string;
  created?: string;
  updated?: string;
}

export interface MitreTechnique {
  name: string;
  description?: string;
  tactic_ids: string[];
}

export interface Tactic {
  id: string;
  name: string;
  shortname: string;
}
