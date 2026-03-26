import type { Timestamp } from 'firebase/firestore';

export type UserPlan = 'free' | 'pro' | 'enterprise';

export type View = 
  | 'dashboard' 
  | 'pipeline' 
  | 'leads' 
  | 'pricing' 
  | 'settings'
  | 'privacy' 
  | 'terms' 
  | 'refunds'
  | 'admin';

export enum LeadStage {
  NEW = 'New',
  CONTACTED = 'Contacted',
  MEETING = 'Meeting Scheduled',
  PROPOSAL = 'Proposal Sent',
  NEGOTIATION = 'Negotiation',
  CLOSED_WON = 'Closed Won',
  CLOSED_LOST = 'Closed Lost'
}

export interface Dossier {
  personality: string;
  painPoints: string[];
  iceBreakers: string[];
  emailDraft: string;
}

export interface Lead {
  id: string;
  userId: string;
  name: string;
  company: string;
  role: string;
  stage: LeadStage;
  value: number;
  dossier?: Dossier;
  createdAt: Timestamp | Date | string;
  lastContact?: Timestamp | Date | string;
  email?: string;
  website?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  plan: UserPlan;
  credits: number;
  dossierCount: number;
  lastResetDate: string;
}

export interface UserStats {
  plan: UserPlan;
  usageCount: number;
  lastUsageDate: string;
  businessName: string;
}

export interface UserRecord extends UserStats {
  id: string;
  email: string;
  credits: number;
}