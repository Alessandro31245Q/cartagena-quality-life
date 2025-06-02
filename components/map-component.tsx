"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet"
import { LatLngBounds, LatLngExpression } from "leaflet"
import "leaflet/dist/leaflet.css"
import type { FeatureData } from "@/app/page"

interface MapComponentProps {
  data: FeatureData[]
  selectedMetric: string
}

// Component to fit bounds when data changes
function FitBounds({ data }: { data: FeatureData[] }) {
  const map = useMap()

  // Function to recursively traverse coordinates and extend bounds
  function extendBounds(coords: any, bounds: LatLngBounds) {
    if (
      Array.isArray(coords) &&
      coords.length >= 2 &&
      typeof coords[0] === "number" &&
      typeof coords[1] === "number" &&
      isFinite(coords[0]) &&
      isFinite(coords[1])
    ) {
      bounds.extend([coords[1], coords[0]])
    } else if (Array.isArray(coords)) {
      coords.forEach((c) => extendBounds(c, bounds))
    }
  }

  useEffect(() => {
    if (data.length > 0) {
      const bounds = new LatLngBounds([])
      data.forEach((feature) => {
        if (feature && feature.geometry && feature.geometry.coordinates) {
          extendBounds(feature.geometry.coordinates, bounds)
        }
      })
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [20, 20] })
      }
    }
  }, [data, map])

  return null
}

export default function MapComponent({ data, selectedMetric }: MapComponentProps) {
  const mapRef = useRef<any>(null)

  // Calculate color based on metric value
  const getColor = (value: number, min: number, max: number) => {
    if (max === min) return "#3B82F6"
    const ratio = (value - min) / (max - min)
    const hue = (1 - ratio) * 120 // From red (0) to green (120)
    return `hsl(${hue}, 70%, 50%)`
  }

  // Get min and max values for the selected metric
  const values = data.map((feature) => feature.properties[selectedMetric as keyof typeof feature.properties] as number)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)

  const geoJsonStyle = (feature: any) => {
    const value = feature?.properties?.[selectedMetric] || 0
    return {
      fillColor: getColor(value, minValue, maxValue),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "",
      fillOpacity: 0.7,
    }
  }

  const onEachFeature = (feature: any, layer: any) => {
    const props = feature.properties
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

    const popupContent = `
      <div class="p-3 max-w-xs">
        <h3 class="font-bold text-lg mb-2">${props.NOMBRE}</h3>
        <div class="space-y-1 text-sm">
          <p><strong>Zona:</strong> ${props.LOC}</p>
          <p><strong>ID:</strong> ${props.ID}</p>
          <p><strong>Año:</strong> ${props.Año}</p>
          <p><strong>Tema:</strong> ${props.Tema}</p>
          <hr class="my-2">
          <p><strong>${metricLabels[selectedMetric as keyof typeof metricLabels]}:</strong> ${props[selectedMetric] || 0}</p>
          <hr class="my-2">
          <div class="text-xs text-gray-600 space-y-1">
            <p><strong>📊 Matrícula por Género:</strong></p>
            <p>• Total: ${props.Matrícula || 0}</p>
            <p>• Masculina: ${props.M_hombres || 0}</p>
            <p>• Femenina: ${props.M_mujeres || 0}</p>
            <p><strong>🎓 Matrícula por Nivel:</strong></p>
            <p>• Preescolar: ${props.M_Prees || 0}</p>
            <p>• Primaria: ${props.M_Prim || 0}</p>
            <p>• Secundaria: ${props.M_Sec || 0}</p>
            <p>• Media: ${props.M_Media || 0}</p>
            <p><strong>🏫 Instituciones:</strong></p>
            <p>• Total: ${props.N_IE || 0}</p>
            <p>• Oficiales: ${props.N_IE_O || 0}</p>
            <p>• Privadas: ${props.N_IE_ || 0}</p>
          </div>
        </div>
      </div>
    `

    layer.bindPopup(popupContent)

    layer.on({
      mouseover: (e: any) => {
        const layer = e.target
        layer.setStyle({
          weight: 3,
          color: "#666",
          dashArray: "",
          fillOpacity: 0.9,
        })
      },
      mouseout: (e: any) => {
        const layer = e.target
        layer.setStyle(geoJsonStyle(feature))
      },
    })
  }

  return (
    <MapContainer
      ref={mapRef}
      center={[10.4, -75.5] as LatLngExpression}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
      className="rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {data.length > 0 && (
        <>
          <GeoJSON
            key={`${selectedMetric}-${data.length}-${Math.random()}`}
            data={{
              type: "FeatureCollection",
              features: data.filter(feature => 
                feature && 
                feature.geometry && 
                Array.isArray(feature.geometry.coordinates)
              ),
            }}
            style={geoJsonStyle}
            onEachFeature={onEachFeature}
          />
          <FitBounds data={data} />
        </>
      )}
    </MapContainer>
  )
}
