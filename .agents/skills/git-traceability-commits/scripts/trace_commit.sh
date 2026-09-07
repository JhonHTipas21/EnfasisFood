#!/usr/bin/env bash
# ==============================================================================
# Script: trace_commit.sh
# Propósito: Realizar commits atómicos y trazables con push automático,
#            garantizando que nunca se realicen commits vacíos.
# Uso: ./trace_commit.sh "<tipo>" "<ámbito>" "<descripción>" [archivos...]
# ==============================================================================

set -e

TYPE="$1"
SCOPE="$2"
DESC="$3"
shift 3 || true
FILES=("$@")

if [ -z "$TYPE" ] || [ -z "$SCOPE" ] || [ -z "$DESC" ]; then
  echo "❌ Error: Argumentos insuficientes."
  echo "Uso: $0 <tipo> <ámbito> <descripción> [archivos...]"
  echo "Ejemplo: $0 feat auth 'implementar validación de login' src/auth.js"
  exit 1
fi

# 1. Verificar si estamos en un repositorio Git
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "❌ Error: El directorio actual no es un repositorio Git válido."
  exit 1
fi

# 2. Agregar archivos específicos si fueron proporcionados
if [ ${#FILES[@]} -gt 0 ]; then
  echo "📦 Preparando archivos para staging: ${FILES[*]}"
  git add "${FILES[@]}"
fi

# 3. Verificación ESTRICTA contra commits vacíos
if git diff --cached --quiet; then
  echo "⚠️ ALERTA: No hay cambios preparados en staging (diff vacío)."
  echo "⛔ Abortando operación: Está prohibido generar commits vacíos."
  exit 1
fi

# 4. Formatear mensaje y realizar commit
COMMIT_MSG="${TYPE}(${SCOPE}): ${DESC}"
echo "📝 Creando commit atómico: '$COMMIT_MSG'"
git commit -m "$COMMIT_MSG"

# 5. Obtener rama actual y sincronizar con remoto
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ -z "$CURRENT_BRANCH" ] || [ "$CURRENT_BRANCH" = "HEAD" ]; then
  CURRENT_BRANCH="main"
fi

echo "🚀 Subiendo cambios a origin/${CURRENT_BRANCH}..."
git push -u origin "$CURRENT_BRANCH"

COMMIT_HASH=$(git rev-parse --short HEAD)
echo "✅ Éxito: Commit [$COMMIT_HASH] subido correctamente a origin/${CURRENT_BRANCH}."
