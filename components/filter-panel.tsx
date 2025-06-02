"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Filter, Search, Users, Building2 } from "lucide-react"

interface FilterPanelProps {
  selectedYear: number
  selectedTheme: string
  selectedZone: string
  selectedLocality: string
  selectedMetric: string
  selectedGender: string
  selectedInstitutionType: string
  availableYears: number[]
  availableThemes: string[]
  availableZones: string[]
  availableLocalities: string[]
  onYearChange: (year: number) => void
  onThemeChange: (theme: string) => void
  onZoneChange: (zone: string) => void
  onLocalityChange: (locality: string) => void
  onMetricChange: (metric: string) => void
  onGenderChange: (gender: string) => void
  onInstitutionTypeChange: (type: string) => void
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

export function FilterPanel({
  selectedYear,
  selectedTheme,
  selectedZone,
  selectedLocality,
  selectedMetric,
  selectedGender,
  selectedInstitutionType,
  availableYears,
  availableThemes,
  availableZones,
  availableLocalities,
  onYearChange,
  onThemeChange,
  onZoneChange,
  onLocalityChange,
  onMetricChange,
  onGenderChange,
  onInstitutionTypeChange,
}: FilterPanelProps) {
  // Filter out any invalid values to prevent empty string errors
  const validYears = availableYears.filter(year => year && !isNaN(year) && year > 0)
  const validThemes = availableThemes.filter(theme => theme && theme.trim() !== "")
  const validZones = availableZones.filter(zone => zone && zone.trim() !== "")
  const validLocalities = availableLocalities.filter(locality => locality && locality.trim() !== "")

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
          <CardDescription>Personaliza la visualización de datos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Year Filter */}
          <div className="space-y-2">
            <Label htmlFor="year-select">Año</Label>
            <Select value={selectedYear.toString()} onValueChange={(value) => onYearChange(Number.parseInt(value))}>
              <SelectTrigger id="year-select">
                <SelectValue placeholder="Seleccionar año" />
              </SelectTrigger>
              <SelectContent>
                {validYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Theme Filter */}
          <div className="space-y-2">
            <Label htmlFor="theme-select">Tema</Label>
            <Select value={selectedTheme} onValueChange={onThemeChange}>
              <SelectTrigger id="theme-select">
                <SelectValue placeholder="Seleccionar tema" />
              </SelectTrigger>
              <SelectContent>
                {validThemes.map((theme) => (
                  <SelectItem key={theme} value={theme}>
                    {theme}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Zone Filter */}
          <div className="space-y-2">
            <Label htmlFor="zone-select">Zona</Label>
            <Select value={selectedZone} onValueChange={onZoneChange}>
              <SelectTrigger id="zone-select">
                <SelectValue placeholder="Todas las zonas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="all-zones" value="__ALL__">Todas las zonas</SelectItem>
                {validZones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Metric Filter */}
          <div className="space-y-2">
            <Label htmlFor="metric-select">Métrica</Label>
            <Select value={selectedMetric} onValueChange={onMetricChange}>
              <SelectTrigger id="metric-select">
                <SelectValue placeholder="Seleccionar métrica" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(metricLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Gender Filter */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Filtro por Género
            </Label>
            <RadioGroup value={selectedGender} onValueChange={onGenderChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="total" id="total" />
                <Label htmlFor="total">Total</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="masculino" id="masculino" />
                <Label htmlFor="masculino">Masculino</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="femenino" id="femenino" />
                <Label htmlFor="femenino">Femenino</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Institution Type Filter */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Tipo de Institución
            </Label>
            <RadioGroup value={selectedInstitutionType} onValueChange={onInstitutionTypeChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="total" id="inst-total" />
                <Label htmlFor="inst-total">Total</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oficial" id="oficial" />
                <Label htmlFor="oficial">Oficiales</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="privada" id="privada" />
                <Label htmlFor="privada">Privadas</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Locality Search */}
          <div className="space-y-2">
            <Label htmlFor="locality-search">Buscar Localidad</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="locality-search"
                placeholder="Escribir nombre..."
                value={selectedLocality}
                onChange={(e) => onLocalityChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Active Filters */}
          <div className="space-y-2">
            <Label>Filtros Activos</Label>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{selectedYear}</Badge>
              <Badge variant="secondary">{selectedTheme}</Badge>
              {selectedZone && selectedZone !== "__ALL__" && <Badge variant="outline">{selectedZone}</Badge>}
              <Badge variant="secondary">{metricLabels[selectedMetric as keyof typeof metricLabels]}</Badge>
              {selectedGender !== "total" && (
                <Badge variant="outline">{selectedGender === "masculino" ? "♂" : "♀"} {selectedGender}</Badge>
              )}
              {selectedInstitutionType !== "total" && (
                <Badge variant="outline">{selectedInstitutionType === "oficial" ? "🏛️" : "🏢"} {selectedInstitutionType}</Badge>
              )}
              {selectedLocality && <Badge variant="outline">{selectedLocality}</Badge>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Resumen Rápido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Años disponibles:</span>
            <span className="font-medium">{availableYears.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Zonas:</span>
            <span className="font-medium">{availableZones.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Localidades:</span>
            <span className="font-medium">{availableLocalities.length}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
