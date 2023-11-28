import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom } from '../../Utils/requests';
import './Student.less';
import { getCurrUser } from '../../Utils/userState';

function Student() {
  const [learningStandard, setLessonModule] = useState({});
  const navigate = useNavigate();

  let permission = Notification.permission;
  if (permission === 'granted') {
    showNotification();
  } else if (permission === 'default') {
    requestAndShowPermission();
  } else {
    alert('Use normal alert');
  }

  // Browser Notification System
  function showNotification() {
    var title = 'JavaScript Jeep';
    var icon = 'image-url';
    var body = 'Message to be displayed';
    var notification = new Notification(title, { body, icon });
    notification.onclick = () => {
      notification.close();
      window.parent.focus();
    };
  }

  function requestAndShowPermission() {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        showNotification();
      }
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentClassroom();
        if (res.data) {
          if (res.data.lesson_module) {
            setLessonModule(res.data.lesson_module);
            console.log(res.data);
          }
        } else {
          message.error(res.err);
        }
      } catch {}
    };
    fetchData();
  }, []);

  const handleSelection = (activity) => {
    activity.lesson_module_name = learningStandard.name;
    localStorage.setItem('my-activity', JSON.stringify(activity));

    navigate('/workspace');
  };

  // End browser notification system

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='activity-container'>
        <div id='header'>
          <div>Select your Activity</div>
        </div>
        <ul>
          {learningStandard.activities ? (
            learningStandard.activities
              .sort(
                (activity1, activity2) => activity1.number - activity2.number
              )
              .map((activity) => (
                <div
                  key={activity.id}
                  id='list-item-wrapper'
                  onClick={() => handleSelection(activity)}
                >
                  <li>{`${learningStandard.name}: Activity ${activity.number}`}</li>
                </div>
              ))
          ) : (
            <div>
              <p>There is currently no active learning standard set.</p>
              <p>
                When your classroom manager selects one, it will appear here.
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Student;
