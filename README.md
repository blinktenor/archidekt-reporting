This project is meant to suppliment the format of EDH(Commander) with the dollar general restrictions.

To use, navigate to the root folder and npm start.

After the server has started, navigate to localhost:3000 and you will get an option for deck or folder.

To check the prices of a single deck, grab the deck id from archidekt and select the deck option.

For an entire folder, select the folder option and provide the folder on archidekt.

This expects the deck to be public, and will verify the prices of the cards listed, omitting those from the list that have any printing under $1. 

This wasn't designed with best practices in mind, and was developed as a personal project.
The main file is https://github.com/blinktenor/archidekt-reporting/blob/master/src/App.js