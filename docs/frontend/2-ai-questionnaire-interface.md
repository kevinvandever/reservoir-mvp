# 2. AI Questionnaire Interface

## Mobile Layout Design
```
┌─────────────────────────┐
│ ← Progress: 23/50 (46%) │ ← Header with progress
├─────────────────────────┤
│                         │
│     💬 Chat Messages    │ ← Scrollable conversation
│                         │
│ ┌─AI: Welcome! Let's... │
│ └─[timestamp]           │
│                         │
│ ┌─You: I'm a real...────┤ 
│ └─[timestamp]           │
│                         │
│ ┌─AI: Great! How many...│ ← Typing indicator when loading
│ └─●●● typing...         │
│                         │
│                         │
│                         │
├─────────────────────────┤
│ [Text Input Area]       │ ← Input with suggestions
│ [Send] [Voice] [Emoji]  │
└─────────────────────────┘
```

## Conversation Components
```jsx
// AI Message Bubble
<div className="message-bubble ai">
  <Avatar className="ai-avatar">🤖</Avatar>
  <div className="message-content">
    <p>Based on your role as a listing agent, how many active listings do you typically manage at once?</p>
    <QuickResponses>
      <Button variant="outline" size="sm">1-5 listings</Button>
      <Button variant="outline" size="sm">6-15 listings</Button>
      <Button variant="outline" size="sm">16+ listings</Button>
    </QuickResponses>
  </div>
  <span className="timestamp">2:34 PM</span>
</div>

// User Message Bubble  
<div className="message-bubble user">
  <div className="message-content">
    <p>Usually around 8-12 active listings. It gets overwhelming during busy seasons.</p>
  </div>
  <span className="timestamp">2:35 PM</span>
</div>

// Typing Indicator
<div className="typing-indicator">
  <div className="dots">
    <span></span><span></span><span></span>
  </div>
  <span>AI is thinking...</span>
</div>
```

## Input Enhancement Features
```jsx
// Smart Input Component
<div className="input-container">
  <TextareaAutosize 
    placeholder="Type your response..."
    className="message-input"
    onKeyPress={handleKeyPress}
    maxLength={500}
  />
  
  <div className="input-actions">
    <Button variant="ghost" size="sm">
      <Mic className="w-4 h-4" /> {/* Voice input */}
    </Button>
    <Button variant="ghost" size="sm">
      <Image className="w-4 h-4" /> {/* Photo upload */}
    </Button>
    <Button variant="primary" size="sm">
      <Send className="w-4 h-4" />
    </Button>
  </div>
  
  {/* Smart Suggestions */}
  <QuickSuggestions>
    <Button variant="outline" size="xs">Skip this question</Button>
    <Button variant="outline" size="xs">I'm not sure</Button>
    <Button variant="outline" size="xs">Tell me more</Button>
  </QuickSuggestions>
</div>
```

## Progress & Navigation
```jsx
// Progress Header
<header className="questionnaire-header">
  <Button variant="ghost" onClick={handleBack}>
    <ChevronLeft className="w-5 h-5" />
  </Button>
  
  <div className="progress-container">
    <ProgressBar value={progress} max={100} />
    <span className="progress-text">Question {currentQ} of ~50</span>
  </div>
  
  <Button variant="ghost" onClick={handleSave}>
    <Save className="w-5 h-5" />
  </Button>
</header>
```

---
