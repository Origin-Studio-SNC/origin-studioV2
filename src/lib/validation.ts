import { z } from "zod";

export const contactSchema = z.object({
    name: z
      .string()
      .min(2, 'Le nom doit contenir au moins 2 caractères')
      .max(100, 'Le nom ne peut pas dépasser 100 caractères')
      .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, 'Le nom contient des caractères invalides'),
    email: z
      .string()
      .email('Adresse email invalide')
      .max(254, 'Email trop long'),
    projectType: z.enum([
      'Site web sur mesure',
      'E-commerce / boutique en ligne',
      'Application web/SaaS ou outil métier',
      'IA & automatisation',
      "Refonte ou évolution d'un existant",
      'Autre',
    ], { message: 'Type de projet invalide' }),
    budget: z.enum([
      'Moins de 5k CHF',
      '5k – 10k CHF',
      '10k – 25k CHF',
      '25k – 50k CHF',
      '50k CHF et +',
      'À définir',
    ], { message: 'Budget invalide' }),
    message: z
      .string()
      .min(10, 'Le message doit contenir au moins 10 caractères')
      .max(5000, 'Le message ne peut pas dépasser 5000 caractères'),
    website: z.string().max(0, 'Champ invalide').optional(), // Honeypot
  })