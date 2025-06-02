# Visualización de Calidad de Vida en Cartagena

Una aplicación web interactiva para explorar y analizar datos de calidad de vida en las localidades de Cartagena, Colombia.

## 🚀 Características

- **Mapa Interactivo**: Visualización geográfica con polígonos coloreados según métricas seleccionadas
- **Filtros Dinámicos**: Selección por año, tema y búsqueda de localidades
- **Gráficos Analíticos**: Series temporales, comparaciones categóricas y estadísticas descriptivas
- **Diseño Responsivo**: Optimizado para dispositivos móviles y escritorio
- **Documentación Completa**: Información detallada sobre datos y metodología

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Mapas**: React Leaflet
- **Gráficos**: Recharts
- **UI**: shadcn/ui, Tailwind CSS
- **Datos**: GeoJSON con información geoespacial

## 📊 Estructura de Datos

El dataset incluye información sobre:
- **NOMBRE**: Nombre de la localidad
- **LOC**: Código de localidad
- **Año**: Año de los datos (2020-2021)
- **Tema**: Categoría de análisis (Educación)
- **M_Prees**: Matrícula en preescolar
- **M_Prim**: Matrícula en primaria
- **M_Sec**: Matrícula en secundaria
- **M_Media**: Matrícula en educación media

## 🎯 Funcionalidades

### Mapa Interactivo
- Visualización de polígonos geográficos por localidad
- Coloreado dinámico basado en la métrica seleccionada
- Tooltips informativos al pasar el cursor
- Zoom y navegación fluida

### Panel de Filtros
- Selector de año (2020-2021)
- Selector de tema (Educación)
- Selector de métrica educativa
- Buscador de localidades por nombre

### Análisis de Datos
- **Gráficos Temporales**: Evolución de métricas por año
- **Comparaciones**: Top 10 localidades por métrica
- **Distribución**: Análisis por niveles educativos
- **Estadísticas**: Media, mediana, máximo, mínimo

### Documentación
- Origen y estructura de los datos
- Tipos de análisis disponibles
- Reflexión crítica sobre el uso de visualizaciones
- Información técnica de implementación

## 🚀 Instalación y Uso

1. **Clonar el repositorio**
   \`\`\`bash
   git clone [repository-url]
   cd cartagena-quality-life
   \`\`\`

2. **Instalar dependencias**
   \`\`\`bash
   npm install
   \`\`\`

3. **Agregar datos GeoJSON**
   - Colocar el archivo \`educacion_cartagena.geojson\` en la carpeta \`public/\`
   - Actualizar la ruta en \`app/api/geojson-data/route.ts\`

4. **Ejecutar en desarrollo**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Abrir en el navegador**
   - Navegar a \`http://localhost:3000\`

## 📁 Estructura del Proyecto

\`\`\`
├── app/
│   ├── page.tsx                 # Página principal
│   └── api/
│       └── geojson-data/
│           └── route.ts         # API para cargar datos GeoJSON
├── components/
│   ├── filter-panel.tsx        # Panel de filtros
│   ├── map-component.tsx       # Componente del mapa
│   ├── charts-panel.tsx        # Panel de gráficos
│   ├── stats-panel.tsx         # Panel de estadísticas
│   └── documentation-panel.tsx # Panel de documentación
├── public/
│   └── educacion_cartagena.geojson # Datos geoespaciales
└── README.md
\`\`\`

## 🎨 Prompt Empleado

**Prompt Principal:**
"Desarrollar una aplicación web interactiva que permita visualizar y explorar datos de calidad de vida en Cartagena usando Next.js, react-leaflet para mapas interactivos, y Recharts para gráficos dinámicos. La aplicación debe incluir filtros por año, tema y localidad, mostrar estadísticas descriptivas, y proporcionar documentación completa sobre el origen y estructura de los datos."

**Características Específicas Solicitadas:**
- Mapa interactivo con polígonos coloreados según variables
- Filtros dinámicos (año, tema, localidad)
- Gráficos de series temporales y comparaciones categóricas
- Panel de estadísticas con métricas descriptivas
- Documentación sobre origen de datos y reflexión crítica
- Diseño responsivo con controles siempre visibles
- Tooltips informativos en el mapa

## 📈 Fuente de Datos

Los datos provienen del portal de datos abiertos de **Cartagena Cómo Vamos**:
- **URL**: https://ccv-cgenacomovamos.opendata.arcgis.com
- **Formato**: GeoJSON con geometrías de polígonos
- **Cobertura**: Localidades de Cartagena
- **Período**: 2020-2021
- **Tema**: Educación (matrícula por niveles)

## 🔍 Análisis Disponibles

### 1. Análisis Espacial
- Identificación de patrones geográficos
- Detección de zonas con mayor/menor cobertura educativa
- Visualización de desigualdades territoriales

### 2. Análisis Temporal
- Evolución de la matrícula por año
- Detección de tendencias y cambios
- Comparación interanual

### 3. Análisis Comparativo
- Ranking de localidades por métrica
- Identificación de brechas educativas
- Comparación entre niveles educativos

### 4. Análisis Estadístico
- Estadísticas descriptivas (media, mediana, rango)
- Distribución por rangos de valores
- Identificación de valores atípicos

## 💡 Reflexión Crítica

### Fortalezas
- **Accesibilidad**: Democratiza el acceso a datos complejos
- **Transparencia**: Promueve la rendición de cuentas
- **Evidencia**: Facilita la toma de decisiones informada
- **Patrones**: Permite identificar desigualdades geográficas

### Limitaciones
- **Calidad de datos**: Dependencia de la precisión de la fuente
- **Contexto**: Requiere interpretación experta
- **Actualización**: Necesidad de datos actualizados regularmente
- **Sesgos**: La selección de métricas puede influir conclusiones

### Impacto en Políticas Públicas
Esta herramienta permite a tomadores de decisiones:
- Identificar áreas prioritarias para inversión educativa
- Evaluar el impacto de políticas implementadas
- Planificar intervenciones basadas en evidencia geográfica
- Monitorear el progreso hacia objetivos de desarrollo

## 🚀 Despliegue

La aplicación está optimizada para despliegue en **Vercel**:

1. **Conectar repositorio a Vercel**
2. **Configurar variables de entorno** (si es necesario)
3. **Desplegar automáticamente** desde la rama principal

## 📝 Licencia

Este proyecto está desarrollado con fines educativos y de transparencia pública. Los datos pertenecen a Cartagena Cómo Vamos.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crear una rama para la nueva funcionalidad
3. Realizar commit de los cambios
4. Enviar pull request

## 📞 Contacto

Para preguntas sobre los datos o la metodología, contactar a Cartagena Cómo Vamos a través de su portal oficial.
