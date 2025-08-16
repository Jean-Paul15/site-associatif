-- Script SQL pour créer des exemples de données dans la table actions (2025)
-- À exécuter dans votre base de données Supabase

-- Supprimer les anciennes données de test
DELETE FROM public.actions WHERE title LIKE '%2024%' OR title LIKE '%test%';

-- Insérer de nouvelles données pour l'année en cours (2025)
INSERT INTO public.actions (title, image_url, full_content, is_active, created_at) VALUES 
(
  'Visite à domicile',
  'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'En janvier 2025, notre Association a de nouveau tiré la sonnette d''alarme face à une réalité inacceptable : la mort solitaire, conséquence la plus grave de l''isolement des personnes âgées.

Chaque mois, deux personnes âgées isolées sont retrouvées mortes chez elles, parfois des semaines après leur décès. Des situations inhumaines que nous pouvons pourtant éviter.

Nos équipes interviennent quotidiennement pour rompre cet isolement dramatique.',
  true,
  '2025-01-15'
),
(
  'Accompagnement médical',
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'Les équipes de La Maison de Charlotte se mobilisent pour apporter des réponses adaptées aux nouveaux besoins des personnes âgées.

Nous poursuivons un accompagnement de qualité, mais également pour sensibiliser et inviter les citoyens à combattre le fléau de l''isolement social.

L''accompagnement médical devient une priorité absolue pour nos aînés.',
  true,
  '2025-02-20'
),
(
  'Activités collectives',
  'https://images.unsplash.com/photo-1573022101345-ff3dd75975d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'Organisation d''activités collectives pour rompre l''isolement des personnes âgées.

Ces moments de partage et de convivialité sont essentiels pour maintenir le lien social et préserver la dignité de nos aînés.

Chaque semaine, nous organisons des rencontres qui redonnent le sourire.',
  true,
  '2025-03-10'
),
(
  'Aide d''urgence',
  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'Intervention d''urgence pour les personnes âgées en situation de détresse.

Notre équipe intervient rapidement pour apporter l''aide nécessaire et assurer un suivi personnalisé.

Disponibles 24h/24, nous sommes le dernier rempart contre l''isolement.',
  true,
  '2025-04-05'
);

-- Vérifier les données insérées
SELECT id, title, DATE(created_at) as date_creation, is_active 
FROM public.actions 
WHERE EXTRACT(YEAR FROM created_at) = 2025
ORDER BY created_at ASC;
