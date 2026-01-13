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
                .from('gifts')
                .select('*')
                .order('id', { ascending: true });

            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({ message: 'Error reading gifts data', error: error.message });
            }

            // Convert snake_case to camelCase for frontend
            const gifts = toCamelCase(data);
            return res.status(200).json(gifts);
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Error reading gifts data' });
        }
    }

    if (req.method === 'POST') {
        try {
            const giftData = toSnakeCase(req.body);

            // Remove id if present, let Supabase auto-generate
            delete giftData.id;

            // Ensure isSoldOut has default value
            if (giftData.is_sold_out === undefined) {
                giftData.is_sold_out = false;
            }

            const { data, error } = await supabase
                .from('gifts')
                .insert([giftData])
                .select()
                .single();

            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({ message: 'Error saving gift', error: error.message });
            }

            const newGift = toCamelCase(data);
            return res.status(201).json(newGift);
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Error saving gift' });
        }
    }

    if (req.method === 'PUT') {
        try {
            const updatedGiftData = toSnakeCase(req.body);
            const giftId = updatedGiftData.id;

            if (!giftId) {
                return res.status(400).json({ message: 'Gift ID is required' });
            }

            // Remove id from update data
            delete updatedGiftData.id;

            const { data, error } = await supabase
                .from('gifts')
                .update(updatedGiftData)
                .eq('id', giftId)
                .select()
                .single();

            if (error) {
                console.error('Supabase error:', error);
                if (error.code === 'PGRST116') {
                    return res.status(404).json({ message: 'Gift not found' });
                }
                return res.status(500).json({ message: 'Error updating gift', error: error.message });
            }

            const updatedGift = toCamelCase(data);
            return res.status(200).json(updatedGift);
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Error updating gift' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({ message: 'Gift ID is required' });
            }

            const { error } = await supabase
                .from('gifts')
                .delete()
                .eq('id', parseInt(id));

            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({ message: 'Error deleting gift', error: error.message });
            }

            return res.status(200).json({ message: 'Gift deleted successfully' });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Error deleting gift' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
