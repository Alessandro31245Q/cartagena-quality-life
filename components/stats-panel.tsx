import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3, Users } from "lucide-react"
import type { FeatureData } from "@/app/page"

interface StatsPanelProps {
  data: FeatureData[]
  selectedMetric: string
  selectedGender: string
  selectedInstitutionType: string
  allData: FeatureData[]
}

const metricLabels = {
  "Matrícula": "Matrícula Total",
  "M_hombres": "Matrícula Masculina",
  "M_mujeres": "Matrícula Femenina",
  "M_Prees": "Preescolar",
  "M_Prim": "Primaria",
  "M_Sec": "Secundaria",
  "M_Media": "Media",
  "N_IE": "Total Instituciones",
  "N_IE_O": "Instituciones Oficiales",
  "N_IE_": "Instituciones Privadas",
}

export function StatsPanel({ data, selectedMetric, selectedGender, selectedInstitutionType, allData }: StatsPanelProps) {
  // Helper function to get metric value based on filters
  const getMetricValue = (feature: FeatureData) => {
    const props = feature.properties
    
    if (selectedGender === "masculino" && selectedMetric === "Matrícula") {
      return props.M_hombres || 0
    }
    if (selectedGender === "femenino" && selectedMetric === "Matrícula") {
      return props.M_mujeres || 0
    }
    if (selectedInstitutionType === "oficial" && selectedMetric === "N_IE") {
      return props.N_IE_O || 0
    }
    if (selectedInstitutionType === "privada" && selectedMetric === "N_IE") {
      return props.N_IE_ || 0
    }
    
    return (props[selectedMetric as keyof typeof props] as number) || 0
  }

  // Calculate statistics for current filtered data
  const values = data.map((feature) => getMetricValue(feature))
  const total = values.reduce((sum, val) => sum + val, 0)
  const average = values.length > 0 ? total / values.length : 0
  const min = Math.min(...values)
  const max = Math.max(...values)
  const median = values.length > 0 ? values.sort((a, b) => a - b)[Math.floor(values.length / 2)] : 0

  // Find localities with min and max values
  const minLocality = data.find((f) => getMetricValue(f) === min)
  const maxLocality = data.find((f) => getMetricValue(f) === max)

  // Gender statistics (if relevant)
  const genderStats = data.length > 0 ? {
    totalMasculina: data.reduce((sum, f) => sum + (f.properties.M_hombres || 0), 0),
    totalFemenina: data.reduce((sum, f) => sum + (f.properties.M_mujeres || 0), 0),
    totalGeneral: data.reduce((sum, f) => sum + (f.properties.Matrícula || 0), 0),
  } : { totalMasculina: 0, totalFemenina: 0, totalGeneral: 0 }

  const genderPercentages = genderStats.totalGeneral > 0 ? {
    masculinePercentage: (genderStats.totalMasculina / genderStats.totalGeneral) * 100,
    femininePercentage: (genderStats.totalFemenina / genderStats.totalGeneral) * 100,
  } : { masculinePercentage: 0, femininePercentage: 0 }

  // Institution statistics
  const institutionStats = data.length > 0 ? {
    totalOficiales: data.reduce((sum, f) => sum + (f.properties.N_IE_O || 0), 0),
    totalPrivadas: data.reduce((sum, f) => sum + (f.properties.N_IE_ || 0), 0),
    totalInstituciones: data.reduce((sum, f) => sum + (f.properties.N_IE || 0), 0),
  } : { totalOficiales: 0, totalPrivadas: 0, totalInstituciones: 0 }

  // Calculate year-over-year change if multiple years available
  const years = [...new Set(allData.map((f) => f.properties.Año))].sort()
  let yearOverYearChange = null

  if (years.length > 1) {
    const currentYear = Math.max(...years)
    const previousYear = years[years.length - 2]

    const currentYearTotal = allData
      .filter((f) => f.properties.Año === currentYear)
      .reduce((sum, f) => sum + ((f.properties[selectedMetric as keyof typeof f.properties] as number) || 0), 0)

    const previousYearTotal = allData
      .filter((f) => f.properties.Año === previousYear)
      .reduce((sum, f) => sum + ((f.properties[selectedMetric as keyof typeof f.properties] as number) || 0), 0)

    if (previousYearTotal > 0) {
      yearOverYearChange = ((currentYearTotal - previousYearTotal) / previousYearTotal) * 100
    }
  }

  // Calculate distribution by ranges
  const ranges = [
    { label: "0-50", min: 0, max: 50 },
    { label: "51-100", min: 51, max: 100 },
    { label: "101-200", min: 101, max: 200 },
    { label: "200+", min: 201, max: Number.POSITIVE_INFINITY },
  ]

  const distribution = ranges.map((range) => ({
    ...range,
    count: values.filter((val) => val >= range.min && val <= range.max).length,
  }))

  return (
    <div className="space-y-6">
      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {metricLabels[selectedMetric as keyof typeof metricLabels]}
              {selectedGender !== "total" && ` (${selectedGender})`}
              {selectedInstitutionType !== "total" && ` (${selectedInstitutionType})`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(average).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Por localidad</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Máximo</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{max.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{maxLocality?.properties.NOMBRE}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mínimo</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{min.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{minLocality?.properties.NOMBRE}</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas Descriptivas</CardTitle>
            <CardDescription>
              Análisis estadístico de {metricLabels[selectedMetric as keyof typeof metricLabels].toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Media:</span>
              <span className="font-medium">{Math.round(average).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mediana:</span>
              <span className="font-medium">{median.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rango:</span>
              <span className="font-medium">{(max - min).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Localidades:</span>
              <span className="font-medium">{data.length}</span>
            </div>
            {yearOverYearChange !== null && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cambio anual:</span>
                <Badge variant={yearOverYearChange >= 0 ? "default" : "destructive"}>
                  {yearOverYearChange >= 0 ? "+" : ""}
                  {yearOverYearChange.toFixed(1)}%
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución por Rangos</CardTitle>
            <CardDescription>Número de localidades por rango de valores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {distribution.map((range, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-muted-foreground">{range.label}:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{range.count} localidades</span>
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(range.count / data.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Gender Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Análisis por Género</CardTitle>
            <CardDescription>Distribución de matrícula entre géneros</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Matrícula Masculina:</span>
              <span className="font-medium">{genderStats.totalMasculina.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Matrícula Femenina:</span>
              <span className="font-medium">{genderStats.totalFemenina.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Porcentaje Masculino:</span>
              <Badge variant="outline">{genderPercentages.masculinePercentage.toFixed(1)}%</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Porcentaje Femenino:</span>
              <Badge variant="outline">{genderPercentages.femininePercentage.toFixed(1)}%</Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-l-full"
                style={{ width: `${genderPercentages.masculinePercentage}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Análisis de Instituciones</CardTitle>
            <CardDescription>Distribución entre instituciones oficiales y privadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Instituciones Oficiales:</span>
              <span className="font-medium">{institutionStats.totalOficiales.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Instituciones Privadas:</span>
              <span className="font-medium">{institutionStats.totalPrivadas.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Instituciones:</span>
              <span className="font-medium">{institutionStats.totalInstituciones.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">% Oficiales:</span>
              <Badge variant="default">
                {institutionStats.totalInstituciones > 0 
                  ? ((institutionStats.totalOficiales / institutionStats.totalInstituciones) * 100).toFixed(1)
                  : 0}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top and Bottom Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mejores Localidades</CardTitle>
            <CardDescription>Top 5 con mayores valores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data
                .sort(
                  (a, b) =>
                    (b.properties[selectedMetric as keyof typeof b.properties] as number) -
                    (a.properties[selectedMetric as keyof typeof a.properties] as number),
                )
                .slice(0, 5)
                .map((feature, index) => (
                  <div key={`stat-${feature.properties.NOMBRE}-${index}-${selectedMetric}`} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="font-medium">{feature.properties.NOMBRE}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {(
                        (feature.properties[selectedMetric as keyof typeof feature.properties] as number) || 0
                      ).toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Localidades con Menor Valor</CardTitle>
            <CardDescription>Bottom 5 con menores valores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data
                .sort(
                  (a, b) =>
                    (a.properties[selectedMetric as keyof typeof a.properties] as number) -
                    (b.properties[selectedMetric as keyof typeof b.properties] as number),
                )
                .slice(0, 5)
                .map((feature, index) => (
                  <div key={`stat-${feature.properties.NOMBRE}-${index}-${selectedMetric}`} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="font-medium">{feature.properties.NOMBRE}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {(
                        (feature.properties[selectedMetric as keyof typeof feature.properties] as number) || 0
                      ).toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
