

//Definerar
interface kursInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
};

 //Formulär
let addKurs = document.getElementById("addKurs") as HTMLFormElement;

//---------------------------------------------------------------------


addKurs.addEventListener("submit", (event) => { //Eventlistener vid submit
    event.preventDefault();


//---------------------------------------------------------------------

    // Sätter olika variabler med deras input
    const kursKod = document.getElementById("kursKod") as HTMLInputElement;
    const kursNamn = document.getElementById("kursNamn") as HTMLInputElement;
    const progression = document.getElementById("progression") as HTMLInputElement;
    const url = document.getElementById("url") as HTMLInputElement;

    const checkProgression = progression.value;

    if (checkProgression != "A" && checkProgression != "B" && checkProgression != "C") { //Veriferrar att progression är A, B eller C. 
        alert("Progression måste vara A, B, eller C"); //Skickar detta som alert.
        return;}

    const nyKurs: kursInfo = { //Sätter nyKurs till de olika unputsens värden
        code: kursKod.value,
        name: kursNamn.value,
        progression: progression.value,
        syllabus: url.value,
      };

    


      let kursLista = JSON.parse(localStorage.getItem("kursLista"));//hämtar Localstorage
      if (!kursLista) {
        kursLista = []; //om inget finns så blir kursLista tom array.
      }
      
      kursLista.push(nyKurs); //Lägger till nyKurs

      localStorage.setItem("kursLista", JSON.stringify(kursLista)) //Sparar

      adderaKurs(nyKurs);
});


//---------------------------------------------------------------------



function adderaKurs(kursInfo: kursInfo): void { //Funktion lägga till kurs
    let kurserLista = document.getElementById("kursLista"); 
    if (kurserLista) {
        let nyDiv = document.createElement("Div"); //Skapar div
        nyDiv.innerHTML =  //Lägger till inehåll
        `<h2>Kursinfo</h2>
        <p><strong>Kurskod:</strong> ${kursInfo.code}</p>
        <p><strong>Kursnamn:</strong> ${kursInfo.name}</p>
        <p><strong>Progression:</strong> ${kursInfo.progression}</p>
        <p><strong>Url:</strong> ${kursInfo.syllabus}</p>`

        kurserLista.appendChild(nyDiv); //Lägger till på kursLista
    }
}



//-------------------------------------------//---------------//-------------

function sparadeKurser(): void { //Funktion för att hämta sparade kurser (localstorage=)
    let allaKurser = JSON.parse(localStorage.getItem("kursLista"));//omvandlar och hämtar.
    if (allaKurser) {
        allaKurser.forEach((x: kursInfo) => { //Körs för varje
            adderaKurs(x);
        });
    }
}


document.addEventListener("DOMContentLoaded", function() { //Eventlistener ladda sidan
    sparadeKurser();
})


//-------------------------------------------//---------------//-------------