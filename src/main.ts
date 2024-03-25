

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
    const kursKod:HTMLInputElement = document.getElementById("kursKod") as HTMLInputElement;
    const kursNamn:HTMLInputElement = document.getElementById("kursNamn") as HTMLInputElement;
    const progression:HTMLInputElement = document.getElementById("progression") as HTMLInputElement;
    const url:HTMLInputElement = document.getElementById("url") as HTMLInputElement;

    const checkProgression: string = progression.value;

    if (checkProgression != "A" && checkProgression != "B" && checkProgression != "C") { //Veriferrar att progression är A, B eller C. 
        alert("Progression måste vara A, B, eller C"); //Skickar detta som alert.
        return;
    };

    let nyKurs: kursInfo = { //Sätter nyKurs till de olika unputsens värden
        code: kursKod.value,
        name: kursNamn.value,
        progression: progression.value,
        syllabus: url.value,
    };




    let kursLista: kursInfo[] = JSON.parse(localStorage.getItem("kursLista")) || [];
    
    /*if (!kursLista) {
        kursLista = [];
    }*/

    kursLista.push(nyKurs); //Lägger till nyKurs

    localStorage.setItem("kursLista", JSON.stringify(kursLista)); //Sparar

    adderaKurs(nyKurs);
})


//---------------------------------------------------------------------



function adderaKurs(kursInfo: kursInfo): void { //Funktion lägga till kurs
    let kurserLista:HTMLElement = document.getElementById("kursLista");
    if (kurserLista) {




        let nyUl:HTMLUListElement = document.createElement("ul");



        nyUl.innerHTML =  //Lägger till inehåll
            `<h2>Kursinfo</h2>
        <li><strong>Kurskod:</strong> <div> ${kursInfo.code}</div></li>
        <li><strong>Kursnamn:</strong><div> ${kursInfo.name}</div></li>
        <li><strong>Progression:</strong> <div>${kursInfo.progression}</div></li>
        <li><strong>Url:</strong><div> ${kursInfo.syllabus}</div></li>
        <button class="redigeraKnapp">Redigera </button>
        <button class="sparaKnapp" style="display: none">Spara </button>`;

        kurserLista.appendChild(nyUl); //Lägger till på kursLista





        nyUl.querySelector(".redigeraKnapp").addEventListener("click", function () { //Eventlistener för redigerings knappen

            const sparaKnapp: HTMLButtonElement = nyUl.querySelector(".sparaKnapp") as HTMLButtonElement; //Väljer knappen
            
            sparaKnapp.style.display = "inline-block";
            


            const allDiv: NodeListOf<HTMLDivElement> = nyUl.querySelectorAll("div");
            allDiv.forEach(div => {

                const redigera: HTMLInputElement = document.createElement("input");
                redigera.value = div.textContent;
                div.appendChild(redigera)
            });
        });


        nyUl.querySelector(".sparaKnapp").addEventListener("click", function () { //Eventlistener för sparnings knappen
            const sparaKnapp: HTMLButtonElement  = nyUl.querySelector(".sparaKnapp") as HTMLButtonElement; //Väljer knappen

            const inputs: NodeListOf<HTMLInputElement> = nyUl.querySelectorAll("input"); //Väljer alla input




            const nyKursInfo: kursInfo = { //Skapar en ny tom
                code: "",
                name: "",
                progression: "",
                syllabus: ""
            }


            inputs.forEach((div, x) => { // kollar varje i input i arrayen inputs
                const allDiv: HTMLDivElement = nyUl.querySelectorAll("div")[x];
                allDiv.textContent = div.value;

                switch (x) { //Switch sats
                    case 0: nyKursInfo.code = div.value; break; //kurskod
                    case 1: nyKursInfo.name = div.value; break; //kursnamn

                    case 2: //progression, kollar så den har värdet A,B eller C.
                        let giltigProgression: Boolean = div.value === "A" || div.value === "B" || div.value === "C"; //Får vara A, B eller C
                        if (giltigProgression) {
                            nyKursInfo.progression = div.value; //Om den har de sätter den värdet.
                            return;
                        } else {
                            alert("Progression måste vara A, B, eller C"); //Annars skickas en alert 
                            location.reload(); //sidan laddas om så den inte uppdeteras med fel(ogiltig progression)
                        }


                        break;
                    case 3: nyKursInfo.syllabus = div.value; break; //url
                }



            });


            let kursLista = JSON.parse(localStorage.getItem("kursLista"));

            let x: number = -1; //x = -1
            for (let i: number = 0; i < kursLista.length; i++) { //loop igenom kurslistan
                if (kursLista[i].code == kursInfo.code) {  //kollar  matchning
                    x = i; //vid matchning blir x = i värdet
                    break;
                }
            }

            if (x !== -1) {  // om x skilt från -1 så lägs det till

                kursLista[x] = nyKursInfo; //Ersätter med ny info
                localStorage.setItem("kursLista", JSON.stringify(kursLista)); //sparar 

            }


            sparaKnapp.style.display = "none"; // tar bort spara knapp
        });
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





document.addEventListener("DOMContentLoaded", function () { //Eventlistener ladda sidan som kör sparadeKurser
    sparadeKurser(); 

})


//-------------------------------------------//---------------//-------------

let rensaKurser = document.getElementById("rensaKnapp") as HTMLButtonElement; //Rensar alla kurser knapp
rensaKurser.addEventListener("click", function () {
    rensaAllaKurser();
});



function rensaAllaKurser(): void { //funktionen för att rensa kurser
    localStorage.removeItem("kursLista"); //tar bort
    let kursListaUl: HTMLElement = document.getElementById("kursLista"); //väljer kursLista
    if (kursListaUl) {
        kursListaUl.innerHTML = ""; //Sätter den till tom
    }

}



//-------------------------------------------//---------------//-------------//-------------------------------------------//---------------//-------------'






















