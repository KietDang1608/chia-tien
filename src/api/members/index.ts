// src/api/users/index.ts
import { CreateMember, Member } from '@/interfaces/member';
import axios from '../axios-instance'; // bạn có thể tạo 1 instance dùng chung

export const getMembers = async () => {
    const res = await axios.get('/members');
    console.log('Response:', res.data); // ← debug

    return res.data as Member[];
};

export const addMember = async (dto:CreateMember) => {
    const res = await axios.post('/members', dto);
    console.log('Added Member:', res.data); // ← debug
    return res.data;
};

export const removeMember = async (id: number) => {
    await axios.delete(`/members/${id}`);
    console.log(`Removed Member with ID: ${id}`); // ← debug
    return id; // trả về id để cập nhật UI
};
