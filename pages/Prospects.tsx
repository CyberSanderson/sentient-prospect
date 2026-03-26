import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import PipelineView from '../views/PipelineView';
import { Lead } from '../types';
import { normalizeLead } from '../lib/dataMappers';
import { Loader } from 'lucide-react';

export default function Prospects() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // 1. Fetch all leads (In a real app, you'd filter by userId here)
        const q = query(collection(db, "leads"));
        const querySnapshot = await getDocs(q);
        
        const fetchedLeads: Lead[] = querySnapshot.docs.map(snapshot => normalizeLead(snapshot.id, snapshot.data()));

        setLeads(fetchedLeads);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400">
        <Loader className="animate-spin mr-2" /> Loading Pipeline...
      </div>
    );
  }

  return (
    <div className="h-full p-6 bg-slate-50">
      <PipelineView leads={leads} />
    </div>
  );
}