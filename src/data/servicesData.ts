import image10 from "../assets/images/accompagnement-extrascolaire.jpg";
import image12 from "../assets/images/assistance-informatique.jpg";
import image8 from "../assets/images/conduite-cause-invalidite.jpg";
import image1 from "../assets/images/entretien-maison.jpg";
import image2 from "../assets/images/entretien-pendant-absence.jpg";
import image9 from "../assets/images/garde-a-domicile.jpg";
import image7 from "../assets/images/livraison-course.jpg";
import image6 from "../assets/images/livraison-repas.jpg";
import image4 from "../assets/images/petit-bricolage.jpg";
import image5 from "../assets/images/preparation-repas.jpg";
import image11 from "../assets/images/soutien-scolaire.jpg";
import image3 from "../assets/images/travaux-jardinage.jpg";

import { IconType } from "react-icons";
import {
  FaCar,
  FaChild,
  FaHome,
  FaShoppingCart,
  FaTools,
} from "react-icons/fa";

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  offer: string;
}

interface ServiceCategory {
  id: string;
  category: string;
  icon: IconType;
  services: Service[];
}

export const servicesData: ServiceCategory[] = [
  {
    id: "1",
    category: "Entretien de la maison",
    icon: FaHome,
    services: [
      {
        id: "1",
        title: "Entretien de la maison et travaux ménagers",
        description:
          "Ménage, nettoyage, repassage, lessive, vaisselle, et nettoyage des vitres.",
        imageUrl: image1,
        offer:
          "Nous collaborons avec des prestataires de confiance spécialisés dans l’entretien de la maison, capables de fournir des services tels que le ménage, le nettoyage, le repassage, la lessive, la vaisselle et le nettoyage des vitres. Que ce soit pour une prestation ponctuelle ou régulière, nos partenaires garantissent un service impeccable adapté à vos besoins.",
      },
      {
        id: "2",
        title: "Maintenance, entretien et vigilance temporaires à domicile",
        description:
          "Surveillance et entretien de votre domicile pendant votre absence.",
        imageUrl: image2,
        offer:
          "En cas d'absence, nos prestataires surveillent votre domicile et en assurent l'entretien (arrosage des plantes, collecte du courrier, petits dépannages). Vous partez l'esprit tranquille en sachant que votre maison est entre de bonnes mains.",
      },
    ],
  },
  {
    id: "2",
    category: "Jardinage et bricolage",
    icon: FaTools,
    services: [
      {
        id: "3",
        title: "Petits travaux de jardinage",
        description:
          "Entretien des espaces verts, tonte de pelouse, taille de haies.",
        imageUrl: image3,
        offer:
          "Grâce à nos jardiniers partenaires expérimentés, vous pouvez maintenir vos espaces verts impeccables. Tonte de pelouse, taille de haies, désherbage : nos prestataires s’occupent de tout, avec soin et professionnalisme.",
      },
      {
        id: "4",
        title: "Travaux de petit bricolage",
        description:
          "Réparation de meubles, petits travaux de montage ou démontage.",
        imageUrl: image4,
        offer:
          "Pour vos petits travaux de réparation ou d'installation (montage de meubles, réparation de poignées de portes, fixation d'étagères), nos bricoleurs partenaires interviennent rapidement et efficacement.",
      },
    ],
  },
  {
    id: "3",
    category: "Livraison et assistance",
    icon: FaShoppingCart,
    services: [
      {
        id: "5",
        title: "Préparation de repas à domicile",
        description:
          "Aide à la cuisine et préparation des repas selon vos besoins.",
        imageUrl: image5,
        offer:
          "Nos partenaires culinaires viennent chez vous pour préparer des repas sains et équilibrés, en respectant vos goûts et éventuelles restrictions alimentaires. Parfait pour les familles ou les personnes âgées souhaitant une assistance au quotidien.",
      },
      {
        id: "6",
        title: "Livraison de repas à domicile",
        description:
          "Service de livraison de repas directement à votre domicile.",
        imageUrl: image6,
        offer:
          "Nos prestataires s'occupent de livrer des repas variés directement à votre domicile. Idéal pour les personnes ayant un emploi du temps chargé ou une mobilité réduite.",
      },
      {
        id: "7",
        title: "Livraison de courses à domicile",
        description: "Nous faisons vos courses et vous les livrons à domicile.",
        imageUrl: image7,
        offer:
          "Vous n’avez pas le temps de faire vos courses ? Nos partenaires se chargent de tout : ils achètent les produits de votre liste et vous les livrent rapidement, garantissant une expérience sans stress.",
      },
    ],
  },
  {
    id: "4",
    category: "Mobilité et transport",
    icon: FaCar,
    services: [
      {
        id: "8",
        title:
          "Conduite du véhicule des personnes en cas d’invalidité temporaire",
        description:
          "Assistance à la conduite de votre véhicule si vous ne pouvez pas conduire.",
        imageUrl: image8,
        offer:
          "Nos chauffeurs partenaires peuvent conduire votre véhicule lorsque vous êtes temporairement dans l'incapacité de le faire, vous permettant de conserver votre mobilité tout en restant indépendant.",
      },
    ],
  },
  {
    id: "5",
    category: "Services aux personnes",
    icon: FaChild,
    services: [
      {
        id: "9",
        title: "Garde d’enfants de plus de 6 ans à domicile",
        description:
          "Garde régulière ou ponctuelle à domicile pour vos enfants.",
        imageUrl: image9,
        offer:
          "Nous mettons en relation les familles avec des nounous qualifiées pour assurer une garde d'enfants de confiance, adaptée à vos besoins (journée, soirée, week-end).",
      },
      {
        id: "10",
        title:
          "Accompagnement des enfants de plus de 6 ans dans leurs déplacements",
        description:
          "Accompagnement de vos enfants à leurs activités scolaires ou extrascolaires.",
        imageUrl: image10,
        offer:
          "Nos prestataires accompagnent vos enfants à leurs activités extrascolaires, rendez-vous médicaux ou trajets quotidiens en toute sécurité, vous offrant une tranquillité d'esprit.",
      },
      {
        id: "11",
        title: "Soutien scolaire ou cours à domicile",
        description:
          "Aide aux devoirs et soutien scolaire personnalisé à domicile.",
        imageUrl: image11,
        offer:
          "Des enseignants ou étudiants qualifiés proposent un soutien scolaire personnalisé pour aider vos enfants à réussir dans leurs études, dans un environnement familier.",
      },
    ],
  },
  {
    id: "6",
    category: "Services techniques",
    icon: FaTools,
    services: [
      {
        id: "12",
        title: "Assistance informatique à domicile",
        description:
          "Assistance et formation informatique à domicile pour vos besoins quotidiens.",
        imageUrl: image12,
        offer:
          "Nos partenaires experts en informatique peuvent vous aider à résoudre vos problèmes techniques (installation, dépannage, formation), que vous soyez un utilisateur débutant ou avancé.",
      },
    ],
  },
];
