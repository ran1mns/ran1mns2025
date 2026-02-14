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
            const bodyContent = doc.querySelector('section.course') ? doc.querySelector('section.course').innerHTML : doc.querySelector('body').innerHTML;
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
    contenuDiv.innerHTML = `
        <div class="loading-container">
            <div class="construction-icon">🚀</div>
            <h2>Initialisation du module ${thematique}...</h2>
        </div>
    `;

    try {
        const listeFichiers = await chargerListeFichiers();
        if (listeFichiers.length === 0) {
            contenuDiv.innerHTML = `
                <div class="glass-card">
                    <div class="construction-icon">⚠️</div>
                    <h2>Erreur système</h2>
                    <p>La base de données des cours est inaccessible.</p>
                </div>
            `;
            return;
        }

        const fichiersThematique = listeFichiers
            .filter(fichier => fichier.path.startsWith(`Edwin/cours/${thematique}/`))
            .map(fichier => fichier.path.replace('Edwin/cours/', ''));

        if (fichiersThematique.length === 0) {
            contenuDiv.innerHTML = `
                <div class="glass-card">
                    <div class="construction-icon">📚</div>
                    <h2>Module vide</h2>
                    <p>Aucune donnée trouvée pour la thématique : ${thematique}.</p>
                </div>
            `;
            return;
        }

        const promesses = fichiersThematique.map(chemin => essayerChargerFichier(chemin));
        const resultats = await Promise.all(promesses);
        const fichiersValides = resultats.filter(result => result !== null);

        if (fichiersValides.length === 0) {
            contenuDiv.innerHTML = `
                <div class="glass-card">
                    <div class="construction-icon">😕</div>
                    <h2>Erreur de chargement</h2>
                    <p>Impossible de récupérer le contenu des fichiers.</p>
                </div>
            `;
        } else {
            let contenuComplet = '';
            fichiersValides.forEach(fichier => {
                contenuComplet += `<article class="cours-item">${fichier.contenu}</article>`;
            });
            contenuDiv.innerHTML = contenuComplet;
        }
    } catch (error) {
        contenuDiv.innerHTML = `
            <div class="glass-card">
                <div class="construction-icon">❌</div>
                <h2>Erreur critique</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Chargement initial
document.addEventListener('DOMContentLoaded', () => {
    // On pourrait charger une thématique par défaut ici si on voulait
});