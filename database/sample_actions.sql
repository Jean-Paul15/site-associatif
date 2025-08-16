-- Script SQL pour créer des exemples de données dans la table actions
-- À exécuter dans votre base de données Supabase
-- Actions créées en 2025 (année en cours)

INSERT INTO public.actions (title, image_url, full_content, is_active, created_at) VALUES 
(
  'Visite à domicile - Janvier 2025',
  'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'En janvier 2025, notre Association a de nouveau tiré la sonnette d''alarme face à une réalité inacceptable : la mort solitaire, conséquence la plus grave de l''isolement des personnes âgées. Chaque mois, deux personnes âgées isolées sont retrouvées mortes chez elles, parfois des semaines après leur décès. Des situations inhumaines que nous pouvons pourtant éviter.',
  true,
  '2025-01-15T10:00:00.000Z'
),
(
  'Accompagnement médical - Février 2025',
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'Les équipes de La Maison de Charlotte se mobilisent pour apporter des réponses adaptées aux nouveaux besoins des personnes âgées, poursuivre un accompagnement de qualité, mais également pour sensibiliser et inviter les citoyens à combattre le fléau de l''isolement social.',
  true,
  '2025-02-20T14:30:00.000Z'
),
(
  'Activités collectives - Mars 2025',
  'https://images.unsplash.com/photo-1573022101345-ff3dd75975d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'Organisation d''activités collectives pour rompre l''isolement des personnes âgées. Ces moments de partage et de convivialité sont essentiels pour maintenir le lien social et préserver la dignité de nos aînés.',
  true,
  '2025-03-10T09:15:00.000Z'
),
(
  'Aide d''urgence - Avril 2025',
  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'Intervention d''urgence pour les personnes âgées en situation de détresse. Notre équipe intervient rapidement pour apporter l''aide nécessaire et assurer un suivi personnalisé.',
  true,
  '2025-04-05T16:45:00.000Z'
),
(
  'Formation bénévoles - Mai 2025',
  'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'Session de formation pour nos nouveaux bénévoles. Cette formation essentielle permet d''acquérir les compétences nécessaires pour accompagner au mieux les personnes âgées dans leur quotidien.',
  true,
  '2025-05-18T11:00:00.000Z'
),
(
  'Campagne sensibilisation - Août 2025',
  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'Lancement de notre grande campagne de sensibilisation contre l''isolement des personnes âgées. Une mobilisation citoyenne pour alerter sur cette urgence sociale et encourager la solidarité intergénérationnelle.',
  true,
  '2025-08-01T08:30:00.000Z'
);

-- Action test pour une année différente (ne devrait PAS apparaître)
INSERT INTO public.actions (title, image_url, full_content, is_active, created_at) VALUES 
(
  'Action test 2024 - NE DOIT PAS APPARAÎTRE',
  'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
  'Cette action de 2024 ne doit pas apparaître car nous filtrons par année en cours.',
  true,
  '2024-12-15T10:00:00.000Z'
);

-- Vérifier les données insérées pour l'année en cours
SELECT id, title, created_at, is_active 
FROM public.actions 
WHERE created_at >= date_trunc('year', CURRENT_DATE) 
  AND created_at < date_trunc('year', CURRENT_DATE) + interval '1 year'
  AND is_active = true
ORDER BY created_at ASC;
