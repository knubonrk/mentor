import {v4 as uuidv4} from 'uuid';

const configureTeacherSecret = () => {
    let secret = localStorage.getItem('sessionSecret');

    const newSecret = secret ? secret : uuidv4();

    let formData = new FormData();
    formData.append('sessionSecret', newSecret);

    fetch('http://localhost:8080/api/teacher/reserve_me_as_admin', {
        method: 'POST',
        body: formData,
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            if (data === true) {
                localStorage.setItem('sessionSecret', newSecret);
            } else {
                alert("Omstart baktjeneren for å få sesjonen.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Noe gikk galt.");
        });
}
export default configureTeacherSecret;