---
name: git-traceability-commits
description: >-
  Use this skill to manage granular, atomic Git commits and pushes for every feature,
  module, component, bugfix, documentation update, or asset addition. Ensures 100% project
  traceability, prevents empty commits, follows Conventional Commits in Spanish or English,
  and synchronizes changes continuously with the remote GitHub repository.
---

# Skill: Trazabilidad Continua y Commits Atómicos (Git Traceability Commits)

Esta skill establece y automatiza el protocolo estricto de versionamiento del proyecto **EnfasisFood**. Cada funcionalidad, módulo, componente, recurso o ajuste debe registrarse de forma atómica en Git y sincronizarse con el repositorio remoto (`git@github.com:JhonHTipas21/EnfasisFood.git`).

---

## ⚠️ IDENTIDAD GIT OFICIAL DEL PROYECTO

> Estos datos son **OBLIGATORIOS** y deben estar configurados antes de cualquier commit.

| Campo | Valor |
|---|---|
| **user.name** | `JhonHTipas21` |
| **user.email** | `jhon.tipas00@usc.edu.co` |
| **Repositorio remoto** | `git@github.com:JhonHTipas21/EnfasisFood.git` |

---

## 1. Principios Fundamentales

1. **Commits Atómicos y Granulares**:
   - Cada commit debe representar **una sola unidad lógica de trabajo** (un componente, una ruta, una corrección, una configuración, etc.).
   - No acumular múltiples funcionalidades dispares en un solo commit masivo ("mega-commits").
   - Permite revertir cambios específicos, auditar avances y entender el historial cronológico del proyecto.

2. **PROHIBICIÓN ESTRICTA de Commits Vacíos**:
   - **NUNCA** usar `git commit --allow-empty`.
   - **NUNCA** ejecutar `git commit` si `git diff --cached --quiet` (sin cambios preparados en staging).
   - Siempre verificar con `git status --porcelain` y `git diff --cached` antes de realizar el commit.
   - Si no hay modificaciones reales o el diff está en blanco, el commit debe ser abortado.

3. **Sincronización Inmediata (Push Continuo)**:
   - Tras validar y crear el commit atómico, ejecutar inmediatamente `git push origin <rama>` (típicamente `main`).
   - Mantiene el repositorio remoto en GitHub al día con el progreso en tiempo real.

4. **Staging Selectivo**:
   - Evitar `git add .` indiscriminado si hay cambios de múltiples módulos pendientes.
   - Usar `git add <ruta/especifica>` para preparar únicamente los archivos pertinentes al commit en curso.
   - Archivos de sistema (`.DS_Store`), dependencias (`node_modules`) y credenciales nunca deben incluirse (asegurar `.gitignore`).

---

## 2. Formato de Mensajes de Commit (Conventional Commits)

El mensaje de cada commit debe seguir el estándar:

```text
<tipo>(<ámbito>): <descripción clara y en imperativo/presente>
```

### Tipos Permitidos:

| Tipo | Propósito | Ejemplo en EnfasisFood |
| :--- | :--- | :--- |
| `feat` | Nueva funcionalidad o módulo visible para el usuario | `feat(catalogo): implementar grid interactivo de platillos` |
| `fix` | Corrección de un fallo, bug o comportamiento anómalo | `fix(navbar): corregir solapamiento en vista responsive móvil` |
| `style` | Estilos visuales, CSS, tipografía, animaciones, espaciado | `style(banner): agregar gradiente y efectos hover a botones` |
| `refactor`| Reestructuración de código sin cambiar la funcionalidad externa | `refactor(cart): modularizar lógica de cálculo de totales` |
| `assets` | Incorporación o actualización de imágenes, videos o fuentes | `assets(brand): agregar video banner y logos de EnfasisFood` |
| `docs` | Documentación, README, comentarios de arquitectura | `docs(readme): documentar guía de despliegue y estructura` |
| `chore` | Tareas de configuración, scripts de compilación, tooling | `chore(git): configurar .gitignore y reglas del proyecto` |
| `test` | Creación o actualización de pruebas unitarias/e2e | `test(order): agregar tests de validación de formulario` |
| `perf` | Mejoras de rendimiento, carga diferida o compresión | `perf(media): optimizar compresión de imágenes de productos` |

---

## 3. Protocolo de Ejecución Paso a Paso

Cuando se finalice cualquier funcionalidad, componente, corrección o paso lógico:

### ⚡ Paso 0 (OBLIGATORIO): Verificar y Configurar la Identidad Git

**SIEMPRE** ejecutar esto antes del primer commit de cualquier sesión de trabajo:

```bash
# Verificar identidad actual
git config user.name
git config user.email

# Si NO coinciden con los valores oficiales, corregir INMEDIATAMENTE:
git config user.name "JhonHTipas21"
git config user.email "jhon.tipas00@usc.edu.co"

# Verificar también el config global (para evitar herencia incorrecta)
git config --global user.name "JhonHTipas21"
git config --global user.email "jhon.tipas00@usc.edu.co"

# Confirmar resultado
echo "✅ Nombre: $(git config user.name)"
echo "✅ Email:  $(git config user.email)"
```

> **¿Por qué es crítico?** Git usa `user.name` y `user.email` para atribuir cada commit al autor correcto.
> Si están mal configurados, los commits aparecerán con un contribuidor incorrecto en GitHub,
> como ocurrió con `JhonHTipas` en lugar de `JhonHTipas21`. Esto daña la trazabilidad del proyecto.

### Paso 1: Verificar el Estado de Archivos Modificados
```bash
git status -s
```
Identificar exactamente qué archivos corresponden al cambio actual.

### Paso 2: Preparar Selectivamente los Archivos
```bash
git add <archivo_o_directorio_especifico>
```

### Paso 3: Validar que Hay Cambios en Staging (Evitar Commit Vacío)
```bash
# Validar que staging no esté vacío
if git diff --cached --quiet; then
  echo "Error: No hay cambios en staging. Abortando commit para evitar commit vacío."
  exit 1
fi
```

### Paso 4: Realizar el Commit con Mensaje Convencional
```bash
git commit -m "<tipo>(<ámbito>): <descripción concisa y detallada>"
```

### Paso 5: Subir al Repositorio Remoto
```bash
git push origin $(git rev-parse --abbrev-ref HEAD)
```

---

## 4. Uso del Script Automatizado de Soporte

Para mayor conveniencia y seguridad, la skill incluye un script ejecutable:
[trace_commit.sh](./scripts/trace_commit.sh)

### Sintaxis:
```bash
.agents/skills/git-traceability-commits/scripts/trace_commit.sh "<tipo>" "<ámbito>" "<descripción>" [archivos...]
```

### Ejemplo:
```bash
.agents/skills/git-traceability-commits/scripts/trace_commit.sh feat auth "crear modal de inicio de sesión con validaciones" src/components/AuthModal.jsx
```

El script se encarga de:
1. **Verificar y forzar la identidad git correcta** (`JhonHTipas21` / `jhon.tipas00@usc.edu.co`).
2. Validar que el directorio sea un repositorio git.
3. Hacer staging de los archivos especificados (o verificar los existentes).
4. Prevenir commits vacíos cancelando si no hay cambios.
5. Generar el commit con formato estándar.
6. Ejecutar `git push origin <rama_actual>`.
7. Mostrar el hash del commit y el estado final.
