export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company_name: string | null
          industry: string | null
          business_size: Database['public']['Enums']['business_size'] | null
          experience_level: Database['public']['Enums']['experience_level']
          role: string
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          company_name?: string | null
          industry?: string | null
          business_size?: Database['public']['Enums']['business_size'] | null
          experience_level?: Database['public']['Enums']['experience_level']
          role?: string
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          company_name?: string | null
          industry?: string | null
          business_size?: Database['public']['Enums']['business_size'] | null
          experience_level?: Database['public']['Enums']['experience_level']
          role?: string
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      questionnaire_sessions: {
        Row: {
          id: string
          user_id: string | null
          session_status: Database['public']['Enums']['session_status']
          current_step: number
          total_steps: number
          session_data: Json
          ai_context: Json
          completion_percentage: number
          started_at: string
          completed_at: string | null
          last_activity_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_status?: Database['public']['Enums']['session_status']
          current_step?: number
          total_steps?: number
          session_data?: Json
          ai_context?: Json
          completion_percentage?: number
          started_at?: string
          completed_at?: string | null
          last_activity_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_status?: Database['public']['Enums']['session_status']
          current_step?: number
          total_steps?: number
          session_data?: Json
          ai_context?: Json
          completion_percentage?: number
          started_at?: string
          completed_at?: string | null
          last_activity_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      questionnaire_responses: {
        Row: {
          id: string
          session_id: string | null
          user_id: string | null
          question_key: string
          question_text: string
          response_data: Json
          ai_analysis: Json | null
          step_number: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          session_id?: string | null
          user_id?: string | null
          question_key: string
          question_text: string
          response_data: Json
          ai_analysis?: Json | null
          step_number: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          session_id?: string | null
          user_id?: string | null
          question_key?: string
          question_text?: string
          response_data?: Json
          ai_analysis?: Json | null
          step_number?: number
          created_at?: string
          updated_at?: string
        }
      }
      automations: {
        Row: {
          id: string
          title: string
          description: string
          summary: string | null
          category: string
          tags: string[]
          difficulty: Database['public']['Enums']['difficulty_level']
          estimated_time_minutes: number | null
          business_size: Database['public']['Enums']['business_size'][] | null
          current_tools: string[]
          required_tools: string[]
          roi_potential: number | null
          popularity_score: number
          status: Database['public']['Enums']['automation_status']
          ai_embedding: string | null
          author_id: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          summary?: string | null
          category: string
          tags?: string[]
          difficulty?: Database['public']['Enums']['difficulty_level']
          estimated_time_minutes?: number | null
          business_size?: Database['public']['Enums']['business_size'][] | null
          current_tools?: string[]
          required_tools?: string[]
          roi_potential?: number | null
          popularity_score?: number
          status?: Database['public']['Enums']['automation_status']
          ai_embedding?: string | null
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          summary?: string | null
          category?: string
          tags?: string[]
          difficulty?: Database['public']['Enums']['difficulty_level']
          estimated_time_minutes?: number | null
          business_size?: Database['public']['Enums']['business_size'][] | null
          current_tools?: string[]
          required_tools?: string[]
          roi_potential?: number | null
          popularity_score?: number
          status?: Database['public']['Enums']['automation_status']
          ai_embedding?: string | null
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      automation_tools: {
        Row: {
          id: string
          automation_id: string | null
          tool_name: string
          tool_category: string | null
          is_required: boolean
          setup_complexity: Database['public']['Enums']['difficulty_level']
          monthly_cost: number | null
          free_tier_available: boolean
          integration_notes: string | null
          tool_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          automation_id?: string | null
          tool_name: string
          tool_category?: string | null
          is_required?: boolean
          setup_complexity?: Database['public']['Enums']['difficulty_level']
          monthly_cost?: number | null
          free_tier_available?: boolean
          integration_notes?: string | null
          tool_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          automation_id?: string | null
          tool_name?: string
          tool_category?: string | null
          is_required?: boolean
          setup_complexity?: Database['public']['Enums']['difficulty_level']
          monthly_cost?: number | null
          free_tier_available?: boolean
          integration_notes?: string | null
          tool_url?: string | null
          created_at?: string
        }
      }
      implementation_steps: {
        Row: {
          id: string
          automation_id: string | null
          step_number: number
          title: string
          description: string
          estimated_duration_minutes: number | null
          required_tools: string[]
          step_type: string
          prerequisites: string[] | null
          success_criteria: string[] | null
          troubleshooting_tips: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          automation_id?: string | null
          step_number: number
          title: string
          description: string
          estimated_duration_minutes?: number | null
          required_tools?: string[]
          step_type?: string
          prerequisites?: string[] | null
          success_criteria?: string[] | null
          troubleshooting_tips?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          automation_id?: string | null
          step_number?: number
          title?: string
          description?: string
          estimated_duration_minutes?: number | null
          required_tools?: string[]
          step_type?: string
          prerequisites?: string[] | null
          success_criteria?: string[] | null
          troubleshooting_tips?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      step_media: {
        Row: {
          id: string
          step_id: string | null
          media_type: string
          media_url: string
          alt_text: string | null
          caption: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          step_id?: string | null
          media_type: string
          media_url: string
          alt_text?: string | null
          caption?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          step_id?: string | null
          media_type?: string
          media_url?: string
          alt_text?: string | null
          caption?: string | null
          display_order?: number
          created_at?: string
        }
      }
      weekly_discoveries: {
        Row: {
          id: string
          user_id: string | null
          week_of: string
          discovery_criteria: Json
          ai_reasoning: string | null
          generated_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          week_of: string
          discovery_criteria: Json
          ai_reasoning?: string | null
          generated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          week_of?: string
          discovery_criteria?: Json
          ai_reasoning?: string | null
          generated_at?: string
          created_at?: string
        }
      }
      discovered_automations: {
        Row: {
          id: string
          discovery_id: string | null
          automation_id: string | null
          relevance_score: number
          ai_explanation: string | null
          display_order: number
          user_feedback: number | null
          created_at: string
        }
        Insert: {
          id?: string
          discovery_id?: string | null
          automation_id?: string | null
          relevance_score: number
          ai_explanation?: string | null
          display_order?: number
          user_feedback?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          discovery_id?: string | null
          automation_id?: string | null
          relevance_score?: number
          ai_explanation?: string | null
          display_order?: number
          user_feedback?: number | null
          created_at?: string
        }
      }
      user_automations: {
        Row: {
          id: string
          user_id: string | null
          automation_id: string | null
          status: Database['public']['Enums']['progress_status']
          progress_percentage: number
          current_step: number | null
          notes: string | null
          started_at: string | null
          completed_at: string | null
          last_activity_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          automation_id?: string | null
          status?: Database['public']['Enums']['progress_status']
          progress_percentage?: number
          current_step?: number | null
          notes?: string | null
          started_at?: string | null
          completed_at?: string | null
          last_activity_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          automation_id?: string | null
          status?: Database['public']['Enums']['progress_status']
          progress_percentage?: number
          current_step?: number | null
          notes?: string | null
          started_at?: string | null
          completed_at?: string | null
          last_activity_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      automation_progress: {
        Row: {
          id: string
          user_automation_id: string | null
          step_id: string | null
          status: Database['public']['Enums']['progress_status']
          completion_notes: string | null
          time_spent_minutes: number | null
          issues_encountered: string[] | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_automation_id?: string | null
          step_id?: string | null
          status?: Database['public']['Enums']['progress_status']
          completion_notes?: string | null
          time_spent_minutes?: number | null
          issues_encountered?: string[] | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_automation_id?: string | null
          step_id?: string | null
          status?: Database['public']['Enums']['progress_status']
          completion_notes?: string | null
          time_spent_minutes?: number | null
          issues_encountered?: string[] | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          status: Database['public']['Enums']['subscription_status']
          plan_name: string
          billing_cycle: string
          price_amount: number
          currency: string
          trial_ends_at: string | null
          current_period_start: string | null
          current_period_end: string | null
          cancel_at: string | null
          cancelled_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          status?: Database['public']['Enums']['subscription_status']
          plan_name: string
          billing_cycle?: string
          price_amount: number
          currency?: string
          trial_ends_at?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at?: string | null
          cancelled_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          status?: Database['public']['Enums']['subscription_status']
          plan_name?: string
          billing_cycle?: string
          price_amount?: number
          currency?: string
          trial_ends_at?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at?: string | null
          cancelled_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      usage_metrics: {
        Row: {
          id: string
          user_id: string | null
          metric_name: string
          metric_value: number
          metric_data: Json | null
          period_start: string
          period_end: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          metric_name: string
          metric_value?: number
          metric_data?: Json | null
          period_start: string
          period_end: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          metric_name?: string
          metric_value?: number
          metric_data?: Json | null
          period_start?: string
          period_end?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      business_size: 'solo' | 'small-team' | 'large-team'
      experience_level: 'beginner' | 'intermediate' | 'expert'
      difficulty_level: 'easy' | 'medium' | 'hard'
      automation_status: 'draft' | 'published' | 'archived'
      session_status: 'active' | 'completed' | 'abandoned'
      progress_status: 'not_started' | 'in_progress' | 'completed' | 'paused'
      subscription_status: 'active' | 'cancelled' | 'past_due' | 'trialing'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for working with the database
export type UserProfile = Database['public']['Tables']['user_profiles']['Row']
export type UserProfileInsert = Database['public']['Tables']['user_profiles']['Insert']
export type UserProfileUpdate = Database['public']['Tables']['user_profiles']['Update']

export type QuestionnaireSession = Database['public']['Tables']['questionnaire_sessions']['Row']
export type QuestionnaireResponse = Database['public']['Tables']['questionnaire_responses']['Row']

export type Automation = Database['public']['Tables']['automations']['Row']
export type AutomationInsert = Database['public']['Tables']['automations']['Insert']
export type AutomationUpdate = Database['public']['Tables']['automations']['Update']

export type AutomationTool = Database['public']['Tables']['automation_tools']['Row']
export type ImplementationStep = Database['public']['Tables']['implementation_steps']['Row']
export type StepMedia = Database['public']['Tables']['step_media']['Row']

export type WeeklyDiscovery = Database['public']['Tables']['weekly_discoveries']['Row']
export type DiscoveredAutomation = Database['public']['Tables']['discovered_automations']['Row']

export type UserAutomation = Database['public']['Tables']['user_automations']['Row']
export type AutomationProgress = Database['public']['Tables']['automation_progress']['Row']

export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type UsageMetric = Database['public']['Tables']['usage_metrics']['Row']

// Enum types for easy use
export type BusinessSize = Database['public']['Enums']['business_size']
export type ExperienceLevel = Database['public']['Enums']['experience_level']
export type DifficultyLevel = Database['public']['Enums']['difficulty_level']
export type AutomationStatus = Database['public']['Enums']['automation_status']
export type SessionStatus = Database['public']['Enums']['session_status']
export type ProgressStatus = Database['public']['Enums']['progress_status']
export type SubscriptionStatus = Database['public']['Enums']['subscription_status']