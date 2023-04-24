import React, { useCallback, useEffect, useState, useRef, FC } from "react";
import PropTypes from "prop-types";
import "./multiRangeSlider.scss";
import * as trace_events from "trace_events";

interface Props {
    min: number;
    max: number;
    onChange: ({ min, max }: { min: number, max: number }) => void;
}

const MultiRangeSlider: FC<Props> = ({ min, max, onChange }) => {
    const [minVal, setMinVal] = useState<number>(min);
    const [maxVal, setMaxVal] = useState<number>(max);
    const minValRef = useRef<number>(min);
    const maxValRef = useRef<number>(max);
    const range = useRef<HTMLDivElement>(null);

    const [maxInput, setMaxInput] = useState<number>()

    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);



    const changeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(event.target.value), maxVal - 1);
        setMinVal(value);
        minValRef.current = value;
    }

    const changeMax = (event: React.ChangeEvent<HTMLInputElement>) => {

        // const value = Math.max(Number(event.target.value), minVal + 1);
        const value = Number(event.target.value)

        if (value > minVal){
            if (value > max){
                setMaxVal(max);
                setMaxInput(max)

            }else{
                setMaxVal(value);
                setMaxInput(value)
                maxValRef.current = value;
            }

        }else{
            setMaxInput(value)
        }

    }


    return (
        <div className="range-container">

            <div className="left-value">{minVal.toLocaleString()} $</div>
            <div className="right-value">{maxVal.toLocaleString()} $</div>

            <input
                type="range"
                min={min}
                max={max}
                step={50}
                value={minVal}
                onChange={changeMin}
                className="thumb thumb--left"
                style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
            />

            <input
                type="range"
                min={min}
                max={max}
                step={50}
                value={maxVal}
                onChange={changeMax}
                className="thumb thumb--right"
            />

            <div className="slider">


                <div className="slider__track" />
                <div ref={range} className="slider__range" />

                <div className="slider__left-value">
                    <input type="number" placeholder="No Min" max={max} min={min} value={minVal ? minVal : ""}  onChange={(event) => {
                        changeMin(event)
                    }
                    }/>
                </div>

                <div className="slider__right-value">
                    <input type="number" placeholder="No Max" max={max} min={min} value={maxInput ? maxInput : ""} onChange={(event) => {
                        changeMax(event)
                    }}/>
                </div>
            </div>

            <div>

            </div>
        </div>
    );
};

MultiRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MultiRangeSlider;
