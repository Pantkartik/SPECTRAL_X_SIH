import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PillReminder {
  id: string
  user_id: string
  medication_name: string
  dosage: string
  frequency: string
  time: string
  notes?: string
  created_at: string
  updated_at: string
}

export const pillReminderService = {
  async getUserReminders(userId: string): Promise<PillReminder[]> {
    const { data, error } = await supabase
      .from('pill_reminders')
      .select('*')
      .eq('user_id', userId)
      .order('time', { ascending: true })
    if (error) {
      console.error('Error fetching reminders:', error)
      return []
    }
    return data || []
  },
  async addReminder(reminder: Omit<PillReminder, 'id' | 'created_at' | 'updated_at'>): Promise<PillReminder | null> {
    const { data, error } = await supabase
      .from('pill_reminders')
      .insert([reminder])
      .select()
      .single()
    if (error) {
      console.error('Error adding reminder:', error)
      return null
    }
    return data
  },
  async updateReminder(id: string, updates: Partial<PillReminder>): Promise<PillReminder | null> {
    const { data, error } = await supabase
      .from('pill_reminders')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) {
      console.error('Error updating reminder:', error)
      return null
    }
    return data
  },
  async deleteReminder(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('pill_reminders')
      .delete()
      .eq('id', id)
    if (error) {
      console.error('Error deleting reminder:', error)
      return false
    }
    return true
  }
}

export interface Doctor {
  id: number
  name: string
  specialty: string
  hospital: string
  rating: number
  reviews: number
  experience: string
  location: string
  consultationFee: number
  nextAvailable: string
  image?: string
  languages?: string[]
  education?: string
  teleconsultation?: boolean
}

export const doctorService = {
  async getAllDoctors(): Promise<Doctor[]> {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
    if (error) {
      console.error('Error fetching doctors:', error)
      return []
    }
    return data || []
  }
}