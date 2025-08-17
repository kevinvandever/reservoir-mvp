# Testing Strategy

## Component Testing
```jsx
// Discovery Card Test
import { render, screen, fireEvent } from '@testing-library/react';
import { DiscoveryCard } from '../DiscoveryCard';

const mockDiscovery = {
  id: '1',
  title: 'Smart Follow-up Sequences',
  description: 'Automatically nurture leads...',
  timeSaved: 3,
  difficulty: 'medium',
  category: 'lead-management'
};

describe('DiscoveryCard', () => {
  it('renders discovery information correctly', () => {
    render(<DiscoveryCard discovery={mockDiscovery} />);
    
    expect(screen.getByText('Smart Follow-up Sequences')).toBeInTheDocument();
    expect(screen.getByText('3 hours/week')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });
  
  it('calls onSave when save button is clicked', () => {
    const onSave = jest.fn();
    render(<DiscoveryCard discovery={mockDiscovery} onSave={onSave} />);
    
    fireEvent.click(screen.getByLabelText(/save/i));
    expect(onSave).toHaveBeenCalledWith(mockDiscovery.id);
  });
});
```

## Accessibility Testing
```jsx
// A11y Testing
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<DiscoveryCard discovery={mockDiscovery} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## E2E Testing (Playwright)
```javascript
// Questionnaire Flow Test
import { test, expect } from '@playwright/test';

test('complete questionnaire flow', async ({ page }) => {
  await page.goto('/questionnaire');
  
  // Start questionnaire
  await page.click('text=Start Free Analysis');
  
  // Answer first question
  await page.fill('[placeholder="Type your response..."]', 'I am a listing agent');
  await page.click('[aria-label="Send message"]');
  
  // Verify AI response
  await expect(page.locator('.ai-message')).toContainText('Great!');
  
  // Continue through questionnaire...
  
  // Complete and verify report generation
  await expect(page.locator('.analysis-report')).toBeVisible();
  await expect(page.locator('text=Your Automation Score')).toBeVisible();
});
```

---
