# Guía de Convenciones de Commits y Trazabilidad - EnfasisFood

Esta guía define las reglas de nomenclatura y granularidad para mantener un historial limpio, trazable y profesional en el repositorio de **EnfasisFood**.

---

## 1. Estructura del Mensaje

```text
<tipo>(<ámbito>): <descripción corta y clara>

[opcional: cuerpo del commit explicando el porqué o detalles técnicos]
```

### Reglas de Formato:
- **Imperativo / Presente**: "agregar", "corregir", "actualizar" (o en inglés: "add", "fix", "update").
- **Minúsculas**: El tipo y ámbito deben estar en minúsculas.
- **Sin punto final**: La primera línea no lleva punto al final.
- **Conciso y específico**: Evitar mensajes genéricos como "cambios", "fix bug", "update files".

---

## 2. Tipos de Commits y Ejemplos de Ámbitos

### `feat` (Nuevas Características)
- `feat(auth): implementar formulario de inicio de sesión con validaciones`
- `feat(menu): agregar visualizador interactivo de platos con filtrado por categoría`
- `feat(cart): añadir funcionalidad de agregar/eliminar platillos al pedido`
- `feat(checkout): integrar flujo de confirmación y selección de método de entrega`

### `fix` (Corrección de Errores)
- `fix(navbar): solucionar desbordamiento en pantallas móviles menores a 480px`
- `fix(cart): corregir cálculo de subtotal con descuentos aplicados`
- `fix(image): reparar ruta rota de imagen en tarjeta de menú principal`

### `style` (Diseño, Maquetación y CSS)
- `style(hero): modernizar tipografía y añadir animación de entrada`
- `style(cards): implementar sombras suaves y bordes redondeados consistentes`
- `style(theme): definir variables de colores primarios y oscuros en index.css`

### `assets` (Recursos Estáticos y Multimedia)
- `assets(brand): incorporar logo en alta definición y favicon`
- `assets(banner): agregar video promocional optimizado y banner principal`
- `assets(menu): añadir imágenes de productos del catálogo`

### `refactor` (Refactorización de Código)
- `refactor(api): centralizar llamadas a endpoints en servicio modular`
- `refactor(styles): extraer estilos repetidos a clases de utilidad CSS`

### `chore` (Mantenimiento, Configuración y Git)
- `chore(git): configurar .gitignore para ignorar archivos del sistema y node_modules`
- `chore(deps): inicializar package.json con scripts de desarrollo`
- `chore(agents): registrar skill de trazabilidad y reglas de desarrollo`

### `docs` (Documentación)
- `docs(readme): añadir descripción del proyecto, tecnologías e instrucciones de ejecución`
- `docs(architecture): documentar flujo de datos y estructura de carpetas`

---

## 3. Matriz de Decisión para Dividir Commits

Pregúntate antes de hacer commit:
1. **¿Estoy combinando dos cosas diferentes?** (Ej: cambié estilos del header Y agregué una función en el carrito). Si es sí: **Sepáralos en dos commits**.
2. **¿Hay archivos en staging que no modifiqué intencionalmente?** (Ej: `.DS_Store`, temporales). Si es sí: **Quítalos de staging y agrégalos a `.gitignore`**.
3. **¿El diff está vacío?** Si es sí: **ABORTAR**. Nunca generar un commit vacío.
