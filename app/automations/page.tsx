'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  Clock, 
  DollarSign, 
  Zap,
  Mail,
  Users,
  BarChart3,
  Calendar,
  MessageSquare,
  FileText,
  Target,
  ArrowRight
} from 'lucide-react'

// Mock automation library for YOLO demonstration
const mockAutomations = [
  {
    id: '1',
    title: 'Automated Lead Scoring',
    description: 'Automatically score and prioritize leads based on behavior, demographics, and engagement patterns. Increase conversion rates by 40%.',
    category: 'Sales',
    difficulty: 'Medium',
    timeSaved: 8,
    revenueImpact: 2500,
    implementationTime: '2-3 weeks',
    tags: ['CRM', 'Lead Management', 'AI'],
    icon: Target,
    businessSize: ['Small', 'Medium', 'Large'],
    steps: 5
  },
  {
    id: '2',
    title: 'Customer Email Sequences',
    description: 'Set up automated nurture sequences for different customer segments. Reduce manual follow-up time by 90%.',
    category: 'Marketing',
    difficulty: 'Easy',
    timeSaved: 12,
    revenueImpact: 1800,
    implementationTime: '1 week',
    tags: ['Email Marketing', 'Automation', 'Nurturing'],
    icon: Mail,
    businessSize: ['Small', 'Medium'],
    steps: 3
  },
  {
    id: '3',
    title: 'Meeting Scheduling Automation',
    description: 'Eliminate back-and-forth emails with automated scheduling. Save 5 hours per week on calendar management.',
    category: 'Operations',
    difficulty: 'Easy',
    timeSaved: 5,
    revenueImpact: 800,
    implementationTime: '3 days',
    tags: ['Calendar', 'Scheduling', 'Productivity'],
    icon: Calendar,
    businessSize: ['Small', 'Medium', 'Large'],
    steps: 2
  },
  {
    id: '4',
    title: 'Customer Support Chatbot',
    description: 'Deploy AI-powered chatbot to handle common customer queries 24/7. Reduce support tickets by 60%.',
    category: 'Support',
    difficulty: 'Hard',
    timeSaved: 15,
    revenueImpact: 3200,
    implementationTime: '4-6 weeks',
    tags: ['AI', 'Customer Support', 'Chatbot'],
    icon: MessageSquare,
    businessSize: ['Medium', 'Large'],
    steps: 8
  },
  {
    id: '5',
    title: 'Automated Reporting Dashboard',
    description: 'Generate weekly performance reports automatically. Stop spending hours compiling data manually.',
    category: 'Analytics',
    difficulty: 'Medium',
    timeSaved: 6,
    revenueImpact: 1200,
    implementationTime: '2 weeks',
    tags: ['Analytics', 'Reporting', 'Dashboard'],
    icon: BarChart3,
    businessSize: ['Small', 'Medium', 'Large'],
    steps: 4
  },
  {
    id: '6',
    title: 'Invoice Processing Automation',
    description: 'Automatically process and categorize invoices. Reduce accounting overhead by 75%.',
    category: 'Finance',
    difficulty: 'Medium',
    timeSaved: 10,
    revenueImpact: 2000,
    implementationTime: '2-3 weeks',
    tags: ['Finance', 'OCR', 'Accounting'],
    icon: FileText,
    businessSize: ['Small', 'Medium'],
    steps: 6
  }
]

const categories = ['All', 'Sales', 'Marketing', 'Operations', 'Support', 'Analytics', 'Finance']
const difficulties = ['All', 'Easy', 'Medium', 'Hard']

export default function AutomationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  
  const filteredAutomations = mockAutomations.filter(automation => {
    const matchesSearch = automation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      automation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      automation.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || automation.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || automation.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Automation Library</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover proven automation solutions to transform your business operations and boost productivity.
        </p>
      </div>
      
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search automations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select 
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {filteredAutomations.length} automation{filteredAutomations.length !== 1 ? 's' : ''} found
            </p>
            <Badge variant="outline">
              <Filter className="h-3 w-3 mr-1" />
              Active filters: {[selectedCategory, selectedDifficulty].filter(f => f !== 'All').length}
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      {/* Automation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAutomations.map((automation) => {
          const IconComponent = automation.icon
          return (
            <Card key={automation.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{automation.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {automation.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(automation.difficulty)}>
                    {automation.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {automation.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    {automation.timeSaved}h/week saved
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                    ${automation.revenueImpact}/month
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-muted-foreground" />
                    {automation.implementationTime}
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    {automation.steps} steps
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {automation.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {automation.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{automation.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    Best for: {automation.businessSize.join(', ')} businesses
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button asChild className="flex-1">
                    <Link href={`/guide/${automation.id === '2' ? 'email-automation' : 'email-automation'}`}>
                      Start Guide
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      {filteredAutomations.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No automations found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
                setSelectedDifficulty('All')
              }}
            >
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Don't See What You're Looking For?</h3>
          <p className="text-lg opacity-90 mb-6">
            Our AI can analyze your specific business needs and create custom automation recommendations.
          </p>
          <Button size="lg" variant="secondary">
            Get Personalized Recommendations
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}