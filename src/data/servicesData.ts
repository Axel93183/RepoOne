import {
  FaCar,
  FaChild,
  FaHome,
  FaShoppingCart,
  FaTools,
} from "react-icons/fa"; // Icons

export const servicesData = [
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
        imageUrl: "https://example.com/image1.jpg",
      },
      {
        id: "2",
        title: "Maintenance, entretien et vigilance temporaires à domicile",
        description:
          "Surveillance et entretien de votre domicile pendant votre absence.",
        imageUrl: "https://example.com/image12.jpg",
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
        imageUrl: "https://example.com/image2.jpg",
      },
      {
        id: "4",
        title: "Travaux de petit bricolage",
        description:
          "Réparation de meubles, petits travaux de montage ou démontage.",
        imageUrl: "https://example.com/image3.jpg",
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
        imageUrl: "https://example.com/image6.jpg",
      },
      {
        id: "6",
        title: "Livraison de repas à domicile",
        description:
          "Service de livraison de repas directement à votre domicile.",
        imageUrl: "https://example.com/image7.jpg",
      },
      {
        id: "7",
        title: "Livraison de courses à domicile",
        description: "Nous faisons vos courses et vous les livrons à domicile.",
        imageUrl: "https://example.com/image8.jpg",
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
        imageUrl: "https://example.com/image18.jpg",
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
        title: "Garde d’enfants de plus de 3 ans à domicile",
        description:
          "Garde régulière ou ponctuelle à domicile pour vos enfants.",
        imageUrl: "https://example.com/image4.jpg",
      },
      {
        id: "10",
        title:
          "Accompagnement des enfants de plus de 3 ans dans leurs déplacements",
        description:
          "Accompagnement de vos enfants à leurs activités scolaires ou extrascolaires.",
        imageUrl: "https://example.com/image14.jpg",
      },
      {
        id: "11",
        title: "Soutien scolaire ou cours à domicile",
        description:
          "Aide aux devoirs et soutien scolaire personnalisé à domicile.",
        imageUrl: "https://example.com/image5.jpg",
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
        imageUrl: "https://example.com/image10.jpg",
      },
    ],
  },
];
