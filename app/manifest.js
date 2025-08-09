export default function manifest() {
    return {
        name: 'La Maison de Charlotte - Association d\'aide aux personnes âgées',
        short_name: 'La Maison de Charlotte',
        description: 'Association d\'utilité publique dédiée à l\'accompagnement des personnes âgées. Lutte contre l\'isolement et soutien pour un vieillissement digne.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#3b82f6',
        icons: [
            {
                src: '/logo.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/logo.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        categories: ['social', 'health', 'lifestyle'],
        lang: 'fr',
        orientation: 'portrait-primary',
    }
}
