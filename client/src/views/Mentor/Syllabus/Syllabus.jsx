import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';

import MentorSubHeader from '../../../components/MentorSubHeader/MentorSubHeader';
import { getCurrUser } from '../../../Utils/userState';

const Syllabus = ({ classroomId }) => {
  const [text, setText] = useState('');
  const [finalText, setFinalText] = useState('');
  const [edit, setEdit] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text != '') {
      setFinalText(text);
    }
    event.preventDefault();
  };

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
        {getCurrUser().role != 'Student' ? (
          <>
            <button
              style={{
                width: 'auto',
                height: 'auto',
                border: 'none',
                color: '#414141',
                background: '#F3D250',
                transition: '0.25s',
                cursor: 'pointer',
                borderRadius: '30px',
                padding: '10px',
                margin: '20px',
                display: 'inline - block',
              }}
              onClick={(event) => {
                setEdit(!edit);
              }}
            >
              Edit
            </button>
            <>
              {edit ? (
                <form onSubmit={handleSubmit}>
                  <ReactQuill
                    value={text}
                    modules={modules}
                    formats={formats}
                    onChange={handleChange}
                  />
                  <button
                    style={{
                      width: 'auto',
                      height: 'auto',
                      border: 'none',
                      color: '#414141',
                      background: '#F3D250',
                      transition: '0.25s',
                      cursor: 'pointer',
                      borderRadius: '30px',
                      padding: '10px',
                      margin: '20px',
                      display: 'inline - block',
                    }}
                    type='submit'
                  >
                    Post
                  </button>
                </form>
              ) : null}
            </>
          </>
        ) : null}

        <ReactQuill value={finalText} readOnly={true} theme={'bubble'} />
      </div>
    </>
  );
};

export default Syllabus;
