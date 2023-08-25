insert into department(NAME)
VALUES("RND"), ("QA"), ("Development"), ("Legal"), ("Marketing"), ("Sales");

INSERT INTO role(title, salary, department_id)
VALUES("RND", 55000, 1), ("QA Specialist", 50000, 2), ("Senior Dev", 110000, 3), ("Junior Dev", 65000, 3), ("Legal Counsel", 220000, 4),  ("Marketing Lead", 140000, 5), ("Market Analyst", 85000, 5) ,  ("Sales Manager", 145000, 6), ("Senior Salesforce", 90000, 6), ("Junior Salesforce", 65000, 6)

INSERT INTO employee( first_name, last_name, role_id, manager_id)
VALUES ( "Cedric", "Daniels", 1, null), 
("Avon", "Barksdale", 2, null), 
("Bodie", "Broadus", 3, null), 
("Clay", "Davis", 4, 3), 
("Ziggy", "Sobotka", 4, 3), 
("Bunk", "Moreland", 5, null),
("Chris", "Partlow", 6, null),
("Stan", "Valchek", 7, 7),
("Omar", "Little", 7, 7), 
("Lester", "Freamon", 8, null), 
("Stringer", "Bell", 9, 10), 
("James", "McNulty", 10,10);


