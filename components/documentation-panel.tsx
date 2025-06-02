import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Database, FileText, Lightbulb, AlertTriangle } from "lucide-react"

export function DocumentationPanel() {
  const dataFields = [
    { field: "FID", description: "Identificador único del feature", type: "Number" },
    { field: "NOMBRE", description: "Nombre de la localidad", type: "String" },
    { field: "LOC", description: "Código de zona/localidad", type: "String" },
    { field: "ID", description: "Identificador de la localidad", type: "Number" },
    { field: "Año", description: "Año de los datos", type: "Number" },
    { field: "ID_A", description: "Identificador anual único", type: "Number" },
    { field: "Tema", description: "Tema de análisis (Educación)", type: "String" },
    { field: "Matrícula", description: "Total de estudiantes matriculados", type: "Number" },
    { field: "M_hombres", description: "Estudiantes masculinos matriculados", type: "Number" },
    { field: "M_mujeres", description: "Estudiantes femeninos matriculados", type: "Number" },
    { field: "N_IE", description: "Número total de instituciones educativas", type: "Number" },
    { field: "N_IE_O", description: "Instituciones educativas oficiales", type: "Number" },
    { field: "N_IE_", description: "Instituciones educativas privadas", type: "Number" },
    { field: "M_Prees", description: "Matrícula en nivel preescolar", type: "Number" },
    { field: "M_Prim", description: "Matrícula en nivel primaria", type: "Number" },
    { field: "M_Sec", description: "Matrícula en nivel secundaria", type: "Number" },
    { field: "M_Media", description: "Matrícula en educación media", type: "Number" },
    { field: "Shape__Area", description: "Área geográfica del polígono", type: "Number" },
    { field: "Shape__Length", description: "Perímetro del polígono", type: "Number" },
  ]

  const analysisTypes = [
    {
      title: "Análisis Espacial",
      description: "Visualización de patrones geográficos en el mapa interactivo",
      utility: "Identificar zonas con mayor/menor cobertura educativa por género y tipo de institución",
    },
    {
      title: "Análisis de Género",
      description: "Comparación de matrícula entre estudiantes masculinos y femeninos",
      utility: "Detectar brechas de género en el acceso a la educación",
    },
    {
      title: "Análisis Institucional",
      description: "Comparación entre instituciones oficiales y privadas",
      utility: "Evaluar la distribución del sector público vs privado en educación",
    },
    {
      title: "Análisis por Zonas",
      description: "Distribución de métricas educativas por zonas geográficas",
      utility: "Identificar desigualdades territoriales en el acceso educativo",
    },
    {
      title: "Análisis por Niveles",
      description: "Comparación entre preescolar, primaria, secundaria y media",
      utility: "Evaluar la cobertura educativa por nivel de formación",
    },
    {
      title: "Análisis Estadístico",
      description: "Estadísticas descriptivas y distribuciones",
      utility: "Comprender la variabilidad y características de los datos educativos",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Data Origin */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Origen de los Datos
          </CardTitle>
          <CardDescription>Información sobre la fuente y procedencia de los datos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Los datos utilizados en esta aplicación provienen del portal de datos abiertos de Cartagena Cómo Vamos, una
            iniciativa que monitorea la calidad de vida en la ciudad. El dataset específico contiene información sobre
            matrícula educativa por localidades, incluyendo desagregación por género, nivel educativo y tipo de institución.
          </p>
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <ExternalLink className="h-4 w-4" />
            <a
              href="https://ccv-cgenacomovamos.opendata.arcgis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              Portal de Datos Abiertos - Cartagena Cómo Vamos
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-primary">2021</div>
              <div className="text-sm text-muted-foreground">Año principal</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-primary">GeoJSON</div>
              <div className="text-sm text-muted-foreground">Formato espacial</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-primary">Educación</div>
              <div className="text-sm text-muted-foreground">Tema analizado</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dataset Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Estructura del Dataset
          </CardTitle>
          <CardDescription>Descripción detallada de los campos y atributos disponibles en el GeoJSON</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Campo</th>
                  <th className="text-left p-2 font-medium">Descripción</th>
                  <th className="text-left p-2 font-medium">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {dataFields.map((field, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">
                      <code className="bg-muted px-2 py-1 rounded text-sm">{field.field}</code>
                    </td>
                    <td className="p-2 text-sm">{field.description}</td>
                    <td className="p-2">
                      <Badge variant="outline">{field.type}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Métricas Educativas Disponibles</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
              <div>
                <strong>Por Género:</strong>
                <ul className="list-disc list-inside ml-2">
                  <li>Matrícula total</li>
                  <li>Matrícula masculina</li>
                  <li>Matrícula femenina</li>
                </ul>
              </div>
              <div>
                <strong>Por Nivel:</strong>
                <ul className="list-disc list-inside ml-2">
                  <li>Preescolar</li>
                  <li>Primaria</li>
                  <li>Secundaria</li>
                  <li>Media</li>
                </ul>
              </div>
              <div>
                <strong>Por Tipo de Institución:</strong>
                <ul className="list-disc list-inside ml-2">
                  <li>Total instituciones</li>
                  <li>Instituciones oficiales</li>
                  <li>Instituciones privadas</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Tipos de Análisis Disponibles
          </CardTitle>
          <CardDescription>Diferentes enfoques analíticos y su utilidad práctica en el contexto educativo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisTypes.map((analysis, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <h4 className="font-medium">{analysis.title}</h4>
                <p className="text-sm text-muted-foreground">{analysis.description}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Utilidad
                  </Badge>
                  <span className="text-xs text-muted-foreground">{analysis.utility}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critical Reflection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Reflexión Crítica
          </CardTitle>
          <CardDescription>Cómo estas visualizaciones apoyan la toma de decisiones en políticas educativas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium text-green-700">Fortalezas de la Visualización</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>
                  <strong>Accesibilidad de datos:</strong> Democratiza el acceso a información educativa compleja
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>
                  <strong>Identificación de patrones:</strong> Facilita la detección de desigualdades geográficas y de género
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>
                  <strong>Análisis multidimensional:</strong> Permite cruzar variables de género, nivel educativo y tipo de institución
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>
                  <strong>Evidencia para políticas:</strong> Proporciona base sólida para decisiones de inversión educativa
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>
                  <strong>Transparencia gubernamental:</strong> Promueve la rendición de cuentas en el sector educativo
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-orange-700">Limitaciones y Consideraciones</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>
                  <strong>Calidad de los datos fuente:</strong> Los resultados dependen de la precisión en la recopilación
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>
                  <strong>Contexto socioeconómico:</strong> Las visualizaciones requieren interpretación considerando factores externos
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>
                  <strong>Temporalidad limitada:</strong> Datos principalmente de 2021, limitando análisis de tendencias
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>
                  <strong>Sesgos de agregación:</strong> La agrupación por localidades puede ocultar variaciones internas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>
                  <strong>Factores no capturados:</strong> Calidad educativa, deserción escolar y otros indicadores no incluidos
                </span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Impacto en la Toma de Decisiones Educativas</h4>
            <p className="text-sm text-blue-700 mb-3">
              Esta herramienta permite a formuladores de políticas educativas identificar áreas prioritarias para intervención,
              evaluar brechas de género en el acceso educativo, y analizar la distribución entre instituciones públicas y privadas
              para desarrollar estrategias más inclusivas y equitativas.
            </p>
            <div className="text-sm text-blue-700">
              <strong>Casos de uso específicos:</strong>
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Planificación de nueva infraestructura educativa</li>
                <li>Programas de equidad de género en educación</li>
                <li>Evaluación de políticas de fortalecimiento institucional</li>
                <li>Asignación de recursos según necesidades territoriales</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información Técnica</CardTitle>
          <CardDescription>Detalles sobre la implementación, tecnologías y arquitectura utilizada</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Frontend</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Next.js 14 (App Router)</li>
                <li>• React con TypeScript</li>
                <li>• React Leaflet (Mapas interactivos)</li>
                <li>• Recharts (Visualizaciones)</li>
                <li>• Tailwind CSS + shadcn/ui</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Datos y Arquitectura</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Formato: GeoJSON</li>
                <li>• Proyección: WGS84 (EPSG:4326)</li>
                <li>• API: Next.js Route Handlers</li>
                <li>• Despliegue: Vercel optimizado</li>
                <li>• Responsivo: Mobile-first design</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 border rounded-lg">
            <h4 className="font-medium mb-2 text-sm">Estructura de la Aplicación</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
              <div>
                <strong>Mapa:</strong> Visualización espacial con polígonos coloreados
              </div>
              <div>
                <strong>Gráficos:</strong> Comparaciones y análisis estadísticos
              </div>
              <div>
                <strong>Estadísticas:</strong> Métricas descriptivas y rankings
              </div>
              <div>
                <strong>Filtros:</strong> Selección interactiva de variables
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
