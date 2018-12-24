import React, {Component} from 'react';
import echarts from 'echarts';
import style from './Map.module.scss';

class Map extends Component
{

    componentDidMount()
    {
        const chart = echarts.init(document.querySelector(`.${style.mapWrapper}`));
        chart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }

    render()
    {
        return (
            <div className={style.Map}>
                <div className={style.mapWrapper}/>
            </div>
        );
    }
}

export default Map;
