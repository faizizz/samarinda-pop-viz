import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { kecamatan: 'Palaran', populasi: 68600, kepadatan: 'sedang' },
  { kecamatan: 'Samarinda Ilir', populasi: 69400, kepadatan: 'sedang' },
  { kecamatan: 'Samarinda Kota', populasi: 34700, kepadatan: 'rendah' },
  { kecamatan: 'Sambutan', populasi: 58100, kepadatan: 'rendah' },
  { kecamatan: 'Samarinda Seberang', populasi: 66300, kepadatan: 'sedang' },
  { kecamatan: 'Loa Janan Ilir', populasi: 68100, kepadatan: 'sedang' },
  { kecamatan: 'Sungai Kunjang', populasi: 139700, kepadatan: 'sangat-tinggi' },
  { kecamatan: 'Samarinda Ulu', populasi: 140000, kepadatan: 'sangat-tinggi' },
  { kecamatan: 'Samarinda Utara', populasi: 107000, kepadatan: 'tinggi' },
  { kecamatan: 'Sungai Pinang', populasi: 106300, kepadatan: 'tinggi' },
];

const getColor = (kepadatan: string) => {
  switch (kepadatan) {
    case 'sangat-tinggi': return 'hsl(var(--destructive))';
    case 'tinggi': return 'hsl(25 95% 53%)';
    case 'sedang': return 'hsl(48 96% 53%)';
    case 'rendah': return 'hsl(var(--secondary))';
    default: return 'hsl(var(--primary))';
  }
};

const PopulationChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribusi Populasi per Kecamatan</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="kecamatan" 
              angle={-45} 
              textAnchor="end" 
              height={100}
              tick={{ fill: 'hsl(var(--foreground))' }}
            />
            <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              formatter={(value: number) => value.toLocaleString('id-ID')}
            />
            <Bar dataKey="populasi" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.kepadatan)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PopulationChart;
