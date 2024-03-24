

//-------------------------------CourseInfo--------------------------------------

interface kursInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
};

//---------------------------------------------------------------------

//Hela lsita
let kurser= document.getElementById("kursLista");


 //Formulär
let addKurs = document.getElementById("addKurs") as HTMLFormElement;

//---------------------------------------------------------------------


addKurs.addEventListener("submit", (event) => {
    event.preventDefault();


    const kursKod = document.getElementById("kursKod") as HTMLInputElement;
    const kursNamn = document.getElementById("kursNamn") as HTMLInputElement;
    const progression = document.getElementById("progression") as HTMLInputElement;
    const url = document.getElementById("url") as HTMLInputElement;

    const checkProgression = progression.value;

    if (checkProgression != "A" && checkProgression != "B" && checkProgression != "C") {
        alert("Progression måste vara A, B, eller C");
        return;}

    const nyKurs: kursInfo = {
        code: kursKod.value,
        name: kursNamn.value,
        progression: progression.value,
        syllabus: url.value,
      };

      


      let kursLista = JSON.parse(localStorage.getItem("kursLista"));
      if (!kursLista) {
        kursLista = [];
      }
      
      kursLista.push(nyKurs);

      localStorage.setItem("kursLista", JSON.stringify(kursLista))

      adderaKurs(nyKurs);
});



function adderaKurs(kursInfo: kursInfo): void {
    let kurserLista = document.getElementById("kursLista");
    if (kurserLista) {
        let nyDiv = document.createElement("Div");
        nyDiv.innerHTML = 
        `<h2>Kursinfo</h2>
        <p><strong>Kurskod:</strong> ${kursInfo.code}</p>
        <p><strong>Kursnamn:</strong> ${kursInfo.name}</p>
        <p><strong>Progression:</strong> ${kursInfo.progression}</p>
        <p><strong>Url:</strong> ${kursInfo.syllabus}</p>`

        kurserLista.appendChild(nyDiv);
    }
}



//-------------------------------------------//---------------//-------------

function sparadeKurser(): void {
    let allaKurser = JSON.parse(localStorage.getItem("kursLista"));
    if (allaKurser) {
        allaKurser.forEach((x: kursInfo) => {
            adderaKurs(x);
        });
    }
}


document.addEventListener("DOMContentLoaded", function() {
    sparadeKurser();
})


//-------------------------------------------//---------------//-------------