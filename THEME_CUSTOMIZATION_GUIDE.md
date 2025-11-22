# Theme Customization Guide

## Overview
The theme system now supports comprehensive customization with:
- **14 predefined themes** (including 3 new ones: Midnight, Nebula, Volcano)
- **Quick custom theme generation** from a single color
- **Advanced color editor** for granular control over all theme properties

## Features Implemented

### 1. New Predefined Themes
Three beautiful new themes have been added:

- **Midnight**: Deep indigo theme with slate backgrounds
- **Nebula**: Vibrant fuchsia/purple space-inspired theme
- **Volcano**: Bold red theme with dark, fiery backgrounds

### 2. Custom Theme System

#### Quick Generation
Users can quickly generate a complete theme from a single primary color:
- Select a color using the color picker
- System automatically generates harmonious secondary, accent, background, and text colors using HSL color manipulation
- Colors are intelligently calculated:
  - **Secondary**: Analogous color (+30° hue shift)
  - **Accent**: Complementary color (+180° hue shift)
  - **Background**: Very dark, desaturated version based on primary hue
  - **Text colors**: Optimized for readability on dark backgrounds

#### Advanced Color Editor
Click "Advanced Color Editor" to access granular control over every aspect of your theme:

**Main Colors**
- Primary
- Secondary  
- Accent

**Backgrounds**
- Body Background
- Card Background
- Nav Background

**Text & Border**
- Text Main
- Text Muted
- Border

Each property includes:
- Visual color picker
- Manual hex input field for precise control
- Support for rgba() values for backgrounds

### 3. Persistence
All customizations are automatically saved to localStorage:
- Current theme selection
- Custom primary color
- Complete custom theme configuration

## CSS Variables Controlled

The theme system controls these CSS variables in `:root`:

```css
--primary: /* Main brand color */
--secondary: /* Secondary brand color */
--accent: /* Accent highlight color */
--bg-body: /* Page background */
--bg-card: /* Card/panel backgrounds */
--bg-nav: /* Navigation background */
--text-main: /* Primary text color */
--text-muted: /* Secondary/muted text */
--border: /* Border colors */
```

## Usage

### For Users
1. Click the palette icon (bottom-left of screen)
2. Choose from 14 predefined themes OR
3. Select "Custom Theme":
   - **Quick mode**: Pick a color to auto-generate a complete theme
   - **Advanced mode**: Click "Advanced Color Editor" for full control
4. Changes apply instantly and save automatically

### For Developers

#### Accessing Theme Context
```typescript
import { useTheme } from '../../hooks/useTheme';

const { 
  theme,           // Current theme name
  setTheme,        // Set predefined theme
  customTheme,     // Current custom theme colors
  setCustomTheme,  // Update custom theme colors
  customColor,     // Quick custom color
  setCustomColor,  // Set quick custom color
  currentColors    // Currently active color values
} = useTheme();
```

#### Setting Individual Colors
```typescript
// Update single color
setCustomTheme({ primary: '#FF5733' });

// Update multiple colors
setCustomTheme({ 
  primary: '#FF5733',
  secondary: '#33FF57',
  background: '#1a1a1a'
});
```

## Color Manipulation Utilities

The system includes HSL color manipulation functions:

- `hexToHSL(hex)`: Convert hex to HSL
- `hslToHex(h, s, l)`: Convert HSL to hex
- `generateThemeFromColor(color)`: Generate full theme from single color

These utilities enable intelligent color generation without external dependencies.

## Benefits

✅ **No external dependencies** - Pure TypeScript/JavaScript color manipulation
✅ **Instant preview** - Changes apply in real-time
✅ **Persistent** - Settings saved to localStorage
✅ **Flexible** - Quick generation OR granular control
✅ **Type-safe** - Full TypeScript support
✅ **Performance** - CSS custom properties for efficient updates

## Future Enhancements

Potential future improvements:
- Export/import theme configurations
- Theme sharing via URL parameters
- Accessibility contrast checking
- Light mode variants
- Gradient support
