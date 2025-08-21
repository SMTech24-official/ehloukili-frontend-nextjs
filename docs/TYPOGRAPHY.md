# Typography System Documentation

## Overview

This production-grade typography system provides consistent, accessible, and responsive text styling throughout the Dometerra real estate platform. Built with Roboto font family and design system color tokens.

## Components

### Core Components

#### `<Heading>`
Main heading component for titles and section headers.

```tsx
import { Heading } from '@/components/ui/Typography';

// Basic usage
<Heading level={1}>Page Title</Heading>
<Heading level={2} color="primary">Section Title</Heading>
<Heading level={3} weight="semibold">Subsection</Heading>
```

**Props:**
- `level?: 1 | 2 | 3 | 4 | 5 | 6` (default: 2)
- `color?: 'default' | 'muted' | 'primary' | 'secondary' | 'white' | etc.`
- `weight?: 'normal' | 'medium' | 'semibold' | 'bold'`
- `as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'`

#### `<Text>`
Versatile text component for body content.

```tsx
import { Text } from '@/components/ui/Typography';

<Text>Regular body text</Text>
<Text size="lg" color="muted">Large muted text</Text>
<Text weight="semibold" align="center">Centered bold text</Text>
```

**Props:**
- `size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'` (default: 'base')
- `color?: 'default' | 'muted' | 'primary' | 'secondary' | etc.`
- `weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'`
- `align?: 'left' | 'center' | 'right' | 'justify'`
- `as?: React.ElementType` (default: 'p')

### Specialized Components

#### `<Display>`
Large promotional text for hero sections.

```tsx
import { Display } from '@/components/ui/Typography';

<Display size="lg">Your Dream Home Awaits</Display>
<Display size="sm" color="primary">Dometerra</Display>
```

#### `<Lead>`
Introductory text that stands out from regular body text.

```tsx
import { Lead } from '@/components/ui/Typography';

<Lead>
  Discover premium properties with unbeatable prices and exceptional value.
</Lead>
```

#### `<Subtitle>`
Section descriptions with auto-centering and max-width.

```tsx
import { Subtitle } from '@/components/ui/Typography';

<Subtitle>
  Find the perfect home for sale or rent throughout the country.
</Subtitle>
```

#### `<SectionTitle>`
Pre-styled section headings with consistent spacing.

```tsx
import { SectionTitle } from '@/components/ui/Typography';

<SectionTitle>Featured Properties</SectionTitle>
```

#### `<Muted>`
Secondary information with light color.

```tsx
import { Muted } from '@/components/ui/Typography';

<Muted>Last updated: 2 hours ago</Muted>
```

## Usage Examples

### Hero Section
```tsx
<Heading level={1} className="mb-6">
  Your Dream Home is Just a Click Away
</Heading>
<Lead className="mb-12 max-w-3xl mx-auto" align="center">
  Search for properties, find the perfect place to call home.
</Lead>
```

### Property Card
```tsx
<Heading level={4} className="mb-2">Modern Downtown Apartment</Heading>
<Text color="muted" size="sm" className="mb-3">123 Main Street</Text>
<Lead className="mb-4">
  Luxurious 2-bedroom apartment with stunning city views.
</Lead>
<Text color="primary" weight="bold" size="lg">$2,500/month</Text>
```

### Section Layout
```tsx
<SectionTitle>Discover Our Best Deals</SectionTitle>
<Subtitle>
  Unlock exclusive offers on premium properties with unbeatable prices.
</Subtitle>
```

## Design Tokens

### Font Sizes
- **xs**: 12px (leading-4)
- **sm**: 14px (leading-5)
- **base**: 16px (leading-6)
- **lg**: 18px (leading-7)
- **xl**: 20px (leading-8)
- **2xl**: 24px (leading-9)

### Heading Sizes
- **H1**: 36px → 48px → 60px (mobile → tablet → desktop)
- **H2**: 30px → 36px → 48px
- **H3**: 24px → 30px → 36px
- **H4**: 20px → 24px → 30px
- **H5**: 18px → 20px → 24px
- **H6**: 16px → 18px → 20px

### Colors
- **default**: Primary text color
- **muted**: Secondary text color
- **light**: Tertiary text color
- **primary**: Brand primary color
- **secondary**: Brand secondary color
- **white**: White text
- **success/warning/error/info**: Semantic colors

## Best Practices

### 1. Semantic HTML
Always use appropriate semantic elements or override with the `as` prop:

```tsx
<Heading level={1} as="h1">Page Title</Heading>
<Text as="span">Inline text</Text>
```

### 2. Responsive Design
The typography system is mobile-first and automatically responsive:

```tsx
// These automatically scale on different screen sizes
<Heading level={1}>Responsive Heading</Heading>
<Text size="lg">Responsive Text</Text>
```

### 3. Color Usage
Use semantic color names for consistency:

```tsx
// Good
<Text color="muted">Secondary information</Text>
<Text color="primary">Brand-colored text</Text>

// Avoid
<Text className="text-gray-600">Secondary information</Text>
```

### 4. Hierarchy
Maintain proper heading hierarchy:

```tsx
<Heading level={1}>Page Title</Heading>
  <Heading level={2}>Section Title</Heading>
    <Heading level={3}>Subsection Title</Heading>
```

### 5. Spacing
Use consistent spacing patterns:

```tsx
<SectionTitle>Title</SectionTitle>
<Subtitle className="mb-8">Description</Subtitle>
<Text className="mb-4">Content</Text>
```

## Accessibility

- All components support screen readers
- Proper semantic HTML structure
- Color contrast meets WCAG guidelines
- Font sizes are responsive and scalable

## Migration Guide

### From Old Typography
```tsx
// Old
<h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Title</h2>
<p className="text-lg text-neutral-600">Description</p>

// New
<SectionTitle>Title</SectionTitle>
<Subtitle>Description</Subtitle>
```

### Custom Styling
```tsx
// Extend with additional classes
<Heading level={2} className="uppercase tracking-wide">
  Custom Styled Heading
</Heading>

// Or use the cn utility
import { cn } from '@/utils/classNames';

<Text className={cn("custom-class", someCondition && "conditional-class")}>
  Text with conditional styling
</Text>
```

## Performance

- Components are tree-shakeable
- No runtime CSS-in-JS overhead
- Optimized for bundle size
- Uses CSS custom properties for theming

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Roboto font fallbacks to Arial and system fonts
- Progressive enhancement for older browsers
