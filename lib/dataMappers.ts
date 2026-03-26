import { Lead, LeadStage, UserPlan, UserRecord, UserStats } from '../types';

const DEFAULT_USER_STATS: UserStats = {
  plan: 'free',
  usageCount: 0,
  lastUsageDate: '',
  businessName: ''
};

type FirestoreDateLike = {
  toDate: () => Date;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isFirestoreDateLike = (value: unknown): value is FirestoreDateLike =>
  isRecord(value) && typeof value.toDate === 'function';

export const normalizeUserPlan = (value: unknown): UserPlan => {
  if (value === 'pro' || value === 'enterprise') {
    return value;
  }

  return 'free';
};

export const normalizeTimestamp = (value: unknown, fallback: Date | string = new Date()): Date | string => {
  if (value instanceof Date || typeof value === 'string') {
    return value;
  }

  if (isFirestoreDateLike(value)) {
    return value.toDate();
  }

  return fallback;
};

export const normalizeUserStats = (value: unknown): UserStats => {
  if (!isRecord(value)) {
    return DEFAULT_USER_STATS;
  }

  return {
    plan: normalizeUserPlan(value.plan),
    usageCount: typeof value.usageCount === 'number' ? value.usageCount : 0,
    lastUsageDate: typeof value.lastUsageDate === 'string' ? value.lastUsageDate : '',
    businessName: typeof value.businessName === 'string' ? value.businessName : ''
  };
};

export const normalizeUserRecord = (id: string, value: unknown): UserRecord => {
  const stats = normalizeUserStats(value);
  const record = isRecord(value) ? value : {};

  return {
    id,
    email: typeof record.email === 'string' ? record.email : '',
    credits: typeof record.credits === 'number' ? record.credits : 0,
    ...stats
  };
};

export const normalizeLeadStage = (value: unknown): LeadStage => {
  if (Object.values(LeadStage).includes(value as LeadStage)) {
    return value as LeadStage;
  }

  return LeadStage.NEW;
};

export const normalizeLead = (id: string, value: unknown): Lead => {
  const record = isRecord(value) ? value : {};
  const createdAt = normalizeTimestamp(record.createdAt);

  return {
    id,
    userId: typeof record.userId === 'string' ? record.userId : '',
    name: typeof record.name === 'string'
      ? record.name
      : typeof record.contactName === 'string'
        ? record.contactName
        : 'Unknown Contact',
    company: typeof record.company === 'string' ? record.company : 'Unknown Company',
    role: typeof record.role === 'string' ? record.role : '',
    stage: normalizeLeadStage(record.stage ?? record.status),
    value: typeof record.value === 'number' ? record.value : 0,
    dossier: isRecord(record.dossier) ? (record.dossier as Lead['dossier']) : undefined,
    createdAt,
    lastContact: normalizeTimestamp(record.lastContact ?? record.createdAt, createdAt),
    email: typeof record.email === 'string' ? record.email : '',
    website: typeof record.website === 'string' ? record.website : ''
  };
};