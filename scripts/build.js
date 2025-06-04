const fs = require('fs-extra');
const path = require('path');

async function build() {
    try {
        console.log('🚀 Starting build process for PlombRennes...');
        
        // Ensure dist directory exists
        await fs.ensureDir('dist');
        
        // Copy HTML file
        await fs.copy('src/index.html', 'dist/index.html');
        console.log('✅ HTML file copied');
        
        // Copy JavaScript file
        await fs.copy('src/script.js', 'dist/script.js');
        console.log('✅ JavaScript file copied');
        
        // Create robots.txt
        const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://abderrahmen-taouai.github.io/plombrennes-website/sitemap.xml`;
        
        await fs.writeFile('dist/robots.txt', robotsTxt);
        console.log('✅ robots.txt created');
        
        // Create sitemap.xml
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://abderrahmen-taouai.github.io/plombrennes-website/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>`;
        
        await fs.writeFile('dist/sitemap.xml', sitemap);
        console.log('✅ sitemap.xml created');
        
        console.log('🎉 Build completed successfully!');
        
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

build();

