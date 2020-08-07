/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';
import api from './../../services/api';
interface TeacherItemProps {
    teacher: {
        id: number;
        subject: string;
        cost: number;
        user_id: number;
        name: string;
        avatar: string;
        whatsapp: string;
        bio: string;
    };
}
const registerConnection = (id: number, whatsapp: string) => {
    return async (event: React.MouseEvent) => {
        event.preventDefault();
        api.post('connections', {
            user_id: id,
        });
        window.open(`https://wa.me/${whatsapp}`, '_blank');
    };
};

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>{teacher.bio}</p>
            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <button type="button" onClick={registerConnection(teacher.id, teacher.whatsapp)}>
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
};
export default TeacherItem;
