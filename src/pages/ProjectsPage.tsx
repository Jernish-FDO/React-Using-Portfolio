import React from 'react';
import Projects from '../components/Projects/Projects';
import SEO from '../components/SEO/SEO';

const ProjectsPage: React.FC = () => {
    return (
        <>
            <SEO
                title="Projects | Jernish - Portfolio Showcase"
                description="Browse Jernish's portfolio of web development and electronics projects including IoT solutions, full-stack applications, and hardware innovations."
                keywords="Projects, Portfolio, Web Development, IoT Projects, Full Stack Applications"
                url="https://jernish.dev/projects"
            />
            <main className="min-h-screen pt-20">
                <Projects />
            </main>
        </>
    );
};

export default ProjectsPage;

