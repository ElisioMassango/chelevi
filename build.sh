#!/bin/bash

# Build script for Vercel deployment
echo "Starting build process..."

# Install dependencies
npm install

# Build the project
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build completed successfully!"
    exit 0
else
    echo "Build failed!"
    exit 1
fi
