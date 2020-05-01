# Breakdown
Trim down the minor details to produce quick summaries of scholarly articles with Breakdown.

This web application uses React.js for frontend and Flask in Python 3 for the summarization api as well as database operations.

## How To Use Instructions

### Home
The user will first be shown the home page where they can upload a pdf if they are already logged in.

### Login
1. Once you are the on the website, the first thing the user needs to do is login.
2. The login process is pretty simple as the user will need to login using their fb account
3. Although there are a few different pages, since we have cookies you will logged in throughout your session
4. Even if the user logs out and logs back in, their uploaded pdfs will remain in their account

### Upload
1. To being uploading pdfs, the user needs to click on the 'Upload' tab
2. The user needs to find a scholarly article with a URL that ends in '.pdf', or else the program will not function
3. Then the user needs to type in the title of the article or title name of their choosing
4. Once the user clicks submit, it will take a few seconds for it to upload. If it uploads it will show on your profile page, if not the file that was attempted to be uploaded was faulty or inserted incorrectly

### Profile
1. When the user goes to the Profile page, they will see all of their uploaded pdfs
2. They will be able to see the abract on each of the pdf's display cards and if they want to read more they can simply click on the display card. This will send will then go to the article URL
3. Only 10 pdf display cards will show per page and so the user can choose to go back and forth between pages
4. The latest pdfs will be displayed first


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
