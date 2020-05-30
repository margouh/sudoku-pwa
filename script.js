/*14 grilles possibles
+ remplacement des chiffres de 1-9 par d'autres chiffres !!!*/
var puzzles = new Array(
    "123745698459681732678392145269584371513267948784913526937412856826375194451869237",
    "126895374437621985958473126457983612193246578862517394269548731314769852785231649",
    "142685973936217458857394612329451867174862593568973241298534716745621389136789425",
    "158469372362587914794312658637215984259648173841973526726841593435796821189235467",
    "269548731314769852785231649126895374437621985958473126457983612193246578862517394",
    "362175948845963217179248635713296854458731629962584713439527681576184392821396457",
    "386751942574928361291364875614837529793245186528619743478293165659817432132456987",
    "418957632297643581563812794286571394354928716179436285723845169865139472941627358",
    "452371986618429573379865241734629815162845397598713624293148567754236981186957432",
    "531428679628579143749163825986217345214835967537496281792854163381796452654312978",
    "753896412196274538482153679385624971421759683967318245248567139365912847791834526",
    "872351946139264758654987321269587134843612975175439268418725693526391487793846512",
    "921437568583629174674158392283746195765912438419835267674319852251847396983526741",
    "954126783836759124172834956295431678371568492648297315849567312215983647763421589");

var niveaux =
    /*nombre de chiffre  qui vont  apparaitre en fonction du niveau
    (affichage symetrique, donc faire *2)*/
    {
        0: 41,
        /*affiche tout (pour debuger et tester...)*/
        1: 17,
        /*faible*/
        2: 15,
        /*moyen*/
        3: 13,
        /*difficile*/
        4: 11,
        /*diabolique*/
        5: 9 /* impossible*/
    };

/* On nomme les variables */
var grille, masque, chiffres, choixCase = null,
    grilleUser = new Array(81);

/*On retourne un chiffre entre le inimum & le maximum */
function aleatoire(min, maxi) { return (parseInt(Math.random() * 1000) % (maxi - min + 1) + min); }

/*On teste si c'est un chiffre (entre 1 et 9) */
function isChiffre(nbre) {
    return (nbre != null && nbre > 0 && nbre <= 9);
}
/*On va creer un tableau 3 x 3 cases*/
/*grille = liste des chiffres,
chiffres = chiffre de 1 a 9 ds le desordre,
masque = code binaire des emplacement des chiffres,
id = index du tableau,
sub = tableau principal / sous tableau */

function createGrid3x3(grille, chiffres, masque, id, sub) {
    var htm = "<table cellspacing=0 >";
    var x, y;
    for (y = 0; y < 3; y++) {
        htm += "<tr>";
        for (x = 0; x < 3; x++) {
            index = y * 3 + x;
            if (sub) {
                htm += "<td class='tabloExterieur' >";
                htm += createGrid3x3(grille, chiffres, masque, index, false);
                /*Recursif pour afficher les sous tableaux*/
                htm += "</td>";

            } else {

                /*Rest binaire sur le masque*/
                if (masque[id * 9 + index] == true) {
                    htm += "<td class='tabloInterieur'  ><b>" + chiffres[parseInt(grille.charAt(id * 9 + index))] + "</b></td>";
                    grilleUser[id * 9 + index] = chiffres[parseInt(grille.charAt(id * 9 + index))];
                } else {
                    /*htm+= chiffres[parseInt(grille.charAt(id*9+index))];*/
                    htm += "<td class=\"tabloInterieur\" id='c_" + (id * 9 + index) + "' onmouseover=\"choix(this,0);\" onmouseout=\"choix(this,1);\" onclick=\"choix(this,2);\">";
                    /*if (isChiffre(grilleUser[id*9+index]))*/
                    htm += isChiffre(grilleUser[id * 9 + index]) ? grilleUser[id * 9 + index] : "&nbsp;";
                    htm += "</td>";
                }
            }
        }
        htm += "</tr>\n";
    }
    htm += "</table>";
    return htm;
}

/*Changement du style au passage de la souris + selection de la case selectionnee*/
function choix(source, code) {
    if (code == 0) { source.style.background = (source == choixCase) ? '#c0ffc0' : 'yellow' } else if (code == 1) {
        source.style.background = (source == choixCase) ? '#c0ffc0' : '';
    } else {
        if (choixCase != null) { choixCase.style.background = ''; }
        choixCase = source;
        choix(source, 0);
    }
}

/*Retourne un chiffre qui n'appartient pas a la liste envoyee en parametre*/
function uniqueChiffre(list) {
    var nbr = aleatoire(1, 9);
    for (var a = 0; a < list.length; a++) {
        if (list[a] == nbr) {
            nbr = aleatoire(1, 9);
            a = 0;
        }
    }
    return nbr;
}

/*Retourne les chiffres de 1 a 9 dans le desordre*/
function chiffreDesordre() {
    liste = new Array("0");
    for (j = 0; j < 9; j++) {
        nvx_chiffre = uniqueChiffre(liste);
        liste.push(nvx_chiffre);
    }
    return liste;
}

/*Retourne un masque correspondant au niveau de difficulte*/
function getMasque(nbmax) {
    var list = new Array(81);
    for (i = 0; i < nbmax; i++) {
        x = aleatoire(0, 40);
        while (list[x] == true) {
            x = aleatoire(0, 40);
        }
        list[x] = true;
    }
    for (i = 0; i < 40; i++) {
        if (list[39 - i] == true) list[41 + i] = true;
    }
    return list;
}

/*Genere la grille*/
function createGrid(niveau, nvx) {
    if (nvx) {
        grilleUser = new Array(81);
        grille = puzzles[aleatoire(0, 13)];
        nbChiffre = niveaux[parseInt(niveau)];
        masque = getMasque(nbChiffre);
        chiffres = chiffreDesordre();
        choixCase = null;
    }
    html = createGrid3x3(grille, chiffres, masque, 0, true);
    document.getElementById("grille").innerHTML = html;
}

/*remise a zero de la grille*/
function initGrille(code, msg) {
    grilleUser = new Array(81);
    if (!msg || confirm("Etes-vous sur de reinitialiser la grille ?")) { createGrid(document.getElementById('level').value, code); }
}

/*Recupere le code du clavier*/
function toucher(e) {
    var key = window.event ? e.keyCode : e.which;
    supp = (key == 32 || key == 46 || key == 96 || key == 8 || key == 48);
    /*Supprime le chiffre (touches : espace, del, 0 ou back)*/
    key -= (key < 96) ? 48 : 96;

    if (key >= 1 && key <= 9 || supp) {
        if (choixCase == null) { alert("Vous devez selectionner une case pour taper un chiffre"); } else {
            choixCase.innerHTML = supp ? "&nbsp;" : key;
            grilleUser[parseInt(choixCase.id.split("_")[1])] = supp ? "" : key;
        }
    }
}

/*verifie la grille*/
function verif(code) {
    for (i = 0; i < 81; i++) {
        if (isChiffre(grilleUser[i]) && masque[i] != true)
            if (code && parseInt(chiffres[parseInt(grille.charAt(i))]) != grilleUser[i]) {
                document.getElementById("c_" + i).style.color = "red";
            } else {
                document.getElementById("c_" + i).style.color = "black";
            }
    }
}

/*Affiche les r�ponses de la grille*/
function reponse(code) {
    for (i = 0; i < 81; i++) {
        if (masque[i] != true)
            if (code && !isChiffre(grilleUser[i])) {
                document.getElementById("c_" + i).innerHTML = chiffres[parseInt(grille.charAt(i))];
            } else {
                document.getElementById("c_" + i).innerHTML = isChiffre(grilleUser[i]) ? grilleUser[i] : "&nbsp;";
            }
    }
    verif(code);
}