import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';

import MentorSubHeader from '../../../components/MentorSubHeader/MentorSubHeader';

const Syllabus = ({ classroomId }) => {
  const [text, setText] = useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  const handleChange = (event) => {
    setText(event);
  };

  return (
    <>
      <MentorSubHeader title='Syllabus' />
      <div
        style={{
          margin: '6vh auto 5vh auto',
          padding: '5vh 5vw',
          width: '80vw',
          height: 'auto',
          background: 'rgb(233, 233, 233)',
          borderRadius: '5px',
          border: '2px solid #5BABDE',
        }}
      >
        <ReactQuill
          value={text}
          modules={modules}
          formats={formats}
          onChange={handleChange}
        />
        <ReactQuill value={text} readOnly={true} theme={'bubble'} />
      </div>
    </>
  );
};

export default Syllabus;
