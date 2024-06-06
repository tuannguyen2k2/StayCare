"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface INavigationButton {
    data: string;
    icon: string | any;
    width?: number,
    height?: number,
    padding?: string
}

export function NavigationButton(props: INavigationButton) {
    const router = useRouter();
    return (
        <Box>
            <Button
                variant="text"
                sx={{
                    backgroundColor: 'transparent',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    },
                    width: `${props.width || 84 }px`,
                    height: `${props.height || 84 }px`,
                    minWidth: `unset`,
                    padding: `${props.padding || '6px 8px'}`,
                }}
                onClick={() => router.push(`${props.data}`)}
            >
                <img
                    src={props.icon.src}
                    alt="arrow"
                />
            </Button>
        </Box>
    );
}
