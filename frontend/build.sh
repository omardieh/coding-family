BACKEND_PUBLIC_DIR="../backend/public"
FRONTEND_BUILD_DIR="./dist"

if [ -d "$BACKEND_PUBLIC_DIR" ]; then
  echo "Removing existing $BACKEND_PUBLIC_DIR directory..."
  rm -rf "$BACKEND_PUBLIC_DIR"
fi

echo "Copying build from $FRONTEND_BUILD_DIR to $BACKEND_PUBLIC_DIR..."
cp -r "$FRONTEND_BUILD_DIR" "$BACKEND_PUBLIC_DIR"
rm -rf "$FRONTEND_BUILD_DIR"
echo "Build copied successfully!"