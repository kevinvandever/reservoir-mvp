import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, DollarSign, Target, TrendingUp, Users } from 'lucide-react'

interface AutomationCardProps {
  title: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: number
  roiPotential: number
  businessSize: string[]
  tags: string[]
  popularityScore: number
  onLearnMore?: () => void
  onStart?: () => void
}

export function AutomationCard({
  title,
  description,
  category,
  difficulty,
  estimatedTime,
  roiPotential,
  businessSize,
  tags,
  popularityScore,
  onLearnMore,
  onStart
}: AutomationCardProps) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary">{category}</Badge>
          <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{estimatedTime} min</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>ROI: {roiPotential}%</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{businessSize.join(', ')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span>{popularityScore}/5</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 gap-2">
        <Button variant="outline" className="flex-1" onClick={onLearnMore}>
          Learn More
        </Button>
        <Button className="flex-1" onClick={onStart}>
          <Target className="h-4 w-4 mr-2" />
          Start
        </Button>
      </CardFooter>
    </Card>
  )
}