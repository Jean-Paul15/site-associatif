-- ===========================================
-- CRÉATION DE LA TABLE ENGAGEMENTS
-- ===========================================

-- Créer la table engagements
CREATE TABLE IF NOT EXISTS public.engagements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    ordre INTEGER DEFAULT 0, -- Pour définir l'ordre d'affichage
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- INDEX POUR OPTIMISER LES PERFORMANCES
-- ===========================================

-- Index pour les recherches par statut d'activité et ordre
CREATE INDEX IF NOT EXISTS idx_engagements_active_ordre ON public.engagements (is_active, ordre ASC) WHERE is_active = true;

-- Index pour les recherches par titre
CREATE INDEX IF NOT EXISTS idx_engagements_title ON public.engagements (title);

-- Index pour les timestamps
CREATE INDEX IF NOT EXISTS idx_engagements_created_at ON public.engagements (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_engagements_updated_at ON public.engagements (updated_at DESC);

-- ===========================================
-- RÈGLES DE SÉCURITÉ (RLS)
-- ===========================================

-- Activer RLS sur la table engagements
ALTER TABLE public.engagements ENABLE ROW LEVEL SECURITY;

-- Politique 1: Lecture publique des engagements actifs (pour la page publique)
CREATE POLICY "Engagements actifs lisibles par tous" ON public.engagements
    FOR SELECT
    USING (is_active = true);

-- Politique 2: Les utilisateurs authentifiés peuvent voir tous les engagements
CREATE POLICY "Engagements visibles par utilisateurs authentifiés" ON public.engagements
    FOR SELECT
    TO authenticated
    USING (true);

-- Politique 3: Seuls les admins peuvent modifier les engagements
CREATE POLICY "Seuls les admins peuvent modifier les engagements" ON public.engagements
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- ===========================================
-- TRIGGER POUR UPDATED_AT
-- ===========================================

-- Créer la fonction pour mettre à jour updated_at si elle n'existe pas
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_engagements_updated_at 
    BEFORE UPDATE ON public.engagements 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- DONNÉES D'EXEMPLE
-- ===========================================

-- Insérer les données d'exemple (reprendre le contenu actuel)
INSERT INTO public.engagements (title, description, image_url, ordre, is_active) VALUES 
(
    'APPORTER UNE PRÉSENCE',
    'Créer des relations de confiance avec les personnes âgées isolées, même en milieu rural.',
    'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    1,
    true
),
(
    'ACTIVITÉS COLLECTIVES',
    'Organiser des moments de partage et de joie entre les générations.',
    'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    2,
    true
),
(
    'AGIR CONTRE LES VULNÉRABILITÉS',
    'Accompagner face aux difficultés liées à l''âge ou à la précarité.',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop',
    3,
    true
),
(
    'SENSIBILISER LA SOCIÉTÉ',
    'Faire évoluer le regard de la société sur le vieillissement.',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    4,
    true
);

-- Vérifier les données insérées
SELECT id, title, description, ordre, is_active, created_at 
FROM public.engagements 
ORDER BY ordre ASC;

-- ===========================================
-- COMMENTAIRES SUR LA TABLE
-- ===========================================

COMMENT ON TABLE public.engagements IS 'Table des engagements de l''association affichés sur la page d''accueil';
COMMENT ON COLUMN public.engagements.title IS 'Titre de l''engagement';
COMMENT ON COLUMN public.engagements.description IS 'Description détaillée de l''engagement';
COMMENT ON COLUMN public.engagements.image_url IS 'URL de l''image associée à l''engagement';
COMMENT ON COLUMN public.engagements.ordre IS 'Ordre d''affichage (plus petit = affiché en premier)';
COMMENT ON COLUMN public.engagements.is_active IS 'Indique si l''engagement est actif et doit être affiché';
