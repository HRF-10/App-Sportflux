import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
declare const Chart: any;

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.page.html',
  styleUrls: ['./diagnose.page.scss'],
})
export class DiagnosePage implements OnInit {
  muscleWaveCharts: any[] = [];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.initializeMuscleWaveCharts();
  }

  initializeMuscleWaveCharts() {
    for (let i = 1; i <= 4; i++) {
      const ctx = document.getElementById(`heartRateChart${i}`) as HTMLCanvasElement;

      const initialData = {
        labels: [],
        datasets: [{
          label: '', // Hilangkan label dataset
          data: [],
          borderColor: 'white', // Ubah warna grafik menjadi putih
          borderWidth: 2,
          fill: false,
          tension: 0.4,
        }]
      };

      const chart = new Chart(ctx, {
        type: 'line',
        data: initialData,
        options: {
          scales: {
            x: {
              type: 'linear',
              title: {
                display: false, // Sembunyikan judul sumbu X
              },
              ticks: {
                display: false, // Sembunyikan label sumbu X
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)', // Warna gridline sumbu X
              },
            },
            y: {
              beginAtZero: false,
              suggestedMin: -1,
              suggestedMax: 1,
              title: {
                display: false, // Sembunyikan judul sumbu Y
              },
              ticks: {
                display: false, // Sembunyikan label sumbu Y
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)', // Warna gridline sumbu Y
              },
            }
          },
          plugins: {
            legend: {
              display: false, // Sembunyikan legend
            }
          }
        }
      });

      this.muscleWaveCharts.push(chart);
      this.updateMuscleWaveChart(chart, i);
    }
  }

  updateMuscleWaveChart(chart: any, channelId: number) {
    let time = 0;
    const frequencyMultiplier = channelId * 0.5; // Berikan frekuensi berbeda untuk tiap channel
    const phaseOffset = channelId * Math.PI / 4; // Berikan offset fase yang berbeda

    setInterval(() => {
      // Gelombang yang bervariasi untuk tiap channel
      const newWaveData = Math.sin((time / 10) * frequencyMultiplier + phaseOffset) + (Math.random() - 0.5) / 5;
      chart.data.labels.push(time);
      chart.data.datasets[0].data.push(newWaveData);
      chart.update();
      time++;

      if (chart.data.labels.length > 10) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
      }
    }, 1000);

    
  }
  goBack() {
    this.navCtrl.back(); // This will navigate back to the previous page
  }
}