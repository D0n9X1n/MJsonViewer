#!/bin/bash

if [[ -f ../MJsonViewer.zip ]]; then
    rm ../MJsonViewer.zip
fi

rm -rf .DS_Store
zip -r ../MJsonViewer.zip *
zip -d ../MJsonViewer.zip publish.sh
