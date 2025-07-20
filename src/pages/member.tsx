'use client';

import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import type { Member } from "@/interfaces/member";

// Danh sách mặc định
const defaultMembers: Member[] = [
  { id: 1, name: "Đặng Tuấn Kiệt" },
  { id: 2, name: "Nguyễn Viết Khôi" },
  { id: 3, name: "Đỗ Phước Hưng" },
  { id: 4, name: "Nguyễn Minh Hữu" },
  { id: 5, name: "Huỳnh Đức Huy" },
  { id: 6, name: "Huỳnh Tuấn Đạt" },
];

export default function Member() {
  const [memberName, setMemberName] = useState("");
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [hasMounted, setHasMounted] = useState(false); // <- chặn render sớm

  // Đảm bảo chỉ chạy sau khi component đã mounted trên client
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Load danh sách từ localStorage khi đã mounted
  useEffect(() => {
    if (!hasMounted) return;

    const stored = localStorage.getItem("members");
    if (stored) {
      setMemberList(JSON.parse(stored));
    } else {
      setMemberList(defaultMembers);
      localStorage.setItem("members", JSON.stringify(defaultMembers));
    }
  }, [hasMounted]);

  // Lưu khi danh sách thay đổi
  useEffect(() => {
    if (!hasMounted) return;
    localStorage.setItem("members", JSON.stringify(memberList));
  }, [memberList, hasMounted]);

  const handleAddMember = () => {
    if (memberName.trim() === "") return;

    const newMember: Member = {
      id: memberList.length > 0 ? memberList[memberList.length - 1].id + 1 : 1,
      name: memberName.trim(),
    };

    setMemberList([...memberList, newMember]);
    setMemberName("");
  };

  const handleRemoveMember = (id: number) => {
    setMemberList(memberList.filter((m) => m.id !== id));
  };

  // Nếu chưa mount xong, tránh render
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

      <Typography
        sx={{
          fontWeight: "bold",
          color: "#EEEEEE",
          fontSize: "1.5rem",
          textAlign: "center",
          backgroundColor: "#222831",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          mb: 2,
        }}
      >
        Danh sách thành viên
      </Typography>

      <Box display="flex" gap={1} mb={2}>
        <TextField
          label="Thêm thành viên"
          variant="outlined"
          fullWidth
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
        />
        <Button
          onClick={handleAddMember}
          sx={{
            fontSize: "1rem",
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

      <Box>
        {memberList.map((member) => (
          <Box
            key={member.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem",
              borderBottom: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f7f7f7",
              mb: 1,
            }}
          >
            <Typography>{member.name}</Typography>
            <Button
              onClick={() => handleRemoveMember(member.id)}
              sx={{
                backgroundColor: "#FF5722",
                color: "#FFFFFF",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              Xóa
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
