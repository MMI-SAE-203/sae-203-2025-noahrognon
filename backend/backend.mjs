import PocketBase from 'pocketbase';
const pb = new PocketBase('https://cinemagny1.noahrognon.fr:443');

// 1) Récupérer la liste de tous les films triés par date de projection
export async function getFilms() {
    try {
        const records = await pb.collection('Film').getFullList({
            sort: 'date_projection',
        });

        // Ajouter les URLs des affiches des films
        records.forEach((film) => {
            film.imageUrl = pb.files.getURL(film, film.affiche);
        });

        console.log("Films récupérés :", records);
        return records;
    } catch (error) {
        console.log('Erreur en récupérant les films:', error);
        return [];
    }
}



// 2) Récupérer la liste de toutes les activités triées par date
export async function getActivites() {
    try {
        const records = await pb.collection('Activite').getFullList({
            sort: 'date_heure',
        });
        console.log("Activités récupérées :", records);
        return records;
    } catch (error) {
        console.log('Erreur en récupérant les activités:', error);
        return null;
    }
}

// 3) Récupérer la liste de tous les acteurs / réalisateurs triés par ordre alphabétique
export async function getInvites() {
    try {
        const records = await pb.collection('Invite').getFullList({
            sort: 'nom',
        });
        records.forEach((invite) => {
            invite.imageUrl = pb.files.getURL(invite, invite.photo);
        });
        console.log("Invités récupérés :", records);
        return records;
    } catch (error) {
        console.log('Erreur en récupérant les invités:', error);
        return null;
    }
}

// 4) Récupérer les infos d'un film par son ID
export async function getFilmById(id) {
    try {
        const record = await pb.collection('Film').getOne(id, { expand: "presente_par" });

        // Vérifie si l'affiche existe et récupère l'URL
        record.imageUrl = record.affiche ? pb.files.getURL(record, record.affiche) : "/placeholder.jpg";

        // Vérifie si un invité est associé au film
        record.invite = record.expand?.presente_par || null;

        console.log("Film récupéré :", record);
        return record;
    } catch (error) {
        console.log(`Erreur en récupérant le film avec ID ${id}:`, error);
        return null;
    }
}




// 5) Récupérer les infos d'une activité par son ID
export async function getActiviteById(id) {
    try {
        const record = await pb.collection('Activite').getOne(id, { expand: "anime_par" });

        // Vérification de l'invité associé
        record.invite = record.expand?.anime_par || null;

        console.log("Activité récupérée :", record);
        return record;
    } catch (error) {
        console.log(`Erreur en récupérant l'activité avec ID ${id}:`, error);
        return null;
    }
}



// 6) Récupérer les infos d'un acteur / réalisateur par son ID
export async function getInvite(id) {
    try {
        let data = await pb.collection('Invite').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.photo);
        console.log("Invité récupéré :", data);
        return data;
    } catch (error) {
        console.log(`Erreur en récupérant l’invité avec ID ${id}:`, error);
        return null;
    }
}

// 7) Récupérer toutes les activités d’un animateur donné par son ID
export async function getActivitesByInviteId(id) {
    try {
        const records = await pb.collection('Activite').getFullList({
            filter: `anime_par = '${id}'`,
        });
        console.log("Activités de l'invité récupérées :", records);
        return records;
    } catch (error) {
        console.log(`Erreur en récupérant les activités de l’invité avec ID ${id}:`, error);
        return null;
    }
}

// 8) Récupérer toutes les activités d’un animateur donné par son nom
export async function getActivitesByInviteNom(nom) {
    try {
        const invites = await pb.collection('Invite').getFullList({
            filter: `nom = '${nom}'`,
        });

        if (invites.length === 0) {
            console.log(`Aucun invité trouvé avec le nom ${nom}`);
            return [];
        }

        return await getActivitesByInviteId(invites[0].id);
    } catch (error) {
        console.log(`Erreur en récupérant les activités de l’invité avec le nom ${nom}:`, error);
        return null;
    }
}

// 9) Ajouter ou modifier un film, une activité ou un invité
export async function createOrUpdate(collection, data, id = null) {
    try {
        if (id) {
            const updatedRecord = await pb.collection(collection).update(id, data);
            console.log(`${collection} mis à jour :`, updatedRecord);
            return updatedRecord;
        } else {
            const newRecord = await pb.collection(collection).create(data);
            console.log(`Nouveau ${collection} ajouté :`, newRecord);
            return newRecord;
        }
    } catch (error) {
        console.log(`Erreur en ajoutant ou mettant à jour ${collection}:`, error);
        return null;
    }
}

// 10) Récupérer toutes les activités et films associés à un invité par son ID
export async function getActivitesAndFilmsById(id) {
    try {
        let activites = await pb.collection('Activite').getFullList(
            { sort: "date_heure", filter: `anime_par = '${id}'` }
        );
        activites = activites.map((activite) => {
            activite.photo_URL = pb.files.getURL(activite, activite.photo);
            return activite;
        })

        let films = await pb.collection('FILM').getFullList(
            { sort: "date_projection", filter: `presente_par = '${id}'` }
        );
        films = films.map((film) => {
            film.photo_URL = pb.files.getURL(film, film.affiche);
            return film;
        })
        let data = films.concat(activites);
        return data;

    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des activités et des films', error);
        return null;
    }
}
