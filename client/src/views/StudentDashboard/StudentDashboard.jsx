import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom } from '../../Utils/requests';
import './StudentDashboard.less';

  

function StudentDashboard() {


  const [learningStandard, setLessonModule] = useState({});
  const navigate = useNavigate();

  let permission = Notification.permission;
  if(permission === "granted") {
    showNotification();
  } else if(permission === "default"){
    requestAndShowPermission();
  } else {
    alert("Use normal alert");
  }



  // Browser Notification System
  function showNotification() {
    var title = "JavaScript Jeep";
    var icon = "image-url"
    var body = "Message to be displayed";
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

  // End browser notification system


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
      </aside>

      <div id='timeline'>
        <div id='timelineHeader'>
              Hi
        </div>
      </div>

    </div>
    

  );
}

export default StudentDashboard;

