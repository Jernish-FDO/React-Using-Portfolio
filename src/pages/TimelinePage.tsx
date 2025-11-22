import React from 'react';
import InteractiveTimeline from '../components/Timeline/InteractiveTimeline';

const TimelinePage: React.FC = () => {
    return (
        <div className="min-h-screen pt-20">
            <InteractiveTimeline />
        </div>
    );
};

export default TimelinePage;
