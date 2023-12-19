/*
Consegna:
Dato un array di oggetti letterali con:
 - url dell'immagine
 - titolo
 - descrizione
Creare un carosello come nella foto allegata.

Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.

Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l'array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.

Milestone 2:
Aggiungere il ciclo infinito del carosello. Ovvero se la slide attiva è la prima e l'utente clicca la freccia verso destra,
la slide che deve attivarsi sarà l'ultima e viceversa per l'ultima slide se l'utente clicca la freccia verso sinistra.
*/

const images = [
    {
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
        title: 'Chile',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
];


// inizializzo variabile per rappresentare il contenuto del carosello
let itemContent = '';
let itemThumbnail = '';


// ciclo for con array e per ogni i dell'array creo un div con un img nell'ordine corrispondente
// creo anche un button con una immagine dentro
for(let i = 0; i < images.length; i++){
    itemContent += 
    `
    <div class="item">
        <img src="${images[i].url}">
        <div class="item-description">
            <h2>${images[i].title}</h2>
            <p>${images[i].description}</p>
        </div>
    </div>
    `
    itemThumbnail += `<button type="button"><img src="${images[i].url}" alt="Image ${i+1}"></button>`; 
};

// inserisco nell'html il codice js creato con il ciclo for
const itemsSlider = document.querySelector('.item-slider').innerHTML = itemContent;
const itemsThumbnail = document.querySelector('.thumbnail-container').innerHTML = itemThumbnail;

// inizializzo una costante e l'associo a tutti gli elementi che hanno la classe selezionata
const item = document.getElementsByClassName('item');

// inizializzo una costante e l'asscocio a tutte le query con questo selettore avanzato
const thumbnails = document.querySelectorAll('.thumbnail-container button');

// inizializzo una variabile per rappresentare l'immagine che dovrà essere visibile in questo caso la prima dell'array
let counter = 0;

// a questa costante aggiungo la classe per dare display-block
item[counter].classList.add('active');

// inizializzo le variabili per gestire i bottoni per muovermi nel carosello
let previous = document.querySelector('.previous');
let next = document.querySelector('.next');

// prima funzione per il tasto next al click rimuove active all'item corrispondente, se l'item è l'ultimo lo riporta al primo
// sennò avanzerà di uno, alla fine della funzione rimetterà active all'item corrispondente.
next.addEventListener ('click', function() {

    item[counter].classList.remove('active');

    if ( counter != images.length -1 ){
        counter ++;

    }
    else{
        counter = 0;  

    }

    item[counter].classList.add('active');

});

// seconda funzione per il tasto previous al click rimuove active all'item corrispondente, se l'item è il primo lo riporta all'ultimo
// sennò diminuirà di uno, alla fine della funzione rimetterà active all'item corrispondente.
previous.addEventListener ('click', function() {

    item[counter].classList.remove('active');

    if ( counter != 0){
        counter --;
    }
    else{
        counter = images.length-1;
    }

    item[counter].classList.add('active');

});

// secondo ciclo for per ogni thumbnail cliccatta toglierà la classe active al counter corrente dopo metterà counter allo stesso indice del thumbnail
// e dopodichè a quel counter metterà la classe active.
for (let i = 0; i < item.length; i++) {
    thumbnails[i].addEventListener('click', function() {

      item[counter].classList.remove('active');

      counter = i;

      item[counter].classList.add('active');

    });

};

//funzione per far scorre le immagini si comporta come il ciclo for sopra
function nextImage() {
    item[counter].classList.remove('active');

    if (counter !== images.length - 1) {
        counter++;
    } else {
        counter = 0;
    }

    item[counter].classList.add('active');
}

//funzione per far andare in base all'intervello di tempo scelto l'immagine successiva come sritto nella funzione sopra
function startAutoplay() {
    autoplayInterval = setInterval(nextImage, 3000);
}

//funzione per far fermare l'autoplay al clic sul bottone predisposto
function stopAutoplay() {
    clearInterval(autoplayInterval);
}

//avvia l'autoplay quando la pagina è caricata
window.addEventListener('load', startAutoplay);