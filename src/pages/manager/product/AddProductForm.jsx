import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import React from 'react';

const AddProductForm = () => {
  const initialValues = {
    title: '',
    author: '',
    isbn: '',
    content: '',
    fixedPrice: '',
    publicationYear: '',
    status: '',
    stockQuantity: '',
    pictureUrl: '',
    categoryIds: []
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.string().required('ISBN is required'),
    content: Yup.string().required('Content is required'),
    fixedPrice: Yup.number().required('Fixed price is required').positive('Price must be positive'),
    publicationYear: Yup.date().required('Publication year is required'),
    status: Yup.string().required('Status is required'),
    stockQuantity: Yup.number().min(0, 'Stock quantity cannot be negative'),
    pictureUrl: Yup.string().url('Enter a valid URL'),
    categoryIds: Yup.array().of(Yup.number()).min(1, 'At least one category is required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form data', values);
    setSubmitting(false);
    // POST the values to your server endpoint using an API client like Axios
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2>Add New Product</h2>
          <label htmlFor="title">Title:</label>
          <Field name="title" type="text" />
          <ErrorMessage name="title" component="div" />

          <label htmlFor="author">Author:</label>
          <Field name="author" type="text" />
          <ErrorMessage name="author" component="div" />

          <label htmlFor="isbn">ISBN:</label>
          <Field name="isbn" type="text" />
          <ErrorMessage name="isbn" component="div" />

          <label htmlFor="content">Content:</label>
          <Field name="content" as="textarea" />
          <ErrorMessage name="content" component="div" />

          <label htmlFor="fixedPrice">Fixed Price:</label>
          <Field name="fixedPrice" type="number" />
          <ErrorMessage name="fixedPrice" component="div" />

          <label htmlFor="publicationYear">Publication Year:</label>
          <Field name="publicationYear" type="date" />
          <ErrorMessage name="publicationYear" component="div" />

          <label htmlFor="status">Status:</label>
          <Field name="status" as="select">
            <option value="">Select Status</option>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="UNAVAILABLE">UNAVAILABLE</option>
          </Field>
          <ErrorMessage name="status" component="div" />

          <label htmlFor="stockQuantity">Stock Quantity:</label>
          <Field name="stockQuantity" type="number" />
          <ErrorMessage name="stockQuantity" component="div" />

          <label htmlFor="pictureUrl">Picture URL:</label>
          <Field name="pictureUrl" type="text" />
          <ErrorMessage name="pictureUrl" component="div" />

          <label htmlFor="categoryIds">Category IDs:</label>
          <Field name="categoryIds" as="select" multiple>
            {/* Dynamically populate category options here */}
          </Field>
          <ErrorMessage name="categoryIds" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddProductForm;
