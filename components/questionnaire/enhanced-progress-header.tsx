// Enhanced Progress Header with Section-by-Section Visualization
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { X, Save, Check, RotateCcw, Crown, ChevronDown, ChevronUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ProgressMetrics, SectionProgress, SectionType } from '@/lib/questionnaire/question-bank-types'
import { SessionManager } from '@/lib/access/session-manager'

interface EnhancedProgressHeaderProps {
  progress: ProgressMetrics
  isSaving?: boolean
  onStartOver?: () => void
  onExit?: () => void
}

export function EnhancedProgressHeader({ 
  progress, 
  isSaving = false, 
  onStartOver, 
  onExit 
}: EnhancedProgressHeaderProps) {
  const router = useRouter()
  const [showSectionDetails, setShowSectionDetails] = useState(false)
  const accessSession = SessionManager.getSession()
  const memberName = accessSession?.memberData?.name

  const handleExit = () => {
    if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
      onExit?.() || router.push('/dashboard')
    }
  }

  const handleStartOver = () => {
    if (confirm('Are you sure you want to start over? All current progress will be lost.')) {
      onStartOver?.()
    }
  }

  const getSectionIcon = (section: SectionType): string => {
    const icons: Record<SectionType, string> = {
      [SectionType.BUSINESS_FOUNDATION]: '🏗️',
      [SectionType.CURRENT_SYSTEMS]: '⚙️',
      [SectionType.LEAD_GENERATION]: '🎯',
      [SectionType.MARKETING_CONTENT]: '📢',
      [SectionType.TRANSACTION_MANAGEMENT]: '📋',
      [SectionType.MARKET_ANALYSIS]: '📊',
      [SectionType.GOALS_PRIORITIES]: '🚀'
    }
    return icons[section] || '📝'
  }

  const getSectionStatusColor = (sectionProgress: SectionProgress) => {
    if (sectionProgress.isComplete) return 'text-green-600 bg-green-100'
    if (sectionProgress.isActive) return 'text-blue-600 bg-blue-100'
    if (sectionProgress.completed > 0) return 'text-orange-600 bg-orange-100'
    return 'text-gray-500 bg-gray-100'
  }

  const currentSection = progress.sectionProgress.find(s => s.isActive)
  const estimatedTimeText = progress.estimatedTimeRemaining > 0 
    ? `~${Math.ceil(progress.estimatedTimeRemaining)} min remaining`
    : 'Almost done!'

  return (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-slate-900 to-blue-900 text-white border-b border-white/20">
      <div className="container py-4">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Crown className="h-5 w-5 text-amber-400" />
            <div>
              <h1 className="text-lg font-semibold">
                {memberName ? `${memberName}'s Business Analysis` : 'Premium Business Analysis'}
              </h1>
              <p className="text-blue-200 text-sm">$2,500+ Consultation in Progress</p>
            </div>
            {progress.canGenerateReport && (
              <Badge variant="secondary" className="text-green-700 bg-green-100">
                <Check className="h-3 w-3 mr-1" />
                Ready for Report
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {isSaving && (
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <Save className="h-4 w-4 animate-pulse" />
                Saving...
              </div>
            )}
            
            <Button variant="outline" size="sm" onClick={handleStartOver} className="border-white/50 text-white bg-white/10 hover:bg-white/20 font-medium">
              <RotateCcw className="h-4 w-4 mr-2" />
              Start Over
            </Button>
            
            <Button variant="ghost" size="sm" onClick={handleExit} className="text-white hover:bg-white/10">
              <X className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </div>
        </div>
        
        {/* Progress Summary */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="space-y-1">
              <div className="text-blue-200">
                {currentSection ? `Current: ${currentSection.name}` : 'Section Complete'}
              </div>
              <div className="text-white font-medium">
                {progress.questionsAnswered} of {progress.totalQuestions} questions answered
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-2xl font-bold text-white">
                {progress.overallProgress}%
              </div>
              <div className="text-blue-200 text-xs">
                {estimatedTimeText}
              </div>
            </div>
          </div>
          
          {/* Overall Progress Bar */}
          <div className="space-y-2">
            <Progress 
              value={progress.overallProgress} 
              className="h-3 bg-white/20" 
            />
          </div>

          {/* Section Toggle */}
          <button
            onClick={() => setShowSectionDetails(!showSectionDetails)}
            className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors w-full justify-center"
          >
            <span>Section Progress</span>
            {showSectionDetails ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {/* Section Details */}
          {showSectionDetails && (
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {progress.sectionProgress.map((section) => (
                    <div
                      key={section.section}
                      className={`p-3 rounded-lg border transition-all ${
                        section.isActive 
                          ? 'border-blue-400 bg-blue-500/20' 
                          : 'border-white/20 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getSectionIcon(section.section)}</span>
                          <span className="text-sm font-medium text-white truncate">
                            {section.name}
                          </span>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getSectionStatusColor(section)}`}
                        >
                          {section.isComplete ? 'Done' : section.isActive ? 'Active' : `${section.completed}%`}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-blue-200">
                          <span>{section.questionsAnswered}/{section.totalQuestions}</span>
                          <span>{section.weight}% weight</span>
                        </div>
                        <Progress 
                          value={section.completed} 
                          className="h-1 bg-white/20"
                        />
                      </div>
                      
                      {section.required && (
                        <div className="mt-1">
                          <Badge variant="outline" className="text-xs border-amber-400 text-amber-400">
                            Required
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Progress Legend */}
                <div className="mt-4 pt-3 border-t border-white/20">
                  <div className="text-xs text-blue-200 text-center">
                    <span className="font-medium">Report Generation:</span> Available at 60% completion •{' '}
                    <span className="font-medium">Current:</span> {progress.overallProgress}%
                    {progress.canGenerateReport && (
                      <span className="text-green-400 ml-2">✅ Ready to generate!</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}