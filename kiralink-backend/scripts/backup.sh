#!/bin/bash
set -e

# Database connection details
DB_USER="${POSTGRES_USER:-kiralink}"
DB_NAME="${POSTGRES_DB:-kiralinkdb}"
DB_HOST="${POSTGRES_HOST:-db}"
# POSTGRES_PASSWORD should be set as an environment variable

# Backup directory
BACKUP_DIR="/backups"
mkdir -p "$BACKUP_DIR"

# Filename for the backup
DATE=$(date +%Y-%m-%d_%H-%M-%S)
FILENAME="$BACKUP_DIR/${DB_NAME}_${DATE}.sql.gz"

# Perform the backup using pg_dump
echo "Starting database backup..."
PGPASSWORD="$POSTGRES_PASSWORD" pg_dump -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -F c -Z 9 > "$FILENAME"

echo "Database backup complete: $FILENAME"

# Optional: Add commands here to upload to S3 or another storage service
# e.g., aws s3 cp "$FILENAME" s3://your-backup-bucket/ 