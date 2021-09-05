const searchBox = document.getElementById("searchByLineNumber"); // text input field for inputting a line number an user wants to search
const searchBtn = document.getElementById("submitSearchByLineNumber"); // button for searching lines by bumber
const resultLineNum = document.getElementById("lineInfoNum"); // paragraph element for showing the line number
const resultLineText = document.getElementById("lineInfoText"); // paragraph element for showing the line route as a text

const urlGQL = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql"; // API address

// Function which will be ran when the button "submitSearchByLineNumber" is clicked
function searchByLineNumber() {
    let query = searchBox.value;

    fetch(urlGQL,{
        method: "POST",
        headers: { "Content-Type": "application/graphql" },
        body: `{
            routes(name: "${query}") {
            gtfsId
            shortName
            longName
            mode
            }
        }`
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success: ", data);
        let lineInfo = data.data.routes[0];
        console.log("Line info:", lineInfo);
        resultLineNum.innerHTML = lineInfo.shortName;
        resultLineText.innerHTML = lineInfo.longName;
    })
    .catch((error) => {
        console.log("error:", error);
    });

}

const searchForStart = document.getElementById("searchForStart");
const searchForEnd = document.getElementById("searchForEnd");

searchForStart.addEventListener("input", searchStartPlace);

const lastStartPlaceSearch = 0;

function searchStartPlace(e) {
    let date = new Date(); // this is for checking when the latest query was made so there's not multiple queries in one second
    let userQuery = e.target.value;
    const urlAddr = "https://api.digitransit.fi/geocoding/v1/search?text=";
    let query = `${urlAddr}${userQuery}&size=3`;

    console.log(searchForStart.value + " at " + date.getTime());
    console.log(query);

    

    //fetch(query)
}