# 7. Admin Interface for Content Management

## Admin Dashboard Layout
```
┌─────────────────────────┐
│ 🔧 Reservoir Admin      │ ← Admin header
│ [Kevin] [Joe] [Logout]  │
├─────────────────────────┤
│ 📊 Content Overview     │ ← Quick stats
│                         │
│ Active Automations: 127 │
│ Published: 98           │
│ Draft: 29              │
│ Categories: 12         │
├─────────────────────────┤
│ ⚡ Quick Actions         │ ← Action buttons
│                         │
│ [+ New Automation]      │
│ [Bulk Import]           │
│ [Category Manager]      │
│ [User Analytics]        │
├─────────────────────────┤
│ 📋 Recent Activity      │ ← Activity feed
│                         │
│ • Joe published "Smart  │
│   Contract Templates"   │
│   2 hours ago           │
│                         │
│ • Kevin updated "Lead   │
│   Response Auto"        │
│   5 hours ago           │
│                         │
│ • New user feedback on  │
│   "Social Media Auto"   │
│   1 day ago             │
├─────────────────────────┤
│ 🎯 Content Performance  │ ← Top content
│                         │
│ Most Saved:             │
│ 1. Lead Response (89%)  │
│ 2. CRM Setup (76%)      │
│ 3. Email Sequences(71%) │
│                         │
│ Needs Attention:        │
│ • Contract Auto (34%)   │
│ • Market Reports (28%)  │
└─────────────────────────┘
```

## Automation Editor Interface
```jsx
// Automation Creation/Edit Form
<div className="automation-editor">
  <header className="editor-header">
    <div className="header-left">
      <Button variant="ghost" onClick={handleBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>
    </div>
    <div className="header-right">
      <Button variant="outline" onClick={handlePreview}>
        <Eye className="w-4 h-4 mr-2" />
        Preview
      </Button>
      <Button variant="outline" onClick={handleSaveDraft}>
        Save Draft
      </Button>
      <Button variant="primary" onClick={handlePublish}>
        <Rocket className="w-4 h-4 mr-2" />
        Publish
      </Button>
    </div>
  </header>

  <div className="editor-content">
    {/* Basic Information */}
    <Card className="editor-section">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="form-group">
          <Label htmlFor="title">Automation Title</Label>
          <Input 
            id="title"
            placeholder="e.g., Smart Lead Response System"
            value={formData.title}
            onChange={handleTitleChange}
          />
        </div>
        
        <div className="form-group">
          <Label htmlFor="description">Short Description</Label>
          <Textarea 
            id="description"
            placeholder="Brief description that appears in discovery cards..."
            value={formData.description}
            onChange={handleDescriptionChange}
            rows={3}
          />
        </div>
        
        <div className="form-grid-2">
          <div className="form-group">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lead-management">Lead Management</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="form-group">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select value={formData.difficulty} onValueChange={handleDifficultyChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy (1 hour)</SelectItem>
                <SelectItem value="medium">Medium (2-4 hours)</SelectItem>
                <SelectItem value="hard">Hard (5+ hours)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Impact Metrics */}
    <Card className="editor-section">
      <CardHeader>
        <CardTitle>Impact Metrics</CardTitle>
        <CardDescription>
          These help users understand the value of this automation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="form-grid-3">
          <div className="form-group">
            <Label htmlFor="timeSaved">Time Saved (hours/week)</Label>
            <Input 
              id="timeSaved"
              type="number"
              placeholder="8"
              value={formData.timeSaved}
              onChange={handleTimeSavedChange}
            />
          </div>
          
          <div className="form-group">
            <Label htmlFor="revenueImpact">Revenue Impact ($/month)</Label>
            <Input 
              id="revenueImpact"
              type="number"
              placeholder="2100"
              value={formData.revenueImpact}
              onChange={handleRevenueImpactChange}
            />
          </div>
          
          <div className="form-group">
            <Label htmlFor="implementationTime">Setup Time (hours)</Label>
            <Input 
              id="implementationTime"
              type="number"
              placeholder="3"
              value={formData.implementationTime}
              onChange={handleImplementationTimeChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <Label htmlFor="additionalBenefits">Additional Benefits</Label>
          <TagInput 
            id="additionalBenefits"
            placeholder="Add benefit (press Enter)"
            tags={formData.additionalBenefits}
            onTagsChange={handleBenefitsChange}
          />
          <span className="form-help">
            e.g., "90% faster response time", "Reduces manual errors"
          </span>
        </div>
      </CardContent>
    </Card>

    {/* Implementation Guide */}
    <Card className="editor-section">
      <CardHeader>
        <CardTitle>Implementation Guide</CardTitle>
        <CardDescription>
          Step-by-step instructions for users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StepEditor 
          steps={formData.steps}
          onStepsChange={handleStepsChange}
        />
      </CardContent>
    </Card>

    {/* Required Tools */}
    <Card className="editor-section">
      <CardHeader>
        <CardTitle>Required Tools</CardTitle>
        <CardDescription>
          Tools users need to implement this automation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ToolSelector 
          selectedTools={formData.requiredTools}
          onToolsChange={handleToolsChange}
        />
      </CardContent>
    </Card>

    {/* Targeting & Personalization */}
    <Card className="editor-section">
      <CardHeader>
        <CardTitle>Targeting Criteria</CardTitle>
        <CardDescription>
          Define which users should see this automation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="form-group">
          <Label>Business Size</Label>
          <CheckboxGroup 
            options={businessSizeOptions}
            value={formData.targetBusinessSize}
            onChange={handleBusinessSizeChange}
          />
        </div>
        
        <div className="form-group">
          <Label>Experience Level</Label>
          <CheckboxGroup 
            options={experienceLevelOptions}
            value={formData.targetExperience}
            onChange={handleExperienceChange}
          />
        </div>
        
        <div className="form-group">
          <Label>Current Tools</Label>
          <ToolSelector 
            selectedTools={formData.targetTools}
            onToolsChange={handleTargetToolsChange}
            mode="targeting"
          />
        </div>
      </CardContent>
    </Card>
  </div>
</div>
```

## Content Management Features
```jsx
// Step Editor Component
<div className="step-editor">
  <div className="steps-list">
    {steps.map((step, index) => (
      <Card key={step.id} className="step-card">
        <CardHeader>
          <div className="step-header">
            <span className="step-number">Step {index + 1}</span>
            <div className="step-actions">
              <Button variant="ghost" size="sm" onClick={() => moveStep(index, -1)}>
                <ChevronUp className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => moveStep(index, 1)}>
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteStep(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="form-group">
            <Label>Step Title</Label>
            <Input 
              value={step.title}
              onChange={(e) => updateStep(index, 'title', e.target.value)}
              placeholder="e.g., Configure your CRM"
            />
          </div>
          
          <div className="form-group">
            <Label>Instructions</Label>
            <RichTextEditor 
              value={step.instructions}
              onChange={(value) => updateStep(index, 'instructions', value)}
              placeholder="Detailed step instructions..."
            />
          </div>
          
          <div className="form-group">
            <Label>Media</Label>
            <MediaUploader 
              onUpload={(url, type) => addStepMedia(index, url, type)}
              acceptedTypes={['image', 'video']}
            />
            {step.media.map((media, mediaIndex) => (
              <MediaPreview 
                key={mediaIndex}
                media={media}
                onRemove={() => removeStepMedia(index, mediaIndex)}
              />
            ))}
          </div>
          
          <div className="form-group">
            <Label>Required Tools for This Step</Label>
            <ToolSelector 
              selectedTools={step.requiredTools}
              onToolsChange={(tools) => updateStep(index, 'requiredTools', tools)}
            />
          </div>
          
          <div className="form-group">
            <Label>Estimated Time</Label>
            <Select 
              value={step.estimatedTime}
              onValueChange={(value) => updateStep(index, 'estimatedTime', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time estimate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5-min">5 minutes</SelectItem>
                <SelectItem value="15-min">15 minutes</SelectItem>
                <SelectItem value="30-min">30 minutes</SelectItem>
                <SelectItem value="1-hour">1 hour</SelectItem>
                <SelectItem value="2-hours">2+ hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
  
  <Button 
    variant="outline" 
    onClick={addNewStep}
    className="w-full"
  >
    <Plus className="w-4 h-4 mr-2" />
    Add New Step
  </Button>
</div>
```

---
