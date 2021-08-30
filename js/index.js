const searchBox = document.getElementById("searchByLineNumber");
const searchBtn = document.getElementById("submitSearchByLineNumber");
const resultLineNum = document.getElementById("lineInfoNum");
const resultLineText = document.getElementById("lineInfoText");

function searchByLineNumber() {
    let query = searchBox.value;
    console.log(query);

    const url = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";

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