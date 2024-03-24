

//-------------------------------CourseInfo--------------------------------------

interface kursInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
};

//---------------------------------------------------------------------

//Hela div
let kurser = document.getElementById("kursDiv");


 //Formulär
let addKurs = document.getElementById("addKurs") as HTMLFormElement;

//Array

//let allaKurser: kursInfo[] = [];

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

      adderaKurs(nyKurs);
});







function adderaKurs(kursInfo: kursInfo): void {
    let kurserLista = document.getElementById("kursLista");
    if (kurserLista) {
        kurserLista.innerHTML = 
        `<h2>Användardetaljer:</h2>
        <p><strong>Kurskod:</strong> ${kursInfo.code}</p>
        <p><strong>Kursnamn:</strong> ${kursInfo.name}</p>
        <p><strong>Progression:</strong> ${kursInfo.progression}</p>
        <p><strong>Url:</strong> ${kursInfo.syllabus}</p>`
    }
}