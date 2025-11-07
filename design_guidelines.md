# Alpha Gents - Design Guidelines

## Design Approach
**Reference-Based Strategy**: Drawing inspiration from premium fitness apps (Nike Training Club), meditation apps (Headspace's bold typography), and warrior/masculine aesthetics from brands like Under Armour's "Will Finds A Way" campaign. The design emphasizes bold statements, powerful imagery, and unapologetic masculinity while maintaining accessibility and usability.

## Core Design Principles
1. **Warrior Minimalism**: Strong, clean layouts with purposeful elements - no clutter, maximum impact
2. **Mobile-First Authority**: Every tap feels powerful and intentional
3. **Faith-Forward**: Biblical wisdom presented with reverence and strength
4. **Daily Ritual**: Design promotes consistent engagement and habit formation

---

## Typography

**Primary Font**: Montserrat (Google Fonts)
- Quote Headlines: 700-900 weight, 28-36px
- Category Titles: 600 weight, 20-24px
- Body/Quote Text: 500 weight, 16-18px
- Attribution: 400 weight, 14px, italic

**Secondary Font**: Crimson Text (for biblical references)
- Scripture Quotes: 600 weight, italic
- Verse Citations: 500 weight, 14px

**Hierarchy Rules**:
- All-caps for section headers and CTAs
- Letter-spacing: 0.05em on headers for commanding presence
- Line height: 1.6 for quote readability

---

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16
- Component padding: p-4 to p-8
- Section spacing: gap-6 to gap-12
- Card margins: m-4
- Icon-to-text: gap-4

**Mobile Container**: 
- Max-width: 100% with px-4 gutters
- Content cards: Full-width minus 32px (mx-4)
- No multi-column on mobile
- Tablet (md:): 2-column grids for category browsing

**Screen Zones**:
- Top sticky header: 64px fixed with blurred background
- Bottom navigation bar: 72px with 4-5 primary actions
- Content area: Scrollable between header/footer

---

## Component Library

### Navigation
**Bottom Tab Bar** (sticky):
- Today (home icon) | Categories (grid icon) | Random (shuffle icon) | Favorites (heart icon) | Share (share icon)
- Active state: Icon + label with accent treatment
- Icons: Heroicons (outline default, solid when active)

**Top Header** (sticky):
- App logo/name left-aligned
- Streak counter right-aligned (flame icon + number)
- Subtle gradient overlay backdrop-blur

### Quote Cards
**Daily Quote Card** (hero component):
- Full-width card with subtle gradient background
- Quote text: Large, centered, bold
- Attribution: Right-aligned, smaller
- Category tag: Top-left corner badge
- Action buttons row: Share | Favorite | Next
- Swipe gesture support for next quote

**Quote List Cards**:
- Compact cards in vertical scroll
- Quote preview (2 lines with ellipsis)
- Quick action icons (heart, share) inline right
- Tap to expand to full quote modal

### Category Grid
**Category Cards** (2-column on tablet, 1-column mobile):
- Icon + Category name
- Quote count indicator
- Subtle border with hover lift effect

### Modals/Overlays
**Full Quote View**:
- Center-screen modal with darkened backdrop
- Full quote display with breathing room
- Swipe down to dismiss
- Action buttons at bottom

**Share Sheet**:
- Native-style bottom sheet
- Quote rendered as styled image preview
- Platform icons (Instagram, Twitter, Save Image)

### Input/Interactive Elements
**Buttons**:
- Primary CTA: Full-width on mobile, bold text, strong presence
- Secondary: Outline style with icon support
- Icon-only: 44px minimum touch target

**Toggle/Favorites**:
- Heart icon fill animation on tap
- Immediate visual feedback
- Haptic feedback suggestion (if PWA supports)

---

## Images

### App Icon/Logo
**Alpha Gents Emblem**: Shield or lion head symbol combined with bold "AG" lettermark. Represents strength, honor, and biblical warrior heritage.
- Placement: Top header, splash screen, PWA icon
- Style: Minimalist, high contrast for small sizes

### Quote Background Patterns (Optional Enhancement)
**Subtle Textures**: Minimal noise/grain overlays on quote cards for depth without distraction
- Never obscure text readability
- 5-10% opacity maximum

### Category Icons
Use Heroicons for category representation:
- Discipline: Shield icon
- Goals: Target icon
- Faith: Bookmark/star icon
- Integrity: Scale/balance icon
- Strength: Fire/lightning icon
- Purpose: Compass icon

**No large hero images** - app is quote-focused, text is hero.

---

## Animations

**Use Sparingly**:
- Quote card entry: Subtle fade-up (200ms)
- Favorite heart: Scale pulse on tap
- Page transitions: Smooth slide (300ms)
- Pull-to-refresh: Custom spinner with app branding

**No Animations**:
- Background effects
- Floating particles
- Continuous loops
- Scroll-triggered reveals

---

## PWA-Specific Design

**Splash Screen**: 
- App logo centered
- Dark background
- Loading indicator below logo

**Install Prompt**:
- Bottom sheet design
- Clear value proposition: "Get daily motivation offline"
- Strong CTA: "Add to Home Screen"

**Offline State**:
- Graceful message when no connection
- Show cached quotes
- Clear indicator of offline mode

---

## Accessibility

- All touch targets: Minimum 44x44px
- Color contrast: WCAG AA minimum on all text
- Focus indicators: Visible keyboard navigation support
- Screen reader: Proper ARIA labels on all interactive elements
- Font scaling: Support system text size preferences

---

## Mobile Optimization

- Single-column layouts as default
- Thumb-friendly bottom navigation
- Swipe gestures for quote navigation
- No horizontal scrolling
- Fast tap response (<100ms feedback)
- Minimal scroll hijacking

This design creates a powerful, masculine motivation tool that feels like a trusted daily companion for driven men seeking inspiration and spiritual strength.