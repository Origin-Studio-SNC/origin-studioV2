# Refonte 3D de la page d'accueil (origin-studio.ch)

Brief pour Claude Code. La maquette validée est `docs/refonte-3d/maquette.html` : c'est la référence visuelle et comportementale exacte (couleurs, typo, textes, 7 structures 3D, transitions, survols, formulaire). Ouvre-la dans un navigateur avant de commencer et lis tout son code.

## Objectif

Remplacer la page d'accueil `src/app/(frontend)/page.tsx` par la maquette, intégrée proprement dans le projet (Next.js 15, React 19, Payload 3, Tailwind 4). Les autres pages ne changent pas de structure dans cette étape, mais héritent des nouvelles couleurs et polices.

## Règles de travail

- Travailler sur une branche `refonte-3d`. Ne jamais pousser ni fusionner sans accord.
- Avancer étape par étape et demander validation entre chaque étape.
- Ne pas supprimer les anciens composants `src/components/home/*` tout de suite : les débrancher seulement. On nettoie à la fin.
- Garder le contenu exact de la maquette, sans ajouter de textes ni d'effets.
- DA : pas de dégradés, pas de badges en pilule, pas d'italique pour l'emphase, pas de fond sombre. Un seul accent rouge `#C8281C`, utilisé avec parcimonie.

## Étapes

1. **Dépendances et tokens**
   - `pnpm add three` et `pnpm add -D @types/three`.
   - Polices via `next/font/google` : Archivo (axes `wdth` et `wght`) et JetBrains Mono, exposées en variables CSS.
   - Tokens dans `src/app/(frontend)/styles.css` (repris du `:root` de la maquette) : `--paper #F1EFEA`, `--ink #161513`, `--mute #5F5B53`, `--line #D5D1C8`, `--red #C8281C`, mappés dans le `@theme` Tailwind.

2. **Scène 3D** (`src/components/home3d/`)
   - `structures.ts` : le builder (`slab`, `col`, `stairs`, `frame`, `floaters`, `group`, `tag`) et les 7 configurations, repris tels quels de la maquette, typés.
   - `AssemblyScene.tsx` : composant client (`'use client'`), chargé avec `next/dynamic` et `ssr: false`. Canvas fixe plein écran, `InstancedMesh`, caméra orthographique isométrique, lumière et ombres identiques à la maquette.
   - La progression du scroll se calcule à partir des sections qui portent un attribut `data-scene`, comme dans la maquette.
   - Le survol des lignes de texte (`data-hl` et `data-g`) passe par un petit store ou un contexte React, pas par des écouteurs globaux.
   - Nettoyage complet au démontage : renderer, géométrie, matériau, écouteurs, `requestAnimationFrame`.
   - Respecter `prefers-reduced-motion` comme dans la maquette. Si WebGL n'est pas disponible, la page reste lisible sans le canvas.
   - Sur mobile : `pixelRatio` plafonné, ombres en 1024.

3. **Sections** (`src/components/home3d/sections/`), dans l'ordre : Accueil, Services, Engagements, Réalisations, Méthode, Journal, Contact. Ce sont des composants serveur dès que possible, et seules les parties interactives sont en client.
   - Réalisations : les 3 premiers projets de la collection Payload `Projects`, avec un lien vers `/realisations/[slug]`. Garder `data-g` 0, 1, 2.
   - Journal : les 3 derniers `Posts` publiés, avec la date au format `dd.mm.yyyy` et un lien vers `/blog/[slug]`.
   - Garder `export const revalidate = 60`.

4. **Formulaire de contact**
   - Composant client branché sur la route existante `POST /api/contact`. Respecter `contactSchema` (`src/lib/validation.ts`) : `name`, `email`, `projectType`, `budget`, `message` et le champ piège `website`.
   - Adapter les listes de la maquette aux valeurs autorisées par `projectType` et `budget`, sans modifier le schéma.
   - Afficher les erreurs du serveur (y compris le 429). Une fois l'envoi réussi, déclencher l'allumage du portail en rouge (évènement `os-sent` de la maquette).

5. **Navbar et Footer** : reprendre l'en-tête de la maquette (lettres A à G, plan affiché à droite, liens vers les ancres de l'accueil et vers les pages sur les autres routes). La navigation se masque sous 1180 px. Le footer reste celui de la section Contact sur l'accueil, et une version simple s'affiche sur les autres pages.

6. **Vérifications**
   - `pnpm lint` et `pnpm build` sans erreur.
   - Tests manuels en local : desktop et mobile, mouvement réduit activé, navigation au clavier, envoi du formulaire.
   - Lighthouse sur l'accueil, en notant la performance et le CLS.
   - Puis commit, push de la branche et lien de prévisualisation Vercel.
