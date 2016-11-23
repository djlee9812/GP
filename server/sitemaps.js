sitemaps.add('/sitemap.xml', function() {
  // required: page
  // optional: lastmod, changefreq, priority, xhtmlLinks, images, videos
  return [
    { page: '/', changefreq: 'monthly', priority: 0.8 },
    { page: '/about', changefreq: 'yearly', priority: 0.8 },
    { page: '/contact', changefreq: 'yearly', priority: 0.8 },
    { page: '/donate', changefreq: 'monthly', priority: 0.4 },
    { page: '/overview', changefreq: 'monthly', priority: 0.5 },
    { page: '/apply', changefreq: 'monthly', priority: 0.3 },
    { page: '/demand', changefreq: 'monthly', priority: 0.3 },
    { page: '/current', changefreq: 'monthly', priority: 0.3 },
    { page: '/training', changefreq: 'monthly', priority: 0.3 },
    { page: '/calendar', changefreq: 'monthly', priority: 0.6 },  
    { page: '/gallery', changefreq: 'monthly', priority: 0.5 },
    { page: '/mission', changefreq: 'never', priority: 0.6 },
    { page: '/creed', changefreq: 'never', priority: 0.5 },  
    { page: '/admin', changefreq: 'monthly', priority: 0.5 },
    { page: '/resources', changefreq: 'monthly', priority: 0.4 },
    { page: '/values', changefreq: 'never', priority: 0.5 },
    { page: '/login', changefreq: 'never', priority: 0.5 },
    { page: '/signup', changefreq: 'never', priority: 0.5 },
    { page: '/forgot-password', changefreq: 'never', priority: 0.5 },
  ];
});