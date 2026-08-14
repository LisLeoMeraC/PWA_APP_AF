import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const options: any = {
      series: [
        {
          name: "Ventas",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "Compras",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 200,
        type: "area",
        toolbar: { show: false },
        zoom: { enabled: false }
      },
      colors: ['#2E7D32', '#f97316'], // Verde principal y naranja
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 2
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.05,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: '#94a3b8',
            fontSize: '10px'
          }
        }
      },
      yaxis: {
        show: false
      }
    };

    const chartElement = document.querySelector("#chart") as HTMLElement;
    if (chartElement) {
      const chart = new ApexCharts(chartElement, options);
      chart.render();
    }
  }
}
