import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function testAuth() {
  console.log('Testing Supabase Auth configuration...');
  console.log('Supabase client:', supabase);
  console.log('Supabase URL:', supabaseUrl);
  console.log('Supabase Anon Key:', supabaseAnonKey);
  return {
    supabase,
    signInWithPassword: supabase.auth.signInWithPassword,
    signUp: supabase.auth.signUp
  };
}