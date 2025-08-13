// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        // Revalider la page d'accueil
        revalidatePath('/');

        // Revalider la page des actualités
        revalidatePath('/je-m-informe');

        console.log('Pages revalidated successfully');

        return NextResponse.json({
            revalidated: true,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error('Error during revalidation:', err);
        return NextResponse.json({
            revalidated: false,
            error: err.message
        }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Use POST to revalidate',
        timestamp: new Date().toISOString()
    });
}
