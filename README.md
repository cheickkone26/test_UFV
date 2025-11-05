                      TEST GROUPE UFV

## Prérequis
- Node.js >= 18
- - Git & npm/yarn installés

## Etape 1 : 
Cloner le projet : git clone https://github.com/cheickkone26/test_UFV.git

## Etape 2 : 
 * SUPABASE

  - Créer un projet Supabase : Rendez-vous sur https://supabase.com/
  - Créez un compte (gratuit)
  - Créez un nouveau projet
  - 
## Etape 3 :
* CONFIGURATION DE LA BASE DE DONNEE

  - Ouvrez l’onglet SQL Editor
    
    *** SCRIPT (à copier)***
    
    create table clients (
  id uuid primary key default uuid_generate_v4(),
  nom text
);

create table transports (
  id uuid primary key default uuid_generate_v4(),
  nom text
);

create table produits (
  id uuid primary key default uuid_generate_v4(),
  nom text
);

create table chargements (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id),
  transport_id uuid references transports(id),
  created_at timestamp default now()
);

create table chargement_produits (
  id uuid primary key default uuid_generate_v4(),
  chargement_id uuid references chargements(id),
  produit_id uuid references produits(id),
  quantite integer
);

*** Fin SCRIPT ***

    
  - Copiez et collez le script SQL ci-dessus
  - Exécutez-le pour créer toutes les tables nécessaires
  - Récupérer les clés d’accès
  - Allez dans Project Settings → API

Notez les valeurs suivantes :

- URL du projet (Project URL)
- Clé anonyme publique (ANON_KEY)
et/ou le SERVICE_ROLE KEY -- à utiliser uniquement côté serveur. Cela vous permettra de desactiver le RLS (si vous êtes bloquer par le RLS) -- 

- Creer un fichier .env.local à la racine du projet en creant les variables suivantes:
  NEXT_PUBLIC_SUPABASE_URL= (project url)
  NEXT_PUBLIC_SUPABASE_ANON_KEY= (anon key)
  SUPABASE_SERVICE_ROLE_KEY = (service_role key)




## Etape 4 :

  executer la commande si dessous pour lancer le projet
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
```

Ouvrez ce lien [http://localhost:3000](http://localhost:3000) dans votre navigateur.

Vous tombez directement sur *http://localhost:3000/chargements*

## Le projet est deployé sur VERCEL



