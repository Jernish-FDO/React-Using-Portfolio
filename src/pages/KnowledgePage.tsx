import React from 'react';
import Knowledge from '../components/Knowledge/Knowledge';
import SEO from '../components/SEO/SEO';

const KnowledgePage: React.FC = () => {
    return (
        <>
            <SEO
                title="Knowledge Base | Jernish - Skills & Expertise"
                description="Explore Jernish's technical knowledge base, including expertise in Full Stack Development, Electronics, IoT, and modern web technologies."
                keywords="Skills, Expertise, Full Stack, Web Development, Electronics, IoT"
                url="https://jernish.dev/knowledge"
            />
            <main className="min-h-screen pt-20">
                <Knowledge />
            </main>
        </>
    );
};

export default KnowledgePage;

