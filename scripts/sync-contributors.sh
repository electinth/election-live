#!/bin/bash

SHEET_ID="1r3YDk8CAB6mtAyEJxUBPLgjW0Baqs6PWUDjcJDG5Juk"
URL="https://docs.google.com/spreadsheets/d/$SHEET_ID/export?exportFormat=csv"
DEST="./src/models/information/_contributors.json"

echo "Syncing from $URL"
curl $URL  \
 | jq  -s --raw-input \ 'split("\n") | .[1:-1] 
    | map(split(","))
    | map({ "name": .[1], "role": .[0], "url": .[2], "github": .[3] })
    | group_by(.role) | map({ (.[0].role): [.[]] | sort_by(.name) }) | add' \
    > $DEST