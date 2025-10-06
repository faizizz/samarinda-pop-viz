import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const densityLevels = [
  { label: 'Sangat Tinggi', color: '#ef4444', range: '> 15,000/km²' },
  { label: 'Tinggi', color: '#f97316', range: '10,000 - 15,000/km²' },
  { label: 'Sedang', color: '#eab308', range: '5,000 - 10,000/km²' },
  { label: 'Rendah', color: '#22c55e', range: '< 5,000/km²' },
];

const DensityLegend = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Legenda Kepadatan Penduduk</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {densityLevels.map((level) => (
          <div key={level.label} className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: level.color }}
            />
            <div className="flex-1">
              <div className="font-medium">{level.label}</div>
              <div className="text-sm text-muted-foreground">{level.range}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DensityLegend;
