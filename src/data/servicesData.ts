import image1 from "../assets/images/entretien-maison.jpg";
import image2 from "../assets/images/entretien-pendant-absence.jpg";
import image3 from "../assets/images/travaux-jardinage.jpg";
import image4 from "../assets/images/petit-bricolage.jpg";
import image5 from "../assets/images/preparation-repas.jpg";
import image6 from "../assets/images/livraison-repas.jpg";
import image7 from "../assets/images/livraison-course.jpg";
import image8 from "../assets/images/conduite-cause-invalidite.jpg";
import image9 from "../assets/images/garde-a-domicile.jpg";
import image10 from "../assets/images/accompagnement-extrascolaire.jpg";
import image11 from "../assets/images/soutien-scolaire.jpg";
import image12 from "../assets/images/assistance-informatique.jpg";

import {
  FaCar,
  FaChild,
  FaHome,
  FaShoppingCart,
  FaTools,
} from "react-icons/fa";
import { IconType } from "react-icons";

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
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
      },
      {
        id: "2",
        title: "Maintenance, entretien et vigilance temporaires à domicile",
        description:
          "Surveillance et entretien de votre domicile pendant votre absence.",
        imageUrl: image2,
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
      },
      {
        id: "4",
        title: "Travaux de petit bricolage",
        description:
          "Réparation de meubles, petits travaux de montage ou démontage.",
        imageUrl: image4,
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
      },
      {
        id: "6",
        title: "Livraison de repas à domicile",
        description:
          "Service de livraison de repas directement à votre domicile.",
        imageUrl: image6,
      },
      {
        id: "7",
        title: "Livraison de courses à domicile",
        description: "Nous faisons vos courses et vous les livrons à domicile.",
        imageUrl: image7,
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
      },
      {
        id: "10",
        title:
          "Accompagnement des enfants de plus de 6 ans dans leurs déplacements",
        description:
          "Accompagnement de vos enfants à leurs activités scolaires ou extrascolaires.",
        imageUrl: image10,
      },
      {
        id: "11",
        title: "Soutien scolaire ou cours à domicile",
        description:
          "Aide aux devoirs et soutien scolaire personnalisé à domicile.",
        imageUrl: image11,
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
      },
    ],
  },
];
