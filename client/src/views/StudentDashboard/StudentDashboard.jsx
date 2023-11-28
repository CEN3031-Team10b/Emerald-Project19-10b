import { message } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom } from '../../Utils/requests';
import './StudentDashboard.less';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';

import Example from './syllabusModal';



function StudentDashboard() {

  const [learningStandard, setLessonModule] = useState({});
  const navigate = useNavigate();



  // Browser Notification System
  let permission = Notification.permission;
  if(permission === "granted") {
    showNotification();
  } else if(permission === "default"){
    requestAndShowPermission();
  } else {
    alert("Browser Notification");
  }

  function showNotification() {
    var title = "CASMM";
    var icon = "image-url"
    var body = "New notification from CASMM";
    var notification = new Notification(title, { body, icon });
    notification.onclick = () => { 
           notification.close();
           window.parent.focus();
    }
 }

 function requestAndShowPermission() {
  Notification.requestPermission(function (permission) {
     if (permission === "granted") {
           showNotification();
     }
  });
}

  // End browser notification system

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentClassroom();
        if (res.data) {
          if (res.data.lesson_module) {
            setLessonModule(res.data.lesson_module);
          }
        } else {
          message.error(res.err);
        }
      } catch {}
    };
    fetchData();
  }, []);

  const goToNotifications = () => {
    navigate('/notificationcenter');
  };

  const goToSyllabus = () => {
    navigate('/syllabus');
  };

  const goToDiscussions = () => {
    navigate('/discussions');
  };



  const handleSelection = (activity) => {
    activity.lesson_module_name = learningStandard.name;
    localStorage.setItem('my-activity', JSON.stringify(activity));

    navigate('/workspace');
  };

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='activity-container'>
        <div id='header'>
          <div>Assignments</div>
        </div>
        <ul>
          {learningStandard.activities ? (
            learningStandard.activities
              .sort((activity1, activity2) => activity1.number - activity2.number)
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
      
      <aside id="sidebar">
        <div id='header'>
            <div>Notifications</div>
        </div>
        <button id='notification-button' onClick={() => goToNotifications()}>
          View All
        </button>
        <ul>
          <div id='notification-item-wrapper'>
            <li>Notification 1</li>
            <li>It's</li>
          </div>
          <div id='notification-item-wrapper'>
            <li>Notification 2</li>
            <li>a</li>
          </div>
          <div id='notification-item-wrapper'>
            <li>Notification 3</li>
            <li>me</li>
          </div>
          <div id='notification-item-wrapper'>
            <li>Notification 4</li>
            <li>Mario</li>
          </div>
          <div id='notification-item-wrapper'>
            <li>Notification 5</li>
            <li>luigi</li>
          </div>
        </ul>
      </aside>

      <div id='timeline'>
        <div>
          <CalendarComponent id="calendar" />;
        </div>
      </div>

      <div id='syllabus'>
        <div id='header'>Extras</div>
        <div>
          <ul>
            <button id='syllabus-item-wrapper' onClick={() => goToSyllabus()}>
              Syllabus
            </button>
            <button id='syllabus-item-wrapper' onClick={() => goToDiscussions()}>
              Discussions
            </button>
          </ul>
        </div>
      </div>

    </div>
  );
}

export default StudentDashboard;

