/* eslint-disable @typescript-eslint/no-explicit-any */

import { Formik, FormikProps, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

type FormValues = {
  email: string;
  name: string;
  subject: string;
  message: string;
};

type FieldProp = {
  name: string;
  label: string;
  colsProps: {
    [cols: string]: number | null;
  };
  typeProps: {
    [propName: string]: any;
  };
  touched: {
    [field: string]: boolean;
  };
  errors: {
    [field: string]: string;
  };
  otherStyles: string;
};

const FieldEl = ({
  label,
  name,
  typeProps,
  touched,
  colsProps,
  errors,
  otherStyles,
}: FieldProp) => {
  return (
    <label className="form-el w-full">
      <span className="email-label">{label}</span>
      <Field
        {...typeProps}
        name={name}
        className={`input-el ${otherStyles} ${
          touched.message && !errors.message ? "success" : ""
        }`}
        {...colsProps}
      />
      <ErrorMessage name={name} component="div" className="text-[10px] text-red-500" />
    </label>
  );
};


export default function ContactForm() {
  const handleSubmitEmail = async (values: FormValues,formikProps:FormikHelpers<FormValues>) => {
    const { email, name, subject, message } = values;
    try {
      const response = await emailjs.send(
        import.meta.env.VITE_PUBLIC_EMAILJS_SERVICE_ID || "",
        import.meta.env.VITE_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_subject: subject,
          from_name: name,
          from_message: message,
          from_email: email,
        },
        import.meta.env.VITE_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      );
      console.log(response);
      if (response.status !== 200) {
        toast.error("Failed to send email");
      }
      //reset the form upon successful submission
      formikProps.resetForm()
      //toast the response message
      toast.success("Email sent successfully");
      
    } catch (error) {
      toast.error("Error sending email");
    }
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email cannot be blank"),
    name: Yup.string().required("Your Name is required"),
    subject: Yup.string().required("Add a subject"),
    message: Yup.string().required("Message cannot be blank"),
  });
  return (
    <div className="w-full inline-flex md:w-2/3 rounded-xl bg-[#0b1a2a]">
      <Formik
        initialValues={{
          email: "",
          name: "",
          subject: "",
          message: "",
        }}
        onSubmit={(values,formikHelpers)=>handleSubmitEmail(values,formikHelpers)}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, touched, errors }: FormikProps<FormValues>) => (
          <Form className="p-4 w-full flex flex-col gap-4">
            <h1 className="text-red-600">Send Your Message</h1>
            <div className="flex md:gap-4 md:flex-row flex-col">
            <FieldEl
                typeProps={{ type: "text" }}
                name="name"
                label="Your Name"
                errors={errors}
                touched={touched}
                otherStyles=""
                colsProps={{}}
              />
              <FieldEl
                typeProps={{ type: "text" }}
                name="email"
                label="Email"
                errors={errors}
                touched={touched}
                otherStyles=""
                colsProps={{}}
              />
            </div>
            <FieldEl
              typeProps={{ type: "text" }}
              name="subject"
              label="Subject"
              errors={errors}
              touched={touched}
              otherStyles=""
              colsProps={{}}
            />
            <FieldEl
              typeProps={{ as: "textarea" }}
              name="message"
              label="Message"
              errors={errors}
              touched={touched}
              otherStyles="resize-y w-full"
              colsProps={{ cols: 12 }}
            />
            <button type="submit" disabled={isSubmitting} className="w-fit bg-red-600">
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </Form>
        )}
      </Formik>
      <Toaster containerStyle={{ top: 90 }} />
    </div>
  );
}
