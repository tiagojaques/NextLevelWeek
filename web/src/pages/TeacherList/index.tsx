/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, FormEvent, useEffect } from 'react';

import PageHeader from './../../components/PageHeader';
import TeacherItem from './../../components/TeacherItem';
import Input from './../../components/input';
import Select from './../../components/Select/index';

import SearchIcon from '@material-ui/icons/Search';
import './styles.css';
import api from './../../services/api';
interface Teacher {
    id: number;
    subject: string;
    cost: number;
    user_id: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
}

function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function contructTeachers() {
        const result = await api.get('classes');
        setTeachers(result.data);
    }

    async function handleSearch(e: FormEvent) {
        e.preventDefault();
        const response = await api.get('classes', {
            params: {
                week_day,
                time,
                subject,
            },
        });
        setTeachers(response.data);
    }

    useEffect(() => {
        contructTeachers();
    }, []);

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={handleSearch}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => {
                            setSubject(e.target.value);
                        }}
                        options={[
                            { value: 'ETL', label: 'ETL' },
                            { value: 'React', label: 'React' },
                            { value: 'Javacript', label: 'Javacript' },
                            { value: 'Python', label: 'Python' },
                            { value: 'NodeJS', label: 'NodeJS' },
                            { value: 'Godot', label: 'Godot' },
                            { value: 'Defold', label: 'Defold' },
                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={week_day}
                        onChange={(e) => {
                            setWeekDay(e.target.value);
                        }}
                        options={[
                            { value: '1', label: 'Segunda-Feira' },
                            { value: '2', label: 'Terça-Feira' },
                            { value: '3', label: 'Quarta-Feira' },
                            { value: '4', label: 'Quinta-Feira' },
                            { value: '5', label: 'Sexta-Feira' },
                            { value: '6', label: 'Sabado' },
                            { value: '7', label: 'Domingo' },
                        ]}
                    />
                    <div className="search-box">
                        <Input
                            type="time"
                            name="time"
                            label="Hora"
                            value={time}
                            onChange={(e) => {
                                setTime(e.target.value);
                            }}
                        />
                        <button type="submit">
                            <SearchIcon />
                        </button>
                    </div>
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />;
                })}
            </main>
        </div>
    );
}

export default TeacherList;
