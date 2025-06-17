"use client"
import { useState } from "react";
import dynamic from "next/dynamic";

import { useHotkeys } from "react-hotkeys-hook";

import useStore from "@/components/useStore";
import Link from "next/link";

const PreviewCanvas = dynamic(() => import('@/components/PreviewCanvas'), {
    ssr: false,
})

export default function PageContent() {

    const [canvasKey, setCanvasKey] = useState(0);

    const quantity = useStore(state => state.quantity);
    const setQuantity = useStore(state => state.setQuantity);

    const autoRotate = useStore(state => state.autoRotate);
    const setAutoRotate = useStore(state => state.setAutoRotate);

    useHotkeys("r", () => setCanvasKey(prevKey => prevKey + 1));
    // useHotkeys("b", () => setBackground(!background), [background]);
    useHotkeys("a", () => setAutoRotate(!autoRotate), [autoRotate]);
    useHotkeys("f", () => handleFullscreen(), []);

    useHotkeys("left", () => {
        setQuantity(quantity - 1);
    }, [quantity]);
    useHotkeys("right", () => {
        setQuantity(quantity + 1);
    }, [quantity]);

    const handleFullscreen = () => {
        const element = document.getElementById('canvas-wrap');
        if (element) {
            if (!document.fullscreenElement) {
                element.requestFullscreen().catch((err) => {
                    console.error("Error attempting to enable fullscreen:", err);
                });
            } else {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div className="page page-front-page">

            <div className="preview" id="canvas-wrap">
                {/* {background && <div className="background"></div>} */}
                <PreviewCanvas
                    key={canvasKey}
                />
            </div>

            <div className="options">

                <div className="card  p-2 mb-3">

                    <div className="h2">Quantity</div>

                    <div className="d-flex">
                        <button
                            // key={item}
                            // active={container == item}
                            className={`btn btn-light`}
                            onClick={() => {
                                setQuantity(+quantity - 1)
                            }}
                        >
                            <i className="fad fa-minus"></i>
                        </button>

                        <input
                            style={{
                                width: "60px"
                            }}
                            className="px-2"
                            type="number"
                            value={quantity}
                            onChange={(e) => {
                                setQuantity(e.target.value)
                            }}
                        />

                        <button
                            // key={item}
                            // active={container == item}
                            className={`btn btn-light`}
                            onClick={() => {
                                setQuantity(+quantity + 1)
                            }}
                        >
                            <i className="fad fa-plus"></i>
                        </button>

                    </div>

                </div>

                <hr />

                <div className="card p-2">

                    <div className="h2">Display</div>

                    <div className="d-flex">

                        <button
                            className="btn btn-light"
                            onClick={() => {
                                setCanvasKey(prevKey => prevKey + 1)
                            }}
                        >
                            Reset Canvas
                            <span className="badge bg-dark ms-2">R</span>
                        </button>

                        <button
                            className="btn btn-light"
                            onClick={() => {
                                setAutoRotate(!autoRotate)
                            }}
                        >
                            Auto Rotate
                            <span className={`badge ${autoRotate ? "bg-success" : "bg-dark"} ms-2`}>A</span>
                        </button>

                        <button
                            className="btn btn-light"
                            onClick={() => {
                                handleFullscreen()
                            }}
                        >
                            Fullscreen
                            <span className={`badge bg-dark ms-2`}>F</span>
                        </button>

                    </div>

                </div>

                <hr />

                <div className="card p-2">

                    <div className="h2">Credit</div>

                    <div>
                        <Link
                            target="_blank"
                            href="https://github.com/Articles-Joey/city-grid"
                        >
                            <button
                                className="btn btn-light"
                                onClick={() => {

                                }}
                            >
                                <i className="fab fa-github me-2"></i>
                                <span>GitHub</span>
                            </button>
                        </Link>
                        <Link 
                            target="_blank"
                            href="https://github.com/Articles-Joey/city-grid/blob/main/README.md#attributions"
                        >
                            <button
                                className="btn btn-light"
                                onClick={() => {
    
                                }}
                            >
                                Attributions
                            </button>
                        </Link>
                    </div>

                </div>

            </div>

        </div >
    )

}