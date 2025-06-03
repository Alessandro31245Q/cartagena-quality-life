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
- **Año**: Año de los datos (2020-2023)
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
- Selector de año (2020-2023)
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


## 📁 Estructura del Proyecto

```bash
├── app/
│   ├── page.tsx
│   └── api/
│       └── geojson-data/
│           └── route.ts
├── components/
│   ├── filter-panel.tsx
│   ├── map-component.tsx
│   ├── charts-panel.tsx
│   ├── stats-panel.tsx
│   └── documentation-panel.tsx
├── public/
│   └── educacion_cartagena.geojson
└── README.md
```


## 🎨 Prompt Empleado

**Prompt Principal:**
"Desarrollar una aplicación web interactiva completa para visualizar y analizar datos de calidad de vida educativa en Cartagena usando Next.js 14 con App Router, react-leaflet para mapas interactivos geoespaciales, y Recharts para gráficos analíticos dinámicos. La aplicación debe procesar datos GeoJSON con información educativa por localidades, incluir un sistema de filtros multidimensionales (año, tema, zona, localidad, género, tipo de institución), generar estadísticas descriptivas avanzadas, comparaciones temporales y geográficas, y proporcionar documentación técnica completa sobre el origen, estructura y metodología de análisis de los datos."


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
- **Período**: 2020-2023
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

https://cartagena-quality-life-inky.vercel.app/

## 📝 Licencia

Este proyecto está desarrollado con fines educativos y de transparencia pública. Los datos pertenecen a Cartagena Cómo Vamos.
