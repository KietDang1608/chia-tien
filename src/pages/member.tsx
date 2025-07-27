'use client';

import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import type { Member } from "@/interfaces/member";
import { addMember, getMembers, removeMember } from "@/api/members";

// Danh sách mặc định


export default function Member() {
  const [members, setMembers] = useState<Member[]>([]);
  const [memberName, setMemberName] = useState("");

  useEffect(() => {
    getMembers().then(setMembers);
  }, []);

  

  const handleRemoveMember = (id: number) => {
    removeMember(id).then(() => {
      getMembers().then(setMembers);
    });
  };

  const handleAddMember = () => {
    if (memberName.trim() === "") return;
    addMember({ name: memberName }).then((newMember) => {
      setMembers((prev) => [...prev, newMember]);
      setMemberName(""); // Reset input field
    });
  };

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
        {members.map((member) => (
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
