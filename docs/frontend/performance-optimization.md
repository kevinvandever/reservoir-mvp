# Performance Optimization

## Core Web Vitals Targets
- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s  
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1

## Performance Strategies
```jsx
// Image Optimization
<Image
  src={automation.previewImage}
  alt={automation.title}
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>

// Code Splitting & Lazy Loading
const AdminDashboard = lazy(() => import('../components/AdminDashboard'));
const AnalyticsChart = lazy(() => import('../components/AnalyticsChart'));

// Critical CSS Inlining
<style dangerouslySetInnerHTML={{
  __html: `
    /* Critical above-the-fold styles */
    .hero-section { /* styles */ }
    .navigation { /* styles */ }
    .loading-skeleton { /* styles */ }
  `
}} />

// Service Worker for Caching
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/',
    updateViaCache: 'none'
  });
}
```

## Loading States & Skeleton Screens
```jsx
// Skeleton Components
const DiscoveryCardSkeleton = () => (
  <Card className="discovery-card skeleton">
    <CardHeader>
      <div className="skeleton-line w-1/4 h-4"></div>
      <div className="skeleton-line w-3/4 h-6"></div>
      <div className="skeleton-line w-full h-4"></div>
    </CardHeader>
    <CardContent>
      <div className="skeleton-grid">
        <div className="skeleton-line w-1/3 h-4"></div>
        <div className="skeleton-line w-1/3 h-4"></div>
        <div className="skeleton-line w-1/3 h-4"></div>
      </div>
    </CardContent>
    <CardFooter>
      <div className="skeleton-line w-full h-10"></div>
    </CardFooter>
  </Card>
);

// Progressive Loading
const DiscoveryFeed = () => {
  const [discoveries, setDiscoveries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  return (
    <div className="discovery-feed">
      {loading ? (
        Array.from({ length: 6 }).map((_, i) => (
          <DiscoveryCardSkeleton key={i} />
        ))
      ) : (
        discoveries.map(discovery => (
          <DiscoveryCard key={discovery.id} discovery={discovery} />
        ))
      )}
    </div>
  );
};
```

---
