import { useMediaQuery } from 'react-responsive';

export const useResponsiveSettings = () => {
    const isMobile = useMediaQuery({ minWidth: 481 });

    if (!isMobile) {
        return {
            smoother: { smooth: 1, smoothTouch: 1 },
            r3f: {
                dpr: 1,
                disableBloom: true,
                modelScaleFactor: 2.5,
            },
 
            splitText: "words",
            imageSequencePath: (index: number) => `/images/last_mobile_sequence/swanson_V__${(index).toString().padStart(5, '0')}.jpg`,
            imageFrameCount: 150,
        }
     }

        return {
            smoother: { smooth: 2.2, smoothTouch: 0.1 },
            r3f: {
                dpr: 1.5,
                disableBloom: false,
                modelScaleFactor: 4,
            },
            splitText: "chars",
            imageSequencePath: (index: number) => `/images/last_desktop_sequence/swanson__${(index).toString().padStart(5, '0')}.jpg`,
            imageFrameCount: 254,
        };
}