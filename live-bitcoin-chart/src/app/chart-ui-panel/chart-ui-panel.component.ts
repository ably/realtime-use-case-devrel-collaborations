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
  usdPriceChannel: any
  constructor() { }

  ngOnInit() {
    this.ably = new Ably.Realtime('<ABLY-API-KEY>');
    this.jpyPriceChannel = this.ably.channels.get('[product:ably-bitflyer/bitcoin]bitcoin:jpy');
    this.jpyPriceChannel.subscribe((msg) => {
      // make a copy of the data array
      const dataCopy = this.series[0].data.slice(0);

      // push the new info into the copy
      dataCopy.push(Number(msg.data.price) / 1000000);

      // *optional: limit amount of data points shown
      if(dataCopy.length > 10) { dataCopy.shift(); }

      // set the OG data equal to the copy
      this.series[0].data = dataCopy;
    })

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
