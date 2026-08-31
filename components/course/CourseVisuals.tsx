'use client';

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import training from '@/data/training.json';

const precisionConfig = {
  sideMetres: { label: 'Square side', color: 'var(--signal)' },
} satisfies ChartConfig;

const profileConfig = {
  elevation: { label: 'Elevation', color: 'var(--signal)' },
} satisfies ChartConfig;

export function PrecisionChart() {
  return (
    <figure className="trainer-viz sc-card" aria-labelledby="precision-chart-title">
      <figcaption>
        <p className="sc-card-kicker">Visualization 01</p>
        <h3 id="precision-chart-title" className="sc-card-title">More digits, smaller square</h3>
        <p className="sc-card-desc">Each extra digit per coordinate divides the square side by ten. Bar width uses a logarithmic scale so all three levels remain visible.</p>
      </figcaption>
      <div className="trainer-chart-shell">
        <p className="sr-only">Four figures identify a one-kilometre square, six figures a nominal one-hundred-metre square, and eight figures a nominal ten-metre square.</p>
        <ChartContainer id="precision" config={precisionConfig} className="trainer-chart trainer-chart--precision" initialDimension={{ width: 560, height: 260 }} style={{ width: '100%', minWidth: 0, height: 260 }}>
          <BarChart accessibilityLayer data={training.precisionLevels} layout="vertical" margin={{ left: 8, right: 44, top: 12, bottom: 8 }}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" scale="log" domain={[10, 1000]} ticks={[10, 100, 1000]} tickFormatter={(value) => value === 1000 ? '1 km' : `${value} m`} />
            <YAxis dataKey="figures" type="category" width={76} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={(value) => <><span>Square side</span><strong>{Number(value) === 1000 ? '1 km' : `${String(value)} m`}</strong></>} />} />
            <Bar dataKey="sideMetres" fill="var(--color-sideMetres)" radius={[0, 3, 3, 0]} minPointSize={10} />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="trainer-precision-key">
        {training.precisionLevels.map((level) => <div key={level.figures}><strong>{level.example}</strong><span>{level.figures}</span><small>{level.meaning}</small></div>)}
      </div>
      <p className="trainer-viz-takeaway"><strong>Read:</strong> precision describes the size of the referenced grid square—not the accuracy of your plotting, map, or instrument.</p>
    </figure>
  );
}

export function ElevationProfile() {
  return (
    <figure className="trainer-viz sc-card sc-card--raised" aria-labelledby="profile-chart-title">
      <figcaption>
        <p className="sc-card-kicker">Visualization 02</p>
        <h3 id="profile-chart-title" className="sc-card-title">The shortest line is not always the easiest line</h3>
        <p className="sc-card-desc">Synthetic route MT-02 climbs about 120 m before descending. A plan must account for relief, not only map distance.</p>
      </figcaption>
      <div className="trainer-chart-shell">
        <p className="sr-only">A synthetic 2.8 kilometre route climbs from 220 metres to 342 metres, then descends to 280 metres.</p>
        <ChartContainer id="profile" config={profileConfig} className="trainer-chart trainer-chart--profile" initialDimension={{ width: 620, height: 300 }} style={{ width: '100%', minWidth: 0, height: 300 }}>
          <AreaChart accessibilityLayer data={training.elevationProfile} margin={{ left: 0, right: 18, top: 18, bottom: 4 }}>
            <defs><linearGradient id="elevation-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-elevation)" stopOpacity={0.42} /><stop offset="95%" stopColor="var(--color-elevation)" stopOpacity={0.04} /></linearGradient></defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="distance" type="number" domain={[0, 2.8]} ticks={[0, 0.7, 1.4, 2.1, 2.8]} tickFormatter={(value) => `${value} km`} />
            <YAxis domain={[200, 360]} ticks={[200, 240, 280, 320, 360]} tickFormatter={(value) => `${value} m`} width={54} />
            <ChartTooltip content={<ChartTooltipContent labelFormatter={(value) => `${String(value)} km along route`} formatter={(value) => <><span>Elevation</span><strong>{String(value)} m</strong></>} />} />
            <Area dataKey="elevation" type="monotone" stroke="var(--color-elevation)" strokeWidth={3} fill="url(#elevation-fill)" />
          </AreaChart>
        </ChartContainer>
      </div>
      <p className="trainer-viz-takeaway"><strong>Read:</strong> use contours to compare climb, slope, visibility, crossings, and dependable features before choosing a route.</p>
    </figure>
  );
}
