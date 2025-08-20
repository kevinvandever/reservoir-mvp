import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useQuestionnaireStore } from '@/stores/questionnaire-store'
import { X, Save, Check, RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function ProgressHeader() {
  const router = useRouter()
  const { 
    currentQuestionIndex, 
    totalQuestions, 
    isSaving, 
    isComplete,
    startOverWithFirstQuestion 
  } = useQuestionnaireStore()
  
  const progressPercentage = (currentQuestionIndex / totalQuestions) * 100
  
  const handleExit = () => {
    if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
      router.push('/dashboard')
    }
  }

  const handleStartOver = async () => {
    if (confirm('Are you sure you want to start over? All current progress will be lost.')) {
      await startOverWithFirstQuestion()
    }
  }
  
  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">Business Discovery</h1>
            {isComplete && (
              <Badge variant="secondary" className="text-green-700 bg-green-100">
                <Check className="h-3 w-3 mr-1" />
                Complete
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {isSaving && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Save className="h-4 w-4 animate-pulse" />
                Saving...
              </div>
            )}
            
            <Button variant="outline" size="sm" onClick={handleStartOver}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Start Over
            </Button>
            
            <Button variant="ghost" size="sm" onClick={handleExit}>
              <X className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Question {Math.min(currentQuestionIndex + 1, totalQuestions)} of {totalQuestions}
            </span>
            <span className="font-medium">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>
    </div>
  )
}