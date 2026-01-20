import React, { useState, useEffect } from 'react';
import teamMembersData from './team-members.json';

const TEAM_MEMBERS = teamMembersData.team_members;

function TeamMembers() {
  const [selectedBatch, setSelectedBatch] = useState('All');
  const batches = ['All', ...new Set(TEAM_MEMBERS.map(m => m.batch))].sort().reverse();

  const filteredMembers = selectedBatch === 'All' 
    ? TEAM_MEMBERS 
    : TEAM_MEMBERS.filter(m => m.batch === selectedBatch);

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f7f7fb] to-white text-gray-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-[#221F3B] mb-6">Team Members</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the talented students driving innovation at SCET IoT Club
          </p>
        </div>

        {/* Filter by Batch */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {batches.map((batch) => (
            <button
              key={batch}
              onClick={() => setSelectedBatch(batch)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedBatch === batch
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Batch {batch}
            </button>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 group"
            >
              <div className="h-64 overflow-hidden bg-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect width="300" height="300" fill="%23f3f4f6"/%3E%3Ccircle cx="150" cy="120" r="50" fill="%239ca3af"/%3E%3Cpath d="M50 250 Q50 200 150 200 T250 250" fill="%239ca3af"/%3C/svg%3E';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{member.degree}</p>
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700 font-medium">
                  Batch {member.batch}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No team members found for the selected batch.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamMembers;
