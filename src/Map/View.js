import React, {Component} from 'react';
import echarts from 'echarts';
import 'echarts/map/js/world';
import style from './Map.module.scss';

class Map extends Component
{
    componentDidMount()
    {
        const chart = echarts.init(document.querySelector(`.${style.mapWrapper}`));
        chart.setOption({
            baseOption: {
                title: {
                    text: '全球二氧化碳排放量',
                    textStyle: {
                        fontWeight: 'bold',
                        fontFamily: 'serif',
                        align: 'center',
                        verticalAlign: 'middle'
                    },
                    left: 'center',
                    right: 'center'
                },
                visualMap: {
                    type: 'continuous',
                    min: 0,
                    max: 10,
                    text: ['High', 'Low'],
                    realtime: true,
                    calculable: true,
                    inRange: {
                        color: ['#080', '#C00'],
                        symbolSize: [50, 51]
                    },
                    outOfRange: {
                        color: ['#EFEFEF'],
                        symbolSize: [50, 51]
                    }
                },
                timeline: {
                    data: ['2001', '2002', '2003', '2004', '2005'],
                    autoPlay: true,
                    loop: true,
                    playInterval: 1000,

                },
                series: [
                    {
                        name: '全球二氧化碳排放量',
                        type: 'map',
                        mapType: 'world',
                        roam: false,
                        emphasis: {
                            label: {
                                show: true,
                                position: 'inside',
                                fontWeight: 'bold',
                                fontSize: '20'
                            },
                            itemStyle: {
                                borderWidth: 0.5,
                                borderColor: '#000',
                            }
                        },
                        itemStyle: {
                            borderWidth: 0.25,
                            borderColor: '#FFF'
                        },
                        data: [
                            {name: 'China', value: 0},
                        ]
                    }
                ]
            },
            options: [{
                series: [
                    {
                        data: [
                            {name: 'China', value: 2},
                        ]
                    }]
            },
                {
                    series: [
                        {
                            data: [
                                {name: 'China', value: 4},
                            ]
                        }]
                },
                {
                    series: [
                        {
                            data: [
                                {name: 'China', value: 6},
                            ]
                        }]
                }, {
                    series: [
                        {
                            data: [
                                {name: 'China', value: 8},
                            ]
                        }]
                },
                {
                    series: [
                        {
                            data: [
                                {name: 'China', value: 10},
                            ]
                        }]
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
