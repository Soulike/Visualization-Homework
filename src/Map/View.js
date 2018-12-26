import React, {Component} from 'react';
import echarts from 'echarts';
import 'echarts/map/js/world';
import style from './Map.module.scss';
import {getAsync} from '../Functions';

class Map extends Component
{
    componentDidMount()
    {
        const chart = echarts.init(document.querySelector(`.${style.mapWrapper}`));
        chart.showLoading();

        getAsync('/server/getCO2Data')
            .then(res =>
            {
                const {code, data: {sheetData, YEAR_START, YEAR_END}} = res;
                if (code === 200)
                {
                    const options = [];
                    let maxValue = 0;

                    for (let i = YEAR_START; i <= YEAR_END; i++)
                    {
                        const data = [];
                        for (const row of sheetData)
                        {
                            if (row[i.toString()] !== undefined)
                            {
                                data.push({name: row['Country Name'], value: parseFloat(row[i.toString()])});
                                if (parseFloat(row[i.toString()]) > maxValue)
                                {
                                    maxValue = parseFloat(row[i.toString()]);
                                }
                            }
                        }
                        options.push({
                            title: {
                                text: `全球二氧化碳排放分布（${i} 年）`
                            },
                            visualMap: {
                                max: maxValue,
                            },
                            series: [{data}, {data}]
                        });
                        maxValue = 0;
                    }

                    const timeLineArray = [];
                    for (let i = YEAR_START; i <= YEAR_END; i++)
                    {
                        timeLineArray.push(i.toString());
                    }

                    chart.setOption({
                        baseOption: {
                            title: {
                                text: '全球二氧化碳排放分布',
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
                                max: 0,
                                text: ['大', '小'],
                                realtime: true,
                                calculable: true,
                                inRange: {
                                    color: ['#FFF', '#F00', '#E00', '#D00', '#B00', '#A00', '#900', '#800', '#700', '#600'],
                                },
                                outOfRange: {
                                    color: ['#AAA'],
                                }
                            },
                            tooltip: {
                                trigger: 'item',
                                showDelay: 0,
                                transitionDuration: 0.2,
                                formatter: params =>
                                {
                                    const {name, value} = params;
                                    if (Object.is(value, NaN))
                                    {
                                        return `暂无数据`;
                                    }
                                    else
                                    {
                                        return `${name}<br/>${value} 千吨`;
                                    }
                                }
                            },
                            timeline: {
                                data: timeLineArray,
                                axisType: 'category',
                                autoPlay: false,
                                loop: true,
                                playInterval: 500,
                                tooltip: {
                                    show: false
                                }
                            },
                            series: [
                                {
                                    name: '全球二氧化碳排放分布',
                                    type: 'map',
                                    mapType: 'world',
                                    roam: false,
                                    emphasis: {
                                        label: {
                                            show: true
                                        },
                                        itemStyle: {
                                            areaColor: '#09C'
                                        }
                                    },
                                    itemStyle: {
                                        borderWidth: 0.25,
                                        borderColor: '#000'
                                    },
                                    data: []
                                },
                                {
                                    type: 'pie',
                                    avoidLabelOverlap: false,
                                    label: {
                                        show: true,
                                        fontSize: '16'
                                    },
                                    radius: '30%',
                                    data: [],
                                    center: ['15%', '70%'],
                                }
                            ]
                        },
                        options
                    });
                }
                else
                {
                    alert('获取数据失败');
                }
            })
            .catch(e =>
            {
                alert('获取数据失败');
                console.log(e);
            })
            .finally(() =>
            {
                chart.hideLoading();
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
