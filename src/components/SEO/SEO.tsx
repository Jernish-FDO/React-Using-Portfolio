import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = 'Jernish | Full Stack Developer & ECE Engineer',
    description = 'Portfolio of Jernish - Full Stack Developer specializing in React, Node.js, IoT, and Electronics. Building the bridge from Silicon to Screen.',
    keywords = 'Jernish, Full Stack Developer, ECE Engineer, React Developer, Node.js, IoT, Electronics, Web Development, Portfolio',
    image = '/og-image.png',
    url = 'https://jernish.dev',
    type = 'website'
}) => {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Jernish" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#0ea5e9" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Jernish Portfolio" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Additional SEO */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <link rel="canonical" href={url} />

            {/* Performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        </Helmet>
    );
};

export default SEO;
