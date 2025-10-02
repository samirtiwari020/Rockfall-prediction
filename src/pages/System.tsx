import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

import {
  AlertTriangle,
  Zap,
  Activity,
  Thermometer,
  Menu,
  LogOut,
  MapPin,
  Gauge,
  Vibrate,
  CloudRain,
  TrendingUp
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Charts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

// Drone image
import droneImage from '@/assets/drone-image.jpg';

const mines = [
  { name: "Jharia Coalfield", state: "Jharkhand", coords: [23.6739, 85.3096] },
  { name: "Bailadila Iron Ore Mine", state: "Chhattisgarh", coords: [18.7167, 81.0833] },
  { name: "Kolar Gold Fields", state: "Karnataka", coords: [12.9563, 78.2762] }
];

// Synthetic chart data
const structuralData = [
  { time: "00:00", displacement: 1.2, strain: 0.4 },
  { time: "06:00", displacement: 2.5, strain: 0.7 },
  { time: "12:00", displacement: 3.0, strain: 1.0 },
  { time: "18:00", displacement: 2.2, strain: 0.6 },
  { time: "24:00", displacement: 1.8, strain: 0.5 },
];

const environmentalData = [
  { time: "Mon", temperature: 25, rainfall: 2, vibration: 0.8 },
  { time: "Tue", temperature: 27, rainfall: 5, vibration: 1.2 },
  { time: "Wed", temperature: 29, rainfall: 0, vibration: 0.5 },
  { time: "Thu", temperature: 28, rainfall: 4, vibration: 1.0 },
  { time: "Fri", temperature: 26, rainfall: 3, vibration: 1.5 },
  { time: "Sat", temperature: 27, rainfall: 0, vibration: 0.7 },
  { time: "Sun", temperature: 30, rainfall: 6, vibration: 2.0 },
];

const riskOverviewData = [
  { day: "Mon", risk: 2 },
  { day: "Tue", risk: 3 },
  { day: "Wed", risk: 4 },
  { day: "Thu", risk: 3 },
  { day: "Fri", risk: 5 },
  { day: "Sat", risk: 4 },
  { day: "Sun", risk: 2 },
];

const RockfallDashboard = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const heatLayer = useRef<L.Layer | null>(null);

  const [selectedMine, setSelectedMine] = useState(mines[0]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView(selectedMine.coords as L.LatLngExpression, 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update map when mine changes
  useEffect(() => {
    if (!map.current) return;

    map.current.setView(selectedMine.coords as L.LatLngExpression, 13);

    // Remove old heat layer
    if (heatLayer.current) {
      map.current.removeLayer(heatLayer.current);
    }

    // Add synthetic heatmap data
    const heatPoints = [
      [selectedMine.coords[0] + 0.01, selectedMine.coords[1] + 0.01, 0.8],
      [selectedMine.coords[0] - 0.01, selectedMine.coords[1] - 0.02, 0.6],
      [selectedMine.coords[0] + 0.015, selectedMine.coords[1] + 0.02, 0.9],
    ];

    heatLayer.current = (L as any).heatLayer(heatPoints, { radius: 40 }).addTo(map.current);

  }, [selectedMine]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">RockGuard</h1>
              <p className="text-sm text-muted-foreground">Rockfall Prediction & Alert System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* <Link to = "/Home">
            <Button variant="ghost" size="sm" >
              <LogOut className="h-4 w-4" />
              <span className="ml-2">back to home</span>

            </Button>
            </Link> */}
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
              <span className="ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </header>


      {/* Location Selector */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-4 mb-6">
          {mines.map((mine) => (
            <Button
              key={mine.name}
              onClick={() => setSelectedMine(mine)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${selectedMine.name === mine.name
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-primary/80 hover:text-white"
                }`}
            >
              <MapPin className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">{mine.name}</div>
                <div className="text-xs opacity-90">{mine.state}</div>
              </div>
            </Button>
          ))}
        </div>
        {/* live sensor data */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle>Live Sensor Readings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">

              {/* Displacement */}
              <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/30">
                <p className="text-sm text-gray-400">Displacement</p>
                <p className="font-mono text-primary text-lg">3.07 mm</p>
              </div>

              {/* Rainfall */}
              <div className="px-4 py-2 rounded-xl bg-blue-900/20 border border-blue-400/30">
                <p className="text-sm text-gray-400">Rainfall</p>
                <p className="font-mono text-blue-400 text-lg">0.0 mm/h</p>
              </div>

              {/* Stress */}
              <div className="px-4 py-2 rounded-xl bg-purple-900/20 border border-purple-400/30">
                <p className="text-sm text-gray-400">Stress</p>
                <p className="font-mono text-purple-400 text-lg">0.962 MPa</p>
              </div>

              {/* Vibration */}
              <div className="px-4 py-2 rounded-xl bg-yellow-900/20 border border-yellow-400/30">
                <p className="text-sm text-gray-400">Vibration</p>
                <p className="font-mono text-yellow-400 text-lg">1.67 m/s²</p>
              </div>

            </div>
          </CardContent>
        </Card>



        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Slope Risk Heatmap */}
          <Card className="col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <CardTitle>Slope Risk Heatmap</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Real-time visualization of mine slope stability</p>
            </CardHeader>
            <CardContent>
              <div className="relative bg-muted rounded-lg overflow-hidden" style={{ height: '400px' }}>
                <div ref={mapContainer} className="absolute inset-0" />
              </div>
            </CardContent>
          </Card>

          {/* alert panel */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <CardTitle>Active Alerts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">

              {/* Alert 1 - Critical */}
              <div className="border-l-4 border-red-500 p-3 rounded bg-red-900/20">
                <div className="flex justify-between items-center">
                  <span className="text-red-400 font-bold">Critical</span>
                  <span className="text-xs text-gray-400">2 mins ago</span>
                </div>
                <p className="font-semibold text-white mt-1">Zone A</p>
                <p className="text-gray-300 text-sm">High vibration detected in eastern slope</p>
                <p className="text-sm mt-2"><span className="font-bold">Action:</span> Evacuate personnel, deploy stabilization barriers</p>
              </div>

              {/* Alert 2 - High */}
              <div className="border-l-4 border-yellow-500 p-3 rounded bg-yellow-900/20">
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400 font-bold">High</span>
                  <span className="text-xs text-gray-400">15 mins ago</span>
                </div>
                <p className="font-semibold text-white mt-1">Zone B</p>
                <p className="text-gray-300 text-sm">Unusual weather patterns affecting stability</p>
                <p className="text-sm mt-2"><span className="font-bold">Action:</span> Increase monitoring frequency, prepare equipment</p>
              </div>

              {/* Alert 3 - Medium */}
              <div className="border-l-4 border-blue-500 p-3 rounded bg-blue-900/20">
                <div className="flex justify-between items-center">
                  <span className="text-blue-400 font-bold">Medium</span>
                  <span className="text-xs text-gray-400">1 hour ago</span>
                </div>
                <p className="font-semibold text-white mt-1">Zone C</p>
                <p className="text-gray-300 text-sm">Soil moisture levels rising after rainfall</p>
                <p className="text-sm mt-2"><span className="font-bold">Action:</span> Monitor drainage systems, check sensor calibration</p>
              </div>

            </CardContent>
          </Card>

        </div>

        {/* Charts */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          {/* Structural Monitoring */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Structural Monitoring</CardTitle>
              <p className="text-sm text-muted-foreground">24-hour displacement and strain</p>
            </CardHeader>
            <CardContent style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={structuralData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="displacement" stroke="#ef4444" />
                  <Line type="monotone" dataKey="strain" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Environmental Conditions */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Environmental Conditions</CardTitle>
            </CardHeader>
            <CardContent style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={environmentalData}>
                  <defs>
                    <linearGradient id="tempColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="temperature" stroke="#f59e0b" fillOpacity={1} fill="url(#tempColor)" />
                  <Area type="monotone" dataKey="rainfall" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="vibration" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Risk Overview + Drone */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Risk Overview</CardTitle>
            </CardHeader>
            <CardContent style={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskOverviewData}>
                  <defs>
                    <linearGradient id="orangeToBlack" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" /> {/* Orange-500 */}
                      <stop offset="100%" stopColor="#111827" /> {/* Gray-900 */}
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(31, 41, 55, 0.2)"
                  />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827", // dark tooltip background
                      borderRadius: "8px",
                      border: "none",
                      color: "#f97316",
                    }}
                    itemStyle={{ color: "#f97316" }} // tooltip value color
                    labelStyle={{ color: "#e5e7eb" }} // tooltip label (day)
                  />

                  <Bar
                    dataKey="risk"
                    fill="url(#orangeToBlack)"
                    activeBar={{
                      fill: "url(#orangeToBlack)", // keep same gradient fill
                      stroke: "#1f2937",           // grayish black outline instead of white
                      strokeWidth: 2,
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>




          <Card >
            <CardHeader>
              <CardTitle>Latest Drone Inspection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-muted rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">North Slope A</span>
                    <span className="text-xs text-muted-foreground">29/9/2025, 3:11:18 pm</span>
                  </div>
                  <img src={droneImage} alt="Drone Inspection" className="rounded mb-2" />
                  <div className="text-xs bg-critical/20 text-critical px-2 py-1 rounded-full inline-block">
                    Visible crack formation detected
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RockfallDashboard;
