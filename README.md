# Breakdown
Trim down the minor details to produce quick summaries of scholarly articles with Breakdown.


# Breakdown Stack
This web application uses React.js for frontend and Flask in Python 3 for the summarization api as well as database operations.

## Frontend: React.js
TODO: ADD pictures of the frontend and different pages, discuss a flow of how the user navigates through the application. Focus on UX stuff from how to log in to everything else.


## Backend: Flask API
Currently, the Flask API is locally hosted in order to support easy testing and debugging. The API features three routes.

### API: Get Summaries
Example request:
`https://localhost/get_summaries?user={USER_ID}&start={START}&end={END}`
Returns the summaries stored in the database for a specific {USER_ID} from the indices `start` to `end` in JSON format (see [Database](###Database) section for formatting information). For example, if `start` is 0 and `end` is 10, this returns the latest 10 summaries from the database for that user. If `start` is 25 and `end` is 30, the api fetches the 25th through the 30th latest summaries generated.

This allows the frontend to display summaries on pages of 10 that are scrollable.

### API: Summarize
Example request:
`https://localhost/summarize?user={USER_ID}&title={TITLE}&url={PDF_URL}`
Returns a status object in JSON format indicating whether the summary was generated successfully. 

This part of the api creates an instance of PDFSummarizer and runs the `naive_summarize` method to produce a summary of the provided pdf after checking the safety of the url. The API then inserts the result of the summary into the database in the list of summaries associated with the {USER_ID}. The frontend must also take as input from the user the title of the article, and pass the title to the API as {TITLE}

For more information, see the [PDFSummarizer](###PDFSummarizer) section.


### API: Remove Summary
Example request format: 
`https://localhost/get_summaries?user={USER_ID}&summary_id={SUMMARY_ID}`
Remove the summary with {SUMMARY_ID} from the {USER_ID}'s summaries from the database.


### Database
The database is hosted with Atlas cloud through MongoDB and is connected to the flask application through the PyMongo client in the `pymongo` package in Python. This allows simple connectivity to the database, including insert, delete, collection creation, and more. It allows for all of the backend control of the database, and isolates the database from the backend endpoint. 

Here is the JSON format for the database:
```json
[
    {
        "id": "id number",
        "summaries": []
    },
    {
        "id": "id number",
        "summaries": []
    },
    {
        "id": "id number",
        "summaries": []
    }, ...
]

```

Each `summaries: []` is a list of JSON objects of the following format, each of which representing a single summary:
```json
{
    "summary_id": "",
    "date":"",
    "genre":"",
    "title":"",
    "content":"",
    "url":"",
}
```

### PDFSummarizer
TODO Jacob document this