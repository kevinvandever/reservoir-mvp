'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface QuestionCardProps {
  question: {
    id: string
    type: 'single-choice' | 'multiple-choice' | 'text' | 'number' | 'scale'
    title: string
    description?: string
    options?: Array<{ value: string; label: string }>
    min?: number
    max?: number
    step?: number
    required?: boolean
  }
  currentStep: number
  totalSteps: number
  onNext: (answer: any) => void
  onPrevious?: () => void
  value?: any
}

export function QuestionCard({
  question,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  value: initialValue
}: QuestionCardProps) {
  const [value, setValue] = useState(initialValue || '')

  const handleNext = () => {
    if (question.required && !value) {
      return
    }
    onNext(value)
  }

  const renderInput = () => {
    switch (question.type) {
      case 'single-choice':
        return (
          <RadioGroup value={value} onValueChange={setValue}>
            <div className="space-y-2">
              {question.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )
      
      case 'text':
        return (
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your answer..."
            className="min-h-[100px]"
          />
        )
      
      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            min={question.min}
            max={question.max}
            step={question.step}
            placeholder="Enter a number..."
          />
        )
      
      case 'scale':
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{question.min || 1}</span>
              <span className="font-medium text-foreground">{value || question.min || 1}</span>
              <span>{question.max || 10}</span>
            </div>
            <Input
              type="range"
              value={value || question.min || 1}
              onChange={(e) => setValue(e.target.value)}
              min={question.min || 1}
              max={question.max || 10}
              step={question.step || 1}
              className="w-full"
            />
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentStep} of {totalSteps}
          </span>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
        <CardTitle>{question.title}</CardTitle>
        {question.description && (
          <CardDescription>{question.description}</CardDescription>
        )}
      </CardHeader>
      
      <CardContent>{renderInput()}</CardContent>
      
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!onPrevious}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={question.required && !value}
        >
          {currentStep === totalSteps ? 'Complete' : 'Next'}
          {currentStep < totalSteps && <ChevronRight className="h-4 w-4 ml-2" />}
        </Button>
      </CardFooter>
    </Card>
  )
}