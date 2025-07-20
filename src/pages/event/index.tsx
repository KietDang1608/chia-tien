'use client';

import { Box, Button, TextField } from "@mui/material";
import { Event } from "@/interfaces/event";
import { useEffect, useState } from "react";
import HouseIcon from "@mui/icons-material/House";
import { Router, useRouter } from 'next/router';


// Danh sách mặc định (nếu chưa có trong localStorage)
const defaultEvents: Event[] = [];

export default function EventPage() {
    const [eventName, setEventName] = useState("");
    const [eventList, setEventList] = useState<Event[]>([]);
    const [hasMounted, setHasMounted] = useState(false);
    const router = useRouter();


    // Đảm bảo chỉ chạy trên client
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Load danh sách từ localStorage
    useEffect(() => {
        if (!hasMounted) return;

        try {
            const stored = localStorage.getItem("events");
            if (stored) {
                setEventList(JSON.parse(stored));
            } else {
                setEventList(defaultEvents);
                localStorage.setItem("events", JSON.stringify(defaultEvents));
            }
        } catch (error) {
            console.error("Failed to load events from localStorage", error);
        }
    }, [hasMounted]);

    // Tự động lưu lại khi eventList thay đổi
    useEffect(() => {
        if (!hasMounted) return;

        try {
            localStorage.setItem("events", JSON.stringify(eventList));
        } catch (error) {
            console.error("Failed to save events to localStorage", error);
        }
    }, [eventList, hasMounted]);

    const handleAddEvent = () => {
        if (eventName.trim() === "") return;

        const newEvent: Event = {
            id: eventList.length > 0 ? eventList[eventList.length - 1].id + 1 : 1,
            name: eventName.trim(),
            date: new Date().toISOString(),
            members: [],
        };

        setEventList([...eventList, newEvent]);
        setEventName("");
    };

    const handleRemoveEvent = (id: number) => {
        setEventList(eventList.filter((e) => e.id !== id));
    };

    // Nếu chưa mounted thì không render gì cả (tránh lỗi localStorage)
    if (!hasMounted) return null;

    return (

        <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
            <Button
                startIcon={<HouseIcon />}
                onClick={() => (window.location.href = "/")}
                sx={{ mb: 2 }}
                variant="outlined"
            >
                Về trang chủ
            </Button>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    width: "100%",
                }}
            >
                <TextField
                    fullWidth
                    label="Tên sự kiện"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                />
                <Button
                    onClick={handleAddEvent}
                    sx={{
                        fontSize: "1rem",
                        padding: "0.5rem 1rem",
                        fontWeight: "bold",
                        backgroundColor: "#00ADB5",
                        color: "#EEEEEE",
                        "&:hover": {
                            opacity: 0.8,
                        },
                        whiteSpace: "nowrap",
                    }}
                >
                    Thêm
                </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
                {eventList.map((event) => (
                    <Box
                        key={event.id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0.5rem 1rem",
                            borderBottom: "1px solid #ccc",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "4px",
                            mb: 1,
                        }}
                    >
                        <span>
                            {event.name} -{" "}
                            {new Date(event.date).toLocaleDateString("vi-VN")}
                        </span>
                        <Button onClick={() => router.push(`/event/${event.id}`)}
                        sx={{
                            
                            padding: "0.25rem 0.5rem",
                            backgroundColor: "#393E46",
                            color: "#EEEEEE",
                            "&:hover": {
                                opacity: 0.8,
                            },
                        }}>
                            Xem
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleRemoveEvent(event.id)}
                        >
                            Xóa
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
