import './CoordinatorHomepage.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; 
import { Doughnut } from 'react-chartjs-2';
import { logOut } from '../../services/authService';

ChartJS.register(ArcElement, Tooltip, Legend);


function CoordinatorHomepage() {    


}; 
export default CoordinatorHomepage;