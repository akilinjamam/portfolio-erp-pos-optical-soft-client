import { useRef } from "react";
import { useReactToPrint } from "react-to-print";


const usePrint = () => {

    const contentToPrint = useRef(null);
        const handlePrint = useReactToPrint({
            documentTitle: "Print This Document",
            onBeforePrint: () => console.log("before printing..."),
            onAfterPrint: () => console.log("after printing..."),
            removeAfterPrint: true,
        });

    return {contentToPrint, handlePrint};
    
};

export default usePrint;