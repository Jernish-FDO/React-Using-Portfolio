import React from 'react';
import SkillRadar from '../components/Charts/SkillRadar';
import SEO from '../components/SEO/SEO';

const SkillsPage: React.FC = () => {
    return (
        <>
            <SEO
                title="Skills | Jernish - Technical Expertise Radar"
                description="Interactive skill radar chart showcasing Jernish's technical expertise in Frontend, Backend, ECE/Hardware, IoT, Database, and DevOps."
                keywords="Skills, Technical Skills, Frontend, Backend, IoT, DevOps, Database"
                url="https://jernish.dev/skills"
            />
            <main className="min-h-screen pt-20">
                <SkillRadar />
            </main>
        </>
    );
};

export default SkillsPage;

