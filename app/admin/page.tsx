'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Save,
  X,
  Settings,
  BarChart3,
  FileText,
  Image as ImageIcon,
  Video,
  Link as LinkIcon
} from 'lucide-react'

// Mock admin data for YOLO demonstration - Story 2.13
const mockAutomations = [
  {
    id: '1',
    title: 'Email Marketing Automation',
    description: 'Complete guide to setting up automated email sequences',
    category: 'Marketing',
    difficulty: 'Medium',
    status: 'published',
    views: 1250,
    implementations: 89,
    rating: 4.8,
    lastUpdated: '2025-01-15'
  },
  {
    id: '2',
    title: 'Lead Scoring System',
    description: 'Automatically score and prioritize leads based on behavior',
    category: 'Sales',
    difficulty: 'Hard',
    status: 'draft',
    views: 0,
    implementations: 0,
    rating: 0,
    lastUpdated: '2025-01-20'
  },
  {
    id: '3',
    title: 'Customer Support Chatbot',
    description: 'Deploy AI-powered chatbot for 24/7 customer support',
    category: 'Support',
    difficulty: 'Hard',
    status: 'published',
    views: 890,
    implementations: 34,
    rating: 4.6,
    lastUpdated: '2025-01-18'
  }
]

const mockFeedback = [
  {
    id: '1',
    automationId: '1',
    user: 'Sarah J.',
    rating: 5,
    comment: 'Excellent guide! Saved us 15 hours per week.',
    date: '2025-01-20',
    helpful: 12
  },
  {
    id: '2',
    automationId: '1',
    user: 'Mike D.',
    rating: 4,
    comment: 'Great step-by-step instructions, but could use more screenshots.',
    date: '2025-01-19',
    helpful: 8
  },
  {
    id: '3',
    automationId: '3',
    user: 'Lisa M.',
    rating: 5,
    comment: 'The chatbot implementation was flawless. Amazing results!',
    date: '2025-01-18',
    helpful: 15
  }
]

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState('content')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newAutomation, setNewAutomation] = useState({
    title: '',
    description: '',
    category: 'Marketing',
    difficulty: 'Easy',
    content: '',
    estimatedTime: '',
    tools: [] as string[]
  })
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  const startEditing = (id: string) => {
    setEditingId(id)
    const automation = mockAutomations.find(a => a.id === id)
    if (automation) {
      setNewAutomation({
        title: automation.title,
        description: automation.description,
        category: automation.category,
        difficulty: automation.difficulty,
        content: '',
        estimatedTime: '2-3 hours',
        tools: ['Tool 1', 'Tool 2']
      })
    }
  }
  
  const cancelEditing = () => {
    setEditingId(null)
    setNewAutomation({
      title: '',
      description: '',
      category: 'Marketing',
      difficulty: 'Easy',
      content: '',
      estimatedTime: '',
      tools: []
    })
  }
  
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Settings className="h-8 w-8 mr-3 text-primary" />
            Content Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage automation content, guides, and user feedback.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Automation
        </Button>
      </div>
      
      {/* Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'content', label: 'Content Library', icon: FileText },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'feedback', label: 'User Feedback', icon: Eye }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>
      
      {/* Content Tab */}
      {selectedTab === 'content' && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">Total Automations</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">18</div>
                <div className="text-sm text-muted-foreground">Published</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-muted-foreground">Drafts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">4.7</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Automation Editor */}
          {editingId && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Edit Automation</CardTitle>
                  <Button variant="ghost" size="sm" onClick={cancelEditing}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input 
                      value={newAutomation.title}
                      onChange={(e) => setNewAutomation({...newAutomation, title: e.target.value})}
                      placeholder="Automation title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select 
                      value={newAutomation.category}
                      onChange={(e) => setNewAutomation({...newAutomation, category: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Support">Support</option>
                      <option value="Operations">Operations</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    value={newAutomation.description}
                    onChange={(e) => setNewAutomation({...newAutomation, description: e.target.value})}
                    placeholder="Brief description of the automation"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Difficulty</label>
                    <select 
                      value={newAutomation.difficulty}
                      onChange={(e) => setNewAutomation({...newAutomation, difficulty: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Estimated Time</label>
                    <Input 
                      value={newAutomation.estimatedTime}
                      onChange={(e) => setNewAutomation({...newAutomation, estimatedTime: e.target.value})}
                      placeholder="e.g. 2-3 hours"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Step-by-Step Guide</label>
                  <Textarea 
                    value={newAutomation.content}
                    onChange={(e) => setNewAutomation({...newAutomation, content: e.target.value})}
                    placeholder="Write your implementation guide here..."
                    rows={8}
                    className="font-mono"
                  />
                </div>
                
                <div className="space-y-4">
                  <label className="text-sm font-medium">Media & Resources</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="space-y-2">
                      <div className="flex justify-center space-x-4">
                        <Button variant="outline" size="sm">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          Add Video
                        </Button>
                        <Button variant="outline" size="sm">
                          <LinkIcon className="h-4 w-4 mr-2" />
                          External Link
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop files here, or click to select
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={cancelEditing}>
                    Cancel
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Content List */}
          <Card>
            <CardHeader>
              <CardTitle>Automation Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAutomations.map((automation) => (
                  <div key={automation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{automation.title}</h4>
                        <Badge className={getStatusColor(automation.status)}>
                          {automation.status}
                        </Badge>
                        <Badge variant="outline">{automation.category}</Badge>
                        <Badge variant="outline">{automation.difficulty}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{automation.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{automation.views} views</span>
                        <span>{automation.implementations} implementations</span>
                        <span>⭐ {automation.rating}/5</span>
                        <span>Updated {automation.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => startEditing(automation.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Analytics Tab */}
      {selectedTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAutomations.filter(a => a.status === 'published').map((automation, index) => (
                  <div key={automation.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">#{index + 1} {automation.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {automation.implementations} implementations
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">⭐ {automation.rating}</div>
                      <div className="text-sm text-muted-foreground">
                        {automation.views} views
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Content Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Views</span>
                  <span className="font-semibold">2,140</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Implementations</span>
                  <span className="font-semibold">123</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Rating</span>
                  <span className="font-semibold">4.7/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion Rate</span>
                  <span className="font-semibold">78%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Feedback Tab */}
      {selectedTab === 'feedback' && (
        <Card>
          <CardHeader>
            <CardTitle>Recent User Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockFeedback.map((feedback) => {
                const automation = mockAutomations.find(a => a.id === feedback.automationId)
                return (
                  <div key={feedback.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium">{automation?.title}</div>
                        <div className="text-sm text-muted-foreground">
                          by {feedback.user} on {feedback.date}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">⭐ {feedback.rating}/5</span>
                        <Badge variant="outline">{feedback.helpful} helpful</Badge>
                      </div>
                    </div>
                    <p className="text-sm">{feedback.comment}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}