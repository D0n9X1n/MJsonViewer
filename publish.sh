#!/bin/bash

if [[ -f ../MJsonViewer.zip ]]; then
    rm ../MJsonViewer.zip
fi

if [[ -f .DS_Store ]]; then
    rm -rf .DS_Store
fi

if [[ -f images/.DS_Store ]]; then
    rm -rf images/.DS_Store
fi

if [[ -f options/.DS_Store ]]; then
    rm -rf options/.DS_Store
fi

if [[ -f icons/.DS_Store ]]; then
    rm -rf icons/.DS_Store
fi

if [[ -f scripts/.DS_Store ]]; then
    rm -rf scripts/.DS_Store
fi

zip -r ../MJsonViewer.zip *
zip -d ../MJsonViewer.zip publish.sh
