import React from 'react';
import Hero from '../components/Hero/Hero';
import SEO from '../components/SEO/SEO';

const HomePage: React.FC = () => {
    return (
        <>
            <SEO
                title="Jernish | Full Stack Developer & ECE Engineer - Home"
                description="Welcome to Jernish's portfolio. Full Stack Developer and Electronics Engineer building innovative web applications and IoT solutions. Bridging Silicon to Screen."
                keywords="Jernish, Portfolio, Full Stack, ECE, React, Node.js, IoT, Web Developer"
                url="https://jernish.dev"
            />
            <main className="min-h-screen">
                <Hero />
            </main>
        </>
    );
};

export default HomePage;

