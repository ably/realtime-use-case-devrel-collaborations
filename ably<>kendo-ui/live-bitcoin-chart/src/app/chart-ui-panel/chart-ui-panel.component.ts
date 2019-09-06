import { Component, OnInit } from '@angular/core';

declare var Ably: any;

@Component({
  selector: 'app-chart-ui-panel',
  templateUrl: './chart-ui-panel.component.html',
  styleUrls: ['./chart-ui-panel.component.css']
})
export class ChartUiPanelComponent implements OnInit {

  ably: any
  usdPriceChannel: any
  dataInDecimalcopy: any = 0;
  constructor() { }
  ngOnInit() {
    this.ably = new Ably.Realtime('<ABLY-API-KEY>');

    // make sure you have access to this product by self-subscribing to it via the Ably Hub
    this.usdPriceChannel = this.ably.channels.get('[product:ably-coindesk/bitcoin]bitcoin:usd');

    this.usdPriceChannel.subscribe((msg) => {
      var timestamp = new Date(msg.timestamp)
      const dataInDecimal = msg.data.replace(/\,/g, '');

      // plot the data only when it has changed
      if (dataInDecimal != this.dataInDecimalcopy) {
        const dataCopy = this.series[0].data.slice(0);
        const timeCopy = this.timestamps[0].timedata.slice(0);
        dataCopy.push(parseFloat(dataInDecimal))
        timeCopy.push(timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds())
        this.dataInDecimalcopy = dataInDecimal;

        // *optional: limit amount of data points shown
        if (dataCopy.length > 20) { dataCopy.shift(); }
        if (timeCopy.length > 20) { timeCopy.shift(); }
        // set the OG data equal to the copy
        this.series[0].data = dataCopy;
        this.timestamps[0].timedata = timeCopy;
      }
    })
  }
  title = 'live-bitcoin-chart';

  public timestamps: any[] = [{
    name: 'USD',
    timedata: []
  }];
  public series: any[] = [{
    name: 'USD',
    data: []
  }];
}