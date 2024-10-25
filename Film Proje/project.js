const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

// UI objesini başlatma
const ui = new UI();
//Storage objesi
const storage = new Storage();
// Tüm eventleri yüklemek için
eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
       let films = storage.getFilmsFromStorage();
       ui.loadAllFilms(films);
    });

    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;
    
    if (title === "" || director === "" || url === ""){
        ui.displayMessages("Tüm alanları doldurun!","danger");

    }
    else{
        //Yeni Film
      const newFilm = new Film(title,director,url);


      ui.addFilmToUI(newFilm); // Arayüze film eklemek için
      storage.addFilmToStorage(newFilm); //Storage a film eklemek için
      ui.displayMessages("Başarıyla eklendi!","success");

    }

    ui.clearInputs(titleElement,urlElement,directorElement);


    e.preventDefault();
 }   


function deleteFilm(e){

    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);


    
        ui.displayMessages("Film silindi!","success");

    }

}
function clearAllFilms(){

    if(confirm("Emin misiniz?")) {
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
}