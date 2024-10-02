import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare const Chart: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {
  private emgChart: any; // Simpan instance chart
  private chartData: number[] = []; // Data amplitudo EMG
  private timeLabels: number[] = []; // Label waktu dalam detik
  private timeCounter: number = 0; // Mulai dari 0

  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const initialData = {
      labels: this.timeLabels,
      datasets: [{
        label: 'EMG Amplitude (mV)',
        data: this.chartData,
        borderColor: 'rgba(255, 255, 255, 1)', // Garis putih
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Latar belakang semi-transparan
        fill: true,
        tension: 0.4, // Kurva halus
      }]
    };

    const config = {
      type: 'line',
      data: initialData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Waktu (detik)', // Label untuk sumbu X
              color: '#ffffff',
            },
            ticks: {
              color: '#ffffff',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
          y: {
            title: {
              display: true,
              text: 'EMG Amplitude (mV)', // Label untuk sumbu Y
              color: '#ffffff',
            },
            ticks: {
              color: '#ffffff',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
            suggestedMin: 0,
            suggestedMax: 2 // Sesuaikan batas maksimum
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#ffffff' // Warna label legenda
            }
          }
        }
      }
    };

    const ctx = document.getElementById('emgChart') as HTMLCanvasElement;
    if (ctx) {
      this.emgChart = new (window as any).Chart(ctx.getContext('2d')!, config);
      this.startDynamicUpdates(); // Mulai pembaruan dinamis
    } else {
      console.error('Canvas element not found');
    }
  }

  startDynamicUpdates() {
    let time = 0; // Mengatur waktu mulai
    setInterval(() => {
      // Menghasilkan data EMG baru dengan variasi acak
      const newAmplitude = Math.floor(Math.random() * 40) / 20; // Menghasilkan nilai antara 0 dan 2
      this.chartData.push(newAmplitude); // Tambahkan data baru ke array
      this.timeLabels.push(time); // Tambahkan label waktu baru

      // Perbarui waktu
      time++; // Tambah satu detik setiap interval

      // Jika waktu lebih dari 59 detik (60 detik total), mulai ulang
      if (time >= 60) {
        time = 0; // Reset waktu
        this.chartData = []; // Reset data amplitudo
        this.timeLabels = []; // Reset label waktu
      }

      // Jika lebih dari 60 data, hapus data paling awal
      if (this.chartData.length > 60) {
        this.chartData.shift();
        this.timeLabels.shift();
      }

      // Perbarui data chart
      this.emgChart.data.labels = this.timeLabels;
      this.emgChart.data.datasets[0].data = this.chartData;
      this.emgChart.update(); // Perbarui grafik
    }, 1000); // Pembaruan setiap 1000 ms (1 detik)
  }

  navigateToRecord() {
    this.router.navigate(['/tabs/record']);
  }

  navigateToDevice() {
    this.router.navigate(['/tabs/device']);
  }
}
