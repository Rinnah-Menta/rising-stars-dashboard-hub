
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

interface SubjectResult {
  subject: string;
  currentMark: number;
  previousMark: number;
  grade: string;
  teacher: string;
  comments: string;
}

interface PerformanceChartProps {
  results: SubjectResult[];
}

const chartConfig = {
  currentMark: {
    label: "Current Term",
    color: "#3b82f6",
  },
  previousMark: {
    label: "Previous Term", 
    color: "#8b5cf6",
  },
  average: {
    label: "Average Score",
    color: "#10b981",
  },
};

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ results }) => {
  const chartData = results.map(result => ({
    subject: result.subject.length > 8 ? result.subject.substring(0, 8) + '...' : result.subject,
    fullSubject: result.subject,
    currentMark: result.currentMark,
    previousMark: result.previousMark,
    improvement: result.currentMark - result.previousMark
  }));

  const termProgressData = [
    { month: 'Jan', average: 75 },
    { month: 'Feb', average: 78 },
    { month: 'Mar', average: 80 },
    { month: 'Apr', average: 82 },
    { month: 'May', average: 81 },
    { month: 'Jun', average: Math.round(results.reduce((sum, r) => sum + r.currentMark, 0) / results.length) }
  ];

  return (
    <div className="space-y-8">
      {/* Subject Performance Comparison */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            Subject Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[400px] w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis 
                    dataKey="subject" 
                    fontSize={11}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fill: '#374151' }}
                    axisLine={{ stroke: '#9ca3af' }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    fontSize={12}
                    tick={{ fill: '#374151' }}
                    axisLine={{ stroke: '#9ca3af' }}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [
                      `${value}%`,
                      name === 'currentMark' ? 'Current Term' : 'Previous Term'
                    ]}
                    labelFormatter={(label, payload) => {
                      const data = payload?.[0]?.payload;
                      return data?.fullSubject || label;
                    }}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                  />
                  <Bar 
                    dataKey="previousMark" 
                    fill="#8b5cf6" 
                    name="Previous Term"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                  <Bar 
                    dataKey="currentMark" 
                    fill="#3b82f6" 
                    name="Current Term"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Term Progress Trend */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            Term Progress Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[350px] w-full">
            <ChartContainer
              config={{
                average: {
                  label: "Average Score",
                  color: "#10b981",
                },
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={termProgressData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                  <XAxis 
                    dataKey="month" 
                    fontSize={12}
                    tick={{ fill: '#374151' }}
                    axisLine={{ stroke: '#9ca3af' }}
                  />
                  <YAxis 
                    domain={[70, 90]} 
                    fontSize={12}
                    tick={{ fill: '#374151' }}
                    axisLine={{ stroke: '#9ca3af' }}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`${value}%`, 'Average Score']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="average" 
                    stroke="#10b981" 
                    strokeWidth={4}
                    dot={{ 
                      fill: '#10b981', 
                      strokeWidth: 3, 
                      r: 8,
                      stroke: '#ffffff'
                    }}
                    activeDot={{ 
                      r: 10, 
                      fill: '#059669',
                      stroke: '#ffffff',
                      strokeWidth: 3
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-700 mb-1">
              {results.filter(r => r.currentMark > r.previousMark).length}
            </div>
            <div className="text-sm text-emerald-600">Subjects Improved</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700 mb-1">
              {results.filter(r => r.currentMark === r.previousMark).length}
            </div>
            <div className="text-sm text-blue-600">Subjects Maintained</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-700 mb-1">
              {results.filter(r => r.currentMark < r.previousMark).length}
            </div>
            <div className="text-sm text-orange-600">Subjects Declined</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
