#!/bin/bash

#remove old directories and the contents within
rm -r labs
rm -r storage
rm -r batch_user_files

#create new empty directories
mkdir labs
mkdir storage
mkdir batch_user_files

#clear mongodb database
mongo < renew.input
