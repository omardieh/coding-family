BACKEND_PUBLIC_DIR="../backend/public"
FRONTEND_BUILD_DIR="./dist"
EXCLUDED_FOLDER="$BACKEND_PUBLIC_DIR/api"
TEMP_BACKUP="../backend/_backup"

# Create backup of excluded folder if it exists
if [ -d "$EXCLUDED_FOLDER" ]; then
    echo "Backing up $EXCLUDED_FOLDER..."
    mkdir -p "$TEMP_BACKUP"
    cp -r "$EXCLUDED_FOLDER"/* "$TEMP_BACKUP/"
fi

# Remove public directory
if [ -d "$BACKEND_PUBLIC_DIR" ]; then
    echo "Removing existing $BACKEND_PUBLIC_DIR directory..."
    rm -rf "$BACKEND_PUBLIC_DIR"
fi

# Recreate public directory
mkdir -p "$BACKEND_PUBLIC_DIR"

# Restore excluded folder from backup
if [ -d "$TEMP_BACKUP" ]; then
    echo "Restoring excluded folder..."
    mkdir -p "$EXCLUDED_FOLDER"
    cp -r "$TEMP_BACKUP"/* "$EXCLUDED_FOLDER/"
    rm -rf "$TEMP_BACKUP"
fi

echo "Copying build from $FRONTEND_BUILD_DIR to $BACKEND_PUBLIC_DIR..."
cp -r "$FRONTEND_BUILD_DIR"/* "$BACKEND_PUBLIC_DIR/"
rm -rf "$FRONTEND_BUILD_DIR"
echo "Build copied successfully!"