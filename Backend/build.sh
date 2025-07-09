#!/bin/bash

echo "🐳 OCR Server Docker Build Options"
echo "=================================="
echo ""
echo "Choose your build option:"
echo "1. Standard Build      (~600-800MB, reliable)"
echo "2. Multi-stage Build   (~400-500MB, optimized)"
echo "3. Alpine Build        (~200-300MB, ultra-small)"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "🔨 Building standard image..."
        docker build -t ocr-server .
        ;;
    2)
        echo "🔨 Building multi-stage image..."
        docker build -f Dockerfile.multistage -t ocr-server .
        ;;
    3)
        echo "🔨 Building Alpine image..."
        docker build -f Dockerfile.alpine -t ocr-server .
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "To run the container:"
    echo "docker run -p 8080:8080 ocr-server"
    echo ""
    echo "Or use docker-compose:"
    echo "docker-compose up"
else
    echo "❌ Build failed!"
fi
