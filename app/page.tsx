'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AccessCodeService } from '@/lib/access/access-code-service'
import { SessionManager } from '@/lib/access/session-manager'
import { 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Shield,
  Award,
  Sparkles,
  Target
} from 'lucide-react'

export default function PremiumLandingPage() {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🚀 Form submitted! Raw code:', code)
    if (!code.trim()) {
      console.log('❌ No code provided, stopping')
      return
    }

    console.log('🔄 Submitting access code:', code)
    setLoading(true)
    setError('')
    
    try {
      const accessService = new AccessCodeService()
      
      // Generate session ID - fallback for older browsers
      const sessionId = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : Date.now().toString() + Math.random().toString(36)
      
      console.log('🔑 Generated session ID:', sessionId)
      
      // Get client IP (simplified for demo)
      const userAgent = navigator.userAgent
      
      console.log('🚀 Validating code with service...')
      const result = await accessService.validateAndUseCode(
        code.toUpperCase().trim(),
        sessionId,
        undefined, // IP address would be set server-side
        userAgent
      )
      
      console.log('✅ Validation result:', result)
      console.log('🔍 Result details:', JSON.stringify(result, null, 2))
      
      if (result.valid && result.access_code_id) {
        console.log('🎉 Valid code! Setting session...')
        
        // Store session data using SessionManager
        SessionManager.setSession({
          sessionId,
          accessCodeId: result.access_code_id,
          memberData: {
            name: result.member_name,
            email: result.member_email,
            source: result.source
          },
          startedAt: new Date().toISOString()
        })
        
        console.log('💾 Session stored successfully')
        console.log('🚀 Attempting redirect to questionnaire...')
        
        // Force a hard redirect if router.push doesn't work
        try {
          await router.push('/questionnaire')
          console.log('✅ Router.push completed')
        } catch (routerError) {
          console.error('❌ Router.push failed:', routerError)
          console.log('🔄 Trying window.location.href fallback...')
          window.location.href = '/questionnaire'
        }
      } else {
        console.log('❌ Invalid code:', result.error_message)
        console.log('🔍 Full result object:', result)
        setError(result.error_message || 'Invalid access code')
      }
    } catch (err) {
      console.error('❌ Access validation error:', err)
      setError('Unable to validate access code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatCode = (value: string) => {
    // Remove non-alphanumeric characters and convert to uppercase
    const cleaned = value.replace(/[^A-Z0-9]/g, '').toUpperCase()
    
    // Apply CLOCK-XXXX-XXXX format
    if (cleaned.length <= 5) {
      return cleaned
    } else if (cleaned.length <= 9) {
      return cleaned.slice(0, 5) + '-' + cleaned.slice(5)
    } else {
      return cleaned.slice(0, 5) + '-' + cleaned.slice(5, 9) + '-' + cleaned.slice(9, 13)
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCode(e.target.value)
    setCode(formatted)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Premium Badge */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-200 to-yellow-300 text-slate-900 text-sm font-semibold">
              <Award className="h-4 w-4 mr-2" />
              Exclusive Member Access • Valued at $2,500+
            </span>
          </div>
          
          {/* Main Headline */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Premium Business<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Strategy Consultation
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              An exclusive AI-powered business assessment that typically costs $2,500+, 
              granted as part of your <strong className="text-amber-300">ClockworkCoaching</strong> membership.
            </p>
          </div>

          {/* Value Propositions */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
            <ValueCard
              icon={<Users className="h-8 w-8" />}
              title="$50K Consultant Experience"
              description="AI-powered analysis equivalent to hiring a top-tier business consultant with decades of experience"
            />
            <ValueCard
              icon={<TrendingUp className="h-8 w-8" />}
              title="Personalized ROI Projections"
              description="Detailed financial impact analysis based on your specific business metrics and growth stage"
            />
            <ValueCard
              icon={<Target className="h-8 w-8" />}
              title="Implementation Roadmap"
              description="90-day action plan with specific automation recommendations tailored to your business"
            />
          </div>

          {/* Access Portal */}
          <Card className="max-w-md mx-auto bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-blue-500/20 border border-blue-400/30">
                  <Shield className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <CardTitle className="text-white text-2xl mb-2">Member Access Portal</CardTitle>
              <CardDescription className="text-blue-200">
                Enter your exclusive access code to begin your premium consultation
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="CLOCK-XXXX-XXXX"
                    className="text-center text-lg tracking-wider bg-white/20 border-white/30 text-white placeholder-blue-200 h-14 text-xl font-mono"
                    maxLength={15}
                    required
                  />
                  <p className="text-blue-300 text-xs mt-2 text-center">
                    Format: CLOCK-XXXX-XXXX
                  </p>
                </div>
                
                {error && (
                  <Alert className="bg-red-900/20 border-red-500/50 text-red-200">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <Button 
                  type="submit" 
                  disabled={loading || !code.includes('CLOCK') || code.length < 14}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg py-4 h-14 font-semibold shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Validating Access...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Begin Exclusive Consultation
                    </div>
                  )}
                </Button>
              </form>
              
              <div className="mt-8 text-center space-y-4">
                <p className="text-blue-300 text-sm leading-relaxed">
                  Don't have an access code?<br />
                  <span className="text-blue-200">Contact your ClockworkCoaching representative for immediate access.</span>
                </p>
                
                {/* Debug button - remove after testing */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    console.log('🧪 Debug navigation test')
                    router.push('/questionnaire')
                  }}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  Debug: Test Navigation
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-12 text-blue-200 text-sm">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              Secure Access
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              Member Exclusive
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              Instant Results
            </div>
          </div>
        </div>
      </div>

      {/* What Members Get Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              What Our Members Experience
            </h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Join ClockworkCoaching members who have unlocked their business automation potential
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              number="01"
              title="Deep Business Analysis"
              description="Tim Urban-style AI consultant asks strategic questions about your real estate business, extracting insights about your lead generation, systems, and growth opportunities."
            />
            <FeatureCard
              number="02" 
              title="Industry Benchmarking"
              description="See exactly how you compare to top 5% of agents. Get specific percentile rankings on transaction volume, GCI, and operational efficiency."
            />
            <FeatureCard
              number="03"
              title="Custom Implementation Plan"
              description="Receive a 90-day roadmap with specific automations ranked by ROI impact, implementation difficulty, and fit for your business size."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
            Trusted by ClockworkCoaching Members
          </h2>
          
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-8">
            <div className="flex items-center justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-5 w-5 text-amber-400 mr-1">⭐</div>
              ))}
            </div>
            <blockquote className="text-xl text-blue-100 mb-6 italic">
              "This consultation identified $180,000 in annual time savings opportunities I never knew existed. 
              The AI asked questions my $2,500/hour consultant should have asked."
            </blockquote>
            <div className="text-amber-300 font-semibold text-lg">Marcus Rivera</div>
            <div className="text-blue-200">Top 1% Real Estate Agent • ClockworkCoaching Member</div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ValueCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center hover:bg-white/15 transition-colors">
      <CardContent className="pt-8 pb-6">
        <div className="text-blue-400 mb-4 flex justify-center">
          {icon}
        </div>
        <h3 className="text-white font-semibold text-xl mb-3">{title}</h3>
        <p className="text-blue-200 text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

function FeatureCard({ number, title, description }: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto shadow-lg">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-blue-200 leading-relaxed">{description}</p>
    </div>
  )
}