#!/bin/bash

rm -rf .DS_Store
zip -r ../MJsonViewer.zip *
zip -d ../MJsonViewer.zip publish.sh
