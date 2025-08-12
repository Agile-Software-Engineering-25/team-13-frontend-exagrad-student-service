#!/usr/bin/env bash

echo "Running prepare script!"

# Initialize shared-components
git submodule update --init --recursive
cd shared-components
npm install
npm run build
cd ..
echo "Shared components initialized and built."

echo "Everything is set up!"
