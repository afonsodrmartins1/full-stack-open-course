sequenceDiagram
participant browser
participant server

    Note right of browser: User writes a note and clicks submit

    browser->>browser: JavaScript prevents default form submission
    browser->>browser: JS creates note object and updates DOM

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: Note already visible because JS updated the page without reload
