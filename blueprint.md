# AI Development Guidelines for Next.js in Firebase Studio

## Environment & Context Awareness

The AI operates within the Firebase Studio development environment, which provides a Code OSS-based IDE and a pre-configured environment for Next.js development.

*   **Project Structure (App Router):** The AI assumes a standard Next.js project structure using the App Router.
    *   `/app`: The core directory for file-based routing.
    *   `layout.tsx`: The root layout.
    *   `page.tsx`: The page UI for a route.
    *   `/components`: For reusable UI components.
    *   `/lib`: For utility functions and libraries.
*   **`dev.nix` Configuration:** The AI is aware of the `.idx/dev.nix` file for environment configuration, which includes `pkgs.nodejs` and other necessary tools.
*   **Preview Server:** Firebase Studio provides a running preview server. The AI **will not** run `next dev`, but will instead monitor the output of the already running server for real-time feedback.
*   **Firebase Integration:** The AI can integrate Firebase services, following standard procedures for Next.js projects, including using the Firebase Admin SDK in server-side code.

## Firebase MCP

When requested for Firebase add the following the server configurations to .idx/mcp.json. Just add the following and don't add anything else.

```json
{
    "mcpServers": {
        "firebase": {
            "command": "npx",
            "args": [
                "-y",
                "firebase-tools@latest",
                "experimental:mcp"
            ]
        }
    }
}
```

## Code Modification & Dependency Management

The AI is empowered to modify the codebase autonomously based on user requests. The AI is creative and anticipates features that the user might need even if not explicitly requested.

*   **Core Code Assumption:** The AI will primarily work with React components (`.tsx` or `.jsx`) within the `/app` directory. It will create new routes, layouts, and components as needed.
*   **Package Management:** The AI will use `npm` or `yarn` for package management.
*   **Next.js CLI:** The AI will use the Next.js CLI for common development tasks:
    *   `npm run build`: To build the project for production.
    *   `npm run lint`: To run ESLint and check for code quality issues.

## Next.js Core Concepts (App Router)

### Server Components by Default

The AI understands that components in the `/app` directory are React Server Components (RSCs) by default.

*   **Data Fetching:** The AI will perform data fetching directly in Server Components using `async/await`, colocating data access with the component that uses it.
*   **"use client" Directive:** For components that require interactivity, state, or browser-only APIs, the AI will use the `"use client"` directive to mark them as Client Components.
*   **Best Practice:** Keep Client Components as small as possible and push them to the leaves of the component tree to minimize the client-side JavaScript bundle.

### File-based Routing

The AI will manage routing by creating folders and `page.tsx` files within the `/app` directory.

*   **Layouts (`layout.tsx`):** Define shared UI for a segment and its children.
*   **Pages (`page.tsx`):** Define the unique UI of a route.
*   **Loading UI (`loading.tsx`):** Create instant loading states that show while a route segment loads.
*   **Error Handling (`error.tsx`):** Isolate errors to specific route segments.

### Server Actions

For data mutations (e.g., form submissions), the AI will use Server Actions to call server-side functions directly from components.

*   **Definition:** The AI will define an `async` function with the `"use server"` directive.
*   **Invocation:** Actions will be invoked using the `action` prop on a `<form>` element or from custom event handlers.
*   **Security:** Server Actions are the preferred way to handle mutations as they provide built-in protection against POST-only requests.

*Example of a simple Server Action:*

```ts
// app/actions.ts
'use server'

import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

export async function-save-email(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  // Save email to database...
  return { message: 'Success!' }
}
```

## Automated Error Detection & Remediation

A critical function of the AI is to continuously monitor for and automatically resolve errors.

*   **Post-Modification Checks:** After every code modification, the AI will:
    *   Run `npm run lint -- --fix` to catch and fix linting issues.
    *   Monitor the IDE's diagnostics (problem pane).
    *   Check the output of the running dev server for compilation and runtime errors.
*   **Automatic Error Correction:** The AI will attempt to fix common Next.js and React errors.
*   **Problem Reporting:** If an error cannot be resolved, the AI will report the specific error message, its location, and a concise explanation with a suggested fix.

## Visual Design

**Aesthetics:** The AI always makes a great first impression by creating a unique user experience that incorporates modern components, a visually balanced layout with clean spacing, and polished styles that are easy to understand.

1.  Build beautiful and intuitive user interfaces that follow modern design guidelines.
2.  Ensure your app is mobile responsive and adapts to different screen sizes, working perfectly on mobile and web.
3.  Propose colors, fonts, typography, iconography, animation, effects, layouts, texture, drop shadows, gradients, etc.
4.  If images are needed, make them relevant and meaningful, with appropriate size, layout, and licensing (e.g., freely available). If real images are not available, provide placeholder images.
5.  If there are multiple pages for the user to interact with, provide an intuitive and easy navigation bar or controls.

**Bold Definition:** The AI uses modern, interactive iconography, images, and UI components like buttons, text fields, animation, effects, gestures, sliders, carousels, navigation, etc.

1.  Fonts - Choose expressive and relevant typography. Stress and emphasize font sizes to ease understanding, e.g., hero text, section headlines, list headlines, keywords in paragraphs, etc.
2.  Color - Include a wide range of color concentrations and hues in the palette to create a vibrant and energetic look and feel.
3.  Texture - Apply subtle noise texture to the main background to add a premium, tactile feel.
4.  Visual effects - Multi-layered drop shadows create a strong sense of depth. Cards have a soft, deep shadow to look "lifted."
5.  Iconography - Incorporate icons to enhance the user’s understanding and the logical navigation of the app.
6.  Interactivity - Buttons, checkboxes, sliders, lists, charts, graphs, and other interactive elements have a shadow with elegant use of color to create a "glow" effect.

**Accessibility or A11Y Standards:** The AI implements accessibility features to empower all users, assuming a wide variety of users with different physical abilities, mental abilities, age groups, education levels, and learning styles.

## Iterative Development & User Interaction

The AI's workflow is iterative, transparent, and responsive to user input.

*   **Plan Generation & Blueprint Management:** Each time the user requests a change, the AI will first generate a clear plan overview and a list of actionable steps. This plan will then be used to **create or update a `blueprint.md` file** in the project's root directory.
    *   The blueprint.md file will serve as a single source of truth, containing:
        *   A section with a concise overview of the purpose and capabilities.
        *   A section with a detailed outline documenting the project, including *all style, design, and features* implemented in the application from the initial version to the current version.
        *   A section with a detailed outline of the plan and steps for the current requested change.
    *   Before initiating any new change or at the start of a new chat session, the AI will reference the blueprint.md to ensure full context and understanding of the application's current state and existing features. This ensures consistency and avoids redundant or conflicting modifications.
*   **Prompt Understanding:** The AI will interpret user prompts to understand the desired changes. It will ask clarifying questions if the prompt is ambiguous.
*   **Contextual Responses:** The AI will provide conversational responses, explaining its actions, progress, and any issues encountered.
*   **Error Checking Flow:**
    1.  **Important:** The AI will **not** start the dev server (`next dev`), as it is already managed by Firebase Studio.
    2.  **Code Change:** AI applies a code modification.
    3.  **Dependency Check:** If a new package is needed, AI runs `npm install`.
    4.  **Compile & Analyze:** AI runs `npm run lint` and monitors the dev server.
    5.  **Preview Check:** AI observes the browser preview for visual and runtime errors.
    6.  **Remediation/Report:** If errors are found, AI attempts automatic fixes. If unsuccessful, it reports details to the user.

## Current Project Status and Features

This project is a Next.js application using the App Router. The application is designed to provide information and support for the "La Maison de Charlotte" association.

## Plan for current requested change:

### Mise en place d'une architecture de chargement de données sans délai et avec synchronisation en temps réel

**Problème:** Délai visible lors du chargement des données, absence d'hydratation côté client pour la persistance, et manque de synchronisation en temps réel avec Supabase.

**Solution:** Mettre en œuvre une architecture qui tire parti des Composants Serveur de Next.js pour le chargement initial des données, et des Composants Client avec des abonnements Supabase en temps réel pour les mises à jour dynamiques et la persistance des données.

**Étapes:**

1.  **Mettre à jour `blueprint.md`**: Documenter la nouvelle architecture de récupération des données et de synchronisation en temps réel (cette étape est en cours).
2.  **Centraliser la récupération des données Supabase (côté serveur)**:
    *   Créer un nouveau fichier `lib/getNews.js`.
    *   Ce fichier contiendra une fonction `async` nommée `getNewsItems` qui récupérera un nombre limité d'articles publiés depuis Supabase. Cette fonction sera une fonction serveur.
3.  **Modifier `NewsSection.jsx` pour qu'il devienne un Composant Client avec des fonctionnalités en temps réel**:
    *   Ajouter la directive `"use client";` au début du fichier.
    *   Modifier `NewsSection.jsx` pour qu'il accepte `initialNewsItems` comme prop.
    *   Initialiser l'état du composant avec `initialNewsItems`.
    *   Implémenter `useEffect` pour configurer un abonnement Supabase en temps réel pour la table `articles`.
    *   Lors des événements `INSERT`, `UPDATE`, `DELETE`, mettre à jour l'état interne du composant pour refléter les modifications.
    *   S'assurer que la fonction `truncateDescription` est toujours disponible si nécessaire.
4.  **Modifier `app/page.jsx` pour qu'il devienne un Composant Serveur et récupère les données initiales**:
    *   Faire de `app/page.jsx` un Composant Serveur `async`.
    *   Importer et appeler `getNewsItems` (depuis `lib/getNews.js`) pour récupérer les données initiales des actualités.
    *   Passer ces données `initialNewsItems` comme prop au composant `NewsSection`.

Cette modification permettra de:
*   **Charger les données dès le rendu initial** : La fonction `getNewsItems` dans `app/page.jsx` (un Composant Serveur) récupérera les données avant que la page ne soit envoyée au client, garantissant ainsi qu'il n'y ait pas de flash vide.
*   **Hydrater côté client pour rester en mémoire et se recharger instantanément** : Le composant `NewsSection` (désormais un Composant Client) recevra ces données initiales et hydratera son état, les conservant en mémoire. Les actualisations ultérieures dans le contexte de routage côté client réutiliseront ces données mises en cache ou les récupéreront à nouveau via l'abonnement en temps réel.
*   **Activer la synchronisation en temps réel avec Supabase** : L'abonnement Supabase dans `NewsSection` gérera automatiquement les mises à jour en temps réel.
