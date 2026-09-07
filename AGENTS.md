# Reglas del Proyecto EnfasisFood (AGENTS.md)

## Trazabilidad y Commits en Git

1. **Compromiso de Trazabilidad Completa**:
   - Cada funcionalidad, módulo, componente, recurso (`recursos/`), ajuste de diseño o corrección de error debe tener su propio commit atómico y descriptivo.
   - Sigue rigurosamente la skill [git-traceability-commits](.agents/skills/git-traceability-commits/SKILL.md).
   - Utiliza la convención: `<tipo>(<ámbito>): <descripción>`.

2. **Prohibición Total de Commits Vacíos**:
   - Queda estrictamente prohibido realizar commits con `--allow-empty` o cuando no existan modificaciones sustanciales en staging.
   - Valida siempre `git diff --cached` antes de confirmar cualquier commit.

3. **Sincronización Automática con GitHub**:
   - Tras validar y crear cada commit atómico, sincroniza inmediatamente con el repositorio remoto ejecutando `git push origin <rama>` (rama por defecto: `main`).
   - Repositorio remoto oficial: `git@github.com:JhonHTipas21/EnfasisFood.git`.

4. **Staging Selectivo y Limpieza**:
   - Agrega únicamente los archivos relacionados con el cambio específico que se está versionando.
   - Mantén el archivo `.gitignore` al día para ignorar archivos del sistema operativo (`.DS_Store`), dependencias temporales y artefactos generados.
