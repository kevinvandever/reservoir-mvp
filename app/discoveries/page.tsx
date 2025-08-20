'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles,
  Clock, 
  DollarSign, 
  TrendingUp,
  BookmarkPlus,
  X,
  CheckCircle,
  Star,
  Filter,
  Calendar,
  Target
} from 'lucide-react'

// Mock discoveries for YOLO demonstration - Story 2.5
const mockDiscoveries = [
  {
    id: '1',
    title: 'Smart Client Onboarding Sequence',
    description: 'Automate your client onboarding with personalized welcome sequences, document collection, and progress tracking.',
    category: 'Customer Experience',
    relevanceScore: 95,
    timeSaved: 6,
    revenueImpact: 1500,
    difficulty: 'Medium',
    week: 'This Week',
    status: 'new',
    reasons: ['High client volume', 'Manual onboarding detected', 'Revenue opportunity'],
    implementationTime: '1-2 weeks'
  },
  {
    id: '2',
    title: 'Automated Social Media Posting',
    description: 'Schedule and auto-post content across all your social platforms with AI-generated captions.',
    category: 'Marketing',
    relevanceScore: 88,
    timeSaved: 4,
    revenueImpact: 800,
    difficulty: 'Easy',
    week: 'This Week',
    status: 'saved',
    reasons: ['Active social presence', 'Time constraint patterns'],
    implementationTime: '3-5 days'
  },
  {
    id: '3',
    title: 'Expense Report Automation',
    description: 'Automatically categorize and process expense reports using receipt scanning and AI classification.',
    category: 'Finance',
    relevanceScore: 82,
    timeSaved: 3,
    revenueImpact: 600,
    difficulty: 'Medium',
    week: 'Last Week',
    status: 'dismissed',
    reasons: ['Manual expense processing', 'Accounting overhead'],
    implementationTime: '1 week'
  },
  {
    id: '4',
    title: 'Lead Qualification Chatbot',
    description: 'Deploy an intelligent chatbot to qualify leads 24/7 and route high-quality prospects to your sales team.',
    category: 'Sales',
    relevanceScore: 90,
    timeSaved: 10,
    revenueImpact: 2200,
    difficulty: 'Hard',
    week: 'This Week',
    status: 'new',
    reasons: ['Lead volume increase', 'After-hours inquiries'],
    implementationTime: '3-4 weeks'
  },
  {
    id: '5',
    title: 'Project Status Updates',
    description: 'Automatically generate and send project status updates to clients based on milestone completion.',
    category: 'Operations',
    relevanceScore: 76,
    timeSaved: 2,
    revenueImpact: 400,
    difficulty: 'Easy',
    week: 'Last Week',
    status: 'implemented',
    reasons: ['Client communication patterns'],
    implementationTime: '2-3 days'
  }
]

export default function DiscoveriesPage() {
  const [discoveries, setDiscoveries] = useState(mockDiscoveries)
  const [filterWeek, setFilterWeek] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  
  const weeks = ['All', 'This Week', 'Last Week']
  const statuses = ['All', 'new', 'saved', 'dismissed', 'implemented']
  
  const filteredDiscoveries = discoveries.filter(discovery => {
    const matchesWeek = filterWeek === 'All' || discovery.week === filterWeek
    const matchesStatus = filterStatus === 'All' || discovery.status === filterStatus
    return matchesWeek && matchesStatus
  })
  
  const updateDiscoveryStatus = (id: string, newStatus: string) => {
    setDiscoveries(prev => prev.map(d => 
      d.id === id ? { ...d, status: newStatus } : d
    ))
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'saved': return 'bg-yellow-100 text-yellow-800'
      case 'dismissed': return 'bg-gray-100 text-gray-800'
      case 'implemented': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  const getRelevanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-gray-600'
  }
  
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Sparkles className="h-8 w-8 mr-3 text-primary" />
            Weekly Discoveries
          </h1>
          <p className="text-muted-foreground mt-2">
            Personalized automation recommendations based on your business profile and activity.
          </p>
        </div>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Configure Notifications
        </Button>
      </div>
      
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select 
                  value={filterWeek}
                  onChange={(e) => setFilterWeek(e.target.value)}
                  className="px-3 py-1 border rounded text-sm"
                >
                  {weeks.map(week => (
                    <option key={week} value={week}>{week}</option>
                  ))}
                </select>
                
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-1 border rounded text-sm"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <Badge variant="outline">
              {filteredDiscoveries.length} discoveries found
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      {/* Discoveries Grid */}
      <div className="space-y-6">
        {filteredDiscoveries.map((discovery) => (
          <Card key={discovery.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{discovery.title}</CardTitle>
                    <Badge variant="secondary">{discovery.category}</Badge>
                    <Badge className={getStatusColor(discovery.status)}>
                      {discovery.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <Star className={`h-4 w-4 mr-1 ${getRelevanceColor(discovery.relevanceScore)}`} />
                      {discovery.relevanceScore}% match
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {discovery.week}
                    </div>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      {discovery.implementationTime}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {discovery.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="text-xs text-muted-foreground">Why this matches you:</div>
                    {discovery.reasons.map((reason, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {reason}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <Clock className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                  <div className="font-semibold">{discovery.timeSaved}h/week</div>
                  <div className="text-xs text-muted-foreground">Time Saved</div>
                </div>
                <div className="text-center">
                  <DollarSign className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                  <div className="font-semibold">${discovery.revenueImpact}/month</div>
                  <div className="text-xs text-muted-foreground">Revenue Impact</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                  <div className="font-semibold">{discovery.difficulty}</div>
                  <div className="text-xs text-muted-foreground">Difficulty</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                {discovery.status === 'new' && (
                  <>
                    <Button 
                      size="sm" 
                      onClick={() => updateDiscoveryStatus(discovery.id, 'saved')}
                    >
                      <BookmarkPlus className="h-4 w-4 mr-2" />
                      Save for Later
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateDiscoveryStatus(discovery.id, 'dismissed')}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Not Interested
                    </Button>
                    <Button size="sm" variant="secondary">
                      View Details
                    </Button>
                  </>
                )}
                
                {discovery.status === 'saved' && (
                  <>
                    <Button 
                      size="sm"
                      onClick={() => updateDiscoveryStatus(discovery.id, 'implemented')}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Implemented
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </>
                )}
                
                {discovery.status === 'implemented' && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Implemented ✓
                  </Badge>
                )}
                
                {discovery.status === 'dismissed' && (
                  <Badge variant="outline" className="text-gray-600">
                    <X className="h-3 w-3 mr-1" />
                    Dismissed
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredDiscoveries.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No discoveries found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or check back next week for new personalized recommendations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}