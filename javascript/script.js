const form = document.querySelector("form");
const nbPokemon = document.querySelector(".nbPokemonsJs");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    genererPokemon(nbPokemon);
})

function genererPokemon(nbPokemon) {
    
    //  console.log(nbPokemon.value);
    // Récupération des pokemons
    fetch("https://pokeapi.co/api/v2/pokemon?limit="+nbPokemon.value+"&offset=0")
    .then((response) => response.json())
    .then((data)=>{
       console.log(data);

         // On rattache l'élément au document
        const result = document.querySelector(".conteneurAPokemons");
        result.innerText= null;

        for(let i=0;i<nbPokemon.value;i++){
            
            
            // création d'une balise dédiée à recevoir les infos 
            const pokemonElement = document.createElement("article");

            const numPokemon = document.createElement("p");

            
            // Création d'une balise qui contiendra le nom du pokemon
            const nomPokemon = document.createElement("p");
            nomPokemon.className = "nomPokemon";
            // Contenu de la balise. On place le nom du pokemon dansu ne variable tmp pour afficher la première lettre en majuscule.
            var nomTmp =  data.results[i].name
            nomPokemon.innerText= nomTmp[0].toUpperCase() + nomTmp.slice(1);
            
           //On réalise une Deuxième requête pour récupérer les types des pokemons
           const imgPokemon = document.createElement("img");
           let typePokemon = document.createElement("p");
           typePokemon.className = "type";
            fetch(data.results[i].url)
            .then((response)=> response.json())
            .then((data2)=>{
                console.log(data2);
                type = data2.types[0].type.name;
                typePokemon.innerText = type;
                pokemonElement.className = type;
                numPokemon.innerText = addZeros(data2.id)
                numPokemon.className = "numPokemon"
            //   console.log(typePokemon);
                //Idem pour l'image
                
                imgPokemon.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+data2.id+".png"
            })



            result.appendChild(pokemonElement);
            pokemonElement.appendChild(numPokemon);
            pokemonElement.appendChild(nomPokemon);
            pokemonElement.appendChild(typePokemon);
            pokemonElement.appendChild(imgPokemon);

        }
    })

    function addZeros(n) 
    { 
        return (n < 10)? ' # 00' + n : (n < 100)? '# 0' + n : '# ' + n; 
    }





}
