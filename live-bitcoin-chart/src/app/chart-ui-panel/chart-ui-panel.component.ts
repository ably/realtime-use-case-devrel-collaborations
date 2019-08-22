import { Component, OnInit } from '@angular/core';

declare var Ably: any;

@Component({
  selector: 'app-chart-ui-panel',
  templateUrl: './chart-ui-panel.component.html',
  styleUrls: ['./chart-ui-panel.component.css']
})
export class ChartUiPanelComponent implements OnInit {

  ably: any
  jpyPriceChannel: any
  constructor() { }

  ngOnInit() {
    this.ably = new Ably.Realtime('<ABLY-API-KEY>');
    console.log('here');
    this.jpyPriceChannel = this.ably.channels.get('[product:ably-bitflyer/bitcoin]bitcoin:jpy');
    this.jpyPriceChannel.subscribe((msg) => {
      this.series[0].data.push(Number(msg.data.price) / 1000000); //real data to display, doesn't work atm
      console.log(msg.data.price / 1000000);
    })
    this.series[0].data.push(Number(2.2)) //dummy data to test
    this.series[0].data.push(Number(1.7)) //dummy data to test
    this.series[1].data.push(Number(4.2)) //dummy data to test
    this.series[1].data.push(Number(0.8)) //dummy data to test
  }

  title = 'live-bitcoin-chart';

  public events: string[] = [];
  public series: any[] = [{
    name: 'JPY',
    data: []
  }, {
    name: 'USD',
    // data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
    data: []
  }];

  public categories: number[] = [];

  public onRender(): void {
    this.log('render');
  }

  public onAxisLabelClick(e): void {
    this.log('axisLabelClick', e);
  }

  public onLegendItemClick(e): void {
    this.log('legendItemClick', e);
  }

  public onLegendItemHover(e): void {
    this.log('legendItemHover', e);
  }

  public onPlotAreaClick(e): void {
    this.log('plotAreaClick', e);
  }

  public onPlotAreaHover(e): void {
    this.log('plotAreaHover', e);
  }

  public onSeriesClick(e): void {
    this.log('seriesClick', e);
  }

  public onSeriesHover(e): void {
    this.log('seriesHover', e);
  }

  private log(event: string, arg: any = null): void {
    this.events.push(`${event}`);
    console.log(arg);
  }

}
