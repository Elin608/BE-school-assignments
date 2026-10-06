    -- I got this error :
    --ERROR:  duplicate key value violates unique constraint "student_courses_pkey"
--Key (student_id, course_id)=(13, 18) already exists. 

--SQL state: 23505
--Detail: Key (student_id, course_id)=(13, 18) already exists.

--The same student cannot be added to same course twice. Its because the combination must be unique. 