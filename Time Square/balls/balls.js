//משתנים
var colors0 = ['red', 'blue', 'green', 'yellow'];
var r = 7, c = 7, fast = 0, size_array = 3, level = 0;
var ballCollor;
var i_active = 0, j_active = 3;
var a = 0, b = 0;
var interval;
var mark = 0;

//בדיקת רמות
function Levels(level)
{

    if (level == 1)
    {
        fast = 550, level = 0;
        document.getElementById("music").pause();
        document.getElementById("music1").play();
    }
    if (level == 2)
    {
        fast = 350, level = 1;
        document.getElementById("music").pause();
        document.getElementById("music2").play();
    }
    if (level == 3)
    {
        fast = 200, level = 1;
        document.getElementById("music").pause();
        document.getElementById("music3").play();
    }
    createTable();
}

//יצירת טבלאות
function createTable()
{
    document.getElementById("tableDiv").style.display = "inline-block";
    document.getElementById("tableDiv").style.width = "65%";
    if (interval != undefined)
        clearInterval(interval);
    document.getElementById("tableDiv").innerHTML = "";
    var table = document.createElement('table');
    table.setAttribute('id', "tablegame");
    for (var i = 0; i < r; i++)
    {
        var tr = document.createElement('tr');
        tr.setAttribute('id', "tr-" + i);
        for (var j = 0; j < c; j++)
        {
            var td = document.createElement('td');
            td.setAttribute('id', "td-" + i + j);
            tr.appendChild(td);
        }
        table.appendChild(tr);

    }
    document.getElementById("tableDiv").appendChild(table);
    document.getElementById("div1").style.display = "none";
    document.getElementById("div1").style.width = "0";
    document.querySelector("label").innerHTML = mark;

    //שינוי צבעים לטבלה לפי מהירות 
    for (var i = 0; i < r; i++)
    {
        for (var j = 0; j < c; j++)
        {
            if (fast == 350)
            {
                document.getElementById("td-" + i + j).setAttribute("style", 'box-shadow: inset 1px -1px 20px 6px #2d8ed4');
            }
            if (fast == 200)
            {
                document.getElementById("td-" + i + j).setAttribute("style", 'box-shadow: inset 1px -1px 20px 6px #ff00dc');
            }
        }
    }

    start();
}

//משחק חדש
function newGame()
{
    document.getElementById("music").pause();
    document.getElementById("music1").pause();
    document.getElementById("music2").pause();
    document.getElementById("music3").pause();
    window.open("balls.html");
 
}

//משחק בחיצים
function start()
{

    document.body.addEventListener("keydown", function (event)
    {
        y = parseInt(ball.getAttribute("i")) - 1;
        z = parseInt(ball.getAttribute("j"));
        switch (event.keyCode)
        {

            //left
            case 37:
                var x = document.getElementById("ball");
                if (parseInt(x.getAttribute("j")) > 0)
                {

                    if (document.getElementById("td-" + y + "" + (parseInt(x.getAttribute("j")) - 1)).children.length == 0)
                    {
                        x.setAttribute("j", (--z));
                        document.getElementById("td-" + y + "" + x.getAttribute("j")).appendChild(x);
                    }
                    return;
                }
                break;

            //right
            case 39:
                var x = document.getElementById("ball");
                if (parseInt(x.getAttribute("j")) < 6)
                {

                    if (document.getElementById("td-" + y + "" + (parseInt(x.getAttribute("j")) + 1)).children.length == 0)
                    {
                        x.setAttribute("j", (++z));
                        document.getElementById("td-" + y + "" + x.getAttribute("j")).appendChild(x);
                    }
                    return;
                }
                break;

//          //down
//          case 40: 
//              var x = document.getElementById("ball");
//              if ((document.getElementById("td-" + parseInt(x.getAttribute("i"))+ "" + z)).children.length == 0) 
//              {
//                  x.setAttribute("i", (++y));
//                  document.getElementById("td-" + x.getAttribute("i") + "" + z).appendChild(x);
//              }
//              return;
//              break;      
        }        
    });
    creatBalls();         
}

//יצירת כדורים
function creatBalls()
{
    var ball = document.createElement("div");
    ballCollor = Math.round(Math.random() * size_array);
    ball.setAttribute("class", colors0[ballCollor]);
    ball.setAttribute('id', "ball");
    ball.setAttribute('i', 0);
    ball.setAttribute('j', 3);
    interval = setInterval(function () {
        next_td = document.getElementById("td-" + ball.getAttribute("i") + "" + ball.getAttribute("j"))
        if (ball.getAttribute("i") == 0 && next_td.children.length)
            stop();
        if (ball.getAttribute("i") > 6 || next_td.children.length) {
            clearInterval(interval);
            ball.setAttribute('id', (parseInt(ball.getAttribute("i")) - 1) + '' + ball.getAttribute("j"));
            creatBalls();
            a = (parseInt(ball.getAttribute("i")) - 1);
            b = parseInt(ball.getAttribute("j"));
            square(a, b);
            return;
        }
      
        next_td.appendChild(ball);
        ball.setAttribute("i", parseInt(ball.getAttribute("i")) + 1);
    }, fast);
}

//בדיקת ריבוע כדורים זהים ןמחיקתם
function square(i, j)
{
    //בודק אם קיים תא משמאלו של התא שבו הכדור וכן אם קיימת שורה מתחתיו
    if (tablegame.children[i + 1] != undefined && tablegame.children[i] != undefined && tablegame.children[i].children[j - 1] != undefined)
        //בודק אם יש כדור בתאים שמשמאלו
        if (tablegame.children[i + 1].children[j].children[0] != undefined && tablegame.children[i].children[j - 1].children[0] != undefined)
            //בודק צבעים שווים
            if (tablegame.children[i].children[j].children[0].classList[0] == tablegame.children[i + 1].children[j].children[0].classList[0]
                && tablegame.children[i].children[j].children[0].classList[0] == tablegame.children[i + 1].children[j - 1].children[0].classList[0]
                && tablegame.children[i].children[j].children[0].classList[0] == tablegame.children[i].children[j - 1].children[0].classList[0])
            {
                tablegame.children[i].children[j].children[0].classList.add("spaceOutUp");
                tablegame.children[i + 1].children[j].children[0].classList.add("spaceOutUp");
                tablegame.children[i + 1].children[j - 1].children[0].classList.add("spaceOutUp");
                tablegame.children[i].children[j - 1].children[0].classList.add("spaceOutUp");

                addMark();
                setTimeout(function ()
                {
                    //מסיר את הכדורים
                    tablegame.children[i].children[j].children[0].remove();
                    tablegame.children[i + 1].children[j].children[0].remove();
                    tablegame.children[i + 1].children[j - 1].children[0].remove();
                    tablegame.children[i].children[j - 1].children[0].remove();

                    for (var a = i - 1; a >= 0; a--)
                    {
                        if (tablegame.children[a].children[j].children[0] != undefined)
                        {
                            var b = document.getElementById(a + "" + j);
                            if (tablegame.children[a + 2] != undefined)
                                tablegame.children[a + 2].children[j].appendChild(b);

                        }
                        if (tablegame.children[a].children[j - 1].children[0] != undefined)
                        {
                            var b = document.getElementById(a + "" + (j - 1));
                            if (tablegame.children[a + 2] != undefined && tablegame.children[a + 2].children[j - 1] != undefined )
                                 tablegame.children[a + 2].children[j - 1].appendChild(b);
                        }
                    }
                    square(i, j - 1);
                }, 500);   
            }
    //בודק אם קיים תא מימינו של התא שבו הכדור וכן אם קיימת שורה מתחתיו
    if (tablegame.children[i + 1] != undefined && tablegame.children[i] != undefined && tablegame.children[i].children[j + 1] != undefined)
        //בודק אם יש כדור בתאים שמימינו
        if (tablegame.children[i + 1].children[j].children[0] != undefined && tablegame.children[i] != undefined  && tablegame.children[i].children[j + 1].children[0] != undefined)
            //בודק צבעים שווים
            if (tablegame.children[i].children[j].children[0].classList[0] == tablegame.children[i + 1].children[j].children[0].classList[0]
                && tablegame.children[i].children[j].children[0].classList[0] == tablegame.children[i + 1].children[j + 1].children[0].classList[0]
                && tablegame.children[i].children[j].children[0].classList[0] == tablegame.children[i].children[j + 1].children[0].classList[0])
            {
                tablegame.children[i].children[j].children[0].classList.add("spaceOutUp");
                tablegame.children[i + 1].children[j].children[0].classList.add("spaceOutUp");
                tablegame.children[i + 1].children[j + 1].children[0].classList.add("spaceOutUp");
                tablegame.children[i].children[j + 1].children[0].classList.add("spaceOutUp");

                addMark();
                setTimeout(function ()
                {
                    //מסיר את הכדורים
                    tablegame.children[i].children[j].children[0].remove();
                    tablegame.children[i + 1].children[j].children[0].remove();
                    tablegame.children[i + 1].children[j + 1].children[0].remove();
                    tablegame.children[i].children[j + 1].children[0].remove();

                    for (var a = i - 1; a >= 0; a--)
                    {
                        if (tablegame.children[a].children[j].children[0] != undefined)
                        {
                            var b = document.getElementById(a + "" + j);
                            if (tablegame.children[a + 2] != undefined)
                            tablegame.children[a + 2].children[j].appendChild(b);
                        }
                        if (tablegame.children[a].children[j + 1].children[0] != undefined)
                        {
                            var b = document.getElementById(a + "" + (j + 1));
                            if (tablegame.children[a + 2] != undefined && tablegame.children[a + 2].children[j] != undefined )
                            tablegame.children[a + 2].children[j] .appendChild(b);
                        }
                    }
                square(i, j + 1);
                }, 500);   
            }
}

//הוספת ניקוד
function addMark()
{
    var label = document.querySelector("label");
    mark += 100;
    label.innerHTML = mark;
    label.classList.add("AddPoints");
    setTimeout(function stopAnimation()
    {
        var label = document.querySelector("label");
        label.classList.remove("AddPoints");
    }, 5000);
    if (mark == 2000)
    {
        stop();
    }
}

////עצירת המשחק
function stop()
{
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
}