import React, { useState } from 'react';
import {
  ComposedChart, LineChart, AreaChart, BarChart, PieChart, Pie, Cell,
  Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  TrendingUp, TrendingDown, AlertTriangle, Clock, Users, DollarSign,
  Activity, Zap, ShieldAlert, CreditCard, BarChart2, Target,
} from 'lucide-react';

// ─── Color System ────────────────────────────────────────────────────────────
const COLORS = {
  bg: '#0A0C10',
  card: '#13161F',
  border: '#1E2330',
  divider: '#1A1E2A',
  primary: '#3B9EFF',
  secondary: '#5EEAD4',
  warning: '#F59E0B',
  success: '#34D399',
  danger: '#F87171',
  muted: '#6B7280',
  body: '#CBD5E1',
  heading: '#F1F5F9',
};

// ─── Tooltip Style ───────────────────────────────────────────────────────────
const tooltipStyle = {
  backgroundColor: '#1A1E2A',
  border: '1px solid #3B9EFF',
  borderRadius: '8px',
  color: '#F1F5F9',
  fontSize: '12px',
  padding: '8px 12px',
};

// ─── Data Constants ──────────────────────────────────────────────────────────

const kpiData = [
  { label: 'MAU', value: '100만', trend: '+2.1%', up: true },
  { label: 'DAU', value: '57,500', trend: '+1.8%', up: true },
  { label: 'New Sign-ups', value: '350K / mo', trend: '+3.4%', up: true },
  { label: '30D Retention', value: '64.5%', trend: '+1.8%', up: true },
  { label: 'Donation Revenue', value: '48억 KRW', trend: '+6.5%', up: true },
  { label: 'Paying Users', value: '32,000', trend: '+4.3%', up: true },
  { label: 'ARPPU', value: '150만 KRW', trend: '+2.1%', up: true },
  { label: 'Active BJs', value: '9,200', trend: '+3.1%', up: true },
];

const growthData = [
  { month: 'Sep', mau: 912, revenue: 41 },
  { month: 'Oct', mau: 935, revenue: 43 },
  { month: 'Nov', mau: 958, revenue: 44 },
  { month: 'Dec', mau: 968, revenue: 44 },
  { month: 'Jan', mau: 984, revenue: 46 },
  { month: 'Feb', mau: 1000, revenue: 48 },
];

const healthRows = [
  { color: '#34D399', dimension: 'User Growth', text: 'MAU at 100만 milestone. Steady +2%/mo growth trajectory.' },
  { color: '#F59E0B', dimension: 'Monetization', text: 'Revenue growing but ARPPU concentration risk (top spender dependency).' },
  { color: '#F59E0B', dimension: 'BJ Supply', text: 'Mid-tier BJ growth +9.8% positive. Top 10 still at 44% revenue share.' },
  { color: '#F87171', dimension: 'Risk / Ops', text: 'Violation rate 1.8% above 1.5% target. CS response time needs tightening.' },
];

const funnelData = [
  { stage: 'Monthly Visit', volume: 3000000, rate: null, width: 100 },
  { stage: 'Sign-up', volume: 350000, rate: '11.7%', width: 70 },
  { stage: 'Watch 10min+', volume: 245000, rate: '70.0%', width: 55 },
  { stage: 'First Payment', volume: 32000, rate: '13.1%', width: 25 },
  { stage: 'Repurchase (30D)', volume: 21760, rate: '68.0%', width: 20 },
];

const retentionTrend = [
  { month: 'Sep', d7: 79.2, d30: 61.8 },
  { month: 'Oct', d7: 80.1, d30: 62.4 },
  { month: 'Nov', d7: 81.0, d30: 63.1 },
  { month: 'Dec', d7: 80.5, d30: 62.8 },
  { month: 'Jan', d7: 81.8, d30: 63.9 },
  { month: 'Feb', d7: 82.3, d30: 64.5 },
];

const bjDonutData = [
  { name: 'Top 10 BJs', value: 44, color: '#F59E0B' },
  { name: 'Mid-tier', value: 38, color: '#3B9EFF' },
  { name: 'Long-tail', value: 18, color: '#5EEAD4' },
];

const bjTierData = [
  { tier: 'Micro', count: 6800 },
  { tier: 'Mid', count: 1820 },
  { tier: 'Rising', count: 460 },
  { tier: 'Top', count: 120 },
];

const donationTrend = [
  { month: 'Sep', revenue: 41 },
  { month: 'Oct', revenue: 43 },
  { month: 'Nov', revenue: 44 },
  { month: 'Dec', revenue: 44 },
  { month: 'Jan', revenue: 46 },
  { month: 'Feb', revenue: 48 },
];

const payingUsersTrend = [
  { month: 'Sep', users: 27200 },
  { month: 'Oct', users: 28500 },
  { month: 'Nov', users: 29800 },
  { month: 'Dec', users: 30200 },
  { month: 'Jan', users: 31000 },
  { month: 'Feb', users: 32000 },
];

const revenueMixData = [
  { name: 'Live Donations', value: 91, color: '#3B9EFF' },
  { name: 'Membership', value: 5, color: '#5EEAD4' },
  { name: 'VOD/Replay', value: 3, color: '#F59E0B' },
  { name: 'Other', value: 1, color: '#6B7280' },
];

const riskMetrics = [
  { icon: AlertTriangle, label: 'Reports / mo', value: '2,140', target: null, status: null },
  { icon: ShieldAlert, label: 'Violation Rate', value: '1.8%', target: '< 1.5%', status: 'red' },
  { icon: Clock, label: 'CS Avg. Response', value: '3.8 hrs', target: '< 3 hrs', status: 'amber' },
  { icon: CreditCard, label: 'Payout Lead Time', value: '2.8 days', target: '< 2 days', status: 'amber' },
];

const riskTrend = [
  { month: 'Sep', reports: 1820, violationRate: 2.1 },
  { month: 'Oct', reports: 1940, violationRate: 2.0 },
  { month: 'Nov', reports: 2050, violationRate: 1.9 },
  { month: 'Dec', reports: 1980, violationRate: 1.8 },
  { month: 'Jan', reports: 2100, violationRate: 1.9 },
  { month: 'Feb', reports: 2140, violationRate: 1.8 },
];

const insightsData = [
  {
    num: '01',
    insight: 'Revenue is growing steadily, but top-10 BJ concentration at 44% remains a structural risk.',
    note: 'One BJ departure could reduce monthly revenue by 4\u20135%.',
  },
  {
    num: '02',
    insight: 'New user retention at 64.5% is strong, but first-payment conversion is the monetization bottleneck.',
    note: '13.1% of active watchers pay \u2014 improving this is the highest-leverage action.',
  },
  {
    num: '03',
    insight: 'Risk and ops metrics must be managed as core business KPIs \u2014 not back-office metrics.',
    note: 'Violation rate above target signals scaling pressure on moderation capacity.',
  },
];

const actionsData = [
  {
    num: '01',
    action: 'Scale mid-tier BJ programs',
    description: 'Tiered incentives and guaranteed minimums for BJs earning 1\u20135M KRW/mo. Target: reduce top-10 concentration from 44% \u2192 35%.',
    tag: 'Revenue resilience',
  },
  {
    num: '02',
    action: 'Improve first-payment conversion',
    description: 'Personalized onboarding flow, first-gift bonus, D3/D7 nudges. Target: +3pp conversion = +7,500 paying users/mo.',
    tag: '+Revenue',
  },
  {
    num: '03',
    action: 'Automate risk & payout ops',
    description: 'Rule-based moderation flagging, CS chatbot for L1 tickets, automated payout pipeline. Target: <1.5% violation rate, <2 day payout.',
    tag: 'Margin efficiency',
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function PandaLogo() {
  const [imgError, setImgError] = useState(false);
  if (imgError) {
    return (
      <div className="w-8 h-8 rounded-lg bg-[#1E2330] flex items-center justify-center text-lg">
        🐼
      </div>
    );
  }
  return (
    <img
      src="https://play-lh.googleusercontent.com/rHOFBCJMYMJjUPL_KhPTBnaJ5aRlVvq2LT3ZGn3EuYkGKBTxJyTPWYbLEMqFOsNlLw=w240-h480-rw"
      alt="PandaTV"
      className="w-8 h-8 rounded-lg object-cover"
      onError={() => setImgError(true)}
    />
  );
}

function KPICard({ label, value, trend, up }) {
  return (
    <div className="rounded-xl bg-[#13161F] border border-[#1E2330] p-4">
      <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</div>
      <div className="text-2xl font-bold text-slate-100 font-mono">{value}</div>
      <div className={`text-xs font-medium mt-1 flex items-center gap-1 ${up ? 'text-emerald-400' : 'text-red-400'}`}>
        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {trend}
      </div>
    </div>
  );
}

function SectionHeading({ children }) {
  return <h2 className="text-base font-semibold text-slate-200 mb-3">{children}</h2>;
}

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl bg-[#13161F] border border-[#1E2330] p-5 ${className}`}>
      {children}
    </div>
  );
}

function StatBox({ label, value, small = false }) {
  return (
    <div className="rounded-xl bg-[#13161F] border border-[#1E2330] p-4">
      <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</div>
      <div className={`font-bold text-slate-100 font-mono ${small ? 'text-lg' : 'text-2xl'}`}>{value}</div>
    </div>
  );
}

function FooterSection() {
  return (
    <div className="text-[11px] text-slate-600 text-center py-6 border-t border-[#1E2330]">
      This prototype uses illustrative sample data and is intended only to demonstrate
      KPI structuring for business planning discussion. — Sample Data Only · Not for Distribution —
    </div>
  );
}

// ─── Dashboard Tab ───────────────────────────────────────────────────────────

function DashboardTab() {
  return (
    <div className="space-y-6">
      {/* Section 3: KPI Summary Row */}
      <div>
        <SectionHeading>KPI Summary</SectionHeading>
        <div className="grid grid-cols-8 lg:grid-cols-4 gap-3">
          {kpiData.map((kpi) => (
            <KPICard key={kpi.label} {...kpi} />
          ))}
        </div>
      </div>

      {/* Section 4: Executive Overview */}
      <div>
        <SectionHeading>Executive Overview</SectionHeading>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {/* Left — Platform Growth Trend */}
          <Card>
            <div className="mb-1 text-base font-semibold text-slate-200">Platform Growth Trend</div>
            <div className="text-xs text-slate-500 mb-4">MAU &amp; Donation Revenue · Sep 2025 – Feb 2026</div>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} domain={[880, 1020]} label={{ value: 'MAU (만)', angle: -90, position: 'insideLeft', fill: '#6B7280', fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} domain={[35, 55]} label={{ value: 'Revenue (억)', angle: 90, position: 'insideRight', fill: '#6B7280', fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar yAxisId="right" dataKey="revenue" fill="#5EEAD4" opacity={0.3} radius={[4, 4, 0, 0]} name="Revenue (억 KRW)" />
                <Line yAxisId="left" type="monotone" dataKey="mau" stroke="#3B9EFF" strokeWidth={2} dot={{ fill: '#3B9EFF', r: 4 }} name="MAU (만)" />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>

          {/* Right — Business Health Summary */}
          <Card>
            <div className="mb-4 text-base font-semibold text-slate-200">Business Health Summary</div>
            <div className="space-y-4">
              {healthRows.map((row) => (
                <div key={row.dimension} className="flex items-start gap-3">
                  <div className="mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: row.color }} />
                  <div>
                    <div className="text-sm font-medium text-slate-200">{row.dimension}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{row.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Section 5: User Funnel + Retention */}
      <div>
        <SectionHeading>User Funnel &amp; Retention</SectionHeading>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {/* Left — User Conversion Funnel */}
          <Card>
            <div className="mb-4 text-base font-semibold text-slate-200">User Conversion Funnel</div>
            <div className="space-y-3">
              {funnelData.map((item) => (
                <div key={item.stage}>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>{item.stage}</span>
                    <span className="font-mono text-slate-300">
                      {item.volume.toLocaleString()}
                      {item.rate && <span className="text-slate-500 ml-2">({item.rate})</span>}
                    </span>
                  </div>
                  <div className="w-full h-6 bg-[#1A1E2A] rounded-md overflow-hidden">
                    <div
                      className="h-full rounded-md"
                      style={{
                        width: `${item.width}%`,
                        background: `linear-gradient(90deg, #3B9EFF, #5EEAD4)`,
                        opacity: 0.8,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-[#1A1E2A] border border-[#1E2330]">
              <div className="text-xs text-slate-400">
                First-payment conversion at 13.1% of active watchers is the primary monetization lever.
              </div>
            </div>
          </Card>

          {/* Right — Retention Panel */}
          <Card>
            <div className="mb-4 text-base font-semibold text-slate-200">Retention Panel</div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <StatBox label="7D Retention" value="82.3%" small />
              <StatBox label="30D Retention" value="64.5%" small />
              <StatBox label="Returning Users" value="648K" small />
              <StatBox label="Reactivated" value="42K" small />
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={retentionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} domain={[55, 90]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="d7" stroke="#3B9EFF" fill="#3B9EFF" fillOpacity={0.15} strokeWidth={2} name="7D Retention (%)" />
                <Area type="monotone" dataKey="d30" stroke="#5EEAD4" fill="#5EEAD4" fillOpacity={0.15} strokeWidth={2} name="30D Retention (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      {/* Section 6: BJ Supply Health */}
      <div>
        <SectionHeading>BJ Supply Health</SectionHeading>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {/* Left — BJ Revenue Distribution Donut */}
          <Card>
            <div className="mb-4 text-base font-semibold text-slate-200">BJ Revenue Distribution</div>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={bjDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {bjDonutData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(value) => `${value}%`} />
                  <text x="50%" y="47%" textAnchor="middle" fill="#F1F5F9" fontSize="18" fontWeight="bold">44%</text>
                  <text x="50%" y="58%" textAnchor="middle" fill="#6B7280" fontSize="11">Top 10</text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {bjDonutData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name} ({item.value}%)
                </div>
              ))}
            </div>
          </Card>

          {/* Right — BJ KPI Cards + Tier Bar Chart */}
          <Card>
            <div className="mb-4 text-base font-semibold text-slate-200">BJ Metrics</div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <StatBox label="New BJs" value="284" small />
              <StatBox label="Active BJ Ratio" value="71.2%" small />
              <StatBox label="Mid-tier Growth" value="+9.8%" small />
              <StatBox label="Top 10 Rev. Share" value="44%" small />
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={bjTierData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="tier" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="count" fill="#3B9EFF" radius={[4, 4, 0, 0]} name="BJ Count" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      {/* Section 7: Revenue Structure */}
      <div>
        <SectionHeading>Revenue Structure</SectionHeading>
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
          {/* Card A — Donation Revenue Trend */}
          <Card>
            <div className="mb-1 text-sm font-semibold text-slate-200">Donation Revenue Trend</div>
            <div className="text-xs text-slate-500 mb-3">6-month (억 KRW)</div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={donationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} domain={[38, 52]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="revenue" stroke="#5EEAD4" strokeWidth={2} dot={{ fill: '#5EEAD4', r: 3 }} name="Revenue (억 KRW)" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Card B — Paying Users Trend */}
          <Card>
            <div className="mb-1 text-sm font-semibold text-slate-200">Paying Users Trend</div>
            <div className="text-xs text-slate-500 mb-3">6-month</div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={payingUsersTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} domain={[25000, 34000]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="users" stroke="#3B9EFF" strokeWidth={2} dot={{ fill: '#3B9EFF', r: 3 }} name="Paying Users" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Card C — Revenue Mix */}
          <Card>
            <div className="mb-1 text-sm font-semibold text-slate-200">Revenue Mix (Planning View)</div>
            <div className="text-xs text-slate-500 mb-3">Current + hypothetical</div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={revenueMixData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {revenueMixData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-1">
              {revenueMixData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name} {item.value}%
                </div>
              ))}
            </div>
            <div className="mt-3 text-[11px] text-slate-600 italic">
              Membership and VOD are presented as planning hypotheses for revenue diversification.
            </div>
          </Card>
        </div>
      </div>

      {/* Section 8: Risk & Operations */}
      <div>
        <SectionHeading>Risk &amp; Operations</SectionHeading>
        <div className="rounded-xl bg-[#13161F] border border-[#1E2330] border-l-2 border-l-amber-500/50 p-5">
          <div className="grid grid-cols-4 lg:grid-cols-2 gap-3 mb-4">
            {riskMetrics.map((m) => {
              const Icon = m.icon;
              const statusColor = m.status === 'red' ? 'text-red-400' : m.status === 'amber' ? 'text-amber-400' : 'text-slate-400';
              return (
                <div key={m.label} className="rounded-xl bg-[#0A0C10] border border-[#1E2330] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={14} className="text-slate-500" />
                    <span className="text-xs text-slate-500 uppercase tracking-wide">{m.label}</span>
                  </div>
                  <div className={`text-xl font-bold font-mono ${statusColor}`}>{m.value}</div>
                  {m.target && (
                    <div className="text-[11px] text-slate-600 mt-1">Target: {m.target}</div>
                  )}
                </div>
              );
            })}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={riskTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
              <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} domain={[1.5, 2.5]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar yAxisId="left" dataKey="reports" fill="#F59E0B" opacity={0.5} radius={[4, 4, 0, 0]} name="Reports" />
              <Line yAxisId="right" type="monotone" dataKey="violationRate" stroke="#F87171" strokeWidth={2} dot={{ fill: '#F87171', r: 3 }} name="Violation Rate (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section 9: Key Insights */}
      <div>
        <SectionHeading>Key Insights</SectionHeading>
        <Card>
          <div className="space-y-4">
            {insightsData.map((item) => (
              <div key={item.num} className="flex gap-4 items-start">
                <div className="text-xs font-bold text-[#3B9EFF] font-mono mt-0.5">{item.num}</div>
                <div>
                  <div className="text-sm text-slate-200">{item.insight}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Section 10: Recommended Actions */}
      <div>
        <SectionHeading>Recommended Actions</SectionHeading>
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
          {actionsData.map((item) => (
            <Card key={item.num}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-[#3B9EFF] font-mono">{item.num}</span>
                <span className="text-sm font-semibold text-slate-200">{item.action}</span>
              </div>
              <div className="text-xs text-slate-400 mb-3">{item.description}</div>
              <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#3B9EFF]/10 text-[#3B9EFF]">
                {item.tag}
              </span>
            </Card>
          ))}
        </div>
      </div>

      {/* Section 11: Footer */}
      <FooterSection />
    </div>
  );
}

// ─── Opportunities Tab ───────────────────────────────────────────────────────

function OpportunitiesTab() {
  const issues = [
    {
      num: '01',
      title: 'High BJ Concentration Risk',
      accent: '#F59E0B',
      why: 'Top 10 BJs drive 44% of total donation revenue. Loss of 1\u20132 top BJs could cause 4\u20138% monthly revenue drop.',
      initiative: 'Tiered BJ Growth Program: guaranteed monthly minimums for mid-tier BJs (1\u20135M KRW/mo), exclusive tooling, co-streaming incentives.',
      impact: [
        'Reduce top-10 concentration from 44% \u2192 35% within 12 months.',
        'Increase mid-tier revenue share from 38% \u2192 48%.',
      ],
      tags: 'High priority · 12-month target',
    },
    {
      num: '02',
      title: 'Low First-Payment Conversion',
      accent: '#3B9EFF',
      why: '245K active watchers but only 32K (13.1%) convert. Each 1pp improvement = ~2,450 new paying users.',
      initiative: 'Personalized onboarding: recommend 3 live channels on first session, D3/D7 push nudges, first-gift bonus.',
      impact: [
        '+3\u20135pp conversion = +7,350\u201312,250 paying users/mo.',
        'Revenue impact: +11\uc5b5\u201318\uc5b5 KRW/mo.',
      ],
      tags: 'High priority · 3\u20136 month impact',
    },
    {
      num: '03',
      title: 'Ops & Risk Cost Scaling',
      accent: '#5EEAD4',
      why: 'As MAU grows, manual ops workload scales linearly \u2014 eroding margins. Violation rate (1.8%) above 1.5% target.',
      initiative: '\u2460 Automate payout processing. \u2461 Build moderation flagging system. \u2462 Implement CS chatbot for L1 tickets.',
      impact: [
        'Reduce per-user ops cost 20\u201330%.',
        'Improve violation response from 3.8h \u2192 <2h.',
      ],
      tags: 'Medium priority · 6\u20139 month build',
    },
  ];

  const bets = [
    {
      title: 'Creator Monetization Infrastructure',
      icon: Zap,
      accent: '#3B9EFF',
      hypothesis: 'Building creator-side tools could unlock a second revenue stream reducing dependency on live donations.',
      whyNow: 'MAU at 1M and 9,200 active BJs creates sufficient supply-side scale.',
      impact: 'If 10% adopt at avg 500\ub9cc KRW/mo \u2192 platform 20% take-rate = +9.2\uc5b5 KRW/mo.',
      label: 'Planning hypothesis \u2014 not a current product',
    },
    {
      title: 'Creator Studio / Lounge',
      icon: Activity,
      accent: '#5EEAD4',
      hypothesis: 'Physical/hybrid studio/lounge could accelerate top-tier BJ acquisition and reduce churn.',
      whyNow: '\ub354\ube14\ubbf8\ub514\uc5b4\u2019s \uccad\ub2f4\uc2a4\ud29c\ub514\uc624 facility already exists.',
      impact: 'Retaining 2\u20133 top BJs per year = 3\u20135\uc5b5 KRW/year retention value.',
      label: 'Planning hypothesis \u2014 strategic investment direction',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-base font-semibold text-slate-200">Strategic Opportunities</div>
            <div className="text-xs text-slate-500 mt-1">
              Three core issues identified from KPI analysis · Business planning hypothesis view
            </div>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#3B9EFF]/10 text-[#3B9EFF]">
            Feb 2026 Analysis
          </span>
        </div>
      </Card>

      {/* 3 Issue Cards */}
      <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
        {issues.map((issue) => (
          <div
            key={issue.num}
            className="rounded-xl bg-[#13161F] border border-[#1E2330] p-5"
            style={{ borderLeftWidth: '3px', borderLeftColor: issue.accent }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold font-mono" style={{ color: issue.accent }}>Issue {issue.num}</span>
              <span className="text-sm font-semibold text-slate-200">{issue.title}</span>
            </div>

            <div className="mb-3">
              <div className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">Why</div>
              <div className="text-xs text-slate-400">{issue.why}</div>
            </div>

            <div className="mb-3">
              <div className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">Initiative</div>
              <div className="text-xs text-slate-400">{issue.initiative}</div>
            </div>

            <div className="mb-3">
              <div className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">Impact</div>
              <div className="space-y-1">
                {issue.impact.map((line, i) => (
                  <div key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                    <span style={{ color: issue.accent }}>{'\u2460\u2461\u2462'[i]}</span> {line}
                  </div>
                ))}
              </div>
            </div>

            <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
              {issue.tags}
            </span>
          </div>
        ))}
      </div>

      {/* Next Growth Bets */}
      <SectionHeading>Next Growth Bets</SectionHeading>
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
        {bets.map((bet) => {
          const Icon = bet.icon;
          return (
            <div
              key={bet.title}
              className="rounded-xl bg-[#0F1219] border border-[#1E2330] p-5"
              style={{ borderTopWidth: '3px', borderTopColor: bet.accent }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon size={16} style={{ color: bet.accent }} />
                <span className="text-sm font-semibold text-slate-200">{bet.title}</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">Hypothesis</div>
                  <div className="text-xs text-slate-400">{bet.hypothesis}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">Why now</div>
                  <div className="text-xs text-slate-400">{bet.whyNow}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">Potential impact</div>
                  <div className="text-xs text-slate-400">{bet.impact}</div>
                </div>
              </div>

              <div className="mt-4 text-[11px] text-slate-600 italic">{bet.label}</div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function PandaTVWebDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bg }}>
      <div className="max-w-[1440px] mx-auto px-8 py-6">
        {/* Section 1: Header Row */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-[#1E2330]">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <PandaLogo />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-slate-100">{'\ud32c\ub354\ud2f0\ube44'}</span>
              </div>
              <div className="text-xs text-slate-500">PandaTV KPI Dashboard Prototype</div>
              <div className="text-[11px] text-slate-600">Business Planning Team Lead View · Sample data only</div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4 text-right">
            <div>
              <div className="text-sm text-slate-400">Monthly View · Feb 2026</div>
              <div className="text-[11px] text-slate-600">Desktop planning view</div>
            </div>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-500/20 text-amber-400">
              Prototype
            </span>
          </div>
        </div>

        {/* Section 2: Tab Bar */}
        <div className="flex items-center gap-2 mt-4 mb-6">
          <div
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-[#3B9EFF] text-white'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Dashboard
          </div>
          <div
            onClick={() => setActiveTab('opportunities')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
              activeTab === 'opportunities'
                ? 'bg-[#3B9EFF] text-white'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Opportunities
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' ? <DashboardTab /> : <OpportunitiesTab />}
      </div>
    </div>
  );
}
