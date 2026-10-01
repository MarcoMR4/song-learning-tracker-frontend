export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      instrument_tunning: {
        Row: {
          id: number
          name: string
          notes: string | null
          user_id: string | null
        }
        Insert: {
          id?: number
          name?: string
          notes?: string | null
          user_id?: string | null
        }
        Update: {
          id?: number
          name?: string
          notes?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      music_instrument: {
        Row: {
          id: number
          name: string
          observations: string | null
          user_id: string
        }
        Insert: {
          id?: number
          name: string
          observations?: string | null
          user_id?: string
        }
        Update: {
          id?: number
          name?: string
          observations?: string | null
          user_id?: string
        }
        Relationships: []
      }
      song: {
        Row: {
          artist: string
          difficulty: number | null
          id: number
          title: string
          user_id: string
          year: string | null
        }
        Insert: {
          artist: string
          difficulty?: number | null
          id?: number
          title: string
          user_id?: string
          year?: string | null
        }
        Update: {
          artist?: string
          difficulty?: number | null
          id?: number
          title?: string
          user_id?: string
          year?: string | null
        }
        Relationships: []
      }
      song_practice_session: {
        Row: {
          created_at: string | null
          id: number
          minutes: number
          notes: string | null
          song_tracking: number
        }
        Insert: {
          created_at?: string | null
          id?: never
          minutes: number
          notes?: string | null
          song_tracking: number
        }
        Update: {
          created_at?: string | null
          id?: never
          minutes?: number
          notes?: string | null
          song_tracking?: number
        }
        Relationships: [
          {
            foreignKeyName: "song_practice_session_song_tracking_fkey"
            columns: ["song_tracking"]
            isOneToOne: false
            referencedRelation: "song_tracking"
            referencedColumns: ["id"]
          },
        ]
      }
      song_tracking: {
        Row: {
          created_at: string
          id: number
          instrument: number
          song: number
          status: Database["public"]["Enums"]["song_learning_status"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          instrument: number
          song: number
          status?: Database["public"]["Enums"]["song_learning_status"]
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          instrument?: number
          song?: number
          status?: Database["public"]["Enums"]["song_learning_status"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "song_progress_instrument_fkey"
            columns: ["instrument"]
            isOneToOne: false
            referencedRelation: "music_instrument"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "song_progress_song_fkey"
            columns: ["song"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "song_progress_user_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profile: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name: string
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      song_learning_status:
        | "planned"
        | "learning"
        | "refining"
        | "mastered"
        | "paused"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      song_learning_status: [
        "planned",
        "learning",
        "refining",
        "mastered",
        "paused",
      ],
    },
  },
} as const
