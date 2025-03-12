import { getFilms } from './backend.mjs';

// Tester la récupération de tous les films
try {
    const films = await getFilms();
    console.log("Films récupérés :", films);
} catch (e) {
    console.error(e);
}

import { getActivites } from './backend.mjs';

// Tester la récupération de toutes les activités
try {
    const activites = await getActivites();
    console.log("Activités récupérées :", activites);
} catch (e) {
    console.error(e);
}

import { getInvites } from './backend.mjs';

// Tester la récupération de tous les invités triés alphabétiquement
try {
    const invites = await getInvites();
    console.log("Invités récupérés :", invites);
} catch (e) {
    console.error(e);
}

import { getFilmById } from './backend.mjs';

// Tester la récupération d'un film par ID
try {
    const film = await getFilmById("k388k4vk776z67e");
    console.log("Film récupéré :", film);
} catch (e) {
    console.error(e);
}

import { getActiviteById } from './backend.mjs';

// Tester la récupération d'une activité par ID
try {
    const activite = await getActiviteById("r6577r45dgj1of2");
    console.log("Activité récupérée :", activite);
} catch (e) {
    console.error(e);
}

import { getInviteById } from './backend.mjs';

// Tester la récupération d'un invité par ID
try {
    const invite = await getInviteById("d7y6z946y6r5uh4");
    console.log("Invité récupéré :", invite);
} catch (e) {
    console.error(e);
}

import { getActivitesByInviteId } from './backend.mjs';

// Tester la récupération des activités d'un animateur par ID
try {
    const activitesAnimateur = await getActivitesByInviteId("d7y6z946y6r5uh4");
    console.log("Activités de l'animateur récupérées :", activitesAnimateur);
} catch (e) {
    console.error(e);
}

import { getActivitesByInviteNom } from './backend.mjs';

// Tester la récupération des activités d'un animateur par nom
try {
    const activitesAnimateurNom = await getActivitesByInviteNom("Bernard");
    console.log("Activités de l'animateur récupérées par nom :", activitesAnimateurNom);
} catch (e) {
    console.error(e);
}

import { createOrUpdate } from './backend.mjs';

// Tester l'ajout d'un nouveau film
try {
    const newFilm = {
        titre: "Nouveau Film",
        annee_sortie: 2025,
        synopsis: "Un film de test",
        liste_acteurs: "Acteur 1, Acteur 2",
        bande_annonce: "https://www.youtube.com/watch?v=xCOQgo3Ejcw",
        duree: 120,
        langue: "Français",
        production: "Studio Test",
        genre: "Action",
        date_projection: "2025-06-10",
        presente_par: "3vksd9n9841hm05"
    };
    const filmAjoute = await createOrUpdate("Film", newFilm);
    console.log("Film ajouté avec succès :", filmAjoute);
} catch (e) {
    console.error(e);
}