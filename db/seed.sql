INSERT INTO department (id, name)
VALUES  
        (1, "Sawmill Operations"),
        (2, "Finance"),
        (3, "Human Resources"),
        (4, "Legal"),
        (5, "Accounts Receivable"),
        (6, "Accounts Payable"),
        (7, "Senior Leadership"), 
        (8, "Sales"), 
        (9, "Marketing"); 

INSERT INTO role (id, title, salary, department_id)
VALUES  

        (1,"Logger",45000,1),
        (2,"Crane Operator",55000,1), 
        (3,"Trucker",65000,1), 
        (4,"Sawmill Manager",80000,1),
        (5,"Saw Mill Operator",50000,1), 
        (6,"Finance Analyst",35000,2),
        (7,"Finance Manager",80000,2),
        (8,"Human Resources Manager",80000,3),
        (9,"Lawyer",100000,4), 
        (10,"Accounts Receivable Analyst",35000,5),
        (11,"Accounts Receivable Manager",80000,5),
        (12,"Accounts Payable Analyst",35000,6),
        (13,"Accounts Payable Manager",80000,6),
        (14,"Chief Executive Officer",1000000,7), 
        (15,"Chief Operating Officer",800000,7),
        (16,"Chief Marketing Officer",800000,9), 
        (17,"Sales Executive",50000,8), 
        (18,"Sales Manager",80000,8), 
        (19,"Chief Finance Officer",800000,7);
 

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  
 
        (1000,"Marc","Stephens",14,1000),
        (8382,"Layne","Johns",15,1000),
        (8923,"Shawn","Bridges",19,1000),
        (3324,"Makai","Zavala",16,1000),
        (8838,"Maximus","Thompson",9,1000),
        (6452,"Angelina","Valdez",18,3324),
        (3383,"Phoebe","Morgan",4,8382),
        (9388,"Julia","Padilla",7,8382),
        (3348,"Cailyn","Landry",8,8382),
        (9384,"Noemi","Camacho",11,8923),
        (1232,"Alden","Estrada",13,8923),
        (9324,"Cole","Dean",17,6452),
        (8034,"Braylon","Mora",12,1232),
        (8456,"Jaida","Cantrell",6,9388),
        (3288,"Rhianna","Beltran",10,9384),
        (3432,"Raul","Hardin",1,3383),
        (5757,"Ricky","Schmitt",1,3383),
        (1239,"Londyn","Henson",1,3383),
        (8832,"Ellie","Rice",2,3383),
        (8003,"Vivian","Boone",3,3383),
        (8847,"Salvatore","Fisher",3,3383),
        (9382,"Erica","Fowler",5,3383),
        (4234,"Nathen","Molina",5,3383); 

 