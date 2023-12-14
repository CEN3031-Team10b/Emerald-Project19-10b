# CaSMM

## Group 10b Project 19 Classroom Features

<br/>

## Features

## `Due Dates`

Due dates are now possible to add in the activity creator and editor. Both content creators and mentors can do this. The date is stored as text, but the text is checked to ensure that the date is in proper format. This is to ensure compatibility with other features when they are added.

## `Discussion Board`

The discussion board allows students and teachers to communicate. It allows for posts and replies. It is fully integrated into the back end and keeps each class's discussions saved.
![plot](./ReadMe%20Images/Discussion.png)

## `Syllabus Page`

The syllabus page allows teachers to specify the rules for a class. Students have easy access to a class's syllabus from their student dashboard. The syllabus is stored in a classroom’s collection.
![plot](./ReadMe%20Images/Syllabus.png)

## `Student Dashboard`

The student dashboard is a new view that improves on the existing view and incorporates new features from other parts of the project for easy access for the student. Previously, students were only able to see assignments and had a lot of wasted space. The new view allows students to see assignments, notifications/announcements, due dates, discussions, and the syllabus all from one screen. Currently, this new view is a separate page which the user will have to navigate by going to “/studentdashboard”. By default, it will go to the original view on login for legacy purposes.

## `Release and Closing Dates (Content Creator)`

- When creating a lesson in the content creator, release closing dates can be selected. The dates cannot be before the current date, and the closing date cannot be before the opening date.
- The second screenshot shows a section for the dates to be shown but was unable to work on the backend to get it to show.

## `Notification Center`

Teachers can send notifications from their classroom view to students. Students can view the notifications from their dashboard and mark them as read, unread, and flagged. Students can also filter notifications by these tags.
