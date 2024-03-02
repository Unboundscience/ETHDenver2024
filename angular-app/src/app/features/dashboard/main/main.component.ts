import {Component, OnInit} from '@angular/core';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexTooltip,
    ApexPlotOptions,
    ApexDataLabels,
    ApexYAxis,
    ApexXAxis,
    ApexLegend,
    ApexResponsive,
    ApexFill,
    ApexStroke,
    ApexGrid,
    ApexTitleSubtitle,
    ApexStates,
    NgApexchartsModule
} from 'ng-apexcharts';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
// import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import {allIcons} from 'angular-feather/icons';
import {FeatherIconsComponent} from "../../shared/components/feather-icons/feather-icons.component";
import {UserAccount, UserAccountService} from "../../shared/services/user-account.service";
import {CommonModule} from '@angular/common';
import {CreateProposalComponent} from '../../proposals/create-proposal/create-proposal.component';
import {FileUploadComponent} from '../../shared/components/file-upload/file-upload.component';
import {NgChartsModule} from "ng2-charts";
import {ViemService} from "../../../core/services/viem.service";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    plotOptions: ApexPlotOptions;
    tooltip: ApexTooltip;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    responsive: ApexResponsive[];
    colors: string[];
    legend: ApexLegend;
    grid: ApexGrid;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
    states: ApexStates;
    fill: ApexFill;
};

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        NgApexchartsModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        FeatherIconsComponent,
        CreateProposalComponent,
        FileUploadComponent,
        NgChartsModule
    ],
})
export class MainComponent implements OnInit {
    public areaChartOptions!: Partial<ChartOptions>;
    public barChartOptions!: Partial<ChartOptions>;
    public smallBarChart!: Partial<ChartOptions>;
    public smallAreaChart!: Partial<ChartOptions>;
    public smallColumnChart!: Partial<ChartOptions>;
    public smallLineChart!: Partial<ChartOptions>;
    userAccount: UserAccount | undefined;
    // public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    // public pieChartData:ChartData<any, any[], string>|undefined =
    // public pieChartType:string = 'pie';

    public sampleDataUp1 = [
        2, 6, 4, 10, 16, 25, 19, 51, 42, 85, 77, 66, 78, 82, 94, 90, 98,
    ];

    public sampleDataUp2 = [
        2, 6, 4, 10, 51, 42, 85, 77, 66, 78, 82, 75, 95
    ];


    breadscrums = [
        {
            title: 'Dashboad',
            items: ['Home'],
            active: 'Dashboard',
        },
    ];

    constructor(public userAccountService: UserAccountService,
                public viemSercice: ViemService) {
        this.userAccount = undefined;
    }

    async ngOnInit() {



        this.userAccount = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : undefined;
        this.cardChart1();
        this.cardChart2();
        this.cardChart3();
        this.cardChart4();
        this.chart1();
        this.chart2();
    }

    async mintVoteToken(){ 
      try {
          await this.viemSercice.init();
          console.log('init success');
          const resp = await this.viemSercice.mintdonorNFT(4);
          console.log('resp', resp);
      }
      catch (err) {
          console.error(err);
      }
    }
    private cardChart1() {
        this.smallBarChart = {
            chart: {
                type: 'bar',
                width: 200,
                height: 50,
                sparkline: {
                    enabled: true,
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: '40%',
                },
            },
            series: [
                {
                    name: 'income',
                    data: this.sampleDataUp1,
                },
            ],
            tooltip: {
                theme: 'dark',
                fixed: {
                    enabled: false,
                },
                x: {
                    show: false,
                },
                y: {},
                marker: {
                    show: false,
                },
            },
        };
    }

    private cardChart2() {
        this.smallAreaChart = {
            series: [
                {
                    name: 'order',
                    data: this.sampleDataUp2,
                },
            ],
            chart: {
                type: 'area',
                height: 50,
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'straight',
            },
            colors: ['#00E396'],
            tooltip: {
                theme: 'dark',
                fixed: {
                    enabled: false,
                },
                x: {
                    show: false,
                },
                marker: {
                    show: false,
                },
            },
            xaxis: {
                labels: {
                    show: false,
                },
            },
            legend: {
                show: false,
            },
            yaxis: {
                show: false,
            },
            grid: {
                show: false,
            },
        };
    }

    private cardChart3() {
        this.smallColumnChart = {
            chart: {
                type: 'bar',
                width: 200,
                height: 50,
                sparkline: {
                    enabled: true,
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: '40%',
                },
            },
            series: [
                {
                    name: 'income',
                    data: this.sampleDataUp1,
                },
            ],

            tooltip: {
                theme: 'dark',
                fixed: {
                    enabled: false,
                },
                x: {
                    show: false,
                },
                y: {},
                marker: {
                    show: false,
                },
            },
        };
    }

    private cardChart4() {
        this.smallLineChart = {
            series: [
                {
                    name: 'Users',
                    data: this.sampleDataUp2,
                },
            ],
            chart: {
                type: 'line',
                height: 50,
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'straight',
                colors: ['#FEB019'],
                width: 4,
            },
            tooltip: {
                theme: 'dark',
                fixed: {
                    enabled: false,
                },
                x: {
                    show: false,
                },
                marker: {
                    show: false,
                },
            },
            xaxis: {
                labels: {
                    show: false,
                },
            },
            legend: {
                show: false,
            },
            yaxis: {
                show: false,
            },
            grid: {
                show: false,
            },
        };
    }

    private chart1() {
        this.areaChartOptions = {
            series: [
                {
                    name: 'New Clients',
                    data: [31, 40, 28, 51, 42, 85, 77],
                },
                {
                    name: 'Old Clients',
                    data: [11, 32, 45, 32, 34, 52, 41],
                },
            ],
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false,
                },
                foreColor: '#9aa0ac',
            },
            colors: ['#FC8380', '#6973C6'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                type: 'datetime',
                categories: [
                    '2018-09-19',
                    '2018-09-20',
                    '2018-09-21',
                    '2018-09-22',
                    '2018-09-23',
                    '2018-09-24',
                    '2018-09-25',
                ],
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'center',
                offsetX: 0,
                offsetY: 0,
            },
            grid: {
                show: true,
                borderColor: '#9aa0ac',
                strokeDashArray: 1,
            },
            tooltip: {
                theme: 'dark',
                marker: {
                    show: true,
                },
                x: {
                    show: true,
                },
            },
        };
    }

    private chart2() {
        this.barChartOptions = {
            series: [
                {
                    name: 'Project 1',
                    data: [44, 55, 41, 37, 22, 43, 21],
                },
                {
                    name: 'Project 2',
                    data: [53, 32, 33, 52, 13, 43, 32],
                },
                {
                    name: 'Project 3',
                    data: [12, 17, 11, 9, 15, 11, 20],
                },
                {
                    name: 'Project 4',
                    data: [9, 7, 5, 8, 6, 9, 4],
                },
            ],
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                foreColor: '#9aa0ac',
            },
            colors: ['#5048e5', '#f43f5e', '#3c6494', '#a5a5a5'],
            plotOptions: {
                bar: {
                    horizontal: true,
                },
            },
            stroke: {
                width: 1,
                colors: ['#fff'],
            },
            xaxis: {
                categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
                labels: {
                    formatter: function (val: string) {
                        return val + 'K';
                    },
                },
            },
            yaxis: {
                title: {
                    text: undefined,
                },
            },
            grid: {
                show: true,
                borderColor: '#9aa0ac',
                strokeDashArray: 1,
            },
            tooltip: {
                theme: 'dark',
                marker: {
                    show: true,
                },
                y: {
                    formatter: function (val: number) {
                        return val + 'K';
                    },
                },
            },
            fill: {
                opacity: 1,
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40,
            },
        };
    }
}
