# Design Guidelines: Gohan's Life Timeline

## Design Approach
**Reference-Based Approach**: Drawing inspiration from photo-centric platforms like Instagram and Pinterest, combined with warm, organic pet brand aesthetics (similar to BarkBox, Chewy). The design emphasizes visual storytelling with a joyful, heartwarming tone.

## Core Design Elements

### A. Color Palette

**Light Mode (Primary)**
- Background: 42 25% 96% (warm off-white, almost cream)
- Primary (Golden): 38 85% 65% (rich golden retriever coat color)
- Secondary (Warm Brown): 30 35% 45% (deep warm brown for accents)
- Card/Section Background: 40 40% 92% (soft beige)
- Text Primary: 25 25% 20% (dark brown, not pure black)
- Text Secondary: 30 20% 45% (medium brown)

**Accent Colors**
- Playful Orange: 25 90% 60% (for CTAs and highlights)
- Soft Sage: 140 25% 65% (subtle accent for variety)

### B. Typography

**Font Families** (via Google Fonts)
- Headings: 'Quicksand' (playful, rounded, friendly)
- Body: 'Inter' (clean, readable)
- Timeline Years: 'Fredoka' (bold, playful)

**Type Scale**
- Hero/Page Title: text-5xl to text-6xl, font-bold
- Timeline Year Headers: text-4xl, font-extrabold
- Section Titles: text-2xl to text-3xl, font-semibold
- Body Text: text-base to text-lg
- Admin Panel Labels: text-sm, font-medium

### C. Layout System

**Spacing Primitives**: Use Tailwind units of 3, 4, 6, 8, 12, 16, 20
- Section padding: py-12 md:py-16 lg:py-20
- Card padding: p-6 md:p-8
- Element spacing: gap-4, gap-6, gap-8
- Container max-width: max-w-6xl

**Grid System**
- Timeline sections: Single column with centered content
- Photo galleries: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Admin panel: max-w-2xl centered layout

### D. Component Library

**1. Hero Section**
- Large hero with welcoming message about Gohan
- Prominent photo of Gohan (circular frame with golden border)
- Playful heading: "Gohan's Journey" or "A Golden Life"
- Subtle paw print decorative elements
- Soft gradient background (cream to light beige)

**2. Timeline Sections (Year Blocks)**
- Large year badge/label (circular or rounded rectangle) positioned to the left with connecting line
- Section container with soft rounded corners (rounded-2xl)
- Subtle shadow (shadow-md) and warm background
- Year number in large, bold typography with golden accent
- Age indicator: "Year 1 - Puppy Days", "Year 2 - Growing Strong"
- Photo/video grid below with consistent spacing

**3. Photo/Video Cards**
- Soft rounded corners (rounded-xl)
- Aspect ratio maintained (aspect-square or aspect-video)
- Warm border treatment: 3px solid border in light brown
- Gentle hover effect: slight scale (scale-105) and shadow increase
- Lazy loading for performance
- Video thumbnails with play icon overlay

**4. Admin Panel**
- Clean card-based layout with rounded-2xl corners
- Warm header with Gohan's name and admin icon
- Form inputs with rounded-lg borders and focus states in golden color
- Drag-and-drop upload area with dashed border and paw print icon
- Year selector as large, tactile buttons (not dropdown)
- Success feedback with playful animations (bouncing paw prints)

**5. Navigation Elements**
- Floating toggle button between Timeline/Admin views (bottom-right)
- Paw print icon for admin access
- Smooth color transitions on hover

**6. Decorative Elements**
- Subtle paw print watermarks in section backgrounds (low opacity)
- Curved connecting line in timeline (warm brown, 4px width)
- Bone-shaped dividers between major sections (optional but charming)
- Soft shadow effects throughout (no harsh shadows)

### E. Animations

**Minimal, Purposeful Motion**
- Scroll-triggered fade-in for timeline sections (subtle, not dramatic)
- Gentle hover scaling on photos (scale-105, duration-300)
- Success upload animation: bouncing paw print or checkmark
- Smooth transitions between timeline/admin views (fade + slight slide)

## Images

**Hero Section**
- Large circular photo of Gohan (400-500px diameter on desktop)
- Positioned center or slightly off-center
- Golden/brown gradient border (8-10px)
- Consider a carousel of 3-5 favorite photos if desired

**Timeline Sections**
- Each year displays 4-12 photos/videos in grid
- Maintain consistent image sizing within grids
- Support both portrait and landscape orientations gracefully

**Admin Panel**
- Small preview thumbnails of uploaded content
- Gohan's paw print icon for branding

## Accessibility & Dark Mode

**No Dark Mode Required** - This is a warm, bright tribute site where light mode's cheerful aesthetic is intentional.

**Accessibility**
- High contrast ratios for text (dark brown on cream backgrounds)
- Focus indicators on all interactive elements (golden outline)
- Alt text placeholders for all images
- Keyboard navigation support in admin panel

## Special Considerations

**Loading & Performance**
- Lazy load images beyond first 2 timeline sections
- Compress uploads automatically
- Show loading spinner with paw print animation

**Responsive Behavior**
- Mobile: Single column photo grids (grid-cols-1 sm:grid-cols-2)
- Tablet: 3 columns for photos
- Desktop: 4 columns for optimal viewing
- Admin panel: Full-width on mobile, centered card on desktop

**Empty States**
- For years without content: Placeholder with "Add memories" message and paw print illustration
- Warm, encouraging tone: "No photos yet - add Gohan's first memories!"