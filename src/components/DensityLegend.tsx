import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const densityLevels = [
  { label: 'Sangat Jarang', color: '#ffffff', range: '≤ 310/km²' },
  { label: 'Jarang', color: '#ffbfbf', range: '310 - 2,608/km²' },
  { label: 'Sedang', color: '#ff8080', range: '2,608 - 3,245/km²' },
  { label: 'Padat', color: '#ff4040', range: '3,245 - 5,308/km²' },
  { label: 'Sangat Padat', color: '#ff0000', range: '5,308 - 6,328/km²' },
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
