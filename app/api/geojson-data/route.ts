import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "app", "api", "geojson-data", "Educación.geojson")
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "GeoJSON file not found" }, { status: 404 })
    }
    const fileContents = fs.readFileSync(filePath, "utf8")
    const geoJsonData = JSON.parse(fileContents)
    // Validación básica de GeoJSON
    if (!geoJsonData.type || !geoJsonData.features) {
      return NextResponse.json({ error: "Invalid GeoJSON format" }, { status: 400, headers: { "Access-Control-Allow-Origin": "*" } })
    }
    return NextResponse.json(geoJsonData, { headers: { "Access-Control-Allow-Origin": "*" } })
  } catch (error) {
    console.error("Error loading GeoJSON data:", error)
    return NextResponse.json({ error: "Failed to load GeoJSON data" }, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } })
  }
}
