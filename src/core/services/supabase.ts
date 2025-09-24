import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function sendContactMessage({ name, email, message }) {
    const { data: existing, error: fetchError } = await supabase
        .from('contact_messages')
        .select('created_at')
        .eq('email', email)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    if (fetchError) {
        console.error('Supabase fetch error:', fetchError);
        return { success: false, reason: 'error', error: fetchError.message };
    }

    if (existing) {
        const lastSent = new Date(existing.created_at);
        const now = new Date();
        const diffMinutes = (now.getTime() - lastSent.getTime()) / 60000;
        if (diffMinutes < 60) {
            return { success: false, reason: 'wait', minutesLeft: Math.ceil(60 - diffMinutes) };
        }
    }

    const { error } = await supabase
        .from('contact_messages')
        .insert([{ name, email, message }]);

    if (error) {
        console.error('Supabase insert error:', error);
        return { success: false, reason: 'error', error: error.message };
    }
    return { success: true };
}