const searchBox = document.getElementById("searchByLineNumber"); // text input field for inputting a line number an user wants to search
const searchBtn = document.getElementById("submitSearchByLineNumber"); // button for searching lines by bumber
const resultLineNum = document.getElementById("lineInfoNum"); // paragraph element for showing the line number
const resultLineText = document.getElementById("lineInfoText"); // paragraph element for showing the line route as a text

const url = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql"; // API address

// Function which will be ran when the button "submitSearchByLineNumber" is clicked
function searchByLineNumber() {
    let query = searchBox.value;

    fetch(url,{
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