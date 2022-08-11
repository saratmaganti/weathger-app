export interface Range {
  high: number;
  low: number;
}

export interface Wind {
  directin: string;
  speed: Range;
}

export interface ForeCastItem {
  date: string;
  temperature: Range;
  relative_humidity: Range;
  wind: Wind;
}

export interface ChartOption {
  title: string;
  label: string;
  suffix: string;
  highList: number[][];
  lowList: number[][];
  tblList: TableData[];
}

export interface WeatherList {
  temperature: ChartOption;
  humidity: ChartOption;
}

export interface EnabledInterface {
  enabled: boolean;
}

export interface Title {
  text: string;
}

export interface Accessibility {
  rangeDescription: string;
}

export interface AxisInterface {
  title: Title;
  type?: string;
  accessibility?: Accessibility;
}

export interface Line {
  dataLabels?: EnabledInterface;
  enableMouseTracking: boolean;
}

export interface PlotOptions {
  line: Line;
}

export interface ToolTip {
  valueSuffix: string;
  xDateFormat: string;
}

export interface Series {
  type?: string;
  color?: string;
  name: string;
  data: number[][];
  tooltip: ToolTip;
}

export interface WeatherChartOptions {
  title: Title;
  xAxis: AxisInterface;
  yAxis: AxisInterface;
  legend: EnabledInterface;
  // plotOptions: PlotOptions;
  series: Series[];
}

export interface TableData {
  high: number;
  low: number;
  date: string;
}

export interface TableColumn {
  headerName: string;
  field: string;
}
