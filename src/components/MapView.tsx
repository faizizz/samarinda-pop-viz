import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface MapViewProps {
  defaultUrl?: string;
}

const MapView = ({ defaultUrl = '' }: MapViewProps) => {
  const [iframeUrl, setIframeUrl] = useState(defaultUrl);
  const [urlInput, setUrlInput] = useState(defaultUrl);
  const [urlSubmitted, setUrlSubmitted] = useState(!!defaultUrl);

  const handleSubmitUrl = () => {
    if (urlInput.trim()) {
      setIframeUrl(urlInput);
      setUrlSubmitted(true);
    }
  };

  if (!urlSubmitted) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Konfigurasi Peta</h2>
            <p className="text-muted-foreground">
              Masukkan URL web peta dari hosting GitHub Anda untuk ditampilkan di dashboard.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="iframe-url">URL Web Peta GitHub</Label>
            <Input
              id="iframe-url"
              type="url"
              placeholder="https://username.github.io/repository-name"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Contoh: https://yourusername.github.io/webgis-samarinda
            </p>
          </div>
          <Button onClick={handleSubmitUrl} className="w-full">
            Tampilkan Peta
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-full">
      <iframe
        src={iframeUrl}
        className="absolute inset-0 w-full h-full rounded-lg shadow-[var(--shadow-map)] border-0"
        title="Peta Kepadatan Penduduk Samarinda"
        allowFullScreen
      />
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setUrlSubmitted(false)}
          className="shadow-md"
        >
          Ganti URL Peta
        </Button>
      </div>
    </div>
  );
};

export default MapView;
