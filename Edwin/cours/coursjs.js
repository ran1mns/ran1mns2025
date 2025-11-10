// Fonction pour charger la liste des fichiers depuis list-cours.json
async function chargerListeFichiers() {
    try {
        const response = await fetch('list-cours.json');
        if (!response.ok) {
            throw new Error("Impossible de charger list-cours.json");
        }
        const listeFichiers = await response.json();
        return listeFichiers;
    } catch (e) {
        console.error("Erreur lors du chargement de list-cours.json :", e);
        return [];
    }
}

// Fonction pour essayer de charger un fichier et retourner son contenu si trouvé
async function essayerChargerFichier(cheminFichier) {
    try {
        const response = await fetch(cheminFichier);
        if (response.ok) {
            const content = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            const bodyContent = doc.querySelector('body').innerHTML;
            return { nom: cheminFichier, contenu: bodyContent };
        }
    } catch (e) {
        return null;
    }
    return null;
}

// Fonction pour afficher les fichiers d'une thématique
async function afficherFichiersThematique(thematique) {
    const contenuDiv = document.getElementById('contenu');
    contenuDiv.innerHTML = '<div class="container"><div class="construction-icon">🔍</div><h1>Recherche des cours en cours...</h1></div>';

    try {
        const listeFichiers = await chargerListeFichiers();
        if (listeFichiers.length === 0) {
            contenuDiv.innerHTML = '<div class="container"><div class="construction-icon">⚠️</div><h1>Aucun fichier de cours trouvé.</h1><p>Veuillez vérifier que le fichier list-cours.json est présent et correctement formaté.</p></div>';
            return;
        }

        const fichiersThematique = listeFichiers
            .filter(fichier => fichier.path.startsWith(`Edwin/cours/${thematique}/`))
            .map(fichier => fichier.path.replace('Edwin/cours/', ''));

        if (fichiersThematique.length === 0) {
            contenuDiv.innerHTML = '<div class="container"><div class="construction-icon">📚</div><h1>Aucun cours trouvé pour cette thématique.</h1></div>';
            return;
        }

        const promesses = fichiersThematique.map(chemin => essayerChargerFichier(chemin));
        const resultats = await Promise.all(promesses);
        const fichiersValides = resultats.filter(result => result !== null);

        if (fichiersValides.length === 0) {
            contenuDiv.innerHTML = '<div class="container"><div class="construction-icon">😕</div><h1>Impossible de charger le contenu des cours.</h1><p>Vérifiez que les fichiers de cours existent.</p></div>';
        } else {
            let contenuComplet = '';
            fichiersValides.forEach(fichier => {
                contenuComplet += `<div class="cours-item"><h2>${fichier.nom}</h2>${fichier.contenu}</div>`;
            });
            contenuDiv.innerHTML = contenuComplet;
        }
    } catch (error) {
        contenuDiv.innerHTML = `<div class="container"><div class="construction-icon">❌</div><h1>Erreur de chargement</h1><p>${error.message}</p></div>`;
    }
}

// Chargement initial
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contenu').innerHTML = `
        <div class="container">
            <div class="construction-icon">📚</div>
            <h1>Sélectionnez une thématique pour afficher les cours</h1>
            <p>Cliquez sur un des boutons ci-dessus pour commencer.</p>
        </div>
    `;
});