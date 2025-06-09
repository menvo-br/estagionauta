export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agencies: {
        Row: {
          address: string | null
          areas: string[] | null
          cep: string | null
          city: string | null
          created_at: string
          created_by: string
          description: string | null
          email: string | null
          id: string
          instagram: string | null
          is_verified: boolean | null
          is_whatsapp: boolean | null
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          name: string
          phone: string | null
          rating: number | null
          state: string | null
          total_reviews: number | null
          updated_at: string
          verified_at: string | null
          verified_by: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          areas?: string[] | null
          cep?: string | null
          city?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          email?: string | null
          id?: string
          instagram?: string | null
          is_verified?: boolean | null
          is_whatsapp?: boolean | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name: string
          phone?: string | null
          rating?: number | null
          state?: string | null
          total_reviews?: number | null
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          areas?: string[] | null
          cep?: string | null
          city?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          email?: string | null
          id?: string
          instagram?: string | null
          is_verified?: boolean | null
          is_whatsapp?: boolean | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name?: string
          phone?: string | null
          rating?: number | null
          state?: string | null
          total_reviews?: number | null
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agencies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agencies_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agency_reports: {
        Row: {
          agency_id: string
          created_at: string
          description: string
          id: string
          reason: string
          reported_by: string
          resolved_at: string | null
          resolved_by: string | null
          status: string | null
        }
        Insert: {
          agency_id: string
          created_at?: string
          description: string
          id?: string
          reason: string
          reported_by: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
        }
        Update: {
          agency_id?: string
          created_at?: string
          description?: string
          id?: string
          reason?: string
          reported_by?: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agency_reports_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agency_reports_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agency_reports_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agency_reviews: {
        Row: {
          agency_id: string
          comment: string
          created_at: string
          id: string
          is_moderated: boolean | null
          justification: string
          moderated_at: string | null
          moderated_by: string | null
          rating: number
          title: string | null
          user_id: string
        }
        Insert: {
          agency_id: string
          comment: string
          created_at?: string
          id?: string
          is_moderated?: boolean | null
          justification: string
          moderated_at?: string | null
          moderated_by?: string | null
          rating: number
          title?: string | null
          user_id: string
        }
        Update: {
          agency_id?: string
          comment?: string
          created_at?: string
          id?: string
          is_moderated?: boolean | null
          justification?: string
          moderated_at?: string | null
          moderated_by?: string | null
          rating?: number
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_reviews_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agency_reviews_moderated_by_fkey"
            columns: ["moderated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agency_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      analyze_resume: {
        Row: {
          analysis_data: Json
          course: string | null
          created_at: string
          email: string
          id: string
          name: string
          status: string | null
          university: string | null
          updated_at: string
        }
        Insert: {
          analysis_data: Json
          course?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          status?: string | null
          university?: string | null
          updated_at?: string
        }
        Update: {
          analysis_data?: Json
          course?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          status?: string | null
          university?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      curriculum_analysis: {
        Row: {
          analysis_data: Json | null
          course: string | null
          created_at: string
          credits_used: number | null
          email: string
          file_url: string | null
          id: string
          name: string
          status: string | null
          university: string | null
          user_id: string | null
        }
        Insert: {
          analysis_data?: Json | null
          course?: string | null
          created_at?: string
          credits_used?: number | null
          email: string
          file_url?: string | null
          id?: string
          name: string
          status?: string | null
          university?: string | null
          user_id?: string | null
        }
        Update: {
          analysis_data?: Json | null
          course?: string | null
          created_at?: string
          credits_used?: number | null
          email?: string
          file_url?: string | null
          id?: string
          name?: string
          status?: string | null
          university?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_analysis_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          created_at: string | null
          error_message: string | null
          from_email: string
          id: string
          provider: string | null
          provider_id: string | null
          sent_at: string | null
          status: string | null
          subject: string
          template_name: string | null
          to_email: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          from_email: string
          id?: string
          provider?: string | null
          provider_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
          template_name?: string | null
          to_email: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          from_email?: string
          id?: string
          provider?: string | null
          provider_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
          template_name?: string | null
          to_email?: string
        }
        Relationships: []
      }
      generated_pdfs: {
        Row: {
          analysis_id: string
          created_at: string
          file_size: number | null
          file_url: string
          id: string
        }
        Insert: {
          analysis_id: string
          created_at?: string
          file_size?: number | null
          file_url: string
          id?: string
        }
        Update: {
          analysis_id?: string
          created_at?: string
          file_size?: number | null
          file_url?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_pdfs_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "curriculum_analysis"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_availability: {
        Row: {
          created_at: string | null
          day_of_week: number
          end_time: string
          id: string
          is_active: boolean | null
          mentor_id: string | null
          start_time: string
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          end_time: string
          id?: string
          is_active?: boolean | null
          mentor_id?: string | null
          start_time: string
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          end_time?: string
          id?: string
          is_active?: boolean | null
          mentor_id?: string | null
          start_time?: string
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentor_availability_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "users_enhanced"
            referencedColumns: ["id"]
          },
        ]
      }
      mentorship_sessions: {
        Row: {
          cancelled_at: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          id: string
          meeting_link: string | null
          meeting_platform: string | null
          mentee_feedback: string | null
          mentee_id: string | null
          mentee_notes: string | null
          mentee_rating: number | null
          mentor_feedback: string | null
          mentor_id: string | null
          mentor_notes: string | null
          mentor_rating: number | null
          mentor_response: string | null
          requested_at: string | null
          requested_date: string
          requested_end_time: string
          requested_start_time: string
          responded_at: string | null
          skill_id: string | null
          status: string | null
          timezone: string | null
          topic: string
          updated_at: string | null
        }
        Insert: {
          cancelled_at?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          meeting_link?: string | null
          meeting_platform?: string | null
          mentee_feedback?: string | null
          mentee_id?: string | null
          mentee_notes?: string | null
          mentee_rating?: number | null
          mentor_feedback?: string | null
          mentor_id?: string | null
          mentor_notes?: string | null
          mentor_rating?: number | null
          mentor_response?: string | null
          requested_at?: string | null
          requested_date: string
          requested_end_time: string
          requested_start_time: string
          responded_at?: string | null
          skill_id?: string | null
          status?: string | null
          timezone?: string | null
          topic: string
          updated_at?: string | null
        }
        Update: {
          cancelled_at?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          meeting_link?: string | null
          meeting_platform?: string | null
          mentee_feedback?: string | null
          mentee_id?: string | null
          mentee_notes?: string | null
          mentee_rating?: number | null
          mentor_feedback?: string | null
          mentor_id?: string | null
          mentor_notes?: string | null
          mentor_rating?: number | null
          mentor_response?: string | null
          requested_at?: string | null
          requested_date?: string
          requested_end_time?: string
          requested_start_time?: string
          responded_at?: string | null
          skill_id?: string | null
          status?: string | null
          timezone?: string | null
          topic?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentorship_sessions_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "users_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentorship_sessions_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "users_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentorship_sessions_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          message: string
          read_at: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message: string
          read_at?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_enhanced"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          action: string | null
          created_at: string | null
          description: string | null
          display_name: string
          id: string
          name: string
          resource: string | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          description?: string | null
          display_name: string
          id?: string
          name: string
          resource?: string | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          description?: string | null
          display_name?: string
          id?: string
          name?: string
          resource?: string | null
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          created_at: string | null
          id: string
          permission_id: string | null
          role_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          permission_id?: string | null
          role_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          permission_id?: string | null
          role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skills_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users_enhanced"
            referencedColumns: ["id"]
          },
        ]
      }
      user_goals: {
        Row: {
          created_at: string | null
          created_by_ai: boolean | null
          description: string | null
          end_date: string | null
          id: string
          progress: number | null
          start_date: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by_ai?: boolean | null
          description?: string | null
          end_date?: string | null
          id?: string
          progress?: number | null
          start_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by_ai?: boolean | null
          description?: string | null
          end_date?: string | null
          id?: string
          progress?: number | null
          start_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_enhanced"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          credits: number | null
          email: string
          full_name: string | null
          id: string
          location_enabled: boolean | null
          role: Database["public"]["Enums"]["user_role"] | null
          subscription_status: string | null
          subscription_tier: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          credits?: number | null
          email: string
          full_name?: string | null
          id: string
          location_enabled?: boolean | null
          role?: Database["public"]["Enums"]["user_role"] | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          credits?: number | null
          email?: string
          full_name?: string | null
          id?: string
          location_enabled?: boolean | null
          role?: Database["public"]["Enums"]["user_role"] | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          is_primary: boolean | null
          role_id: string | null
          status: string | null
          user_id: string | null
          validated_at: string | null
          validated_by: string | null
          validation_notes: string | null
          validation_status: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_primary?: boolean | null
          role_id?: string | null
          status?: string | null
          user_id?: string | null
          validated_at?: string | null
          validated_by?: string | null
          validation_notes?: string | null
          validation_status?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_primary?: boolean | null
          role_id?: string | null
          status?: string | null
          user_id?: string | null
          validated_at?: string | null
          validated_by?: string | null
          validation_notes?: string | null
          validation_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "users_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_validated_by_fkey"
            columns: ["validated_by"]
            isOneToOne: false
            referencedRelation: "users_enhanced"
            referencedColumns: ["id"]
          },
        ]
      }
      user_skills: {
        Row: {
          created_at: string | null
          id: string
          is_verified: boolean | null
          proficiency_level: string | null
          skill_id: string | null
          skill_type: string
          user_id: string | null
          years_experience: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          proficiency_level?: string | null
          skill_id?: string | null
          skill_type: string
          user_id?: string | null
          years_experience?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          proficiency_level?: string | null
          skill_id?: string | null
          skill_type?: string
          user_id?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_enhanced"
            referencedColumns: ["id"]
          },
        ]
      }
      user_verifications: {
        Row: {
          created_at: string | null
          document_type: string
          document_url: string
          id: string
          rejection_reason: string | null
          status: string | null
          user_id: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          document_type: string
          document_url: string
          id?: string
          rejection_reason?: string | null
          status?: string | null
          user_id?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          document_type?: string
          document_url?: string
          id?: string
          rejection_reason?: string | null
          status?: string | null
          user_id?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "users_enhanced"
            referencedColumns: ["id"]
          },
        ]
      }
      users_enhanced: {
        Row: {
          avatar_url: string | null
          bio: string | null
          birth_date: string | null
          created_at: string | null
          current_company: string | null
          current_position: string | null
          education_level: string | null
          email: string
          email_verified: boolean | null
          first_name: string | null
          gender: string | null
          github_url: string | null
          id: string
          languages: string[] | null
          last_login_at: string | null
          last_name: string | null
          linkedin_url: string | null
          location: string | null
          phone: string | null
          profile_completed: boolean | null
          profile_completed_at: string | null
          status: string | null
          timezone: string | null
          updated_at: string | null
          website_url: string | null
          years_experience: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          created_at?: string | null
          current_company?: string | null
          current_position?: string | null
          education_level?: string | null
          email: string
          email_verified?: boolean | null
          first_name?: string | null
          gender?: string | null
          github_url?: string | null
          id: string
          languages?: string[] | null
          last_login_at?: string | null
          last_name?: string | null
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          profile_completed?: boolean | null
          profile_completed_at?: string | null
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
          website_url?: string | null
          years_experience?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          created_at?: string | null
          current_company?: string | null
          current_position?: string | null
          education_level?: string | null
          email?: string
          email_verified?: boolean | null
          first_name?: string | null
          gender?: string | null
          github_url?: string | null
          id?: string
          languages?: string[] | null
          last_login_at?: string | null
          last_name?: string | null
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          profile_completed?: boolean | null
          profile_completed_at?: string | null
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
          website_url?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      custom_access_token_hook: {
        Args: { event: Json }
        Returns: Json
      }
      get_user_claims: {
        Args: { user_id: string }
        Returns: Json
      }
      send_notification: {
        Args: {
          p_user_id: string
          p_type: string
          p_title: string
          p_message: string
          p_data?: Json
        }
        Returns: string
      }
    }
    Enums: {
      user_role: "student" | "admin" | "moderator" | "agency"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["student", "admin", "moderator", "agency"],
    },
  },
} as const
