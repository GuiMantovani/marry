import { supabase } from '../../lib/supabase';

// Helper function to convert snake_case to camelCase
function toCamelCase(obj) {
    if (Array.isArray(obj)) {
        return obj.map(item => toCamelCase(item));
    }

    const converted = {};
    for (const key in obj) {
        const camelKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
        converted[camelKey] = obj[key];
    }
    return converted;
}

// Helper function to convert camelCase to snake_case
function toSnakeCase(obj) {
    const converted = {};
    for (const key in obj) {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        converted[snakeKey] = obj[key];
    }
    return converted;
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { data, error } = await supabase
                .from('guests')
                .select('*')
                .order('id', { ascending: true });

            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({ message: 'Error reading data', error: error.message });
            }

            // Convert snake_case to camelCase for frontend
            const guests = toCamelCase(data);
            return res.status(200).json(guests);
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Error reading data' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { name, confirmed, guestCount, companionNames, message } = req.body;

            if (!name) {
                return res.status(400).json({ message: 'Name is required' });
            }

            const guestData = {
                name,
                confirmed: confirmed !== undefined ? confirmed : true,
                guest_count: guestCount || 0,
                companion_names: companionNames || [],
                message: message || '',
                date: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('guests')
                .insert([guestData])
                .select()
                .single();

            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({ message: 'Error saving data', error: error.message });
            }

            const newGuest = toCamelCase(data);
            return res.status(201).json(newGuest);
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Error saving data' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
