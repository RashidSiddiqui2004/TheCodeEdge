import React from 'react';
import { Contributor } from './TopContributors';

interface LeaderboardUserCardProps {
    contributor: Contributor
};

const LeaderboardUserCard: React.FC<LeaderboardUserCardProps> = ({ contributor }) => {

    const getCardColor = (rank: number): string => {
        if (rank === 1) return 'bg-yellow-500';  // Gold
        if (rank === 2) return 'bg-gray-400';   // Silver
        if (rank === 3) return 'bg-orange-400'; // Bronze
        return 'bg-gray-600';                   // Default for others
    };

    return (
        <div
            className={`p-3 my-1 rounded-md shadow-sm ${getCardColor(contributor.rank)} text-white flex items-center justify-between`}
        >
            {/* Rank */}
            <div className="text-2xl font-medium">
                #{contributor.rank}
            </div>

            {/* Username */}
            <div className="text-xl font-semibold mt-1">
                {contributor.username}
            </div>

            {/* AlgoPoints */}
            <div className="text-xs mt-1 opacity-80">
                AlgoPoints: {contributor.algopoints}
            </div>
        </div>
    );
};

export default LeaderboardUserCard;
