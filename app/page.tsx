"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, BarChart3, TrendingUp, Info } from "lucide-react"
import { FilterPanel } from "@/components/filter-panel"
import { ChartsPanel } from "@/components/charts-panel"
import { DocumentationPanel } from "@/components/documentation-panel"
import { StatsPanel } from "@/components/stats-panel"

// Dynamic import to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-muted rounded-lg">
      <div className="text-center">
        <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Cargando mapa...</p>
      </div>
    </div>
  ),
})

export interface FeatureData {
  id: string
  properties: {
    FID: number
    NOMBRE: string
    LOC: string
    ID: number
    Año: number
    ID_A: number
    Tema: string
    Matrícula: number
    M_hombres: number
    M_mujeres: number
    N_IE: number
    N_IE_O: number
    N_IE_: number
    M_Prees: number
    M_Prim: number
    M_Sec: number
    M_Media: number
    Shape__Area: number
    Shape__Length: number
  }
  geometry: {
    type: string
    coordinates: number[][][]
  }
}

export interface GeoJSONData {
  type: string
  features: FeatureData[]
}

export default function HomePage() {
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null)
  const [filteredData, setFilteredData] = useState<FeatureData[]>([])
  const [selectedYear, setSelectedYear] = useState<number>(2021)
  const [selectedTheme, setSelectedTheme] = useState<string>("Educación")
  const [selectedZone, setSelectedZone] = useState<string>("")
  const [selectedLocality, setSelectedLocality] = useState<string>("")
  const [selectedMetric, setSelectedMetric] = useState<string>("Matrícula")
  const [selectedGender, setSelectedGender] = useState<string>("total")
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<string>("total")
  const [loading, setLoading] = useState(true)

  // Load GeoJSON data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/geojson-data")
        if (!response.ok) {
          const errorData = await response.json()
          console.error("API Error:", errorData)
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        
        // Validate GeoJSON structure
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid data format received')
        }
        
        if (!data.features || !Array.isArray(data.features)) {
          console.error('Invalid GeoJSON structure:', data)
          throw new Error('GeoJSON features array is missing or invalid')
        }
        
        // Log the structure of the first feature to understand the data
        if (data.features.length > 0) {
          console.log('First feature properties:', Object.keys(data.features[0].properties || {}))
          console.log('Sample feature:', data.features[0])
        }
        
        console.log('Loaded GeoJSON data:', {
          type: data.type,
          featuresCount: data.features.length,
          firstFeatureProperties: data.features[0]?.properties ? Object.keys(data.features[0].properties) : []
        })
        
        setGeoData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading data:", error)
        setGeoData(null)
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Filter data based on selected filters
  useEffect(() => {
    if (!geoData || !geoData.features || !Array.isArray(geoData.features)) return

    const filtered = geoData.features.filter((feature) => {
      // Validate feature structure
      if (!feature || !feature.properties) {
        console.warn('Invalid feature found:', feature)
        return false
      }
      
      const matchesYear = feature.properties.Año === selectedYear
      const matchesTheme = feature.properties.Tema === selectedTheme
      const matchesZone = selectedZone === "" || selectedZone === "__ALL__" || feature.properties.LOC === selectedZone
      const matchesLocality =
        selectedLocality === "" || feature.properties.NOMBRE?.toLowerCase().includes(selectedLocality.toLowerCase())

      return matchesYear && matchesTheme && matchesZone && matchesLocality
    })

    setFilteredData(filtered)
  }, [geoData, selectedYear, selectedTheme, selectedZone, selectedLocality])

  // Safe data extraction with validation for the actual field names
  const availableYears = geoData?.features && Array.isArray(geoData.features) 
    ? [...new Set(geoData.features
        .filter(f => f?.properties?.Año && typeof f.properties.Año === 'number')
        .map((f) => f.properties.Año))]
        .sort() 
    : []
    
  const availableThemes = geoData?.features && Array.isArray(geoData.features) 
    ? [...new Set(geoData.features
        .filter(f => f?.properties?.Tema && typeof f.properties.Tema === 'string')
        .map((f) => f.properties.Tema))] 
    : []
    
  const availableZones = geoData?.features && Array.isArray(geoData.features) 
    ? [...new Set(geoData.features
        .filter(f => f?.properties?.LOC && typeof f.properties.LOC === 'string')
        .map((f) => f.properties.LOC))]
        .sort() 
    : []
    
  const availableLocalities = geoData?.features && Array.isArray(geoData.features) 
    ? [...new Set(geoData.features
        .filter(f => f?.properties?.NOMBRE && typeof f.properties.NOMBRE === 'string')
        .map((f) => f.properties.NOMBRE))]
        .sort() 
    : []

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-medium">Cargando datos de Cartagena...</p>
        </div>
      </div>
    )
  }

  // Show error state if data failed to load
  if (!geoData || !geoData.features || !Array.isArray(geoData.features)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error al cargar los datos</h2>
          <p className="text-muted-foreground mb-4">
            No se pudieron cargar los datos de Cartagena. Por favor, verifica que el archivo GeoJSON esté disponible.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Calidad de Vida en Cartagena</h1>
              <p className="text-muted-foreground">
                Visualización interactiva de datos socioeconómicos por localidades
              </p>
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              {filteredData.length} localidades
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel
              selectedYear={selectedYear}
              selectedTheme={selectedTheme}
              selectedZone={selectedZone}
              selectedLocality={selectedLocality}
              selectedMetric={selectedMetric}
              selectedGender={selectedGender}
              selectedInstitutionType={selectedInstitutionType}
              availableYears={availableYears}
              availableThemes={availableThemes}
              availableZones={availableZones}
              availableLocalities={availableLocalities}
              onYearChange={setSelectedYear}
              onThemeChange={setSelectedTheme}
              onZoneChange={setSelectedZone}
              onLocalityChange={setSelectedLocality}
              onMetricChange={setSelectedMetric}
              onGenderChange={setSelectedGender}
              onInstitutionTypeChange={setSelectedInstitutionType}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="map" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="map" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">Mapa</span>
                </TabsTrigger>
                <TabsTrigger value="charts" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Gráficos</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Estadísticas</span>
                </TabsTrigger>
                <TabsTrigger value="docs" className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span className="hidden sm:inline">Documentación</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="map" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mapa Interactivo</CardTitle>
                    <CardDescription>
                      Explora los datos de {selectedTheme.toLowerCase()} por localidades en {selectedYear}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[600px] rounded-lg overflow-hidden border">
                      <MapComponent data={filteredData} selectedMetric={selectedMetric} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="charts" className="space-y-4">
                <ChartsPanel
                  data={geoData?.features || []}
                  selectedMetric={selectedMetric}
                  selectedGender={selectedGender}
                  selectedInstitutionType={selectedInstitutionType}
                  selectedTheme={selectedTheme}
                />
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                <StatsPanel 
                  data={filteredData} 
                  selectedMetric={selectedMetric}
                  selectedGender={selectedGender}
                  selectedInstitutionType={selectedInstitutionType}
                  allData={geoData?.features || []} 
                />
              </TabsContent>

              <TabsContent value="docs" className="space-y-4">
                <DocumentationPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
