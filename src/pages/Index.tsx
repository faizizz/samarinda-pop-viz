import { Users, TrendingUp, MapPin, Building2 } from 'lucide-react';
import MapView from '@/components/MapView';
import StatsCard from '@/components/StatsCard';
import PopulationChart from '@/components/PopulationChart';
import DensityLegend from '@/components/DensityLegend';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10 shadow-[var(--shadow-card)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-[var(--shadow-glow)]">
              <MapPin className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Dashboard WebGIS Kota Samarinda
              </h1>
              <p className="text-sm text-muted-foreground">Sistem Informasi Kepadatan Penduduk</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Populasi"
            value="960,000"
            icon={Users}
            trend={{ value: 2.3, isPositive: true }}
          />
          <StatsCard
            title="Jumlah Kecamatan"
            value="10"
            icon={MapPin}
          />
          <StatsCard
            title="Kepadatan Rata-rata"
            value="8,450/km²"
            icon={Building2}
            trend={{ value: 1.8, isPositive: true }}
          />
          <StatsCard
            title="Pertumbuhan Tahunan"
            value="2.3%"
            icon={TrendingUp}
            trend={{ value: 0.5, isPositive: true }}
          />
        </div>

        {/* Map and Legend */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 h-[600px]">
            <MapView />
          </div>
          <div className="lg:col-span-1">
            <DensityLegend />
          </div>
        </div>

        {/* Population Chart */}
        <PopulationChart />

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>Data terakhir diperbarui: Oktober 2025 | Sumber: BPS Kota Samarinda</p>
        </div>
      </main>
    </div>
  );
};

export default Index;
