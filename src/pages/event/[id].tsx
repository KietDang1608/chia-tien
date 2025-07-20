// src/pages/event/[id].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { Event } from '@/interfaces/event'; // Đảm bảo đã tạo interface Event
import { Box, Button, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';


export default function EventDetailPage() {
    const router = useRouter();
    const { id } = router.query; // Lấy id từ URL
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        if (!id) return;

        const stored = localStorage.getItem('events');
        if (stored) {
            const events: Event[] = JSON.parse(stored);
            const found = events.find((e) => e.id === Number(id));
            setEvent(found || null);
        }
    }, [id]);

    if (!event) {
        return <Typography sx={{ p: 4 }}>Không tìm thấy sự kiện</Typography>;
    }

    return (

        <Box sx={{  }}>
            <Button
                startIcon={<EventIcon />}
                onClick={() => (window.location.href = "/")}
                sx={{ mb: 2 }}
                variant="outlined"
            >
                Về trang sự kiện
            </Button>
            <Typography align='center' variant="h5" sx={{ mb: 2 , backgroundColor: "#222831", color: "#EEEEEE", padding: "1rem", borderRadius: "8px"}}>
                {event.name} - {new Date(event.date).toLocaleDateString('vi-VN')}
            </Typography>
            
        </Box>
    );
}
