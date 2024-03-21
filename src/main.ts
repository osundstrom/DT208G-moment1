
const kurser = document.getElementById("kursDiv");
const kurserLista = document.getElementById("kursUl");


//-----------------------------------ProgressionList----------------------------------

enum ProgressionList {
    "A",
    "B",
    "C",
};

//-------------------------------CourseInfo--------------------------------------

interface CourseInfo {
    code: string;
    name: string;
    progression: ProgressionList;
    syllabus: string;
};

//---------------------------------------------------------------------


