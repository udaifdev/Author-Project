import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ceiurnleyuqkwmkciilu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlaXVybmxleXVxa3dta2NpaWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMDcwNDcsImV4cCI6MjA2Mzg4MzA0N30.N8pNNfllQx-TLKfTT2ee082PPZqh4VqASpwG2P0sduM';

export const supabase = createClient(supabaseUrl, supabaseKey);
