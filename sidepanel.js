import {patientRegistrationData} from './data.js'

document.addEventListener('DOMContentLoaded', () => {


    const simpleList = document.getElementById('dataList');
    const detailedList = document.getElementById('detailedList');

    patientRegistrationData.forEach((data) => {
        const color = determineAgeColor(data.dob);
        const importantData = document.createElement('div');
        importantData.className = `data-entry ${color}`;
        importantData.innerHTML = `
            <strong>BSN:</strong> ${data.bsn}<br>
            <strong>DOB:</strong> ${data.dob}<br>
            <strong>Postcode:</strong> ${data.postcode}
        `;
        simpleList.appendChild(importantData);

        const allData = document.createElement('div');
        allData.className = `data-entry ${color}`;
        allData.innerHTML = `
            <strong>BSN:</strong> ${data.bsn}<br>
            <strong>Name:</strong> ${data.name}<br>
            <strong>Initials:</strong> ${data.initials}<br>
            <strong>DOB:</strong> ${data.dob}<br>
            <strong>Postcode:</strong> ${data.postcode}<br>
            <strong>Birthplace:</strong> ${data.birthplace}<br>
            <strong>Gender:</strong> ${data.gender}<br>
            <strong>Street:</strong> ${data.street} ${data.number}<br>
            <strong>Residence:</strong> ${data.residence}
        `;
        detailedList.appendChild(allData);
    })


    // Tab switching logic
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    function determineAgeColor(dateOfBirth) {
        // Parse the date of birth (assuming format DD/MM/YYYY)
        const [day, month, year] = dateOfBirth.split('/');
        const dob = new Date(year, month - 1, day);
        const today = new Date();
        // Calculate age
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        // Adjust age if birthday hasn't occurred this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        // Determine color based on age
        if (age >= 16) {
            return 'bg-teal';
        } else if (age >= 12) {
            return 'bg-yellow';
        } else {
            return 'bg-red';
        }
    }
});