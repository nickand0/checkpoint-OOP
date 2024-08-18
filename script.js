document.addEventListener('DOMContentLoaded',()=>{

    // Classe Produit
    class Produit {
        constructor(id, nom, prix) {
            this.id = id;
            this.nom = nom;
            this.prix = prix;
        }
    }

    // Classe ArticlePanier
    class ArticlePanier {
        constructor(produit, quantite) {
            this.produit = produit;
            this.quantite = quantite;
        }

        // Calcule le prix total de l'article en fonction de la quantité
        obtenirPrixTotal() {
            return this.produit.prix * this.quantite;
        }
    }

    // Classe Panier
    class Panier {
        constructor() {
            this.articles = []; // Tableau pour stocker les articles du panier
        }

        // Retourne la quantité totale de tous les articles dans le panier
        obtenirTotalArticles() {
            return this.articles.reduce((total, article) => total + article.quantite, 0);
        }

        // Méthode pour calculer le prix total du panier
        obtenirPrixTotalPanier() {
        return this.articles.reduce((total,article) => total + article.obtenirPrixTotal(), 0);
        }

        // Ajoute un article au panier ou met à jour la quantité si l'article existe déjà
        ajouterArticle(produit, quantite) {
            const articleExistant = this.articles.find(article => article.produit.id === produit.id);
            if (articleExistant) {
                articleExistant.quantite += quantite;
            } else {
                const nouvelArticle = new ArticlePanier(produit, quantite);
                this.articles.push(nouvelArticle);
            }
            this.sauvegarderPanier();
        }

        // Supprime un article du panier en fonction de son identifiant
        supprimerArticle(idProduit) {
            this.articles = this.articles.filter(article => article.produit.id !== idProduit);
            this.sauvegarderPanier();
        }

        // Affiche les articles du panier avec leurs détails
        sauvegarderPanier(){
            const ElementArticlesPanier = document.getElementById('Panier-Articles');
        ElementArticlesPanier.innerHTML = '';
        
        this.articles.forEach(article=>{
            const li = document.createElement('li')
            li.className = 'flex items-center space-x-4 p-2 bg-gray-50 rounded-lg shadow-md mb-2'; // Style de l'article

            // Créer un conteneur pour le texte
            const textContainer = document.createElement('div');
            textContainer.className = 'flex-1';

            const nom = document.createElement('h3');
            nom.textContent = article.produit.nom;
            nom.className = 'text-lg font-semibold'; // Style du nom du produit

            const quantitePrix = document.createElement('p');
            quantitePrix.textContent = `Quantité: ${article.quantite} - Prix Total: ${article.obtenirPrixTotal().toFixed(2)} F`;
            quantitePrix.className = 'text-gray-700'; // Style de la quantité et du prix total

            textContainer.appendChild(nom);
            textContainer.appendChild(quantitePrix);
            li.appendChild(textContainer);


             //bouton suppression
            const BoutonSuppr = document.createElement('button')
            BoutonSuppr.textContent ='Retirer'
            BoutonSuppr.className = 'bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 ml-4'
            BoutonSuppr.addEventListener('click',()=>{
                this.supprimerArticle(article.produit.id)
            });
            li.appendChild(BoutonSuppr);
            ElementArticlesPanier.appendChild(li)    
        })

        document.getElementById('total-Articles').textContent=`Total des Articles : ${this.obtenirTotalArticles()}`
        document.getElementById('prix-total').textContent=`Prix Total : ${this.obtenirPrixTotalPanier()} F`
        }

    }
    // Initialiser le panier
    const nouveauPanier = new Panier()

    // Ajouter des écouteurs d'événements aux boutons "Ajouter au Panier"
    document.querySelectorAll('.ajouter-au-Panier').forEach(button =>{
        button.addEventListener('click',(event)=>{
            const elementProduit = event.target.closest('.produit')
            const id = parseInt(elementProduit.getAttribute('data-id'))
            const nom = elementProduit.getAttribute('data-name')
            const prix = parseFloat(elementProduit.getAttribute('data-price'))

            const produit = new Produit(id,nom,prix);
            nouveauPanier.ajouterArticle(produit,1)
        })
    })

})