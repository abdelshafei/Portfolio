import { Component } from '@angular/core';
import { CourseCardComponent } from '../course-card/course-card.component'
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [CourseCardComponent, NgForOf],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses = [ 
  {
    title: 'Systems Programming',
    code: '(COMP 2401)',
    description: 'Introduced to systems-level C programming in Linux, focusing on pointers, manual memory management, concurrency (threads/processes), and inter-process communication.',
    date: 'Sep 2023 - Dec 2023',
    grade: 'A-',
    skills: 'C, Concurrency, Memory Management'
  }, 
  {
    title: 'Data Structures & Abstract Data',
    code: '(COMP 2402)',
    description: 'Designed and implemented core data structures in Java and analyzed algorithmic complexity.',
    date: 'Sep 2023 - Dec 2023',
    grade: 'B',
    skills: 'Java, Data Structures, Algorithm Analysis, Clean Code'
  }, 
  {
    title: 'Fundamentals of Web Applications',
    code: '(COMP 2406)',
    description: 'Built interactive web applications using HTML, CSS, and JavaScript. Learned RESTful API design, scripting, and client-server interactions.',
    date: 'Jan 2024 - April 2024',
    grade: 'A+',
    skills: 'Html, CSS, Javascript, REST'
  },
  {
    title: 'Introduction to Software Eng.',
    code: '(COMP 2404)',
    description: 'Reinforced object-oriented design in C++ with STL, focusing on abstraction, modularity, encapsulation, and basic design patterns.',
    date: 'Jan 2024 - April 2024',
    grade: 'A+',
    skills: 'C++, STL, OOP, Design Patterns'   
  },
  {
    title: 'Database Management',
    code: '(COMP 3005)',
    description: 'Studied the fundamentals of relational databases, including schema design, normalization, indexing, and query optimization. Developed SQL-based applications to interact with and manage structured data.',
    date: 'Sep 2024 - Dec 2024',
    grade: 'A+',
    skills: 'SQL, Relational Schema Design, Normalization, Query Optimization' 
  },
  {
    title: 'Object-Oriented Programming',
    code: '(COMP 3004)',
    description: 'Applied advanced OOP principles in C++ using Qt for GUI development. Covered inheritance, polymorphism, and design patterns within Agile team environments to build a maintainable project.',
    date: 'Sep 2024 - Dec 2024',
    grade: 'A+',
    skills: 'Qt, C++, Agile Methodology' 
  },
  {
    title: 'Operating Systems',
    code: '(COMP 3000)',
    description: 'Explored the fundamentals of the Linux kernel, including process management, memory handling, and kernel module development such as device drivers.',
    date: 'Jan 2025 - April 2025',
    grade: 'A+',
    skills: 'C, Linux, Kernel Modules, Concurrency' 
  }];
}
