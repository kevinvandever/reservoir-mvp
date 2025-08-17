# Component Library Specifications

## Button System
```jsx
// Button Variants & Sizes
const buttonVariants = {
  // Variants
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80", 
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  
  // Sizes
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-4 py-2",
  lg: "h-11 px-8",
  xl: "h-12 px-8 text-lg",
  
  // Special
  icon: "h-10 w-10"
};

// Usage Examples
<Button variant="primary" size="lg">
  Start Free Analysis
</Button>

<Button variant="outline" size="sm">
  <Heart className="w-4 h-4 mr-2" />
  Save
</Button>

<Button variant="ghost" size="icon">
  <MoreHorizontal className="w-4 h-4" />
</Button>
```

## Card System
```jsx
// Card Hierarchy
<Card className="discovery-card">
  <CardHeader>
    <CardTitle>Smart Follow-up Sequences</CardTitle>
    <CardDescription>
      Automatically nurture leads with personalized email sequences
    </CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main card content */}
  </CardContent>
  <CardFooter>
    {/* Actions and additional info */}
  </CardFooter>
</Card>

// Card Variants
const cardVariants = {
  default: "bg-card text-card-foreground",
  elevated: "bg-card text-card-foreground shadow-lg",
  outline: "border border-border bg-background",
  ghost: "bg-transparent",
  gradient: "bg-gradient-to-br from-primary/5 to-primary/10"
};
```

## Form Components
```jsx
// Input Components
<div className="form-group">
  <Label htmlFor="email">Email Address</Label>
  <Input 
    id="email"
    type="email"
    placeholder="your@email.com"
    required
  />
</div>

<div className="form-group">
  <Label htmlFor="message">Message</Label>
  <Textarea 
    id="message"
    placeholder="Tell us about your business..."
    rows={4}
  />
</div>

<div className="form-group">
  <Label htmlFor="category">Category</Label>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="lead-management">Lead Management</SelectItem>
      <SelectItem value="marketing">Marketing</SelectItem>
      <SelectItem value="operations">Operations</SelectItem>
    </SelectContent>
  </Select>
</div>
```

---
