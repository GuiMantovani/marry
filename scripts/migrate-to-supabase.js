import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase credentials
const supabaseUrl = 'https://iesjhczbefheofdzlwfu.supabase.co';
const supabaseAnonKey = 'sb_publishable_y7xqnHcD7phLs1U90BlY3g_wuiJg657';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to convert camelCase to snake_case
function toSnakeCase(obj) {
    if (Array.isArray(obj)) {
        return obj.map(item => toSnakeCase(item));
    }

    const converted = {};
    for (const key in obj) {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        converted[snakeKey] = obj[key];
    }
    return converted;
}

async function migrateGifts() {
    console.log('📦 Migrando gifts...');

    const giftsPath = path.join(__dirname, '..', 'src', 'data', 'gifts.json');
    const giftsData = JSON.parse(fs.readFileSync(giftsPath, 'utf8'));

    console.log(`   Encontrados ${giftsData.length} gifts para migrar`);

    // Convert to snake_case for database
    const giftsToInsert = giftsData.map(gift => {
        const snakeGift = toSnakeCase(gift);
        // Remove id to let database auto-generate
        delete snakeGift.id;
        return snakeGift;
    });

    const { data, error } = await supabase
        .from('gifts')
        .insert(giftsToInsert)
        .select();

    if (error) {
        console.error('❌ Erro ao migrar gifts:', error);
        return false;
    }

    console.log(`✅ ${data.length} gifts migrados com sucesso!`);
    return true;
}

async function migrateGuests() {
    console.log('👥 Migrando guests...');

    const guestsPath = path.join(__dirname, '..', 'src', 'data', 'guest.json');
    const guestsData = JSON.parse(fs.readFileSync(guestsPath, 'utf8'));

    console.log(`   Encontrados ${guestsData.length} guests para migrar`);

    // Convert to snake_case for database
    const guestsToInsert = guestsData.map(guest => {
        const snakeGuest = toSnakeCase(guest);
        // Remove id to let database auto-generate
        delete snakeGuest.id;
        // Ensure arrays are properly formatted
        if (!snakeGuest.companion_names) {
            snakeGuest.companion_names = [];
        }
        return snakeGuest;
    });

    const { data, error } = await supabase
        .from('guests')
        .insert(guestsToInsert)
        .select();

    if (error) {
        console.error('❌ Erro ao migrar guests:', error);
        return false;
    }

    console.log(`✅ ${data.length} guests migrados com sucesso!`);
    return true;
}

async function main() {
    console.log('🚀 Iniciando migração de dados para Supabase...\n');

    const giftsSuccess = await migrateGifts();
    console.log('');
    const guestsSuccess = await migrateGuests();

    console.log('\n' + '='.repeat(50));
    if (giftsSuccess && guestsSuccess) {
        console.log('✅ Migração concluída com sucesso!');
    } else {
        console.log('❌ Migração concluída com erros. Verifique os logs acima.');
    }
    console.log('='.repeat(50));
}

main().catch(console.error);
