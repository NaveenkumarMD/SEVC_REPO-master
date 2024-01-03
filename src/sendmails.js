import emailjs from "@emailjs/browser"
const sendmail = () => {

    var templateParams = {
        to_name: 'Naveenkumar',
        from_name: 'aveenkumar',
        message: 'hello world'
    };
    emailjs.send('service_pw659gl', 'template_y0h55r8', templateParams,'4bqnGr-nwY8ThXyjZ')
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });

}
export default sendmail