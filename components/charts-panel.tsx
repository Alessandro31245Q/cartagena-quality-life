"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { FeatureData } from "@/app/page"

interface ChartsPanelProps {
  data: FeatureData[]
  selectedMetric: string
  selectedGender: string
  selectedInstitutionType: string
  selectedTheme: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#A4DE6C", "#D0ED57", "#FFC658"]

const metricLabels: { [key: string]: string } = {
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

export function ChartsPanel({ data, selectedMetric, selectedGender, selectedInstitutionType, selectedTheme }: ChartsPanelProps) {
  const currentMetricLabel = metricLabels[selectedMetric] || selectedMetric

  // Validate data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="h-[350px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-muted-foreground text-lg mb-2">📊</div>
              <p className="text-muted-foreground">No hay datos disponibles para mostrar gráficos</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Helper function to get the right metric value based on filters
  const getMetricValue = (feature: FeatureData) => {
    if (!feature || !feature.properties) return 0
    
    const props = feature.properties
    
    // Apply gender filter if relevant
    if (selectedGender === "masculino" && selectedMetric === "Matrícula") {
      return props.M_hombres || 0
    }
    if (selectedGender === "femenino" && selectedMetric === "Matrícula") {
      return props.M_mujeres || 0
    }
    
    // Apply institution type filter if relevant
    if (selectedInstitutionType === "oficial" && selectedMetric === "N_IE") {
      return props.N_IE_O || 0
    }
    if (selectedInstitutionType === "privada" && selectedMetric === "N_IE") {
      return props.N_IE_ || 0
    }
    
    return (props[selectedMetric as keyof typeof props] as number) || 0
  }

  // Filter valid data
  const validData = data.filter(feature => 
    feature && 
    feature.properties && 
    typeof feature.properties === 'object' &&
    feature.properties.NOMBRE
  )

  if (validData.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="h-[350px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-muted-foreground text-lg mb-2">⚠️</div>
              <p className="text-muted-foreground">No se encontraron datos válidos para los filtros seleccionados</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Gender comparison chart data
  const genderComparisonData = validData.map((feature) => ({
    name: feature.properties.NOMBRE || 'Sin nombre',
    Masculina: feature.properties.M_hombres || 0,
    Femenina: feature.properties.M_mujeres || 0,
    Total: feature.properties.Matrícula || 0,
  })).slice(0, 10)

  // Institution type comparison
  const institutionComparisonData = validData.map((feature) => ({
    name: feature.properties.NOMBRE,
    Oficiales: feature.properties.N_IE_O || 0,
    Privadas: feature.properties.N_IE_ || 0,
    Total: feature.properties.N_IE || 0,
  })).slice(0, 10)

  // Zone distribution data
  const zoneData: { [zone: string]: number } = {}
  validData.forEach((feature) => {
    const zone = feature.properties.LOC
    const value = getMetricValue(feature)
    zoneData[zone] = (zoneData[zone] || 0) + value
  })

  const zoneChartData = Object.entries(zoneData).map(([zone, value]) => ({
    name: zone,
    value: value,
  }))

  // Pie chart data for top localities
  const pieDataRaw = validData
    .map((feature) => ({
      name: feature.properties.NOMBRE,
      value: (feature.properties[selectedMetric as keyof typeof feature.properties] as number) || 0,
    }))
    .sort((a, b) => b.value - a.value)

  const topNForPie = 5
  const pieDataProcessed = pieDataRaw.slice(0, topNForPie)
  const otherValue = pieDataRaw.slice(topNForPie).reduce((acc, curr) => acc + curr.value, 0)

  if (otherValue > 0) {
    pieDataProcessed.push({ name: "Otros", value: otherValue })
  }
  
  const pieChartData = pieDataProcessed.filter(d => d.value > 0)

  // Top localities data
  const topLocalitiesData = validData
    .map((feature) => ({
      name: feature.properties.NOMBRE,
      value: (feature.properties[selectedMetric as keyof typeof feature.properties] as number) || 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .filter(item => item.value > 0)

  // Evolution data by year
  const yearlyDataAggregated: { [year: string]: { sum: number; count: number } } = {}
  validData.forEach((feature) => {
    const year = feature.properties.Año.toString()
    const value = (feature.properties[selectedMetric as keyof typeof feature.properties] as number) || 0
    if (!yearlyDataAggregated[year]) {
      yearlyDataAggregated[year] = { sum: 0, count: 0 }
    }
    yearlyDataAggregated[year].sum += value
    yearlyDataAggregated[year].count += 1
  })

  const evolutionData = Object.keys(yearlyDataAggregated)
    .map((year) => ({
      year: year,
      value: yearlyDataAggregated[year].count > 0 ? yearlyDataAggregated[year].sum / yearlyDataAggregated[year].count : 0,
    }))
    .sort((a, b) => parseInt(a.year) - parseInt(b.year))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Gender Comparison Chart */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Comparación por Género - Top 10 Localidades</CardTitle>
          <CardDescription>Distribución de matrícula por género en las principales localidades</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={genderComparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} interval={0} fontSize={10} />
              <YAxis />
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
              <Legend />
              <Bar dataKey="Masculina" fill="#3B82F6" name="Matrícula Masculina" />
              <Bar dataKey="Femenina" fill="#EC4899" name="Matrícula Femenina" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Zone Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribución por Zona</CardTitle>
          <CardDescription>Total de {currentMetricLabel.toLowerCase()} por zona geográfica</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={zoneChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {zoneChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Institution Type Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Instituciones: Oficiales vs Privadas</CardTitle>
          <CardDescription>Comparación por tipo de institución educativa</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={institutionComparisonData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} interval={0} fontSize={10} />
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
              <Legend />
              <Bar dataKey="Oficiales" fill="#10B981" name="IE Oficiales" />
              <Bar dataKey="Privadas" fill="#F59E0B" name="IE Privadas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Distribución de {currentMetricLabel}</CardTitle>
          <CardDescription>Comparativa de las principales localidades y el resto.</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {pieChartData.length > 0 ? (
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => value.toLocaleString()} />
                <Legend />
              </PieChart>
            ) : (
              <p className="flex items-center justify-center h-full text-muted-foreground">
                No hay datos suficientes para el gráfico de distribución.
              </p>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Top 5 Localidades por {currentMetricLabel}</CardTitle>
          <CardDescription>Localidades con los valores más altos para la métrica seleccionada.</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            {topLocalitiesData.length > 0 ? (
              <BarChart data={topLocalitiesData} layout="vertical" margin={{ top: 5, right: 30, left: 70, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} interval={0} />
                <Tooltip formatter={(value: number) => value.toLocaleString()} />
                <Legend />
                <Bar dataKey="value" name={currentMetricLabel} fill="#82ca9d" barSize={20} />
              </BarChart>
            ) : (
              <p className="flex items-center justify-center h-full text-muted-foreground">
                No hay datos para mostrar el top de localidades.
              </p>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2"> {/* Esta tarjeta ocupará las dos columnas en pantallas medianas y grandes */}
        <CardHeader>
          <CardTitle>Evolución Temporal de {currentMetricLabel}</CardTitle>
          <CardDescription>
            {evolutionData.length > 1 ? 
             `Promedio de ${currentMetricLabel.toLowerCase()} por localidad a lo largo de los años.` :
             "Se necesitan datos de múltiples años para mostrar la evolución."
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            {evolutionData.length > 1 ? (
              <LineChart data={evolutionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number) => Math.round(value).toLocaleString()} />
                <Legend />
                <Line type="monotone" dataKey="value" name={`Promedio ${currentMetricLabel}`} stroke="#8884d8" activeDot={{ r: 8 }} dot={{ r: 4 }} />
              </LineChart>
            ) : (
              <p className="flex items-center justify-center h-full text-muted-foreground">
                {evolutionData.length === 1 ? "Solo hay datos para un año." : "No hay datos suficientes para la evolución temporal."}
              </p>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
