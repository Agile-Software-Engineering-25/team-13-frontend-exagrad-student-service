#!/usr/bin/env bash

echo "Updating shared components to the newest version..."

# Initialize shared-components
git submodule update
cd shared-components
npm install
npm run build
cd ..
echo "Shared components initialized and built."

echo "Shared components updated successfully!"
