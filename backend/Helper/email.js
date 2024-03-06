import nodemailer from "nodemailer";
const SendEmail = (email,subject,message)=>{
    try{
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: "naseerjdmatrix@gmail.com",
              pass: "gxetqmvtrdqdiaoj",
            },
        });
        
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });
        
        transporter.sendMail(
            {
                from: "'No Reply' <naseerjdmatrix@gmail.com>",
                to: email,
                subject: subject,
                html: message,
            },
            (error, info) => {
                if (error) {
                    throw error;
                }
            }
        );
    }catch(error){
        console.log(error);
        return error;
    }
}


export default SendEmail;