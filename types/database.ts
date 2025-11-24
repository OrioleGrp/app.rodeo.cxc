export interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  team: string | null;
  phone_number: string | null;
  shiftboard_id: string | null;
  hlsr_scheduling_id: string | null;
  last_updated: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'last_updated'> & {
          created_at?: string;
          last_updated?: string;
        };
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
    };
  };
}
