-- ===========================================
-- ENUM ET CONFIGURATION POUR PROFILES
-- ===========================================

-- Créer l'enum pour les rôles
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Modifier la table profiles pour utiliser l'enum
ALTER TABLE public.profiles 
ALTER COLUMN role TYPE user_role USING role::user_role,
ALTER COLUMN role SET DEFAULT 'user'::user_role;

-- ===========================================
-- INDEX POUR LA TABLE PROFILES
-- ===========================================

-- Index pour les recherches par email
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);

-- Index pour les recherches par rôle
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles (role);

-- Index pour les recherches par nom complet
CREATE INDEX IF NOT EXISTS idx_profiles_full_name ON public.profiles (first_name, last_name);

-- Index pour les timestamps
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_updated_at ON public.profiles (updated_at DESC);

-- ===========================================
-- RÈGLES DE SÉCURITÉ (RLS) POUR PROFILES
-- ===========================================

-- Activer RLS sur la table profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Politique 1: Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Utilisateurs peuvent voir leur profil" ON public.profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- Politique 2: Les admins peuvent voir tous les profils
CREATE POLICY "Admins peuvent voir tous les profils" ON public.profiles
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Politique 3: Les utilisateurs peuvent modifier leur propre profil (sauf le rôle)
CREATE POLICY "Utilisateurs peuvent modifier leur profil" ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id 
        AND (
            -- Si c'est un admin, il peut tout modifier
            EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE id = auth.uid() 
                AND role = 'admin'
            )
            OR 
            -- Si c'est un user, il ne peut pas changer son rôle
            (
                role = (SELECT role FROM public.profiles WHERE id = auth.uid())
            )
        )
    );

-- Politique 4: Seuls les admins peuvent modifier les rôles
CREATE POLICY "Seuls les admins peuvent gérer les rôles" ON public.profiles
    FOR UPDATE
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

-- Politique 5: Création automatique de profil lors de l'inscription
CREATE POLICY "Création de profil lors de l'inscription" ON public.profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (
        auth.uid() = id 
        AND role = 'user'::user_role  -- Forcer le rôle user par défaut
    );

-- Politique 6: Suppression - seuls les admins peuvent supprimer des profils
CREATE POLICY "Seuls les admins peuvent supprimer des profils" ON public.profiles
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- ===========================================
-- FONCTION TRIGGER POUR UPDATED_AT (PROFILES)
-- ===========================================

-- Trigger pour mettre à jour updated_at automatiquement sur profiles
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON public.profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- FONCTION POUR CRÉER AUTOMATIQUEMENT UN PROFIL
-- ===========================================

-- Fonction pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION create_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, role)
    VALUES (NEW.id, NEW.email, 'user'::user_role);
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour créer un profil automatiquement lors de l'inscription
CREATE TRIGGER create_profile_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION create_profile_on_signup();

-- ===========================================
-- COMMENTAIRES SUR LA TABLE PROFILES
-- ===========================================

COMMENT ON TABLE public.profiles IS 'Table des profils utilisateurs du site associatif';
COMMENT ON COLUMN public.profiles.id IS 'Identifiant unique lié à auth.users';
COMMENT ON COLUMN public.profiles.email IS 'Adresse email de l''utilisateur';
COMMENT ON COLUMN public.profiles.first_name IS 'Prénom de l''utilisateur';
COMMENT ON COLUMN public.profiles.last_name IS 'Nom de famille de l''utilisateur';
COMMENT ON COLUMN public.profiles.role IS 'Rôle de l''utilisateur (user ou admin)';
COMMENT ON COLUMN public.profiles.created_at IS 'Date de création du profil';
COMMENT ON COLUMN public.profiles.updated_at IS 'Date de dernière modification du profil';

-- ===========================================
-- INDEX POUR LA TABLE ARTICLES
-- ===========================================

-- Index pour les recherches par slug (très fréquent)
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles (slug);

-- Index pour les recherches par statut de publication
CREATE INDEX IF NOT EXISTS idx_articles_is_published ON public.articles (is_published);

-- Index pour les recherches par date de publication (pour trier par date)
CREATE INDEX IF NOT EXISTS idx_articles_published_date ON public.articles (published_date DESC);

-- Index pour les recherches par auteur
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON public.articles (author_id);

-- Index composé pour les articles publiés triés par date (très utile pour les listes d'articles)
CREATE INDEX IF NOT EXISTS idx_articles_published_date_desc ON public.articles (is_published, published_date DESC) WHERE is_published = true;

-- Index pour les recherches textuelles sur le titre
CREATE INDEX IF NOT EXISTS idx_articles_title_gin ON public.articles USING gin (to_tsvector('french', title));

-- Index pour les recherches textuelles sur le contenu
CREATE INDEX IF NOT EXISTS idx_articles_content_gin ON public.articles USING gin (to_tsvector('french', content));

-- Index pour les timestamps (utile pour l'administration)
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_updated_at ON public.articles (updated_at DESC);

-- ===========================================
-- RÈGLES DE SÉCURITÉ (RLS)
-- ===========================================

-- Activer RLS sur la table articles
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Politique 1: Lecture publique des articles publiés
CREATE POLICY "Articles publiés lisibles par tous" ON public.articles
    FOR SELECT
    USING (is_published = true);

-- Politique 2: Les utilisateurs authentifiés peuvent voir tous les articles (y compris brouillons)
CREATE POLICY "Articles visibles par utilisateurs authentifiés" ON public.articles
    FOR SELECT
    TO authenticated
    USING (true);

-- Politique 3: Création d'articles par utilisateurs authentifiés
CREATE POLICY "Utilisateurs authentifiés peuvent créer des articles" ON public.articles
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = author_id);

-- Politique 4: Suppression - seuls les auteurs peuvent supprimer leurs articles
CREATE POLICY "Auteurs peuvent supprimer leurs articles" ON public.articles
    FOR DELETE
    TO authenticated
    USING (
        auth.uid() = author_id 
        OR EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Politique 5: Modification - seuls les auteurs peuvent modifier leurs articles
CREATE POLICY "Auteurs peuvent modifier leurs articles" ON public.articles
    FOR UPDATE
    TO authenticated
    USING (
        auth.uid() = author_id 
        OR EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    )
    WITH CHECK (
        auth.uid() = author_id 
        OR EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- ===========================================
-- FONCTION TRIGGER POUR UPDATED_AT
-- ===========================================

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_articles_updated_at 
    BEFORE UPDATE ON public.articles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- FONCTION POUR GÉNÉRER DES SLUGS AUTOMATIQUES
-- ===========================================

-- Fonction pour générer un slug à partir du titre
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(
        regexp_replace(
            regexp_replace(
                regexp_replace(
                    unaccent(title), 
                    '[^a-zA-Z0-9\s-]', '', 'g'
                ), 
                '\s+', '-', 'g'
            ), 
            '-+', '-', 'g'
        )
    );
END;
$$ language 'plpgsql';

-- Fonction pour s'assurer que le slug est unique
CREATE OR REPLACE FUNCTION ensure_unique_slug()
RETURNS TRIGGER AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 1;
BEGIN
    -- Générer le slug de base à partir du titre
    base_slug := generate_slug(NEW.title);
    final_slug := base_slug;
    
    -- Si aucun slug n'est fourni, le générer automatiquement
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        -- Vérifier l'unicité et ajouter un compteur si nécessaire
        WHILE EXISTS (SELECT 1 FROM public.articles WHERE slug = final_slug AND id != COALESCE(NEW.id, gen_random_uuid())) LOOP
            final_slug := base_slug || '-' || counter;
            counter := counter + 1;
        END LOOP;
        
        NEW.slug := final_slug;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour générer automatiquement les slugs
CREATE TRIGGER ensure_articles_unique_slug 
    BEFORE INSERT OR UPDATE ON public.articles 
    FOR EACH ROW 
    EXECUTE FUNCTION ensure_unique_slug();

-- ===========================================
-- COMMENTAIRES SUR LA TABLE ET LES COLONNES
-- ===========================================

COMMENT ON TABLE public.articles IS 'Table des articles du site associatif';
COMMENT ON COLUMN public.articles.id IS 'Identifiant unique de l''article';
COMMENT ON COLUMN public.articles.title IS 'Titre de l''article';
COMMENT ON COLUMN public.articles.slug IS 'Slug URL-friendly pour l''article';
COMMENT ON COLUMN public.articles.image_url IS 'URL de l''image principale de l''article';
COMMENT ON COLUMN public.articles.published_date IS 'Date de publication de l''article';
COMMENT ON COLUMN public.articles.short_description IS 'Description courte pour les aperçus';
COMMENT ON COLUMN public.articles.content IS 'Contenu complet de l''article';
COMMENT ON COLUMN public.articles.author_id IS 'Référence vers l''auteur de l''article';
COMMENT ON COLUMN public.articles.is_published IS 'Statut de publication de l''article';
COMMENT ON COLUMN public.articles.created_at IS 'Date de création de l''article';
COMMENT ON COLUMN public.articles.updated_at IS 'Date de dernière modification de l''article';

-- ===========================================
-- INDEX POUR LA TABLE ACTIONS
-- ===========================================

-- Index pour les recherches par slug (très fréquent)
CREATE INDEX IF NOT EXISTS idx_actions_slug ON public.actions (slug);

-- Index pour les recherches par statut d'activité
CREATE INDEX IF NOT EXISTS idx_actions_is_active ON public.actions (is_active);

-- Index pour les recherches par type d'action
CREATE INDEX IF NOT EXISTS idx_actions_type ON public.actions (type);

-- Index composé pour les actions actives triées par date de création
CREATE INDEX IF NOT EXISTS idx_actions_active_created ON public.actions (is_active, created_at DESC) WHERE is_active = true;

-- Index pour les recherches textuelles sur le titre
CREATE INDEX IF NOT EXISTS idx_actions_title_gin ON public.actions USING gin (to_tsvector('french', title));

-- Index pour les recherches textuelles sur la description
CREATE INDEX IF NOT EXISTS idx_actions_description_gin ON public.actions USING gin (to_tsvector('french', description));

-- Index pour les recherches textuelles sur le contenu complet
CREATE INDEX IF NOT EXISTS idx_actions_content_gin ON public.actions USING gin (to_tsvector('french', full_content));

-- Index pour les timestamps (utile pour l'administration)
CREATE INDEX IF NOT EXISTS idx_actions_created_at ON public.actions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_actions_updated_at ON public.actions (updated_at DESC);

-- ===========================================
-- RÈGLES DE SÉCURITÉ (RLS) POUR ACTIONS
-- ===========================================

-- Activer RLS sur la table actions
ALTER TABLE public.actions ENABLE ROW LEVEL SECURITY;

-- Politique 1: Lecture publique des actions actives
CREATE POLICY "Actions actives lisibles par tous" ON public.actions
    FOR SELECT
    USING (is_active = true);

-- Politique 2: Les utilisateurs authentifiés peuvent voir toutes les actions
CREATE POLICY "Actions visibles par utilisateurs authentifiés" ON public.actions
    FOR SELECT
    TO authenticated
    USING (true);

-- Politique 3: Création d'actions par utilisateurs authentifiés
CREATE POLICY "Utilisateurs authentifiés peuvent créer des actions" ON public.actions
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Politique 4: Modification d'actions par utilisateurs authentifiés et admins
CREATE POLICY "Utilisateurs peuvent modifier les actions" ON public.actions
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Politique 5: Suppression d'actions par utilisateurs authentifiés et admins  
CREATE POLICY "Utilisateurs peuvent supprimer les actions" ON public.actions
    FOR DELETE
    TO authenticated
    USING (true);

-- ===========================================
-- FONCTION TRIGGER POUR UPDATED_AT (ACTIONS)
-- ===========================================

-- Trigger pour mettre à jour updated_at automatiquement sur actions
CREATE TRIGGER update_actions_updated_at 
    BEFORE UPDATE ON public.actions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- FONCTION POUR GÉNÉRER DES SLUGS AUTOMATIQUES (ACTIONS)
-- ===========================================

-- Fonction pour s'assurer que le slug est unique pour les actions
CREATE OR REPLACE FUNCTION ensure_unique_slug_actions()
RETURNS TRIGGER AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 1;
BEGIN
    -- Générer le slug de base à partir du titre
    base_slug := generate_slug(NEW.title);
    final_slug := base_slug;
    
    -- Si aucun slug n'est fourni, le générer automatiquement
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        -- Vérifier l'unicité et ajouter un compteur si nécessaire
        WHILE EXISTS (SELECT 1 FROM public.actions WHERE slug = final_slug AND id != COALESCE(NEW.id, gen_random_uuid())) LOOP
            final_slug := base_slug || '-' || counter;
            counter := counter + 1;
        END LOOP;
        
        NEW.slug := final_slug;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour générer automatiquement les slugs pour actions
CREATE TRIGGER ensure_actions_unique_slug 
    BEFORE INSERT OR UPDATE ON public.actions 
    FOR EACH ROW 
    EXECUTE FUNCTION ensure_unique_slug_actions();

-- ===========================================
-- COMMENTAIRES SUR LA TABLE ACTIONS ET LES COLONNES
-- ===========================================

COMMENT ON TABLE public.actions IS 'Table des actions du site associatif';
COMMENT ON COLUMN public.actions.id IS 'Identifiant unique de l''action';
COMMENT ON COLUMN public.actions.title IS 'Titre de l''action';
COMMENT ON COLUMN public.actions.slug IS 'Slug URL-friendly pour l''action';
COMMENT ON COLUMN public.actions.image_url IS 'URL de l''image principale de l''action';
COMMENT ON COLUMN public.actions.description IS 'Description courte de l''action';
COMMENT ON COLUMN public.actions.full_content IS 'Contenu complet de l''action';
COMMENT ON COLUMN public.actions.type IS 'Type d''action (accompagnement, formation, etc.)';
COMMENT ON COLUMN public.actions.is_active IS 'Statut d''activité de l''action';
COMMENT ON COLUMN public.actions.created_at IS 'Date de création de l''action';
COMMENT ON COLUMN public.actions.updated_at IS 'Date de dernière modification de l''action';
