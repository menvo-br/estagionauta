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
          status: Database["public"]["Enums"]["agency_status"] | null
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
          status?: Database["public"]["Enums"]["agency_status"] | null
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
          status?: Database["public"]["Enums"]["agency_status"] | null
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
      analysis_screenshots: {
        Row: {
          analysis_id: string
          created_at: string
          id: string
          screenshot_url: string
        }
        Insert: {
          analysis_id: string
          created_at?: string
          id?: string
          screenshot_url: string
        }
        Update: {
          analysis_id?: string
          created_at?: string
          id?: string
          screenshot_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "analysis_screenshots_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "curriculum_analysis"
            referencedColumns: ["id"]
          },
        ]
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
          status: Database["public"]["Enums"]["analysis_status"] | null
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
          status?: Database["public"]["Enums"]["analysis_status"] | null
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
          status?: Database["public"]["Enums"]["analysis_status"] | null
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
      role_permissions: {
        Row: {
          id: number
          permission: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: number
          permission: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
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
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"]
        }
        Returns: boolean
      }
      authorize_all: {
        Args: {
          requested_permissions: Database["public"]["Enums"]["app_permission"][]
        }
        Returns: boolean
      }
      authorize_any: {
        Args: {
          requested_permissions: Database["public"]["Enums"]["app_permission"][]
        }
        Returns: boolean
      }
      custom_access_token_hook: {
        Args: { event: Json }
        Returns: Json
      }
      has_permission: {
        Args: { required_permission: string }
        Returns: boolean
      }
      has_role: {
        Args: { required_role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
      is_moderator_or_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      agency_permission:
        | "agencies.view"
        | "agencies.create"
        | "agencies.update"
        | "agencies.delete"
        | "agencies.verify"
        | "agencies.review"
      agency_status: "pending" | "approved" | "rejected"
      analysis_status: "pending" | "processing" | "completed" | "failed"
      app_permission:
        | "agencies.view"
        | "agencies.create"
        | "agencies.update"
        | "agencies.delete"
        | "agencies.verify"
        | "agencies.review"
        | "resumes.view"
        | "resumes.analyze"
        | "resumes.delete"
        | "resumes.review"
        | "users.view"
        | "users.create"
        | "users.update"
        | "users.delete"
        | "users.manage_roles"
        | "content.view"
        | "content.create"
        | "content.update"
        | "content.delete"
        | "content.moderate"
        | "reports.view"
        | "reports.create"
        | "reports.resolve"
      app_role: "student" | "agency" | "admin" | "moderator"
      content_permission:
        | "content.view"
        | "content.create"
        | "content.update"
        | "content.delete"
        | "content.moderate"
      report_permission: "reports.view" | "reports.create" | "reports.resolve"
      resume_permission:
        | "resumes.view"
        | "resumes.analyze"
        | "resumes.delete"
        | "resumes.review"
      user_permission:
        | "users.view"
        | "users.create"
        | "users.update"
        | "users.delete"
        | "users.manage_roles"
      user_role: "student" | "agency" | "admin" | "moderator"
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
      agency_permission: [
        "agencies.view",
        "agencies.create",
        "agencies.update",
        "agencies.delete",
        "agencies.verify",
        "agencies.review",
      ],
      agency_status: ["pending", "approved", "rejected"],
      analysis_status: ["pending", "processing", "completed", "failed"],
      app_permission: [
        "agencies.view",
        "agencies.create",
        "agencies.update",
        "agencies.delete",
        "agencies.verify",
        "agencies.review",
        "resumes.view",
        "resumes.analyze",
        "resumes.delete",
        "resumes.review",
        "users.view",
        "users.create",
        "users.update",
        "users.delete",
        "users.manage_roles",
        "content.view",
        "content.create",
        "content.update",
        "content.delete",
        "content.moderate",
        "reports.view",
        "reports.create",
        "reports.resolve",
      ],
      app_role: ["student", "agency", "admin", "moderator"],
      content_permission: [
        "content.view",
        "content.create",
        "content.update",
        "content.delete",
        "content.moderate",
      ],
      report_permission: ["reports.view", "reports.create", "reports.resolve"],
      resume_permission: [
        "resumes.view",
        "resumes.analyze",
        "resumes.delete",
        "resumes.review",
      ],
      user_permission: [
        "users.view",
        "users.create",
        "users.update",
        "users.delete",
        "users.manage_roles",
      ],
      user_role: ["student", "agency", "admin", "moderator"],
    },
  },
} as const
