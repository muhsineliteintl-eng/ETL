# Loading System Documentation

## Overview
The loading system provides comprehensive loading states for both data fetching and image loading to improve user experience, especially with heavy images.

## Components

### 1. LoadingScreen
A full-screen loading component with animated progress bar and dynamic text.

**Usage:**
```jsx
import LoadingScreen from '../components/LoadingScreen';

<LoadingScreen isLoading={true} loadingText="Loading content..." />
```

**Features:**
- Animated logo and spinner
- Progress bar with percentage
- Dynamic loading text
- Smooth fade out animation
- Background pattern effects

### 2. OptimizedImage
An image component with loading states and error handling.

**Usage:**
```jsx
import OptimizedImage from '../components/OptimizedImage';

<OptimizedImage 
    src="/images/heavy-image.jpg"
    alt="Description"
    className="w-full h-64 object-cover"
    showLoader={true}
    fallbackSrc="/images/placeholder.png"
/>
```

**Features:**
- Loading skeleton animation
- Error state with fallback image
- Smooth fade-in when loaded
- Customizable styling

### 3. useImagePreloader Hook
Preloads multiple images and tracks progress.

**Usage:**
```jsx
import { useImagePreloader } from '../hooks/useImagePreloader';

const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];
const { imagesLoaded, loadedCount, totalCount, progress } = useImagePreloader(images);
```

**Returns:**
- `imagesLoaded`: Boolean indicating if all images are loaded
- `loadedCount`: Number of images loaded
- `totalCount`: Total number of images
- `progress`: Loading progress percentage (0-100)

### 4. useImageLoader Hook
Loads a single image and tracks its state.

**Usage:**
```jsx
import { useImageLoader } from '../hooks/useImagePreloader';

const { loaded, error } = useImageLoader('/path/to/image.jpg');
```

### 5. LoadingContext
Global loading state management.

**Setup in layout:**
```jsx
import { LoadingProvider } from '../contexts/LoadingContext';

<LoadingProvider>
    {children}
</LoadingProvider>
```

**Usage:**
```jsx
import { useLoading } from '../contexts/LoadingContext';

const { showLoading, hideLoading, globalLoading, loadingText } = useLoading();

// Show loading
showLoading('Processing...');

// Hide loading
hideLoading();
```

## Implementation Examples

### Main Page Loading
The main page (`src/app/page.jsx`) demonstrates comprehensive loading:

1. **Data Loading**: Fetches content from API
2. **Image Preloading**: Preloads critical images
3. **Progress Tracking**: Shows loading progress
4. **Dynamic Text**: Updates loading text based on progress

### Heavy Image Components
For components with heavy images:

```jsx
// Replace regular img tags
<img src="/heavy-image.jpg" alt="Description" />

// With OptimizedImage
<OptimizedImage 
    src="/heavy-image.jpg" 
    alt="Description"
    className="your-styles"
    showLoader={true}
/>
```

### Service Images
For service images that might be heavy:

```jsx
const serviceImages = [
    '/public/images/services/electric.png',
    '/public/images/services/elevator.png',
    // ... more images
];

const { imagesLoaded, progress } = useImagePreloader(serviceImages);

if (!imagesLoaded) {
    return <LoadingScreen isLoading={true} loadingText={`Loading services... ${Math.round(progress)}%`} />;
}
```

## Best Practices

1. **Critical Images**: Preload images that are immediately visible (hero, logos, above-the-fold content)

2. **Progressive Loading**: Load critical content first, then secondary content

3. **Fallback Images**: Always provide fallback images for error states

4. **Loading Text**: Use descriptive, dynamic loading text to keep users informed

5. **Performance**: Don't preload too many images at once - prioritize critical ones

## File Structure
```
src/
├── components/
│   ├── LoadingScreen.jsx      # Full-screen loading component
│   └── OptimizedImage.jsx     # Image with loading states
├── hooks/
│   └── useImagePreloader.js   # Image preloading hooks
├── contexts/
│   └── LoadingContext.jsx     # Global loading state
└── app/
    └── page.jsx              # Example implementation
```

## Configuration

### Critical Images List
Update the critical images list in `src/app/page.jsx`:

```jsx
const criticalImages = [
    '/images/hero-bg.png',
    '/images/logo.png',
    // Add your critical images here
];
```

### Loading Text Variations
Customize loading messages in `LoadingScreen.jsx`:

```jsx
const loadingTexts = [
    "Loading Elite International...",
    "Preparing your experience...",
    "Loading images and content...",
    "Almost ready..."
];
```

This loading system ensures smooth user experience even with heavy images and slow connections.