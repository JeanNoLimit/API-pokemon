const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nbPokemon = document.querySelector(".nbPokemonsJs");
   
    genererPokemon(nbPokemon);
})

function genererPokemon(nbPokemon) {
    
    //  console.log(nbPokemon.value);
    // Récupération des pokemons
    fetch("https://pokeapi.co/api/v2/pokemon?limit="+nbPokemon.value+"&offset=0")
    .then((response) => response.json())
    .then((data)=>{
    //    console.log(data);

        for(let i=0;i<nbPokemon.value;i++){

            // On rattache l'élément au document
            const result = document.querySelector(".conteneurAPokemons");
            // création d'une balise dédiée à recevoir les infos 
            const pokemonElement = document.createElement("article");

            // Création d'une balise qui contiendra le nom du pokemon
            const nomPokemon = document.createElement("p");
            nomPokemon.className = "nomPokemon";

            // Contenu de la balise. On place le nom du pokemon dansu ne variable tmp pour afficher la première lettre en majuscule.
            var nomTmp =  data.results[i].name
            console.log(nomTmp)
            nomPokemon.innerText= nomTmp[0].toUpperCase() + nomTmp.slice(1);

            //Idem pour l'image
            const imgPokemon = document.createElement("img");
            imgPokemon.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+(i+1)+".png"


            result.appendChild(pokemonElement);
            pokemonElement.appendChild(nomPokemon);
            pokemonElement.appendChild(imgPokemon);

        }
    })

   



}
