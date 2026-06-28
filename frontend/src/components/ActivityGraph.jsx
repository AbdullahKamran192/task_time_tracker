import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ActivityGraph.css"

function formatMinutes(minutes){

    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if(hrs === 0)
        return `${mins} mins`;

    return `${hrs}h ${mins}m`;
}

const AcitvityGraph = () => {

    const [productiveTime, setProductiveTime] = useState(0);
    const [wasteTime, setWasteTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);


    const radius = 155;
    const circumference = 2 * Math.PI * radius;

    const percentage =
    totalTime === 0 ? 0 : productiveTime / totalTime;

    const graphOffset =
    circumference * (1 - percentage);


    const fetchUserProgress = async () => {

        const response = await fetch(
            "http://localhost:8080/userprogress",
            {
                credentials: "include",
            }
        );

        const data = await response.json();

        if (data) {

            console.log(data);

            // Convert the strings from the backend into numbers
            const productive = Number(data.productiveMinutes);
            const wasted = Number(data.wastedMinutes);

            // Store them in state
            setProductiveTime(productive);
            setWasteTime(wasted);
            setTotalTime(productive + wasted);
        }
    };


    useEffect(() => {
        fetchUserProgress();
    }, [])

    return (
        <div className="activityGraphBox">
            <div className="activityHeading">
                <h1>Past 30 days progress</h1>
            </div>
            <div className="wrapper">
                <div className="outer">
                    <div className="inner">
                        <div id="number">{totalTime == 0 ? "0%" : `${Math.round(((productiveTime / totalTime) * 100))}%`}</div>
                        <p className="graphSubtitle">
                            Time spent well
                        </p>
                    </div>
                </div>

                <svg width="340" height="340">
                    <defs>
                        <linearGradient id="linearGradient">
                            <stop offset="10%" stopColor="blue" />
                            <stop offset="100%" stopColor="lightblue" />
                        </linearGradient>
                    </defs>
                    <circle cx={170} cy={170} r="155" style={{strokeDashoffset: graphOffset, strokeDasharray: circumference}}/>
                </svg>
            </div>

            <div className="statsRow">
                <div className="infoBox">
                    <h3>Productive</h3>
                    <h1>{formatMinutes(productiveTime)}</h1>
                </div>
                <div className="infoBox">
                    <h3>Waste</h3>
                    <h1>{formatMinutes(wasteTime)}</h1>
                </div>
            </div>

            <div className="infoBox totalBox">
                <h3>Total time</h3>
                <h1>{formatMinutes(Number(wasteTime) + Number(productiveTime))}</h1>
            </div>
        </div>
    )
}

export default AcitvityGraph