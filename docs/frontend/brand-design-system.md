# Brand & Design System

## Visual Identity
Building on Clockwork Coaching's established brand:

```css
/* Core Brand Colors */
:root {
  --primary: 38 75% 58%;        /* Warm amber/orange */
  --secondary: 215 25% 27%;     /* Professional charcoal */
  --accent: 38 50% 95%;         /* Soft cream highlight */
  
  --background: 0 0% 100%;      /* Clean white */
  --surface: 210 20% 98%;       /* Subtle warm gray */
  --surface-elevated: 0 0% 100%; /* White cards */
  
  --text-primary: 215 25% 27%;  /* Charcoal text */
  --text-secondary: 215 15% 45%; /* Muted gray */
  --text-muted: 215 10% 65%;    /* Light gray */
  
  --border: 215 15% 92%;        /* Subtle borders */
  --border-focus: 38 75% 58%;   /* Primary focus state */
  
  --success: 142 76% 36%;       /* Professional green */
  --warning: 45 93% 47%;        /* Attention yellow */
  --error: 0 72% 51%;           /* Error red */
}

/* Dark Mode Support */
.dark {
  --background: 215 25% 12%;
  --surface: 215 25% 16%;
  --surface-elevated: 215 25% 20%;
  --text-primary: 210 20% 95%;
  --text-secondary: 215 15% 75%;
  --text-muted: 215 10% 55%;
  --border: 215 25% 25%;
}
```

## Typography Scale
```css
/* Professional Typography Hierarchy */
.text-display {     /* Hero headlines */
  font-size: 3.75rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.text-h1 {          /* Page titles */
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
}

.text-h2 {          /* Section headers */
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1.3;
}

.text-h3 {          /* Card titles */
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
}

.text-body-lg {     /* Main content */
  font-size: 1.125rem;
  line-height: 1.6;
}

.text-body {        /* Standard text */
  font-size: 1rem;
  line-height: 1.5;
}

.text-body-sm {     /* Secondary text */
  font-size: 0.875rem;
  line-height: 1.4;
}

.text-caption {     /* Helper text */
  font-size: 0.75rem;
  line-height: 1.3;
  letter-spacing: 0.025em;
}
```

## Component Design Tokens
```css
/* Spacing Scale */
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */

/* Border Radius */
--radius-sm: 0.25rem;   /* Small elements */
--radius-md: 0.5rem;    /* Cards, buttons */
--radius-lg: 0.75rem;   /* Modal, large cards */
--radius-xl: 1rem;      /* Hero sections */

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.07);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
--shadow-xl: 0 25px 50px rgba(0,0,0,0.15);

/* Animation */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
```

---
