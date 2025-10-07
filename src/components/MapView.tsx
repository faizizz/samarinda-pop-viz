import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface MapViewProps {
  defaultUrl?: string;
}

const MapView = ({ defaultUrl = 'https://faizizz.github.io/MPSIG2-QGIS2Web/#11/-0.5613/117.2619' }: MapViewProps) => {
  const [iframeUrl, setIframeUrl] = useState(defaultUrl);
  const [urlInput, setUrlInput] = useState(defaultUrl);
  const [urlSubmitted, setUrlSubmitted] = useState(!!defaultUrl);
  
  const handleSubmitUrl = () => {
    if (urlInput.trim()) {
      setIframeUrl(urlInput);
      setUrlSubmitted(true);
    }
  };

  return (
    <div className="relative w-full h-full">
      <iframe
        src={iframeUrl}
        className="absolute inset-0 w-full h-full rounded-lg shadow-[var(--shadow-map)] border-0"
        title="Peta Kepadatan Penduduk Samarinda"
        allowFullScreen
      />
    </div>
  );
};

export default MapView;
