export interface QuestionData {
  question: string;
  answer: string;
}

export const questionsData: QuestionData[] = [
  {
    question:
      "Toutes les activités sont-elles éligibles au service d’Avance immédiate ?",
    answer:
      "Toutes les activités de services à la personne, à l’exception de la garde d’enfants de moins de 6 ans éligible au complément de libre choix du mode de garde (CMG), bénéficient du service d’Avance immédiate.",
  },

  {
    question:
      "Les bénéficiaires de l’allocation personnalisée d’autonomie et de la prestation de compensation du handicap bénéficient-ils du service avance immédiate ?",
    answer:
      "Non, le service Avance immédiate n’est pas encore disponible pour les bénéficiaires de l’aide personnalisée d’autonomie ou de la prestation de compensation du handicap. Lorsqu’un utilisateur devient bénéficiaire de l’APA ou de la PCH, il doit informer l’Urssaf, son prestataire ou son mandataire. En tant qu’entreprise ou association agréée, vous devrez lui transmettre une facture.",
  },
  {
    question: "Autres questions ...",
    answer: 'Rendez-vous à la rubrique " Contact " de notre site.',
  },
];
