import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface MapViewProps {
  onTokenChange?: (token: string) => void;
}

const MapView = ({ onTokenChange }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSubmitted, setTokenSubmitted] = useState(false);

  const handleSubmitToken = () => {
    if (mapboxToken.trim()) {
      setTokenSubmitted(true);
      onTokenChange?.(mapboxToken);
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [117.1489, -0.5022], // Samarinda coordinates
      zoom: 11,
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      if (!map.current) return;

      // Add 3D buildings
      map.current.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 12,
        paint: {
          'fill-extrusion-color': '#ddd',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'min_height'],
          'fill-extrusion-opacity': 0.6,
        },
      });

      // Sample population density zones
      const densityZones = [
        { name: 'Samarinda Ulu', center: [117.1389, -0.4822], density: 'tinggi', population: 125000 },
        { name: 'Samarinda Ilir', center: [117.1589, -0.5122], density: 'sangat-tinggi', population: 180000 },
        { name: 'Samarinda Utara', center: [117.1289, -0.4622], density: 'sedang', population: 95000 },
        { name: 'Samarinda Seberang', center: [117.1789, -0.5222], density: 'tinggi', population: 110000 },
        { name: 'Loa Janan Ilir', center: [117.1089, -0.5422], density: 'sedang', population: 78000 },
        { name: 'Palaran', center: [117.2089, -0.5622], density: 'rendah', population: 52000 },
      ];

      densityZones.forEach((zone) => {
        const color = 
          zone.density === 'sangat-tinggi' ? '#ef4444' :
          zone.density === 'tinggi' ? '#f97316' :
          zone.density === 'sedang' ? '#eab308' : '#22c55e';

        // Add marker
        const el = document.createElement('div');
        el.className = 'density-marker';
        el.style.backgroundColor = color;
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.borderRadius = '50%';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        el.style.cursor = 'pointer';

        new mapboxgl.Marker(el)
          .setLngLat(zone.center as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(
                `<div style="padding: 8px;">
                  <h3 style="font-weight: bold; margin-bottom: 4px;">${zone.name}</h3>
                  <p style="margin: 2px 0;">Populasi: ${zone.population.toLocaleString('id-ID')}</p>
                  <p style="margin: 2px 0;">Kepadatan: <span style="color: ${color}; font-weight: bold;">${zone.density.replace('-', ' ')}</span></p>
                </div>`
              )
          )
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [tokenSubmitted, mapboxToken]);

  if (!tokenSubmitted) {
    return (
      <Card className="p-6 m-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Konfigurasi Mapbox</h2>
            <p className="text-muted-foreground">
              Untuk menampilkan peta, masukkan Mapbox Access Token Anda.
              Dapatkan token gratis di{' '}
              <a
                href="https://mapbox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapbox-token">Mapbox Access Token</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
          </div>
          <Button onClick={handleSubmitToken} className="w-full">
            Tampilkan Peta
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-[var(--shadow-map)]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5 rounded-lg" />
    </div>
  );
};

export default MapView;
